<?php

declare(strict_types=1);

/**
 * Contact form API - expects JSON: { name, email, message, company (honeypot) }
 * Requires: composer install in this directory (vendor/) and mail_config.php
 */

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$autoload = __DIR__ . '/vendor/autoload.php';
if (!is_readable($autoload)) {
    http_response_code(503);
    echo json_encode([
        'ok' => false,
        'error' => 'Server mail dependencies missing. Run `composer install` in the folder with contact.php.',
    ]);
    exit;
}

require_once $autoload;

use PHPMailer\PHPMailer\Exception as MailException;
use PHPMailer\PHPMailer\PHPMailer;

$configPath = __DIR__ . '/mail_config.php';
if (!is_readable($configPath)) {
    http_response_code(503);
    echo json_encode([
        'ok' => false,
        'error' => 'Mail is not configured. Create mail_config.php from mail_config.sample.php.',
    ]);
    exit;
}

/** @var array<string, mixed> $config */
$config = require $configPath;

$raw = file_get_contents('php://input') ?: '';
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid request body.']);
    exit;
}

// Honeypot: bots often fill this; humans should leave it empty.
$honeypot = trim((string) ($data['company'] ?? ''));
if ($honeypot !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

if ($name === '' || mb_strlen($name) > 120) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Please enter a valid name.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Please enter a valid email address.']);
    exit;
}

if ($message === '' || mb_strlen($message) > 8000) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Please enter a message (max 8000 characters).']);
    exit;
}

if (!contact_rate_limit_ok()) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'Too many messages. Please try again later.']);
    exit;
}

$smtpHost = (string) ($config['smtpHost'] ?? '');
$smtpPort = (int) ($config['smtpPort'] ?? 587);
$smtpUser = (string) ($config['smtpUsername'] ?? '');
$smtpPass = (string) ($config['smtpPassword'] ?? '');
$encryption = strtolower((string) ($config['smtpEncryption'] ?? 'tls'));
$fromAddr = (string) ($config['mailFromAddress'] ?? '');
$fromName = (string) ($config['mailFromName'] ?? 'Portfolio');
$toAddr = (string) ($config['mailToAddress'] ?? '');
$toName = (string) ($config['mailToName'] ?? '');

if ($smtpHost === '' || $smtpUser === '' || $smtpPass === '' || $fromAddr === '' || $toAddr === '') {
    error_log('contact.php: incomplete mail_config.php');
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Mail configuration is incomplete.']);
    exit;
}

$mail = new PHPMailer(true);

try {
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->Port = $smtpPort;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUser;
    $mail->Password = $smtpPass;

    if ($encryption === 'ssl' || $encryption === 'smtps') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } elseif ($encryption === 'tls' || $encryption === 'starttls') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    } else {
        $mail->SMTPSecure = '';
    }

    $mail->setFrom($fromAddr, $fromName);
    $mail->addAddress($toAddr, $toName);
    $mail->addReplyTo($email, $name);

    $safeName = preg_replace('/[\r\n]+/', ' ', $name) ?? $name;
    $mail->Subject = 'Portfolio message from ' . $safeName;

    $bodyLines = [
        $message,
        '',
        '-',
        'Name: ' . $name,
        'Email: ' . $email,
        'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'),
        'Date (UTC): ' . gmdate('c'),
    ];
    $mail->Body = implode("\n", $bodyLines);

    $mail->send();
    echo json_encode(['ok' => true]);
} catch (MailException) {
    error_log('contact.php: PHPMailer failed to send');
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Could not send your message. Please try again later.']);
} catch (Throwable) {
    error_log('contact.php: unexpected error');
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Something went wrong. Please try again later.']);
}

/**
 * Simple file-based rate limit per IP (no database required).
 */
function contact_rate_limit_ok(): bool
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $hash = hash('sha256', $ip);
    $path = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'pf_contact_rl_' . $hash;

    $windowSeconds = 900;
    $maxHits = 5;
    $now = time();

    $times = [];
    if (is_readable($path)) {
        $raw = file_get_contents($path);
        if ($raw !== false && $raw !== '') {
            $times = array_map('intval', explode(',', $raw));
        }
    }

    $times = array_values(array_filter($times, static fn (int $t): bool => $now - $t < $windowSeconds));

    if (count($times) >= $maxHits) {
        return false;
    }

    $times[] = $now;
    $payload = implode(',', array_map('strval', $times));

    if (@file_put_contents($path, $payload, LOCK_EX) === false) {
        // If we cannot persist rate limit state, fail open to avoid blocking real users.
        return true;
    }

    return true;
}

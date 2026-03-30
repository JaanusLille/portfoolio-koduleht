<?php

/**
 * Copy this file to mail_config.php (same folder as contact.php) and fill in real values.
 * NEVER commit mail_config.php - it contains secrets.
 *
 * Use your zone.ee SMTP settings from their docs or webmail “incoming/outgoing server” help.
 * Typical: host smtp.zone.ee, port 587 + TLS, or port 465 + SSL (confirm with zone.ee).
 */
return [
    'smtpHost' => 'smtp.zone.ee',
    'smtpPort' => 587,
    /** 'tls' (STARTTLS, common on 587), 'ssl' (SMTPS, common on 465), or 'none' */
    'smtpEncryption' => 'tls',
    'smtpUsername' => 'you@jaanuslille.eu',
    'smtpPassword' => 'YOUR_MAILBOX_PASSWORD',

    'mailFromAddress' => 'you@jaanuslille.eu',
    'mailFromName' => 'Portfolio contact form',

    /** Where incoming messages are delivered (usually your own inbox) */
    'mailToAddress' => 'you@jaanuslille.eu',
    'mailToName' => 'Your Name',
];

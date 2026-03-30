export const site = {
  name: 'Your Name',
  role: 'Software developer',
  tagline: 'Interfaces that feel as good as they look.',
  intro:
    'I design and build fast, accessible web experiences. Here you can explore selected work and how I approach each project.',
  /** Profile URL for the header GitHub link */
  githubUrl: 'https://github.com/jaanuslille',
  /** Public URL to your CV PDF */
  cvUrl: '/cv.pdf',
  /** Where the contact form POSTs (PHP handler next to index.html on your host) */
  contactEndpoint: '/contact.php',
  /** Contact email (used in copy only; delivery is configured in public/mail_config.php on the server) */
  email: 'you@jaanuslille.eu', 
  /** LinkedIn profile URL */
  linkedinUrl: 'https://www.linkedin.com/in/jaanus-lille/',
} as const

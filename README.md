# Jaanus Lille Portfolio

Personal portfolio website for `jaanuslille.eu`, built with React, TypeScript, and Vite.

The site presents a short introduction, selected projects, core skills, a CV, and a contact form powered by FormSubmit.

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- ESLint

## Features

- Responsive single-page portfolio layout
- Hero section with personal intro and portrait
- Project cards with GitHub repository links
- Skills overview grouped by category
- CV view link
- Contact form using a standard HTML POST to FormSubmit
- Basic SEO and social sharing metadata

## Getting Started

### Prerequisites

- Node.js
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

## Project Structure

```text
src/
  components/    Reusable UI sections such as Hero, Projects, Skills, Contact, Header, Footer
  config/        Site-wide personal and contact data
  App.tsx        Main page composition
  main.tsx       App entry point
public/
  cv/            CV PDF
  project-previews/  Optional project images
  favicon.svg    Site favicon
```

## Customization

Most personal content is configured in `src/config/site.ts`.

This includes:

- name
- role
- tagline
- intro text
- GitHub link
- LinkedIn link
- CV path
- contact email and FormSubmit endpoint

Project content is defined directly in `src/components/Projects.tsx`.

## Contact Form

The contact form uses FormSubmit with a normal HTML `POST` request. This keeps the form simple and does not require a backend for this portfolio site.

Before deploying, make sure the values in `src/config/site.ts` point to the correct email address:

```ts
contactEndpoint: 'https://formsubmit.co/your-email@example.com'
email: 'your-email@example.com'
```

After the first live form submission, FormSubmit may ask you to confirm the receiving email address. Once confirmed, submit a second test message to verify delivery.

## Deployment

The site is intended to be published at [https://jaanuslille.eu](https://jaanuslille.eu).

Typical deployment flow:

1. Run `npm run build`.
2. Upload the contents of `dist/` to your hosting provider.
3. Verify that the portrait, CV, metadata, external links, and contact form all work on the live site.

## Notes

- Project preview images are optional. If an image is missing, the project card falls back to a placeholder preview.
- The site metadata includes a page title, description, canonical URL, Open Graph tags, and Twitter tags for better sharing and search presentation.

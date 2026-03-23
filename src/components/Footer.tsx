import { site } from '../config/site'
import './Footer.css'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__copy">
          {year} {site.name}. Built with care.
        </p>

        <nav className="site-footer__nav" aria-label="Footer">
          <a className="site-footer__link" href={site.githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="site-footer__link" href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  )
}

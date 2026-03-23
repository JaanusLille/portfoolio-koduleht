import { useEffect, useId, useState } from 'react'
import { site } from '../config/site'
import './Header.css'

type NavLink = {
  href: string
  label: string
  icon?: 'github' | 'linkedin'
  external?: boolean
}

const navLinks: NavLink[] = [
  { href: '#projects', label: 'Projects' },
  { href: '#cv', label: 'CV' },
  {
    href: site.githubUrl,
    label: 'GitHub',
    icon: 'github',
    external: true,
  },
  { href: '#linkedin', label: 'LinkedIn', icon: 'linkedin' },
  { href: '#contact', label: 'Contact' },
]

const wideNavMq = '(min-width: 769px)'

function LinkIcon({ icon }: { icon?: NavLink['icon'] }) {
  if (icon === 'github') {
    return (
      <svg
        className="site-header__link-icon"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
        width={20}
        height={20}
      >
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.93-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
      </svg>
    )
  }

  if (icon === 'linkedin') {
    return (
      <svg
        className="site-header__link-icon"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        width={20}
        height={20}
      >
        <path d="M20.5 2H3.5A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8.3 19H5.4V9.7h2.9V19ZM6.85 8.4a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM19 19h-2.9v-4.5c0-1.2-.4-2-1.5-2-.8 0-1.2.5-1.4 1-.1.2-.1.5-.1.8V19h-2.9V9.7h2.8V11c.4-.6 1.1-1.4 2.7-1.4 2 0 3.4 1.3 3.4 4V19Z" />
      </svg>
    )
  }

  return null
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [wideNav, setWideNav] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(wideNavMq).matches,
  )
  const menuId = useId()

  useEffect(() => {
    const mq = window.matchMedia(wideNavMq)
    const onChange = () => setWideNav(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const navInert = !wideNav && !menuOpen

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-header__logo" href="#top" aria-label={`${site.name}, home`}>
          {site.name}
        </a>

        <button
          type="button"
          className="site-header__menu-btn"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className="site-header__burger" data-open={menuOpen} aria-hidden="true" />
        </button>

        <nav
          className="site-header__nav"
          id={menuId}
          aria-label="Primary"
          data-open={menuOpen}
          inert={navInert}
        >
          <ul className="site-header__links">
            {navLinks.map(({ href, label, icon, external }) => (
              <li key={href}>
                <a
                  href={href}
                  className="site-header__link"
                  onClick={() => setMenuOpen(false)}
                  {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <LinkIcon icon={icon} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

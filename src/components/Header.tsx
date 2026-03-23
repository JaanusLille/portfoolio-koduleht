import { useEffect, useId, useState } from 'react'
import { site } from '../config/site'
import './Header.css'

type NavLink = {
  href: string
  label: string
  icon?: string
  external?: boolean
}

const navLinks: NavLink[] = [
  { href: '#projects', label: 'Projects' },
  { href: '#cv', label: 'CV' },
  {
    href: site.githubUrl,
    label: 'GitHub',
    icon: '/github.svg',
    external: true,
  },
  { href: '#linkedin', label: 'LinkedIn' },
  { href: '#contact', label: 'Contact' },
]

const wideNavMq = '(min-width: 769px)'

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
                  {icon ? (
                    <img
                      className="site-header__link-icon"
                      src={icon}
                      alt=""
                      width={20}
                      height={20}
                      decoding="async"
                    />
                  ) : null}
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

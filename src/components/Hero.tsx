import { site } from '../config/site'
import './Hero.css'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">{site.role}</p>
          <h1 id="hero-heading" className="hero__title">
            {site.tagline}
          </h1>
          <p className="hero__lede">{site.intro}</p>
          <div className="hero__actions">
            <a className="hero__btn hero__btn--primary" href="#projects">
              View projects
            </a>
            <a className="hero__btn hero__btn--ghost" href="#contact">
              Get in touch
            </a>
          </div>
        </div>
        <div className="hero__photo-wrap">
          <img className="hero__photo" src="/miisu.jpg" alt="Profile portrait" />
        </div>
      </div>
    </section>
  )
}

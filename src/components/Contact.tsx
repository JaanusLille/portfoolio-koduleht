import { useId } from 'react'
import type { FormEvent } from 'react'
import { site } from '../config/site'
import './Contact.css'

export function Contact() {
  const formId = useId()
  const nameId = `${formId}-name`
  const emailId = `${formId}-email`
  const messageId = `${formId}-message`

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const fromEmail = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    const subject = `Portfolio inquiry from ${name || 'a visitor'}`
    const body = [
      message || '(no message provided)',
      '',
      '—',
      `From: ${name || 'Visitor'}`,
      `Email: ${fromEmail || 'N/A'}`,
    ].join('\n')

    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailto
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-heading">
      <div className="contact__inner">
        <header className="contact__header">
          <p className="contact__eyebrow">CV + Contact</p>
          <h2 id="contact-heading" className="contact__title">
            Let's work together
          </h2>
          <p className="contact__lede">
            Download my CV and send me a message. 
          </p>
        </header>

        <div className="contact__grid">
          <article className="contact-card" id="cv" aria-labelledby="cv-heading">
            <h3 className="contact-card__title" id="cv-heading">
              Curriculum Vitae
            </h3>
            <p className="contact-card__text">
              A concise overview of my background, projects, and technical strengths.
            </p>
            <a
              className="contact-card__btn contact-card__btn--primary"
              href={site.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV
            </a>
          </article>

          <article className="contact-card" aria-labelledby="contact-form-heading">
            <h3 className="contact-card__title" id="contact-form-heading">
              Send a message
            </h3>

            <form className="contact-form" onSubmit={onSubmit}>
              <div className="contact-form__row">
                <label className="contact-form__label" htmlFor={nameId}>
                  Your name
                </label>
                <input
                  className="contact-form__input"
                  id={nameId}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="contact-form__row">
                <label className="contact-form__label" htmlFor={emailId}>
                  Your email
                </label>
                <input
                  className="contact-form__input"
                  id={emailId}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="contact-form__row">
                <label className="contact-form__label" htmlFor={messageId}>
                  Message
                </label>
                <textarea
                  className="contact-form__textarea"
                  id={messageId}
                  name="message"
                  rows={5}
                  required
                />
              </div>

              <button className="contact-card__btn contact-card__btn--primary contact-form__submit" type="submit">
                Send email
              </button>

              <p className="contact-form__helper">
                If the email client doesn’t open automatically, use{' '}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            </form>
          </article>
        </div>
      </div>
    </section>
  )
}

import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { site } from '../config/site'
import './Contact.css'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export function Contact() {
  const formId = useId()
  const nameId = `${formId}-name`
  const emailId = `${formId}-email`
  const messageId = `${formId}-message`
  const hpId = `${formId}-company`
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    setStatus('sending')
    setErrorMessage(null)

    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const company = String(data.get('company') ?? '').trim()

    try {
      const res = await fetch(site.contactEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message, company }),
      })

      let body: unknown = null
      try {
        body = await res.json()
      } catch {
        body = null
      }

      const parsed = body as { ok?: boolean; error?: string } | null

      if (!res.ok || !parsed?.ok) {
        const msg =
          typeof parsed?.error === 'string' && parsed.error.length > 0
            ? parsed.error
            : 'Could not send your message. Please try again.'
        setErrorMessage(msg)
        setStatus('error')
        return
      }

      setStatus('success')
      form.reset()
    } catch {
      setErrorMessage(
        'Could not reach the server. If you are running the site locally, the contact form only works after deployment with PHP configured.',
      )
      setStatus('error')
    }
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
            Download my CV and send a message. Messages are delivered to {site.email}.
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

            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <div className="contact-form__hp" aria-hidden="true">
                <label htmlFor={hpId}>Company</label>
                <input id={hpId} name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

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

              <button
                className="contact-card__btn contact-card__btn--primary contact-form__submit"
                type="submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>

              {status === 'success' ? (
                <p className="contact-form__status contact-form__status--success" role="status">
                  Thanks - your message was sent.
                </p>
              ) : null}

              {status === 'error' && errorMessage ? (
                <p className="contact-form__status contact-form__status--error" role="alert">
                  {errorMessage}
                </p>
              ) : null}
            </form>
          </article>
        </div>
      </div>
    </section>
  )
}

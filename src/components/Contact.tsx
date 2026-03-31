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
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    setStatus('sending')
    setErrorMessage(null)

    const payload = new FormData()
    payload.append('name', name)
    payload.append('email', email)
    payload.append('message', message)
    payload.append('_subject', `Portfolio inquiry from ${name || 'a visitor'}`)
    payload.append('_honey', String(data.get('company') ?? '').trim())
    payload.append('_captcha', 'false')

    try {
      const res = await fetch(site.contactEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: payload,
      })

      // Guard against non-JSON or empty responses so parsing failures do not break submission flow.
      const body: unknown = await res.json().catch(() => null)
      const parsed =
        body && typeof body === 'object'
          ? (body as { success?: boolean | string; message?: string; error?: string })
          : null

      // Guard against providers that report success in different shapes (boolean flag or message text).
      const ok = Boolean(
        res.ok &&
          (parsed?.success === true ||
            parsed?.success === 'true' ||
            (typeof parsed?.message === 'string' && parsed.message.length > 0)),
      )

      if (!ok) {
        // Guard against missing or inconsistent error payloads by falling back to a safe generic message.
        const msg =
          typeof parsed?.error === 'string'
            ? parsed.error
            : typeof parsed?.message === 'string'
              ? parsed.message
              : 'Could not send your message. Please try again.'
        setErrorMessage(msg)
        setStatus('error')
        return
      }

      setStatus('success')
      form.reset()
    } catch {
      // Guard against transport/runtime failures (network down, blocked request, CORS, etc.).
      setErrorMessage('Could not send your message right now. Please try again in a moment.')
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
            View my CV and send me a message.
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
              View CV
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
                {status === 'sending' ? 'Sending...' : 'Send message'}
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

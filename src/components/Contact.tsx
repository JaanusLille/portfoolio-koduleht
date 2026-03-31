import { useId } from 'react'
import { site } from '../config/site'
import './Contact.css'

export function Contact() {
  const formId = useId()
  const nameId = `${formId}-name`
  const emailId = `${formId}-email`
  const messageId = `${formId}-message`
  const hpId = `${formId}-company`

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

            <form className="contact-form" action={site.contactEndpoint} method="POST">
              <div className="contact-form__hp" aria-hidden="true">
                <label htmlFor={hpId}>Company</label>
                <input id={hpId} name="_honey" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <input type="hidden" name="_subject" value="Portfolio inquiry" />

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
              >
                Send message
              </button>
            </form>
          </article>
        </div>
      </div>
    </section>
  )
}

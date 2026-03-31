import { useState } from 'react'
import './SectionCardShared.css'
import './Projects.css'

type Project = {
  title: string
  summary: string
  stack: string[]
  codeUrl: string
  liveUrl?: string
  imageUrl: string
  imageAlt: string
}

const projects: Project[] = [
  {
    title: 'Wolfram Electronics',
    summary: 
      'Wolfram Electronics is a comprehensive modern full-stack e-commerce platform, specially designed for selling you all the electronics that you did not know you needed. \nThis application provides you with a complete shopping experience with user authentication, product browsing, faceted search and shopping cart functionality.',
    stack: ['Java', 'Spring Boot', 'TypeScript', 'React.js', 'Vite', 'PostgreSQL', 'Docker', 'JWT auth', 'OAuth2', 'TOTP 2FA', 'Nginx', 'RabbitMQ', 'Stripe', 'Playwright'],
    codeUrl: 'https://github.com/JaanusLille/i-love-shopping3',
    imageUrl: '/project-previews/wolfram.png',
    imageAlt: 'Preview of Wolfram Electronics',
  },
  {
    // JavaScript XML
    title: 'Match-Me ',
    summary:
      'Match-Me is a social matching platform designed to help people connect based on shared interests, personal preferences, and location. Users can discover compatible matches, manage connections, and chat in real time through an interactive, responsive interface.',
    stack: ['Java', 'Spring Boot', 'JavaScript (JSX)', 'React.js', 'Vite', 'PostgreSQL', 'Docker', 'Hibernate', 'JWT auth', 'WebSocket', 'Axios', 'PostGIS'],
    codeUrl: 'https://github.com/JaanusLille/match-me',
    imageUrl: '/project-previews/match-me.png',
    imageAlt: 'Preview of Match-Me Web ',
  },
  {
    title: 'Sumo Arena: Ultimate Showdown',
    summary:
      'Sumo Arena: Ultimate Showdown is a real-time multiplayer and single-player browser game. The game uses a custom DOM-based rendering approach instead of a canvas or frontend framework, with a strong focus on smooth performance, responsive controls, and real-time state synchronization between players. ',
    stack: ['TypeScript', 'Vite', 'HTML', 'CSS', 'Node.js', 'TSX', 'Nodemon', 'Socket.IO'],
    codeUrl: 'https://github.com/JaanusLille/web-game',
    imageUrl: '/project-previews/web-game.png',
    imageAlt: 'Preview of Web-Game',
  },
    {
    title: 'Racetrack',
    summary:
      'This project is a real-time racetrack management system designed to support race officials, drivers, and spectators during live events. \nIt handles session control, lap time tracking, leaderboard updates, and race status displays across multiple dedicated screens. \nUsing a JSON file-based data storage, the system is built to keep race information accurate, visible, and synchronized throughout the event, while also preserving session data between restarts.',
    stack: ['React', 'Node.js', 'Express', 'Socket.IO', 'dotenv', 'CORS', 'Nodemon'],
    codeUrl: 'https://github.com/JaanusLille/racetrack',
    imageUrl: '/project-previews/racetrack.png',
    imageAlt: 'Preview of Racetrack',
  },
]

function ProjectPreview({ project }: { project: Project }) {
  const [hasImageError, setHasImageError] = useState(false)

  if (!hasImageError) {
    return (
      <img
        className="project-card__image"
        src={project.imageUrl}
        alt={project.imageAlt}
        loading="lazy"
        onError={() => setHasImageError(true)}
      />
    )
  }

  return (
    <div className="project-card__placeholder" aria-hidden="true">
      <div className="project-card__placeholder-bar" />
      <div className="project-card__placeholder-screen">
        <span className="project-card__placeholder-chip">Preview</span>
        <strong className="project-card__placeholder-title">{project.title}</strong>
      </div>
    </div>
  )
}

export function Projects() {
  return (
    <section className="projects" id="projects" aria-labelledby="projects-heading">
      <div className="projects__inner">
        <header className="projects__header">
          <p className="projects__eyebrow">Selected Work</p>
          <h2 id="projects-heading" className="projects__title">
            Projects
          </h2>
          <p className="projects__lede">
            A few projects that show how I design, build, and ship practical user experiences.
          </p>
        </header>

        <div className="projects__grid">
          {projects.map((project) => (
            <article key={project.title} className="project-card section-card">
              <div className="project-card__media">
                <ProjectPreview project={project} />
              </div>

              <div className="project-card__content">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__summary">{project.summary}</p>

                <ul className="project-card__stack" aria-label={`${project.title} tech stack`}>
                  {project.stack.map((tech) => (
                    <li key={tech} className="project-card__tag section-pill">
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="project-card__actions">
                  <a
                    className="project-card__link"
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Code
                  </a>
                  {project.liveUrl ? (
                    <a
                      className="project-card__link project-card__link--primary"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

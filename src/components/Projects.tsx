import './Projects.css'

type Project = {
  title: string
  summary: string
  stack: string[]
  codeUrl: string
  liveUrl?: string
}

const projects: Project[] = [
  // {
  //   title: 'Portfolio website',
  //   summary:
  //     'A modern single-page portfolio focused on performance, accessibility, and a clean visual identity.',
  //   stack: ['React', 'TypeScript', 'CSS'],
  //   codeUrl: 'https://github.com/YOUR_USERNAME/portfolio',
  //   liveUrl: 'https://your-portfolio.example',
  // },
  // {
  //   title: 'Task manager app',
  //   summary:
  //     'A productivity app with filtering, keyboard-friendly interactions, and responsive layouts for daily planning.',
  //   stack: ['React', 'TypeScript', 'Vite'],
  //   codeUrl: 'https://github.com/YOUR_USERNAME/task-manager',
  //   liveUrl: 'https://task-manager.example',
  // },
  // {
  //   title: 'Weather dashboard',
  //   summary:
  //     'A weather interface that combines current conditions and forecast data with clear, glanceable UI states.',
  //   stack: ['React', 'REST API', 'CSS Grid'],
  //   codeUrl: 'https://github.com/YOUR_USERNAME/weather-dashboard',
  // },
]

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
            <article key={project.title} className="project-card">
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__summary">{project.summary}</p>

              <ul className="project-card__stack" aria-label={`${project.title} tech stack`}>
                {project.stack.map((tech) => (
                  <li key={tech} className="project-card__tag">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

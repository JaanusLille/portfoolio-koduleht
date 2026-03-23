import './Projects.css'

type Project = {
  title: string
  summary: string
  stack: string[]
  codeUrl: string
  liveUrl?: string
}

const projects: Project[] = [

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

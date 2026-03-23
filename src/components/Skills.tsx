import './Skills.css'

type SkillGroup = {
  title: string
  items: string[]
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Programming languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL', 'C', 'C#', 'Go'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Angular', 'Vue', 'Bootstrap'],
  },
  {
    title: 'Backend',
    items: ['Spring Boot', 'Node.js', 'Express.js', 'Hibernate'],
  },
  {
    title: 'Tools & DevOps',
    items: ['Git', 'Github', 'Docker', 'NPM', 'CI/CD'],
  },
  {
    title: 'Data & Database Technologies',
    items: ['PostgreSQL', 'MySQL', 'MariaDB', 'Pandas', 'NumPy', 'RabbitMQ'],
  },
]

export function Skills() {
  return (
    <section className="skills" id="skills" aria-labelledby="skills-heading">
      <div className="skills__inner">
        <header className="skills__header">
          <p className="skills__eyebrow">Core Skills</p>
          <h2 id="skills-heading" className="skills__title">
            Skills
          </h2>
          <p className="skills__lede">
            Technologies and practices I use to build reliable, user-focused products.
          </p>
        </header>

        <div className="skills__grid">
          {skillGroups.map((group) => (
            <article key={group.title} className="skills-card">
              <h3 className="skills-card__title">{group.title}</h3>
              <ul className="skills-card__list">
                {group.items.map((item) => (
                  <li key={item} className="skills-card__item">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

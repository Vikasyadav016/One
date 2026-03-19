import type { Template } from '../types'

type LandingProps = {
  filteredTemplates: Template[]
  filterRole: string
  filterLevel: string
  setFilterRole: (value: 'All' | 'Developer' | 'Designer' | 'Product' | 'Manager') => void
  setFilterLevel: (value: 'All' | 'Junior' | 'Mid' | 'Senior') => void
  setSelectedTemplateId: (id: string) => void
  setView: (view: 'template' | 'flow') => void
}

export default function Landing({
  filteredTemplates,
  filterRole,
  filterLevel,
  setFilterRole,
  setFilterLevel,
  setSelectedTemplateId,
  setView
}: LandingProps) {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <h1>Resume Maker & Analyzer</h1>
          <p>Build, analyze and export professional resumes with AI-backed insights.</p>
          <button onClick={() => setView('flow')}>Start Now</button>
        </div>
        <div className="hero-cta">100% responsive · ATS ready · PDF & DOCX</div>
      </section>

      <section className="filters">
        <label>
          Role
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value as any)}>
            <option>All</option>
            <option>Developer</option>
            <option>Designer</option>
            <option>Product</option>
            <option>Manager</option>
          </select>
        </label>
        <label>
          Experience
          <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value as any)}>
            <option>All</option>
            <option>Junior</option>
            <option>Mid</option>
            <option>Senior</option>
          </select>
        </label>
      </section>

      <section className="template-grid">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="template-card"
            onClick={() => {
              setSelectedTemplateId(template.id)
              setView('template')
            }}
          >
            <img src={template.image} alt={template.name} />
            <div className="template-meta">
              <h3>{template.name}</h3>
              <p>{template.description}</p>
              <small>
                {template.level} · {template.role} · {template.price}
              </small>
              <button>Use Template</button>
            </div>
          </div>
        ))}
        {filteredTemplates.length === 0 && <p>No templates match filters.</p>}
      </section>
    </>
  )
}

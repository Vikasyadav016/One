import type { Template } from '../types'

type TemplateDetailsProps = {
  selectedTemplate: Template
  setView: (view: 'flow' | 'landing') => void
}

export default function TemplateDetails({ selectedTemplate, setView }: TemplateDetailsProps) {
  return (
    <section className="template-details">
      <div className="split left">
        <img src={selectedTemplate.image} alt={selectedTemplate.name} />
        <h2>{selectedTemplate.name}</h2>
        <p>{selectedTemplate.description}</p>
        <ul>
          {selectedTemplate.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className="split right">
        <div className="sticky-box">
          <h3>Pricing</h3>
          <p>{selectedTemplate.price}</p>
          <h4>Includes</h4>
          <ul>
            <li>Live preview</li>
            <li>Editable sections</li>
            <li>AI suggestions</li>
          </ul>
          <button onClick={() => setView('flow')}>Continue</button>
        </div>
      </div>
    </section>
  )
}

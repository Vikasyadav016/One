import type { ResumeModel, Analysis } from '../types'

type ResumeFlowProps = {
  resume: ResumeModel
  setResume: (resume: ResumeModel) => void
  step: number
  setStep: (value: number) => void
  uploadState: { uploading: boolean }
  parseFile: (file: File) => Promise<void>
  applyAISuggestions: () => void
  analysis: Analysis
  editMode: 'edit' | 'preview'
  setEditMode: (mode: 'edit' | 'preview') => void
  activeSection: 'personal' | 'education' | 'experience' | 'skills' | 'projects'
  setActiveSection: (section: 'personal' | 'education' | 'experience' | 'skills' | 'projects') => void
  handleExportPDF: () => void
  handleExportDOCX: () => void
  shareableLink: () => void
  saveCurrent: () => void
  addEducation: () => void
  addExperience: () => void
  addProject: () => void
}

export default function ResumeFlow({
  resume,
  setResume,
  step,
  setStep,
  uploadState,
  parseFile,
  applyAISuggestions,
  analysis,
  editMode,
  setEditMode,
  activeSection,
  setActiveSection,
  handleExportPDF,
  handleExportDOCX,
  shareableLink,
  saveCurrent,
  addEducation,
  addExperience,
  addProject
}: ResumeFlowProps) {
  return (
    <section className="flow">
      <h2>Resume creation</h2>
      <div className="stepper">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`step ${step === s ? 'active' : step > s ? 'complete' : ''}`}>
            <span>{s}</span>
            <p>{s === 1 ? 'Upload' : s === 2 ? 'Manual' : 'Preview'}</p>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="card upload-area" onDrop={(e) => { e.preventDefault(); const file = e.dataTransfer.files[0]; if (file) parseFile(file) }} onDragOver={(e) => e.preventDefault()}>
          <h3>Upload resume file</h3>
          <p>Drag & drop a .txt or .md file with your resume data.</p>
          <input type="file" accept=".txt,.md" onChange={(e) => e.target.files && parseFile(e.target.files[0])} />
          {uploadState.uploading && <p>Parsing...</p>}
          <button onClick={() => setStep(2)}>Next: Manual Build</button>
        </div>
      )}

      {step === 2 && (
        <div className="card manual-form">
          <h3>Manual resume builder</h3>
          <div className="form-grid">
            <label>Full Name<input value={resume.personal.fullName} onChange={(e) => setResume({ ...resume, personal: { ...resume.personal, fullName: e.target.value } })} /></label>
            <label>Title<input value={resume.personal.title} onChange={(e) => setResume({ ...resume, personal: { ...resume.personal, title: e.target.value } })} /></label>
            <label>Email<input type="email" value={resume.personal.email} onChange={(e) => setResume({ ...resume, personal: { ...resume.personal, email: e.target.value } })} /></label>
            <label>Phone<input value={resume.personal.phone} onChange={(e) => setResume({ ...resume, personal: { ...resume.personal, phone: e.target.value } })} /></label>
            <label>Location<input value={resume.personal.location} onChange={(e) => setResume({ ...resume, personal: { ...resume.personal, location: e.target.value } })} /></label>
            <label>Summary<textarea value={resume.personal.summary} onChange={(e) => setResume({ ...resume, personal: { ...resume.personal, summary: e.target.value } })} /></label>
          </div>

          <div className="section-controls">
            <button onClick={addEducation}>+ Add education</button>
            <button onClick={addExperience}>+ Add experience</button>
            <button onClick={addProject}>+ Add project</button>
          </div>

          <div className="small-panels">
            <section>
              <h4>Education</h4>
              {resume.education.map((edu, idx) => (
                <div key={idx} className="mini-card">
                  <input placeholder="School" value={edu.school} onChange={(e) => { const eduNew = [...resume.education]; eduNew[idx].school = e.target.value; setResume({ ...resume, education: eduNew }) }} />
                  <input placeholder="Degree" value={edu.degree} onChange={(e) => { const eduNew = [...resume.education]; eduNew[idx].degree = e.target.value; setResume({ ...resume, education: eduNew }) }} />
                  <input placeholder="From" value={edu.from} onChange={(e) => { const eduNew = [...resume.education]; eduNew[idx].from = e.target.value; setResume({ ...resume, education: eduNew }) }} />
                  <input placeholder="To" value={edu.to} onChange={(e) => { const eduNew = [...resume.education]; eduNew[idx].to = e.target.value; setResume({ ...resume, education: eduNew }) }} />
                  <textarea placeholder="Description" value={edu.description} onChange={(e) => { const eduNew = [...resume.education]; eduNew[idx].description = e.target.value; setResume({ ...resume, education: eduNew }) }} />
                </div>
              ))}
            </section>
            <section>
              <h4>Experience</h4>
              {resume.experience.map((exp, idx) => (
                <div key={idx} className="mini-card">
                  <input placeholder="Company" value={exp.company} onChange={(e) => { const eNew = [...resume.experience]; eNew[idx].company = e.target.value; setResume({ ...resume, experience: eNew }) }} />
                  <input placeholder="Position" value={exp.position} onChange={(e) => { const eNew = [...resume.experience]; eNew[idx].position = e.target.value; setResume({ ...resume, experience: eNew }) }} />
                  <input placeholder="From" value={exp.from} onChange={(e) => { const eNew = [...resume.experience]; eNew[idx].from = e.target.value; setResume({ ...resume, experience: eNew }) }} />
                  <input placeholder="To" value={exp.to} onChange={(e) => { const eNew = [...resume.experience]; eNew[idx].to = e.target.value; setResume({ ...resume, experience: eNew }) }} />
                  {exp.bullets.map((b, j) => (
                    <input key={j} placeholder={`Bullet ${j + 1}`} value={b} onChange={(e) => { const eNew = [...resume.experience]; eNew[idx].bullets[j] = e.target.value; setResume({ ...resume, experience: eNew }) }} />
                  ))}
                  <button onClick={() => { const eNew = [...resume.experience]; eNew[idx].bullets.push(''); setResume({ ...resume, experience: eNew }) }}>+ bullet</button>
                </div>
              ))}
            </section>
            <section>
              <h4>Skills</h4>
              <div className="tag-input">
                <input value={resume.skills.join(', ')} onChange={(e) => setResume({ ...resume, skills: e.target.value.split(',').map((s) => s.trim()) })} />
              </div>
              <h4>Projects</h4>
              {resume.projects.map((proj, idx) => (
                <div key={idx} className="mini-card">
                  <input placeholder="Project name" value={proj.name} onChange={(e) => { const p = [...resume.projects]; p[idx].name = e.target.value; setResume({ ...resume, projects: p }) }} />
                  <textarea placeholder="Description" value={proj.description} onChange={(e) => { const p = [...resume.projects]; p[idx].description = e.target.value; setResume({ ...resume, projects: p }) }} />
                  <input placeholder="Link" value={proj.link} onChange={(e) => { const p = [...resume.projects]; p[idx].link = e.target.value; setResume({ ...resume, projects: p }) }} />
                </div>
              ))}
            </section>
          </div>

          <div className="flow-controls">
            <button onClick={() => setStep(1)}>Back</button>
            <button onClick={() => setStep(3)}>Preview</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="card preview-panel">
          <div className="preview-header">
            <h3>Live preview</h3>
            <div className="btn-group">
              <button onClick={() => setEditMode(editMode === 'edit' ? 'preview' : 'edit')}>{editMode === 'edit' ? 'Preview' : 'Edit'}</button>
              <button onClick={applyAISuggestions}>AI Improve</button>
            </div>
          </div>
          <div className="analysis">
            <strong>ATS Score: {analysis.score}%</strong>
            <p>{analysis.insights.join('; ')}</p>
          </div>

          <div className="builder-inner">
            <aside className="side-nav">
              {(['personal', 'education', 'experience', 'skills', 'projects'] as const).map((section) => (
                <button key={section} className={activeSection === section ? 'active' : ''} onClick={() => setActiveSection(section)}>
                  {section}
                </button>
              ))}
            </aside>

            <article className="resume-preview">
              <h1>{resume.personal.fullName}</h1>
              <p>
                {resume.personal.title} · {resume.personal.email} · {resume.personal.phone} · {resume.personal.location}
              </p>
              <section>
                <h4>Summary</h4>
                <p>{resume.personal.summary}</p>
              </section>
              <section>
                <h4>Experience</h4>
                {resume.experience.map((exp, idx) => (
                  <div key={idx}>
                    <h5>
                      {exp.position} at {exp.company}
                    </h5>
                    <span>
                      {exp.from} - {exp.to}
                    </span>
                    <ul>{exp.bullets.map((b, i) => (<li key={i}>{b}</li>))}</ul>
                  </div>
                ))}
              </section>
              <section>
                <h4>Education</h4>
                {resume.education.map((edu, idx) => (
                  <div key={idx}>
                    <p>
                      <strong>{edu.degree}</strong>, {edu.school} ({edu.from}-{edu.to})
                    </p>
                    <p>{edu.description}</p>
                  </div>
                ))}
              </section>
              <section>
                <h4>Skills</h4>
                <div className="chips">{resume.skills.map((skill) => (<span key={skill}>{skill}</span>))}</div>
              </section>
              <section>
                <h4>Projects</h4>
                {resume.projects.map((proj, idx) => (
                  <div key={idx}>
                    <strong>{proj.name}</strong> {proj.link && (<a href={proj.link} target="_blank" rel="noreferrer">↗</a>)}
                    <p>{proj.description}</p>
                  </div>
                ))}
              </section>
            </article>
          </div>

          <div className="preview-actions">
            <button onClick={handleExportPDF}>Download PDF</button>
            <button onClick={handleExportDOCX}>Download DOCX</button>
            <button onClick={shareableLink}>Copy Share Link</button>
            <button onClick={saveCurrent}>Save to Dashboard</button>
          </div>
        </div>
      )}
    </section>
  )
}

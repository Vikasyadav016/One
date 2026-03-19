import type { ResumeModel, Template, User } from '../types'

type DashboardProps = {
  user: User | null
  templates: Template[]
  setView: (view: 'landing' | 'builder') => void
  setSelectedTemplateId: (id: string) => void
  setResume: (resume: ResumeModel) => void
  toast: (text: string) => void
  handleLogout: () => void
}

export default function Dashboard({ user, templates, setView, setSelectedTemplateId, setResume, toast, handleLogout }: DashboardProps) {
  const saved = JSON.parse(localStorage.getItem('savedResumes') || '[]') as Array<any>

  return (
    <div className="content">
      <h1>Dashboard</h1>
      <p>{saved.length} saved resumes. Last edited: {saved[0]?.updatedAt ?? 'N/A'}</p>
      <div className="dashboard-grid">
        {saved.map((item) => (
          <div key={item.id} className="card">
            <h3>{templates.find((t) => t.id === item.templateId)?.name || 'Template'}</h3>
            <p>{new Date(item.updatedAt).toLocaleString()}</p>
            <div className="actions">
              <button
                onClick={() => {
                  setResume(item.resume)
                  setSelectedTemplateId(item.templateId)
                  setView('builder')
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setSelectedTemplateId(item.templateId)
                  setResume(item.resume)
                  toast('Duplicate created in memory')
                }}
              >
                Duplicate
              </button>
              <button
                onClick={() => {
                  const filtered = saved.filter((s: any) => s.id !== item.id)
                  localStorage.setItem('savedResumes', JSON.stringify(filtered))
                  toast('Deleted')
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {saved.length === 0 && <p className="muted">No saved resumes yet. Create one now.</p>}
      </div>
      {!user && <button onClick={handleLogout}>Sign in to manage resumes</button>}
    </div>
  )
}

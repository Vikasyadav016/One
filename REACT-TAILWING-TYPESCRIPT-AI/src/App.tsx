import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import TemplateDetails from './components/TemplateDetails'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import ResumeFlow from './components/ResumeFlow'
import { templates, blankResume } from './data/templates'
import type { ResumeModel, User } from './types'

type View = 'landing' | 'template' | 'auth' | 'flow' | 'builder' | 'dashboard'

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>(() => (localStorage.getItem('mode') as 'light' | 'dark') || 'light')
  const [view, setView] = useState<View>('landing')
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('modern-freelancer')
  const [authView, setAuthView] = useState<'login' | 'signup'>('login')
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })
  const [resume, setResume] = useState<ResumeModel>(() => {
    const stored = localStorage.getItem('resume')
    return stored ? JSON.parse(stored) : blankResume
  })
  const [step, setStep] = useState<number>(1)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<string>('')
  const [filterRole, setFilterRole] = useState<'All' | 'Developer' | 'Designer' | 'Product' | 'Manager'>('All')
  const [filterLevel, setFilterLevel] = useState<'All' | 'Junior' | 'Mid' | 'Senior'>('All')
  const [analysis, setAnalysis] = useState<{ score: number; insights: string[] }>({ score: 68, insights: ['Add your domain-specific keywords', 'Increase experience description detail'] })
  const [editMode, setEditMode] = useState<'edit' | 'preview'>('edit')
  const [activeSection, setActiveSection] = useState<'personal' | 'education' | 'experience' | 'skills' | 'projects'>('personal')

  useEffect(() => {
    document.body.className = mode
    localStorage.setItem('mode', mode)
  }, [mode])

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  useEffect(() => {
    localStorage.setItem('resume', JSON.stringify(resume))
  }, [resume])

  const selectedTemplate = useMemo(() => templates.find((t) => t.id === selectedTemplateId) ?? templates[0], [selectedTemplateId])

  const filteredTemplates = useMemo(() => {
    return templates.filter((t) => (filterRole === 'All' ? true : t.role === filterRole) && (filterLevel === 'All' ? true : t.level === filterLevel))
  }, [filterRole, filterLevel])

  const toast = (text: string) => {
    setMessage(text)
    setTimeout(() => setMessage(''), 2100)
  }

  const parseFile = async (file: File) => {
    setUploading(true)
    const text = await file.text()
    const nameMatch = text.match(/Name:\s*(.+)/i)
    const emailMatch = text.match(/Email:\s*(.+)/i)
    const phoneMatch = text.match(/Phone:\s*(.+)/i)
    const skillsMatch = text.match(/Skills:\s*(.+)/i)
    setResume((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        fullName: nameMatch?.[1]?.trim() || prev.personal.fullName,
        email: emailMatch?.[1]?.trim() || prev.personal.email,
        phone: phoneMatch?.[1]?.trim() || prev.personal.phone
      },
      skills: skillsMatch ? skillsMatch[1].split(',').map((s) => s.trim()) : prev.skills
    }))
    setUploading(false)
    toast('Resume parsed and injected into the template')
  }

  const downloadFile = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const p = document.createElement('a')
    p.href = url
    p.download = filename
    p.click()
    URL.revokeObjectURL(url)
  }

  const handleExportPDF = () => {
    const content = `Resume: ${resume.personal.fullName}\n${resume.personal.title}\n${resume.personal.summary}\n\nExperience:\n${resume.experience.map((e) => `${e.company}: ${e.position}`).join('\n')}`
    downloadFile('resume.pdf', content, 'application/pdf')
    toast('PDF exported (text fallback)')
  }

  const handleExportDOCX = () => {
    const content = `Resume Maker Export\n\n${JSON.stringify(resume, null, 2)}`
    downloadFile('resume.docx', content, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    toast('DOCX exported (sample text file)')
  }

  const shareableLink = () => {
    const payload = encodeURIComponent(btoa(JSON.stringify({ resume, templateId: selectedTemplateId })))
    navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#share=${payload}`)
    toast('Shareable link copied to clipboard')
  }

  const applyAISuggestions = () => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((item) => ({
        ...item,
        bullets: item.bullets.map((b) => `${b} (improved as per AI suggestion)`)
      }))
    }))
    setAnalysis({ score: Math.min(100, analysis.score + 10), insights: ['Language polished with AI tone', 'Impact statements enhanced'] })
    toast('AI suggestions applied')
  }

  const addEducation = () => {
    setResume((prev) => ({
      ...prev,
      education: [...prev.education, { school: '', degree: '', from: '', to: '', description: '' }]
    }))
  }

  const addExperience = () => {
    setResume((prev) => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', from: '', to: '', bullets: [''] }]
    }))
  }

  const addProject = () => {
    setResume((prev) => ({
      ...prev,
      projects: [...prev.projects, { name: '', description: '', link: '' }]
    }))
  }

  const saveCurrent = () => {
    const saved = JSON.parse(localStorage.getItem('savedResumes') || '[]')
    const newSaved = [{ id: Date.now(), templateId: selectedTemplateId, updatedAt: new Date().toISOString(), resume }, ...saved]
    localStorage.setItem('savedResumes', JSON.stringify(newSaved))
    toast('Resume saved to dashboard')
  }

  const handleLogin = (name: string, email: string) => {
    setUser({ id: `${Date.now()}`, name, email })
    setView('landing')
    toast('Logged in successfully')
  }

  const handleLogout = () => {
    setUser(null)
    toast('Logged out')
    setView('landing')
  }

  if (view === 'auth') {
    return (
      <div className={`app-container ${mode}`}>
        <Navbar mode={mode} setMode={setMode} setView={setView} user={user} handleLogout={handleLogout} />
        <Auth
          authView={authView}
          setAuthView={setAuthView}
          setView={setView}
          onLogin={handleLogin}
          onSocial={() => {
            handleLogin('Google User', 'google@example.com')
            toast('Google social login successful')
          }}
        />
        {message && <div className="toast">{message}</div>}
      </div>
    )
  }

  if (view === 'dashboard') {
    return (
      <div className={`app-container ${mode}`}>
        <Navbar mode={mode} setMode={setMode} setView={setView} user={user} handleLogout={handleLogout} />
        <Dashboard
          user={user}
          templates={templates}
          setView={(nextView) => setView(nextView)}
          setSelectedTemplateId={setSelectedTemplateId}
          setResume={setResume}
          toast={toast}
          handleLogout={handleLogout}
        />
        {message && <div className="toast">{message}</div>}
      </div>
    )
  }

  return (
    <div className={`app-container ${mode}`}>
      <Navbar mode={mode} setMode={setMode} setView={setView} user={user} handleLogout={handleLogout} />

      {view === 'landing' && (
        <Landing
          filteredTemplates={filteredTemplates}
          filterRole={filterRole}
          filterLevel={filterLevel}
          setFilterRole={setFilterRole}
          setFilterLevel={setFilterLevel}
          setSelectedTemplateId={setSelectedTemplateId}
          setView={(next) => setView(next)}
        />
      )}

      {view === 'template' && <TemplateDetails selectedTemplate={selectedTemplate} setView={(next) => setView(next)} />}

      {view === 'flow' && (
        <ResumeFlow
          resume={resume}
          setResume={setResume}
          step={step}
          setStep={setStep}
          uploadState={{ uploading }}
          parseFile={parseFile}
          applyAISuggestions={applyAISuggestions}
          analysis={analysis}
          editMode={editMode}
          setEditMode={setEditMode}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          handleExportPDF={handleExportPDF}
          handleExportDOCX={handleExportDOCX}
          shareableLink={shareableLink}
          saveCurrent={saveCurrent}
          addEducation={addEducation}
          addExperience={addExperience}
          addProject={addProject}
        />
      )}

      {message && <div className="toast">{message}</div>}
    </div>
  )
}

export default App

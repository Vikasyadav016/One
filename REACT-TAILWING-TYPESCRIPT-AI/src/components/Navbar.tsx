import type { User } from '../types'

type NavbarProps = {
  mode: 'light' | 'dark'
  setMode: (mode: 'light' | 'dark') => void
  setView: (view: 'landing' | 'template' | 'auth' | 'flow' | 'builder' | 'dashboard') => void
  user: User | null
  handleLogout: () => void
}

export default function Navbar({ mode, setMode, setView, user, handleLogout }: NavbarProps) {
  return (
    <header className="navbar sticky">
      <div className="brand" onClick={() => setView('landing')}>
        Resume Maker & Analyzer
      </div>
      <div className="nav-actions">
        <button onClick={() => setView('landing')}>Home</button>
        <button onClick={() => setView('dashboard')}>Dashboard</button>
        <button onClick={() => setView('flow')}>Create</button>
        {user ? <span className="user">{user.name}</span> : <button onClick={() => setView('auth')}>Login</button>}
        <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>{mode === 'light' ? '🌙' : '☀️'}</button>
        {user && <button onClick={handleLogout}>Logout</button>}
      </div>
    </header>
  )
}

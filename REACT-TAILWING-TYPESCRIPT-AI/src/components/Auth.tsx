import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type AuthProps = {
  authView: 'login' | 'signup'
  setAuthView: (view: 'login' | 'signup') => void
  setView: (view: 'landing') => void
  onLogin: (name: string, email: string) => void
  onSocial: () => void
}

const authSchema = z.object({
  name: z.string().min(2, 'Name is required').optional(),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type AuthFormValues = z.infer<typeof authSchema>

export default function Auth({ authView, setAuthView, setView, onLogin, onSocial }: AuthProps) {
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: { name: '', email: '', password: '' }
  })

  const onSubmit = (values: AuthFormValues) => {
    if (authView === 'signup' && !values.name) {
      return setError('Name is required for signup')
    }
    setError('')
    onLogin(values.name || 'User', values.email)
    setView('landing')
  }

  return (
    <div className="app-container">
      <div className="auth-wrapper">
        <h2>{authView === 'login' ? 'Login' : 'Sign Up'}</h2>
        {error && <div className="alert">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          {authView === 'signup' && (
            <div>
              <input placeholder="Name" {...register('name')} />
              {errors.name && <small>{errors.name.message}</small>}
            </div>
          )}
          <div>
            <input placeholder="Email" type="email" {...register('email')} />
            {errors.email && <small>{errors.email.message}</small>}
          </div>
          <div>
            <input placeholder="Password" type="password" {...register('password')} />
            {errors.password && <small>{errors.password.message}</small>}
          </div>
          <button type="submit">{authView === 'login' ? 'Login' : 'Create Account'}</button>
        </form>
        <button className="social" onClick={onSocial} type="button">
          Continue with Google
        </button>
        <p className="link" onClick={() => setAuthView(authView === 'login' ? 'signup' : 'login')}>
          {authView === 'login' ? 'New? Sign Up' : 'Have account? Login'}
        </p>
        <p className="link" onClick={() => setView('landing')}>
          Back to app
        </p>
      </div>
    </div>
  )
}

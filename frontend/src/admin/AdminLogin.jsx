import { useState } from 'react'
import { adminLogin } from './adminAuth'
import { navigate } from '../components/Shared'
import './admin.css'

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password) {
      setError('Please provide both email and password.')
      return
    }
    setLoading(true)
    const result = await adminLogin(email, password)
    setLoading(false)

    if (result.success) {
      onLoginSuccess(result.user)
    } else {
      setError(result.message || 'Login failed. Please check your credentials.')
    }
  }

  const fillDemoCreds = async () => {
    setEmail('admin@nsolutions.com')
    setPassword('Admin@123')
    setError('')
    setLoading(true)
    const result = await adminLogin('admin@nsolutions.com', 'Admin@123')
    setLoading(false)
    if (result.success) {
      onLoginSuccess(result.user)
    }
  }

  return (
    <div className="adm-login-wrapper">
      <div className="adm-login-card">
        <div className="adm-brand-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
            <span className="brand-logo" style={{ font: "400 24px/1 Georgia,'Times New Roman',serif", minWidth: '155px', minHeight: '36px', padding: '3px 12px 5px' }}>N Solutions</span>
          </div>
          <div className="adm-logo-badge">
            <span className="dot" />
            <span>Admin Control Panel</span>
          </div>
          <h1>Admin Portal</h1>
          <p>Sign in to access project records and business operations</p>
        </div>

        {error && (
          <div className="adm-alert adm-alert-error" role="alert">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="adm-form-group">
            <label htmlFor="admin-email">Admin Email</label>
            <div className="adm-input-wrap">
              <span className="adm-input-icon">✉</span>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nsolutions.com"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="adm-form-group">
            <label htmlFor="admin-password">Password</label>
            <div className="adm-input-wrap">
              <span className="adm-input-icon">🔒</span>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="adm-btn-primary"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard →'}
          </button>
        </form>

        <div className="adm-demo-box">
          <div className="adm-demo-header">
            <span className="adm-demo-title">Default Admin Credentials</span>
            <button
              type="button"
              className="adm-demo-btn"
              onClick={fillDemoCreds}
            >
              1-Click Auto Login ⚡
            </button>
          </div>
          <div className="adm-demo-creds">
            <div>Email: <strong>admin@nsolutions.com</strong></div>
            <div>Pass: <strong>Admin@123</strong></div>
          </div>
        </div>

        <div className="adm-login-footer">
          <a
            href="/"
            className="adm-back-link"
            onClick={(e) => {
              e.preventDefault()
              navigate('/')
            }}
          >
            ← Return to Public Website
          </a>
        </div>
      </div>
    </div>
  )
}

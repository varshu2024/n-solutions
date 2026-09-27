import { useState } from 'react'
import { navigate } from '../components/Shared'
import './admin.css'

const API_BASE_URL = (
  import.meta.env?.VITE_API_BASE_URL || '/api'
).replace(/\/+$/, '')

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)

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

    try {
      const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          password
        })
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        setError(result.message || 'Unable to send OTP.')
        return
      }

      setOtpSent(true)
      setError('')
    } catch (error) {
      console.error('Send OTP error:', error)
      setError('Unable to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setError('')

    const enteredOtp = otp.trim()

    if (!enteredOtp) {
      setError('Please enter the OTP sent to your email.')
      return
    }

    if (!/^\d{6}$/.test(enteredOtp)) {
      setError('Please enter the 6-digit OTP.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          otp: enteredOtp
        })
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        setError(result.message || 'Invalid OTP.')
        return
      }

      localStorage.setItem(
        'nsolutions_admin_token',
        result.data.token
      )

      localStorage.setItem(
        'nsolutions_admin_user',
        JSON.stringify(result.data.admin)
      )

      onLoginSuccess(result.data.admin)
    } catch (error) {
      console.error('Verify OTP error:', error)
      setError('Unable to verify OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fillDemoCreds = async () => {
    setEmail('admin@nsolutions.com')
    setPassword('Admin@123')
    setError('')

    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'admin@nsolutions.com',
          password: 'Admin@123'
        })
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        setError(result.message || 'Unable to send OTP.')
        return
      }

      setOtpSent(true)
    } catch (error) {
      console.error('Demo OTP error:', error)
      setError('Unable to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="adm-login-wrapper">
      <div className="adm-login-card">
        <div className="adm-brand-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
            <span
              className="brand-logo"
              style={{
                font: "400 24px/1 Georgia,'Times New Roman',serif",
                minWidth: '155px',
                minHeight: '36px',
                padding: '3px 12px 5px'
              }}
            >
              N Solutions
            </span>
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

        {!otpSent ? (
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
              {loading ? 'Sending OTP...' : 'Send OTP →'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} noValidate>
            <div className="adm-form-group">
              <label htmlFor="admin-otp">Enter OTP</label>

              <div className="adm-input-wrap">
                <span className="adm-input-icon">🔐</span>

                <input
                  id="admin-otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '')
                    setOtp(value)
                  }}
                  placeholder="Enter 6-digit OTP"
                  autoComplete="one-time-code"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="adm-btn-primary"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP →'}
            </button>

            <button
              type="button"
              className="adm-demo-btn"
              style={{ width: '100%', marginTop: '12px' }}
              disabled={loading}
              onClick={() => {
                setOtpSent(false)
                setOtp('')
                setError('')
              }}
            >
              ← Change Email / Password
            </button>
          </form>
        )}

        {!otpSent && (
          <div className="adm-demo-box">
            <div className="adm-demo-header">
              <span className="adm-demo-title">
                Default Admin Credentials
              </span>

              <button
                type="button"
                className="adm-demo-btn"
                onClick={fillDemoCreds}
                disabled={loading}
              >
                1-Click Auto Login ⚡
              </button>
            </div>

            <div className="adm-demo-creds">
              <div>
                Email: <strong>admin@nsolutions.com</strong>
              </div>

              <div>
                Pass: <strong>Admin@123</strong>
              </div>
            </div>
          </div>
        )}

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

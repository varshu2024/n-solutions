const TOKEN_KEY = 'nsolutions_admin_token'
const USER_KEY = 'nsolutions_admin_user'

// Initial seed data so the dashboard is rich and fully interactive on day 1

export function getAuthAdmin() {
  try {
    const token = localStorage.getItem(TOKEN_KEY)

    if (!token) {
      return null
    }

    const userRaw = localStorage.getItem(USER_KEY)

    if (!userRaw) {
      return {
        name: 'Admin',
        email: '',
        role: 'admin'
      }
    }

    const admin = JSON.parse(userRaw)

    return admin || {
      name: 'Admin',
      email: '',
      role: 'admin'
    }
  } catch (e) {
    console.error('Failed to restore admin session:', e)
    return null
  }
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export const API_BASE_URL = (
  import.meta.env?.VITE_API_BASE_URL || '/api'
).replace(/\/+$/, '')

export async function adminLogin(email, password) {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      controller.abort()
    }, 8000)
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.trim(),
        password
      }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      return {
        success: false,
        message:
          result.message ||
          'Login failed. Please check your email and password.'
      }
    }

    if (!result.success || !result.data?.token) {
      return {
        success: false,
        message: result.message || 'Invalid login response from server.'
      }
    }

    const token = result.data.token

    const admin = result.data.admin || {
      name: 'Admin',
      email: email.trim().toLowerCase(),
      role: 'admin'
    }

    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(admin))

    return {
      success: true,
      user: admin,
      mode: 'api'
    }
  } catch (error) {
    console.error('Admin login request failed:', error)

    return {
      success: false,
      message:
        error.name === 'AbortError'
          ? 'Login request timed out. Please try again.'
          : 'Unable to connect to the authentication server.'
    }
  }
}

export function adminLogout() {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token && !token.startsWith('nsolutions_demo_')) {
    fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).catch(() => {})
  }
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

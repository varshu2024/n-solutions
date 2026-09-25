/**
 * API Client Utility
 * Centralized HTTP client for making API requests with authentication
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

/**
 * Get authentication token from localStorage
 */
function getAuthToken() {
  return localStorage.getItem('nsolutions_admin_token')
}

/**
 * Make an authenticated API request
 * @param {string} endpoint - API endpoint (e.g., '/leads', '/auth/login')
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} Response data
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const token = getAuthToken()

  const headers = {
    ...options.headers
  }

  // Add Authorization header if token exists and not already set
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`
  }

  // Add Content-Type header for JSON requests (unless it's FormData)
  if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  const config = {
    ...options,
    headers
  }
  console.log('API URL:', url)
console.log('Auth token exists:', !!token)
  try {
    const response = await fetch(url, config)
    
    // Handle different response types
    const contentType = response.headers.get('content-type')
    let data
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    } else {
      data = await response.text()
    }

    if (!response.ok) {
      // Return structured error
      return {
        success: false,
        status: response.status,
        message: data?.message || `HTTP ${response.status}: ${response.statusText}`,
        error: data
      }
    }

    return {
      success: true,
      status: response.status,
      data: data?.data || data,
      raw: data
    }
  } catch (error) {
    // Network error or request failed
    return {
      success: false,
      status: 0,
      message: error.message || 'Network request failed',
      error
    }
  }
}

/**
 * GET request
 */
export async function apiGet(endpoint) {
  return apiRequest(endpoint, { method: 'GET' })
}

/**
 * POST request
 */
export async function apiPost(endpoint, body) {
  return apiRequest(endpoint, {
    method: 'POST',
    body: body instanceof FormData ? body : JSON.stringify(body)
  })
}

/**
 * PUT request
 */
export async function apiPut(endpoint, body) {
  return apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body)
  })
}

/**
 * PATCH request
 */
export async function apiPatch(endpoint, body) {
  return apiRequest(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(body)
  })
}

/**
 * DELETE request
 */
export async function apiDelete(endpoint) {
  return apiRequest(endpoint, { method: 'DELETE' })
}

/**
 * Upload file with multipart/form-data
 */
export async function apiUpload(endpoint, formData) {
  return apiRequest(endpoint, {
    method: 'POST',
    body: formData
  })
}

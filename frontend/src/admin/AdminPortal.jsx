import { useState } from 'react'
import AdminLogin from './AdminLogin'
import AdminPanel from './AdminPanel'
import { getAuthAdmin } from './adminAuth'

export default function AdminPortal() {
  const [adminUser, setAdminUser] = useState(() => getAuthAdmin())

  const handleLoginSuccess = (user) => {
    setAdminUser(user)
  }

  const handleLogout = () => {
    setAdminUser(null)
  }

  if (!adminUser) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />
  }

  return <AdminPanel adminUser={adminUser} onLogout={handleLogout} />
}

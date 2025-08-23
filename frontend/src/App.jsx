// frontend/src/App.jsx
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ArticlePage from './pages/ArticlePage'
import AuthForm from './AuthForm'
import ProfilePage from './pages/ProfilePage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const logout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }
  useEffect(() => {
    if (localStorage.getItem('token')) setIsLoggedIn(true)
  }, [])

  const login = () => {
    setIsLoggedIn(true)
    // localStorage.setItem('token', res.data.access_token)
    // localStorage.setItem('username', res.data.username)
  }
  // If not logged in, show login form on all routes
  if (!isLoggedIn) {
    return (<AuthForm onLogin={login} />)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArticlePage logout={logout} />} />
        <Route path="/profile/:username" element={<ProfilePage logout={logout} />} />
        {/* Add more routes here later (settings, editor, etc.) */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>
  )
}

export default App

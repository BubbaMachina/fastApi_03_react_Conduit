// frontend/src/App.jsx
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import CreateArticlePage from './pages/CreateArticlePage'
import AuthForm from './AuthForm'
import Home from './pages/Home'
import ReadArticle from './pages/ReadArticle'

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

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/article/:articleId" element={<ReadArticle />} />

        {/* Protected Routes */}
        {isLoggedIn ? (
          <>
            <Route path="/create" element={<CreateArticlePage logout={logout} />} />
            <Route path="/dashboard" element={<Home logout={logout} />} />
          </>
        ) : (
          <>
            <Route path="/create" element={<Navigate to="/login" />} />
            <Route path="/dashboard" element={<Navigate to="/login" />} />
          </>
        )}

        {/* Authentication Route */}
        <Route path="/login" element={<AuthForm onLogin={login} />} />
      </Routes>
    </Router>
  )
}

export default App

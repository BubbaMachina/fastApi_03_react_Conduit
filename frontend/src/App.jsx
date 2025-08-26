// frontend/src/App.jsx
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import CreateArticle from './pages/articles/CreateArticle'
import Register from './pages/Register'
import Home from './pages/Home'
import ReadArticle from './pages/articles/ReadArticle'
import MainLayout from './Layouts/MainLayout'
import Login from './pages/Login'
import ListUserArticles from './pages/articles/ListUserArticles'
import EditArticle from './pages/articles/EditArticle'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
          <Route element={<MainLayout />}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/articles/:articleId" element={<ReadArticle />} />

            {/* Auth */}
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/create" element={isLoggedIn ? <CreateArticle /> : <Navigate to="/login" />} />
            <Route path="/articles/me" element={isLoggedIn ? <ListUserArticles /> : <Navigate to="/login" />} />
            <Route path="/articles/:articleId/edit" element={isLoggedIn ? <EditArticle /> : <Navigate to="/login" />} />
            
          </Route>
        </Routes>
      
    </Router>
  )
}

export default App

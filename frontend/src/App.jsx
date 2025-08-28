// frontend/src/App.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import CreateArticle from './pages/articles/CreateArticle'
import Register from './pages/Register'
import Home from './pages/Home'
import ReadArticle from './pages/articles/ReadArticle'
import MainLayout from './Layouts/MainLayout'
import Login from './pages/Login'
import ListUserArticles from './pages/articles/ListUserArticles'
import EditArticle from './pages/articles/EditArticle'
import FavoritedArticles from './pages/articles/FavoritedArticles'
import { Link, useNavigate } from 'react-router-dom'

// Create a General context that stores global variables for Authentication
// The provider will wrap the entire application, and send the variables and functions to children
// the consumer will be able to access the variables

export const AuthContext = createContext();

// This Provider wraps entire application
// Here we will store Bool: is User logged in, and functions to login/logout
// If we are  logged in, also keep the token
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Boolean
  const [token, setToken] = useState(null); // Token 
  const navigate = useNavigate();

  const getTokenFromStorage = async() => {
    var savedToken = null;
    savedToken = await localStorage.getItem('token');
    if (savedToken && (savedToken !== 'undefined'|| savedToken !== null)) {
      setToken(savedToken);
      console.log(`Token retrieved from storage ${savedToken}`);
    }
    setIsLoggedIn(!!savedToken);
    return savedToken;
  };

  // UseEffect is called once when the component mounts
  useEffect(() => {
    getTokenFromStorage
  }, []);

  const login = (newToken) => {
    setIsLoggedIn(true);
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setToken(null);
    navigate('/login', { replace: true })
  };



  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, token, setToken,logout, getTokenFromStorage }}>
      {children}
    </AuthContext.Provider>
  );
};


function App() {
  return (
    <Router>
    <AuthProvider>
      
        <Routes>
          <Route element={<MainLayout />}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/articles/:articleId" element={<ReadArticle />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/create" element={<CreateArticle />} />
            <Route path="/articles/me" element={<ListUserArticles />} />
            <Route path="/articles/:articleId/edit" element={<EditArticle />} />
            <Route path="/favorites" element={<FavoritedArticles />} />
          </Route>
        </Routes>
      
    </AuthProvider>
    </Router>
  );
}


export default App

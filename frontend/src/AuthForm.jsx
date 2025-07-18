import { useState } from 'react'
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
} from '@mui/material'
import axios from 'axios'

const API = 'http://localhost:8000'

function AuthForm({ onLogin }) {
  const [mode, setMode] = useState('login') // or 'register'
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [errors, setErrors] = useState({})


  const validate = () => {
    let newErrors = {}

    if (!form.username.trim()) {
      newErrors.username = 'Username is required'
    }

    if (mode === 'register') {
      if (!form.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = 'Invalid email format'
      }
    }

    if (!form.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 3) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!validate()) return
    console.log("validation was intially successfully")
    try {
      if (mode === 'register') {
        await axios.post(`${API}/auth/register`, form)
        setMode('login')
      } else {
        // This is login
        console.log("Login code called")
        const params = new URLSearchParams()
        params.append('username', form.username)
        params.append('password', form.password)
        const res = await axios.post(`${API}/auth/login`, params)
        localStorage.setItem('token', res.data.access_token)
        onLogin()
      }
    } catch (err) {
      alert(err.response?.data?.detail || 'Something went wrong')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          {mode === 'login' ? 'Login' : 'Register'}
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            name="username"
            label="Username"
            value={form.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          {mode === 'register' && (
            <TextField
              name="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          )}
          <TextField
            name="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button variant="contained" onClick={handleSubmit}>
            {mode === 'login' ? 'Login' : 'Register'}
          </Button>
          <Button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            Switch to {mode === 'login' ? 'Register' : 'Login'}
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default AuthForm

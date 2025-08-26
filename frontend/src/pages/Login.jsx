import { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = 'http://localhost:8000';

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      const params = new URLSearchParams();
      params.append('username', form.username);
      params.append('password', form.password);
      const res = await axios.post(`${API}/auth/login`, params);
      localStorage.setItem('token', res.data.access_token);
      onLogin();
      navigate('/'); // Redirect to homepage after successful login
    } catch (err) {
      const errorDetail = err.response?.data?.detail || 'Invalid credentials';
      setErrors({ ...errors, form: errorDetail });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Login
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
          <TextField
            name="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          {errors.form && (
            <Typography color="error" variant="body2">
              {errors.form}
            </Typography>
          )}
          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;

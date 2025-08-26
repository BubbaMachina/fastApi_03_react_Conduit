import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material'
const API_URL = 'http://localhost:8000'



function CreateArticle({logout}) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const token = localStorage.getItem('token')
const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

  const addArticle = async () => {
  if (!title.trim() || !body.trim()) return
  try {
    await axios.post(`${API_URL}/articles`, { title, body }, config)
    setTitle('')
    setBody('')
  } catch (err) {
    if (err.response?.status === 401) logout()
  }
}


  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Create New Article
      </Typography>

      <Box component="form" noValidate autoComplete="off" sx={{ mb: 4 }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addArticle}
          sx={{ mt: 2 }}
        >
          Submit Article
        </Button>
      </Box>
    </Container>
  )
}

export default CreateArticle

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert
} from '@mui/material'
const API_URL = 'http://localhost:8000'



function EditArticle() {
  const { articleId } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const token = localStorage.getItem('token')
const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

  useEffect(() => {
    // Fetch the article details to prefill the form
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`${API_URL}/articles/${articleId}`, config)
        setTitle(res.data.title)
        setBody(res.data.body)
      } catch (err) {
        console.error('Error fetching article:', err)
        if (err.response?.status === 401) navigate('/login')
      }
    }

    fetchArticle()
  }, [articleId, navigate])

  const updateArticle = async () => {
  if (!title.trim() || !body.trim()) return
  try {
    await axios.put(`${API_URL}/articles/${articleId}`, { title, body }, config)
    setSuccessMessage('Article updated successfully!')
    setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
    // navigate(`/articles/${articleId}`) // Redirect to the article page after update
  } catch (err) {
    console.error('Error updating article:', err)
    if (err.response?.status === 401) navigate('/login')
  }
}


  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Edit Article
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
          onClick={updateArticle}
          sx={{ mt: 2 }}
        >
          Update Article
        </Button>
      </Box>

      {successMessage && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {successMessage}
        </Alert>
      )}
    </Container>
  )
}

export default EditArticle

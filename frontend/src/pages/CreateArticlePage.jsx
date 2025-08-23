import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  Box,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Navbar from '../components/Navbar'
const API_URL = 'http://localhost:8000'



function CreateArticlePage({logout}) {
  const [articles, setArticles] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const token = localStorage.getItem('token')
const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

  const fetchArticles = async () => {
  try {
    const res = await axios.get(`${API_URL}/articles`, config)
    setArticles(res.data)
  } catch (err) {
    if (err.response?.status === 401) logout()  // token invalid
  }
}


  const addArticle = async () => {
  if (!title.trim() || !body.trim()) return
  try {
    await axios.post(`${API_URL}/articles`, { title, body }, config)
    setTitle('')
    setBody('')
    fetchArticles()
  } catch (err) {
    if (err.response?.status === 401) logout()
  }
}


  const deleteArticle = async (id) => {
  try {
    await axios.delete(`${API_URL}/articles/${id}`, config)
    fetchArticles()
  } catch (err) {
    if (err.response?.status === 403) {
      alert("You are not authorized to delete this article.")
    } else if (err.response?.status === 401) {
      logout()
    }
  }
}


  useEffect(() => {
    fetchArticles()
  }, [])

  return (<>
    <Navbar logout={logout}/>
    <Container maxWidth="md" sx={{ mt: 5 }}>
<Button variant="outlined" color="secondary" onClick={logout} sx={{ float: 'right' }}>
  Logout
</Button>
      <Typography variant="h4" gutterBottom>
        Conduit MVP - Articles
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

      <Grid container spacing={2}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} key={article.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{article.title}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                  }}
                >
                  {article.body}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  color="error"
                  onClick={() => deleteArticle(article.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  )
}

export default CreateArticlePage

import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
  Pagination
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000'



function ListUserArticles() {
  const [articles, setArticles] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const token = localStorage.getItem('token')
const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

  const fetchArticles = async (page = 1) => {
  try {
    const res = await axios.get(`${API_URL}/articles?page=${page}`, config)
    setArticles(res.data.articles)
    setTotalPages(res.data.totalPages)
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
    // Fetch the current user's articles from the backend API
    fetch(`${API_URL}/articles`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user articles');
        }
        return response.json();
      })
      .then((data) => setArticles(data))
      .catch((error) => console.error('Error fetching user articles:', error));
  }, [])

  const username = localStorage.getItem('username') || 'Your Name';

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        {`${username} - Articles`}
      </Typography>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '16px',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/create')}
        >
          Create Article
        </Button>
      </div>
      <div>
        {articles.map((article) => (
          <Card key={article.id} variant="outlined" sx={{ mb: 2 }}>
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
              <Button size="small" href={`/articles/${article.id}`} color="primary">
                Read More
              </Button>

              <Button size="small" color="secondary" onClick={() => navigate(`/articles/${article.id}/edit`)}>
                Edit
              </Button>
              <Button size="small" color="error" onClick={() => deleteArticle(article.id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  )
}

export default ListUserArticles

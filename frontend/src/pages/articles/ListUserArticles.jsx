import { useEffect, useState , useContext} from 'react'
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
import { Visibility, Edit, Delete } from '@mui/icons-material';
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import ArticleCard from '../../components/ArticleCard';

const API_URL = 'http://localhost:8000'



function ListUserArticles() {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn, token, setToken, logout, getTokenFromStorage } = useContext(AuthContext);


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


  useEffect( () => {
    // Fetch the current user's articles from the backend API

    if(!token){
      const storedToken = getTokenFromStorage();

      if (!storedToken) {
        console.error('No token available');
        logout(); // Redirect to login if no token
        return;
      }
    }

    console.log(`The token is ${token}`)
    fetch(`${API_URL}/articles`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
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
  }, [token])

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
          <ArticleCard
            key={article.id}
            article={article}
            isEdit={true}
            navigate={navigate}
            deleteArticle={deleteArticle}
          />
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

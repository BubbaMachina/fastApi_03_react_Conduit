import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Button,
} from '@mui/material';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export default function ReadArticle() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    // Fetch the article details from the backend
    axios
      .get(`${API_URL}/articles/${articleId}`, config)
      .then((response) => {
        setArticle(response.data);
        setIsFavorited(response.data.isFavorited || false); // Assuming backend sends this
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching article:', error);
        setLoading(false);
      });
  }, [articleId]);

  const toggleFavorite = async () => {
    try {
      if (isFavorited) {
        await axios.delete(`${API_URL}/articles/${articleId}/favorite`, config);
      } else {
        await axios.post(`${API_URL}/articles/${articleId}/favorite`, {}, config);
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!article) {
    return (
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h6" color="error">
          Article not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {article.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {article.body}
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              color="success"
              onClick={toggleFavorite}
              sx={{ borderColor: 'green', color: 'green' }}
            >
              {isFavorited ? 'Unfavorite' : 'Favorite'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)} // Navigate back to the previous page
            >
              Back
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
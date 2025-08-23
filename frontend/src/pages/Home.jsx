import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    // Fetch articles from the backend API
    fetch('http://localhost:8000/articles/all') // Update the URL if needed
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error('Error fetching articles:', error));
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Articles
      </Typography>
      {isLoggedIn && (
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
      )}
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
                {article.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" href={`/article/${article.id}`} color="primary">
                Read More
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </Container>
  );
}
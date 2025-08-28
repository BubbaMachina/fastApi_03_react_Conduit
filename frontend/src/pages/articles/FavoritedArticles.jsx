import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
  Pagination,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArticleCard from '../../components/ArticleCard';

const API_URL = 'http://localhost:8000';

export default function FavoritedArticles() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchFavoritedArticles = async (page = 1) => {
    try {
      const res = await axios.get(`${API_URL}/favorites?page=${page}`, config);
      setArticles(res.data.map(item => item.article));
      setTotalPages(res.data.totalPages);
      console.log(res.data);
    } catch (err) {
      console.error('Error fetching favorited articles:', err);
    }
  };

  useEffect(() => {
    fetchFavoritedArticles(page);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Favorited Articles
      </Typography>
      {console.log(articles)}
      {Array.isArray(articles) && articles.length > 0 ? (
        <>
          <div>
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                isEdit={false}
                navigate={navigate}
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
        </>
      ) : (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          You have no favorited articles.
        </Typography>
      )}
    </Container>
  );
}

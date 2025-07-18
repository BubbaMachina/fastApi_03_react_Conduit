// src/pages/ProfilePage.jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material'
import Navbar from '../components/Navbar'
const API_URL = 'http://localhost:8000'

function ProfilePage({logout}) {
  const { username } = useParams()
  const [profile, setProfile] = useState(null)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('token')

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_URL}/profiles/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setProfile(res.data)
    } catch (err) {
      console.error('Failed to load profile', err)
    }
  }

  const fetchArticles = async () => {
    try {
      const res = await axios.get(`${API_URL}/articles?author=${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setArticles(res.data)
    } catch (err) {
      console.error('Failed to load articles', err)
    }
  }

  const handleFollowToggle = async () => {
    try {
      if (profile.following) {
        await axios.delete(`${API_URL}/profiles/${username}/follow`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      } else {
        await axios.post(`${API_URL}/profiles/${username}/follow`, null, {
          headers: { Authorization: `Bearer ${token}` },
        })
      }
      fetchProfile()
    } catch (err) {
      console.error('Error toggling follow:', err)
    }
  }

  useEffect(() => {
    if (token) {
      Promise.all([fetchProfile(), fetchArticles()]).then(() => setLoading(false))
    }
  }, [username])

  if (loading) {
    return (
      <Container sx={{ mt: 5 }}>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <>
    
    <Navbar logout={logout}/>
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4">{profile.username}</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {profile.bio || 'This user has no bio.'}
      </Typography>

      <Button
        variant={profile.following ? 'outlined' : 'contained'}
        color="primary"
        onClick={handleFollowToggle}
        sx={{ mb: 4 }}
      >
        {profile.following ? 'Unfollow' : 'Follow'}
      </Button>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Articles by {profile.username}
      </Typography>

      <Grid container spacing={2}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} key={article.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{article.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3
                }}>
                  {article.body}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  )
}

export default ProfilePage

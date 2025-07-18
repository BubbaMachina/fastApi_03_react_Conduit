import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ logout }) => {
  const username = localStorage.getItem('username') || 'me'
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/') // Redirect to homepage
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          Conduit Clone
        </Typography>

        <Box>
          <Button color="inherit" component={Link} to={`/profile/${username}`}>
            Profile
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

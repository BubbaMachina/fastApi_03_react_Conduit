import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const username = localStorage.getItem('username')
  const navigate = useNavigate()
  const isLoggedIn = !!localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/') // Redirect to homepage
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure it stays above other elements
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          conduit
        </Typography>

        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          {isLoggedIn ? (
            <>
              <Button color="inherit" component={Link} to="/articles/me">
                Profile
              </Button>
              <Button color="inherit" component={Link} to="/favorites">
                Favorites
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Sign In
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

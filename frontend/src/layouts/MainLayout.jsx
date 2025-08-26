import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Container from "@mui/material/Container";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { Box, Typography } from '@mui/material';

function MainLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Banner />
      <Container sx={{ mt: 0 }}> {/* Added top margin to avoid overlap with fixed Navbar */}
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}

export default MainLayout;


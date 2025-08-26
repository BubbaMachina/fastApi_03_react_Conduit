import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Banner() {
  return (
    <Box
      sx={{
        mt: 8,
        backgroundColor: '#111f',
        color: 'white',
        height: '200px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage:
          'url(https://wallpapers.com/images/hd/beautiful-anime-scenery-rqei1dgtujp53zwn.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <Typography variant="h3" component="h1">
        Conduit
      </Typography>
    </Box>
  );
}

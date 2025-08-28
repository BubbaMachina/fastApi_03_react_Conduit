import React from 'react';
import { Box, Pagination, Typography } from '@mui/material';

const PaginatedList = ({
  items = [],
  renderItem,
  onPageChange,
  totalPages = 1,
  currentPage = 1,
  title = 'Items',
}) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>

      {/* Render the list of items */}
      <Box>
        {items.map((item, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            {renderItem(item)}
          </Box>
        ))}
      </Box>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={onPageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default PaginatedList;

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Circular() {
  return (
    <Box display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh">
      <CircularProgress   size={100} />
    </Box>
  );
}
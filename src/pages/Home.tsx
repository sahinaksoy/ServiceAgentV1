import { Box, Typography } from '@mui/material';
import { usePageTitle } from '../contexts/PageTitleContext';
import React from 'react';

const Home = () => {
  const { setTitle } = usePageTitle();

  React.useEffect(() => {
    setTitle('Ana Sayfa');
  }, [setTitle]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Ana Sayfa
      </Typography>
      <Typography>
        Hoş geldiniz! Ana sayfa içeriği burada yer alacak.
      </Typography>
    </Box>
  );
};

export default Home; 
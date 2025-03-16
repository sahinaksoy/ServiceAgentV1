import { Box, Typography } from '@mui/material';
import { usePageTitle } from '../contexts/PageTitleContext';
import React from 'react';

const Settings = () => {
  const { setTitle } = usePageTitle();

  React.useEffect(() => {
    setTitle('Ayarlar');
  }, [setTitle]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Ayarlar
      </Typography>
      <Typography>
        Sistem ayarları burada yer alacak.
      </Typography>
    </Box>
  );
};

export default Settings; 
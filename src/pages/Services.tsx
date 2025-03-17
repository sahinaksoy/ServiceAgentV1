import React, { useEffect } from 'react';
import { Box, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { usePageTitle } from '../contexts/PageTitleContext';

const Services: React.FC = () => {
  const { setTitle } = usePageTitle();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setTitle('Servisler');
  }, [setTitle]);

  return (
    <Box sx={{ 
      p: { xs: 1, sm: 2, md: 3 },
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Paper 
        elevation={isMobile ? 0 : 1}
        sx={{ 
          p: { xs: 2, sm: 3 },
          flex: 1,
          borderRadius: { xs: 0, sm: 1 }
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem' },
            mb: 2
          }}
        >
          Servisler
        </Typography>
        <Typography 
          variant="body1"
          sx={{ 
            color: 'text.secondary',
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          Bu sayfada servislerinizi görüntüleyebilir ve yönetebilirsiniz.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Services; 
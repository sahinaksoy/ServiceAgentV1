import React from 'react';
import { Box } from '@mui/material';

const Header: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <img 
        src="@logo-square.png" 
        alt="MESER Logo"
        style={{
          height: '40px',
          width: 'auto',
          marginLeft: '16px',
          objectFit: 'contain'
        }}
      />
    </Box>
  );
};

export default Header; 
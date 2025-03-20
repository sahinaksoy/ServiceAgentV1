import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const WorkOrderGeneralReport: React.FC = () => {
  return (
    <Box p={3}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          İş Emri Genel Rapor
        </Typography>
        {/* Rapor içeriği buraya eklenecek */}
      </Paper>
    </Box>
  );
};

export default WorkOrderGeneralReport; 
import { Box, Typography, Grid, Paper, useTheme } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { customerService } from '../../services/customerService';

export const Home = () => {
  const theme = useTheme();
  
  const { data: customers = [] } = useQuery({
    queryKey: ['customers'],
    queryFn: customerService.getAll,
  });

  const stats = {
    totalCustomers: customers.length,
    // Diğer istatistikler buraya eklenebilir
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Hoş Geldiniz
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: theme.palette.primary.main,
              color: 'white',
            }}
          >
            <PersonIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Toplam Müşteri</Typography>
            <Typography variant="h4">{stats.totalCustomers}</Typography>
          </Paper>
        </Grid>
        {/* Diğer istatistik kartları buraya eklenebilir */}
      </Grid>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Son Aktiviteler
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography variant="body1" color="text.secondary">
          Henüz aktivite bulunmuyor.
        </Typography>
      </Paper>
    </Box>
  );
}; 
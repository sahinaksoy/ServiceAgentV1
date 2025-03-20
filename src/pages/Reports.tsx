import { Box, Card, Grid, Typography, Paper, IconButton, Divider } from '@mui/material';
import { useEffect } from 'react';
import { usePageTitle } from '../contexts/PageTitleContext';
import {
  Assignment as WorkIcon,
  Store as StoreIcon,
  Engineering as TechnicianIcon,
  Memory as SystemIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';

const Reports = () => {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle('Raporlar');
  }, [setTitle]);

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* İş Emirleri Analizi */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              height: '100%',
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <WorkIcon sx={{ fontSize: 28, mr: 2, color: 'primary.main' }} />
              <Typography variant="h6" color="text.primary">İş Emirleri Analizi</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    mb: 1, 
                    fontWeight: 'bold',
                    color: 'text.primary' 
                  }}
                >
                  150
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Toplam İş Emri
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    mb: 1, 
                    fontWeight: 'bold',
                    color: '#4CAF50'
                  }}
                >
                  120
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tamamlanan
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    mb: 1, 
                    fontWeight: 'bold',
                    color: '#FFC107'
                  }}
                >
                  30
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bekleyen
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Mağaza Performansı */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              height: '100%',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StoreIcon sx={{ fontSize: 28, mr: 2, color: 'primary.main' }} />
                <Typography variant="h6">Mağaza Performansı</Typography>
              </Box>
              <IconButton size="small" sx={{ bgcolor: 'primary.light', color: 'white' }}>
                <TrendingUpIcon />
              </IconButton>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>En Aktif Mağaza</Typography>
              <Typography variant="h6">Ataşehir Migros</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>Toplam Mağaza</Typography>
              <Typography variant="h6">25</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Teknisyen Performansı */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              height: '100%',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TechnicianIcon sx={{ fontSize: 28, mr: 2, color: 'primary.main' }} />
              <Typography variant="h6">Teknisyen Performansı</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>Aktif Teknisyen</Typography>
                <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>8</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>Ort. Müdahale</Typography>
                <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>45<Typography component="span" variant="body2">dk</Typography></Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Sistem Durumu */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              height: '100%',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SystemIcon sx={{ fontSize: 28, mr: 2, color: 'primary.main' }} />
              <Typography variant="h6">Sistem Durumu</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>Çalışma Sıcaklığı</Typography>
                <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>22<Typography component="span" variant="body2">°C</Typography></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>Enerji Verimliliği</Typography>
                <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>85<Typography component="span" variant="body2">%</Typography></Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports; 
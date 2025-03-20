import { useState, useEffect } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  IconButton,
  Chip,
  Paper,
  Button,
  useTheme
} from '@mui/material';
import {
  Warning as WarningIcon,
  Thermostat as ThermostatIcon,
  Build as BuildIcon,
  Timer as TimerIcon,
  TrendingUp as TrendingUpIcon,
  Store as StoreIcon,
  Engineering as EngineeringIcon,
  CalendarMonth as CalendarIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../../contexts/PageTitleContext';

// Örnek veri yapısı
interface EmergencyCase {
  store: string;
  issue: string;
  severity: 'high' | 'medium' | 'low';
}

interface MaintenanceSchedule {
  date: string;
  store: string;
  type: string;
}

interface WorkOrder {
  store: string;
  issue: string;
  status: 'progress' | 'pending' | 'completed';
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle('Ana Sayfa');
  }, [setTitle]);

  // Örnek state yönetimi
  const [emergencyCases, setEmergencyCases] = useState<EmergencyCase[]>([
    { store: 'Ataşehir Migros', issue: 'Soğutma Arızası', severity: 'high' },
    { store: 'Kadıköy Migros', issue: 'Yüksek Sıcaklık', severity: 'high' },
    { store: 'Maltepe Migros', issue: 'Kompresör Arızası', severity: 'high' },
  ]);

  const [systemMetrics, setSystemMetrics] = useState({
    temperature: 75,
    efficiency: 85,
  });

  const [technicianStatus, setTechnicianStatus] = useState({
    active: 8,
    available: 4,
    onLeave: 2,
  });

  // Performans optimizasyonu için useEffect
  useEffect(() => {
    // Gerçek uygulamada burada API çağrıları yapılacak
    const fetchDashboardData = async () => {
      try {
        // API çağrıları buraya gelecek
        // const response = await api.getDashboardData();
        // setEmergencyCases(response.emergencyCases);
        // setSystemMetrics(response.metrics);
        // setTechnicianStatus(response.technicianStatus);
      } catch (error) {
        console.error('Dashboard verisi yüklenirken hata:', error);
      }
    };

    fetchDashboardData();
    
    // 5 dakikada bir güncelleme
    const interval = setInterval(fetchDashboardData, 300000);
    
    return () => clearInterval(interval);
  }, []);

  const theme = useTheme();

  const handleNavigation = (path: string) => {
    const element = document.querySelector('.dashboard-container');
    if (element) {
      element.classList.add('fade-out');
      setTimeout(() => {
        navigate(path);
      }, 300);
    }
  };

  return (
    <Box 
      className="dashboard-container"
      sx={{ 
        p: 3,
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'all 0.3s ease-in-out',
        '&.fade-out': {
          opacity: 0,
          transform: 'translateY(-20px)'
        }
      }}
    >
      <Grid container spacing={2.5}>
        {/* Acil Müdahale Kartı */}
        <Grid item xs={12} md={6} lg={3}>
          <Card 
            elevation={0}
            onClick={() => handleNavigation('/work-orders')}
            sx={{ 
              backgroundColor: '#fff',
              borderRadius: 3,
              border: '1px solid',
              borderColor: '#e0e0e0',
              minHeight: '240px',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              transform: 'translateY(0)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                borderColor: 'primary.main'
              },
              '&:active': {
                transform: 'translateY(0)',
                transition: 'all 0.1s ease-in-out'
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box
                  sx={{
                    backgroundColor: 'error.light',
                    borderRadius: 2,
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <WarningIcon sx={{ color: 'error.main' }} />
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    ml: 2,
                    color: 'error.main',
                    fontWeight: 600
                  }}
                >
                  Acil Müdahale
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {emergencyCases.map((emergency) => (
                  <Box
                    key={emergency.store}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: 'rgba(255, 82, 82, 0.08)',
                      border: '1px solid',
                      borderColor: 'error.light',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 82, 82, 0.12)',
                      }
                    }}
                  >
                    <Typography variant="subtitle2" color="error.main" fontWeight={600}>
                      {emergency.store}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {emergency.issue}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Planlı Bakımlar Kartı */}
        <Grid item xs={12} md={6} lg={3}>
          <Card 
            elevation={0}
            onClick={() => handleNavigation('/stores')}
            sx={{ 
              backgroundColor: '#fff',
              borderRadius: 3,
              border: '1px solid',
              borderColor: '#e0e0e0',
              minHeight: '240px',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              transform: 'translateY(0)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                borderColor: 'primary.main'
              },
              '&:active': {
                transform: 'translateY(0)',
                transition: 'all 0.1s ease-in-out'
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box
                  sx={{
                    backgroundColor: 'primary.light',
                    borderRadius: 2,
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <BuildIcon sx={{ color: 'primary.main' }} />
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    ml: 2,
                    color: 'primary.main',
                    fontWeight: 600
                  }}
                >
                  Planlı Bakımlar
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[
                  { text: 'Bu Hafta', count: 2 },
                  { text: 'Gelecek Hafta', count: 3 }
                ].map((period) => (
                  <Box
                    key={period.text}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: 'rgba(63, 81, 181, 0.08)',
                      border: '1px solid',
                      borderColor: 'primary.light',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'rgba(63, 81, 181, 0.12)',
                      }
                    }}
                  >
                    <Typography variant="subtitle2" color="primary.main" fontWeight={600}>
                      {period.text}
                    </Typography>
                    <Chip
                      label={period.count}
                      size="small"
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontWeight: 600
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Arıza Trendleri Kartı */}
        <Grid item xs={12} md={6} lg={3}>
          <Card 
            elevation={0}
            sx={{ 
              backgroundColor: '#fff',
              borderRadius: 3,
              border: '1px solid',
              borderColor: '#e0e0e0',
              minHeight: '240px',
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2,
                gap: 1.5 
              }}>
                <Box sx={{ 
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#e3f2fd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <TrendingUpIcon sx={{ fontSize: 24 }} />
                </Box>
                <Typography variant="h6" fontSize="1.1rem" fontWeight={600}>
                  Arıza Trendleri
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ 
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: '#ffebee',
                }}>
                  <Typography variant="body2" color="#d32f2f" fontSize="0.75rem">
                    En Sık Arıza
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 0.5
                  }}>
                    <Typography variant="subtitle2" color="#b71c1c">
                      Soğutma Sistemi
                    </Typography>
                    <Box sx={{ 
                      px: 1.5, 
                      py: 0.25, 
                      borderRadius: 1.5, 
                      backgroundColor: '#fff',
                      border: '1px solid #ef5350'
                    }}>
                      <Typography variant="caption" color="#d32f2f" fontWeight={600}>
                        15 vaka
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ 
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: '#fff3e0',
                }}>
                  <Typography variant="body2" color="#f57c00" fontSize="0.75rem">
                    Artış Gösteren
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 0.5
                  }}>
                    <Typography variant="subtitle2" color="#e65100">
                      Elektrik Sistemi
                    </Typography>
                    <Box sx={{ 
                      px: 1.5, 
                      py: 0.25, 
                      borderRadius: 1.5, 
                      backgroundColor: '#fff',
                      border: '1px solid #ff9800'
                    }}>
                      <Typography variant="caption" color="#f57c00" fontWeight={600}>
                        +25%
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ 
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: '#e8f5e9',
                }}>
                  <Typography variant="body2" color="#2e7d32" fontSize="0.75rem">
                    Azalan Trend
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 0.5
                  }}>
                    <Typography variant="subtitle2" color="#1b5e20">
                      Mekanik Arızalar
                    </Typography>
                    <Box sx={{ 
                      px: 1.5, 
                      py: 0.25, 
                      borderRadius: 1.5, 
                      backgroundColor: '#fff',
                      border: '1px solid #4caf50'
                    }}>
                      <Typography variant="caption" color="#2e7d32" fontWeight={600}>
                        -30%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Teknisyen Durumu Kartı */}
        <Grid item xs={12} md={6} lg={3}>
          <Card 
            elevation={0}
            sx={{ 
              backgroundColor: '#fff',
              borderRadius: 3,
              border: '1px solid',
              borderColor: '#e0e0e0',
              minHeight: '240px',
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2,
                gap: 1.5 
              }}>
                <Box sx={{ 
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#e8f5e9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <EngineeringIcon sx={{ fontSize: 24 }} />
                </Box>
                <Typography variant="h6" fontSize="1.1rem" fontWeight={600}>
                  Teknisyen Durumu
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ 
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: '#e8f5e9',
                }}>
                  <Typography variant="body2" color="#2e7d32" fontSize="0.75rem">
                    Aktif Görevde
                  </Typography>
                  <Typography variant="h4" color="#1b5e20" fontWeight={700}>
                    8
                  </Typography>
                </Box>

                <Box sx={{ 
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: '#f3f6ff',
                }}>
                  <Typography variant="body2" color="#1976d2" fontSize="0.75rem">
                    Müsait
                  </Typography>
                  <Typography variant="h4" color="#0d47a1" fontWeight={700}>
                    4
                  </Typography>
                </Box>

                <Box sx={{ 
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: '#e3f2fd',
                }}>
                  <Typography variant="body2" color="#1976d2" fontSize="0.75rem">
                    Bugün Tamamlanan
                  </Typography>
                  <Typography variant="h4" color="#0d47a1" fontWeight={700}>
                    6
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Alt kısımdaki kartlar için */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Son İş Emirleri Kartı */}
        <Grid item xs={12} lg={6}>
          <Paper 
            elevation={0}
            onClick={() => handleNavigation('/work-orders')}
            sx={{ 
              p: 3,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              transform: 'translateY(0)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                borderColor: 'primary.main'
              },
              '&:active': {
                transform: 'translateY(0)',
                transition: 'all 0.1s ease-in-out'
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AssignmentIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6">Son İş Emirleri</Typography>
              </Box>
              <Button 
                variant="outlined" 
                size="small"
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Tümünü Gör
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { store: 'Ataşehir Migros', issue: 'Soğutma Sistemi Bakımı', status: 'progress' },
                { store: 'Kadıköy Migros', issue: 'Kompresör Değişimi', status: 'pending' },
                { store: 'Maltepe Migros', issue: 'Sıcaklık Kontrolü', status: 'completed' },
              ].map((order) => (
                <Box 
                  key={order.store}
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {order.store}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {order.issue}
                    </Typography>
                  </Box>
                  <Chip 
                    label={order.status === 'progress' ? 'Devam Ediyor' : 
                           order.status === 'pending' ? 'Beklemede' : 'Tamamlandı'}
                    color={order.status === 'progress' ? 'primary' : 
                           order.status === 'pending' ? 'warning' : 'success'}
                    size="small"
                    sx={{ fontWeight: 500 }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Yaklaşan Bakımlar Kartı */}
        <Grid item xs={12} lg={6}>
          <Paper 
            elevation={0}
            onClick={() => handleNavigation('/stores')}
            sx={{ 
              p: 3,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              transform: 'translateY(0)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                borderColor: 'primary.main'
              },
              '&:active': {
                transform: 'translateY(0)',
                transition: 'all 0.1s ease-in-out'
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6">Yaklaşan Bakımlar</Typography>
              </Box>
              <Button 
                variant="outlined" 
                size="small"
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Takvimi Gör
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { date: '15 Mart', store: 'Beşiktaş Migros', type: 'Periyodik Bakım' },
                { date: '18 Mart', store: 'Şişli Migros', type: 'Filtre Değişimi' },
                { date: '20 Mart', store: 'Üsküdar Migros', type: 'Sistem Kontrolü' },
              ].map((maintenance) => (
                <Box 
                  key={maintenance.store}
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CalendarIcon color="primary" />
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {maintenance.store}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {maintenance.type}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'primary.main',
                      fontWeight: 600
                    }}
                  >
                    {maintenance.date}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 
import { useState, useEffect } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  IconButton,
  LinearProgress,
  Chip,
  Paper,
  Button
} from '@mui/material';
import {
  Warning as WarningIcon,
  Thermostat as ThermostatIcon,
  Build as BuildIcon,
  Timer as TimerIcon,
  TrendingUp as TrendingUpIcon,
  Store as StoreIcon,
  Engineering as EngineeringIcon,
  CalendarMonth as CalendarIcon
} from '@mui/icons-material';

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

  // Kart tıklama işleyicileri
  const handleEmergencyClick = (store: string) => {
    // İş emri oluşturma veya detay sayfasına yönlendirme
    console.log(`Acil durum detayı: ${store}`);
  };

  const handleMaintenanceClick = (date: string) => {
    // Bakım detaylarına yönlendirme
    console.log(`Bakım detayı: ${date}`);
  };

  return (
    <Box sx={{ 
      p: 3,
      height: '100%',
      overflow: 'auto',
      backgroundColor: 'background.default'
    }}>
      {/* Acil Durumlar ve Önemli Metrikler */}
      <Grid container spacing={3}>
        {/* Acil Müdahale Kartı */}
        <Grid item xs={12} md={6} lg={3}>
          <Card 
            sx={{ 
              background: 'linear-gradient(to right bottom, #fff5f5, #ffffff)',
              border: '1px solid #ffecec',
              boxShadow: '0 2px 12px rgba(255, 82, 82, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 20px rgba(255, 82, 82, 0.15)'
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WarningIcon sx={{ color: '#ff5252', opacity: 0.8 }} />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    ml: 1, 
                    color: '#ff5252',
                    fontWeight: 500,
                    opacity: 0.9
                  }}
                >
                  Acil Müdahale (3)
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {emergencyCases.map((emergency) => (
                  <Chip 
                    key={emergency.store}
                    label={`${emergency.store} - ${emergency.issue}`}
                    sx={{
                      background: 'rgba(255, 82, 82, 0.08)',
                      color: '#ff5252',
                      border: '1px solid rgba(255, 82, 82, 0.2)',
                      '&:hover': {
                        background: 'rgba(255, 82, 82, 0.12)',
                      },
                      '& .MuiChip-label': {
                        fontWeight: 400
                      }
                    }}
                    onClick={() => handleEmergencyClick(emergency.store)}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Planlı Bakımlar Kartı */}
        <Grid item xs={12} md={6} lg={3}>
          <Card 
            sx={{ 
              background: 'linear-gradient(to right bottom, #f8f9ff, #ffffff)',
              border: '1px solid #eef0ff',
              boxShadow: '0 2px 12px rgba(63, 81, 181, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 20px rgba(63, 81, 181, 0.15)'
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BuildIcon sx={{ color: '#3f51b5', opacity: 0.8 }} />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    ml: 1, 
                    color: '#3f51b5',
                    fontWeight: 500,
                    opacity: 0.9
                  }}
                >
                  Planlı Bakımlar (5)
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[
                  { text: 'Bu Hafta', count: 2 },
                  { text: 'Gelecek Hafta', count: 3 }
                ].map((period) => (
                  <Box 
                    key={period.text}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 1.5,
                      borderRadius: 1,
                      background: 'rgba(63, 81, 181, 0.08)',
                      border: '1px solid rgba(63, 81, 181, 0.12)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        background: 'rgba(63, 81, 181, 0.12)',
                      }
                    }}
                    onClick={() => handleMaintenanceClick(period.text)}
                  >
                    <Typography 
                      sx={{ 
                        color: '#3f51b5',
                        fontWeight: 500
                      }}
                    >
                      {period.text}
                    </Typography>
                    <Chip
                      label={period.count}
                      size="small"
                      sx={{
                        background: 'rgba(63, 81, 181, 0.15)',
                        color: '#3f51b5',
                        fontWeight: 500,
                        minWidth: '32px'
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Performans Metrikleri */}
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="success" />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Sistem Performansı
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Ortalama Çalışma Sıcaklığı
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={systemMetrics.temperature} 
                    color="success"
                    sx={{ mt: 1 }}
                  />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Enerji Verimliliği
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={systemMetrics.efficiency} 
                    color="success"
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Teknisyen Durumu */}
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EngineeringIcon color="primary" />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Teknisyen Durumu
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Chip label="Aktif Görevde (8)" color="success" />
                <Chip label="Müsait (4)" color="primary" />
                <Chip label="İzinli (2)" color="default" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Detaylı Bilgiler */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Son İş Emirleri */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Son İş Emirleri</Typography>
              <Button variant="outlined" size="small">Tümünü Gör</Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
                    p: 1,
                    borderRadius: 1,
                    bgcolor: 'background.default'
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2">{order.store}</Typography>
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
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Yaklaşan Bakımlar */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Yaklaşan Bakımlar</Typography>
              <Button variant="outlined" size="small">Takvimi Gör</Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
                    p: 1,
                    borderRadius: 1,
                    bgcolor: 'background.default'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CalendarIcon color="primary" />
                    <Box>
                      <Typography variant="subtitle2">{maintenance.store}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {maintenance.type}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="primary">
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
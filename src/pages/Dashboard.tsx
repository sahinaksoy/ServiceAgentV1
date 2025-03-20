import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // ... diğer kodlar ...

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Acil Müdahale Kartı */}
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              cursor: 'pointer',
              '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-2px)',
                transition: 'all 0.3s'
              }
            }}
            onClick={() => navigate('/work-orders')}
          >
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Acil Müdahale
              </Typography>
              <Typography variant="h4" component="div" color="primary">
                3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bekleyen acil müdahale
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Planlı Bakımlar Kartı */}
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              cursor: 'pointer',
              '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-2px)',
                transition: 'all 0.3s'
              }
            }}
            onClick={() => navigate('/stores')}
          >
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Planlı Bakımlar
              </Typography>
              <Typography variant="h4" component="div" color="primary">
                5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Planlanan bakım sayısı
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* ... diğer kartlar ... */}
      </Grid>
    </Box>
  );
};

export default Dashboard; 
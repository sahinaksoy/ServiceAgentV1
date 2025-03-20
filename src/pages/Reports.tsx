import { Box, Card, Grid, Typography, Paper, IconButton, Divider } from '@mui/material';
import { useEffect } from 'react';
import { usePageTitle } from '../contexts/PageTitleContext';
import {
  Assignment as WorkIcon,
  Store as StoreIcon,
  Engineering as TechnicianIcon,
  Memory as SystemIcon,
  TrendingUp as TrendingUpIcon,
  Build as BuildIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
  const { setTitle } = usePageTitle();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle('Raporlar');
  }, [setTitle]);

  const reportCards = [
    {
      title: 'İş Emri Raporu',
      icon: WorkIcon,
      path: '/reports/work-order-report',
      description: 'Detaylı iş emri raporu ve analizleri'
    },
    {
      title: 'İş Emri Analizi',
      icon: BuildIcon,
      path: '/reports/work-order-analysis',
      description: 'İş emirleri pivot tablo analizi'
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {reportCards.map((card) => {
          const Icon = card.icon;
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={card.title}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
                onClick={() => navigate(card.path)}
              >
                <Icon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Typography variant="h6" align="center">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {card.description}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Reports; 
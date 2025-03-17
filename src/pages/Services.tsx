import { Box, Grid, Paper, Typography, IconButton, useTheme } from '@mui/material';
import { 
  Build as BuildIcon, 
  Inventory as InventoryIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../contexts/PageTitleContext';

interface ServiceCard {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

const SERVICES: ServiceCard[] = [
  {
    id: 1,
    title: 'Servisler',
    description: 'Servis işlemlerini yönetin',
    icon: <BuildIcon sx={{ fontSize: 40 }} />,
    color: '#1976d2'
  },
  {
    id: 2,
    title: 'Malzemeler',
    description: 'Malzeme yönetimini yapın',
    icon: <InventoryIcon sx={{ fontSize: 40 }} />,
    color: '#2e7d32'
  }
];

const Services = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setTitle } = usePageTitle();

  // Sayfa başlığını ayarla
  setTitle('Hizmetler');

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3 
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Hizmetler
        </Typography>
        <IconButton 
          color="primary" 
          sx={{ 
            bgcolor: 'primary.light',
            '&:hover': {
              bgcolor: 'primary.main',
              color: 'white'
            }
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {SERVICES.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4],
                },
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  backgroundColor: service.color,
                }
              }}
              onClick={() => navigate(service.id === 1 ? '/services' : '/materials')}
            >
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: 2
              }}>
                <Box sx={{ 
                  color: service.color,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  {service.icon}
                  <Typography variant="h6" component="h2">
                    {service.title}
                  </Typography>
                </Box>
                <Box>
                  <IconButton 
                    size="small" 
                    sx={{ 
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main' }
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    sx={{ 
                      color: 'text.secondary',
                      '&:hover': { color: 'error.main' }
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ flexGrow: 1 }}
              >
                {service.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services; 
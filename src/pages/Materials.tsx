import { Box, Grid, Paper, Typography, IconButton, useTheme } from '@mui/material';
import { 
  Inventory as InventoryIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Category as CategoryIcon,
  LocalShipping as LocalShippingIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../contexts/PageTitleContext';

interface MaterialCard {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

const MATERIALS: MaterialCard[] = [
  {
    id: 1,
    title: 'Malzeme Kategorileri',
    description: 'Malzeme kategorilerini yönetin',
    icon: <CategoryIcon sx={{ fontSize: 40 }} />,
    color: '#1976d2'
  },
  {
    id: 2,
    title: 'Malzeme Listesi',
    description: 'Tüm malzemeleri görüntüleyin ve yönetin',
    icon: <InventoryIcon sx={{ fontSize: 40 }} />,
    color: '#2e7d32'
  },
  {
    id: 3,
    title: 'Stok Hareketleri',
    description: 'Stok giriş ve çıkışlarını takip edin',
    icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
    color: '#ed6c02'
  }
];

const Materials = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setTitle } = usePageTitle();

  // Sayfa başlığını ayarla
  setTitle('Malzemeler');

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3 
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Malzemeler
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
        {MATERIALS.map((material) => (
          <Grid item xs={12} sm={6} md={4} key={material.id}>
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
                  backgroundColor: material.color,
                }
              }}
              onClick={() => navigate(`/materials/${material.id}`)}
            >
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: 2
              }}>
                <Box sx={{ 
                  color: material.color,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  {material.icon}
                  <Typography variant="h6" component="h2">
                    {material.title}
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
                {material.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Materials; 
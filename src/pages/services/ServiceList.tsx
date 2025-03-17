import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Grid,
  Card,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Build as BuildIcon,
} from '@mui/icons-material';
import { usePageTitle } from '../../contexts/PageTitleContext';

const ServiceList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle('Servisler');
  }, [setTitle]);

  // Geçici mock veri
  const services = [
    {
      id: '1',
      name: 'Klima Bakımı',
      category: 'Bakım',
      description: 'Periyodik klima bakım hizmeti',
      price: 1500,
      unit: 'Adet',
      status: 'active',
    },
    {
      id: '2',
      name: 'Soğutucu Tamiri',
      category: 'Tamir',
      description: 'Endüstriyel soğutucu tamir hizmeti',
      price: 2500,
      unit: 'Saat',
      status: 'active',
    },
    {
      id: '3',
      name: 'Elektrik Tesisatı Kontrolü',
      category: 'Kontrol',
      description: 'Elektrik sistemleri genel kontrol',
      price: 1000,
      unit: 'Adet',
      status: 'active',
    },
  ];

  const categories = ['Bakım', 'Tamir', 'Kontrol', 'Kurulum'];

  const filteredServices = services.filter(service => {
    const matchesSearch = searchQuery === '' || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === '' || service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ flex: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Servis adı veya açıklama ile ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Kategori</InputLabel>
            <Select
              value={selectedCategory}
              label="Kategori"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">Tümü</MenuItem>
              {categories.map(category => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      <Grid container spacing={2}>
        {filteredServices.map(service => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card sx={{
              p: 2,
              height: '100%',
              transition: '0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4
              }
            }}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <BuildIcon sx={{ color: 'primary.main', fontSize: 40 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{service.name}</Typography>
                    <Chip
                      label={service.category}
                      size="small"
                      color="primary"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Stack>

                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" color="primary">
                    {service.price.toLocaleString('tr-TR')} ₺
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    / {service.unit}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <IconButton size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default ServiceList; 
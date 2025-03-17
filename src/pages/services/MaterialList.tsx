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
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import { usePageTitle } from '../../contexts/PageTitleContext';

const MaterialList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle('Malzemeler');
  }, [setTitle]);

  // Geçici mock veri
  const materials = [
    {
      id: '1',
      name: 'Klima Filtresi',
      category: 'Filtre',
      description: 'Endüstriyel klima için HEPA filtre',
      price: 750,
      unit: 'Adet',
      stock: 25,
      status: 'active',
    },
    {
      id: '2',
      name: 'Soğutucu Gaz R410A',
      category: 'Soğutucu',
      description: 'Klima sistemleri için soğutucu gaz',
      price: 1200,
      unit: 'kg',
      stock: 50,
      status: 'active',
    },
    {
      id: '3',
      name: 'Bakır Boru 1/4"',
      category: 'Boru',
      description: 'Klima tesisatı için bakır boru',
      price: 85,
      unit: 'metre',
      stock: 100,
      status: 'active',
    },
  ];

  const categories = ['Filtre', 'Soğutucu', 'Boru', 'Elektrik', 'Yedek Parça'];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = searchQuery === '' || 
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === '' || material.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ flex: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Malzeme adı veya açıklama ile ara..."
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
        {filteredMaterials.map(material => (
          <Grid item xs={12} sm={6} md={4} key={material.id}>
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
                  <InventoryIcon sx={{ color: 'primary.main', fontSize: 40 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{material.name}</Typography>
                    <Chip
                      label={material.category}
                      size="small"
                      color="primary"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Stack>

                <Typography variant="body2" color="text.secondary">
                  {material.description}
                </Typography>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" color="primary">
                    {material.price.toLocaleString('tr-TR')} ₺
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    / {material.unit}
                  </Typography>
                </Stack>

                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Stok: {material.stock} {material.unit}
                </Typography>

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

export default MaterialList; 
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
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  SelectChangeEvent,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Build as BuildIcon,
} from '@mui/icons-material';
import { usePageTitle } from '../../contexts/PageTitleContext';

interface Service {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  status: 'active' | 'inactive';
  type: 'mechanical' | 'electronic';
}

interface ServiceFormData {
  id?: number;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  status: 'active' | 'inactive';
  type: 'mechanical' | 'electronic';
}

const ServiceList = () => {
  const { setTitle } = usePageTitle();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    category: '',
    description: '',
    price: 0,
    duration: 1,
    status: 'active',
    type: 'mechanical'
  });

  useEffect(() => {
    setTitle('Servisler');
  }, [setTitle]);

  // Geçici mock veri
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: 'Klima Bakımı',
      category: 'Mekanik',
      description: 'Klima bakım ve temizlik hizmeti',
      price: 250,
      duration: 2,
      status: 'active',
      type: 'mechanical'
    },
    {
      id: 2,
      name: 'Elektrik Tesisatı',
      category: 'Elektronik',
      description: 'Elektrik tesisat kurulum ve onarım',
      price: 150,
      duration: 4,
      status: 'active',
      type: 'electronic'
    },
    {
      id: 3,
      name: 'Su Tesisatı',
      category: 'Mekanik',
      description: 'Su tesisat kurulum ve onarım',
      price: 180,
      duration: 3,
      status: 'inactive',
      type: 'mechanical'
    }
  ]);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'Mekanik', 'Elektronik'];

  const handleEdit = (service: Service) => {
    setFormData({
      id: service.id,
      name: service.name,
      category: service.category,
      description: service.description,
      price: service.price,
      duration: service.duration,
      status: service.status,
      type: service.type
    });
    setOpenDialog(true);
  };

  const handleDelete = (service: Service) => {
    if (window.confirm('Bu servisi silmek istediğinizden emin misiniz?')) {
      setServices(prev => prev.filter(s => s.id !== service.id));
    }
  };

  const handleSubmit = () => {
    if (formData.id) {
      // Düzenleme işlemi
      setServices(prev => prev.map(service => 
        service.id === formData.id ? { ...formData } : service
      ));
    } else {
      // Yeni ekleme işlemi
      const newService: Service = {
        id: services.length + 1,
        ...formData
      };
      setServices(prev => [...prev, newService]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      id: undefined,
      name: '',
      category: '',
      description: '',
      price: 0,
      duration: 1,
      status: 'active',
      type: 'mechanical'
    });
  };

  const handleOpenDialog = () => {
    setFormData({
      id: undefined,
      name: '',
      category: '',
      description: '',
      price: 0,
      duration: 1,
      status: 'active',
      type: 'mechanical'
    });
    setOpenDialog(true);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<'active' | 'inactive' | 'mechanical' | 'electronic'>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Servisler
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            size="small"
            placeholder="Servis Ara..."
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
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category === 'all' ? 'Tümü' : category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Servis Adı</TableCell>
              <TableCell>Kategori</TableCell>
              <TableCell>Açıklama</TableCell>
              <TableCell align="right">Fiyat</TableCell>
              <TableCell align="right">Süre (Saat)</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell align="right">İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServices.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.name}</TableCell>
                <TableCell>
                  <Chip 
                    label={service.type === 'mechanical' ? 'Mekanik' : 'Elektronik'} 
                    color={service.type === 'mechanical' ? 'info' : 'warning'} 
                    size="small"
                  />
                </TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell align="right">{service.price} ₺</TableCell>
                <TableCell align="right">{service.duration}</TableCell>
                <TableCell>
                  <Chip 
                    label={service.status === 'active' ? 'Aktif' : 'Pasif'} 
                    color={service.status === 'active' ? 'success' : 'default'} 
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Düzenle">
                    <IconButton size="small" onClick={() => handleEdit(service)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Sil">
                    <IconButton size="small" color="error" onClick={() => handleDelete(service)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Fab 
        color="primary" 
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleOpenDialog}
      >
        <AddIcon />
      </Fab>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{formData.id ? 'Servis Düzenle' : 'Yeni Servis Ekle'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              name="name"
              label="Servis Adı"
              value={formData.name}
              onChange={handleTextChange}
              fullWidth
            />
            <TextField
              name="description"
              label="Açıklama"
              value={formData.description}
              onChange={handleTextChange}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              name="price"
              label="Fiyat"
              type="number"
              value={formData.price}
              onChange={handleTextChange}
              fullWidth
              InputProps={{
                endAdornment: <InputAdornment position="end">₺</InputAdornment>,
              }}
            />
            <TextField
              name="duration"
              label="Süre (Saat)"
              type="number"
              value={formData.duration}
              onChange={handleTextChange}
              fullWidth
              inputProps={{ min: 1 }}
            />
            <FormControl fullWidth>
              <InputLabel>Kategori</InputLabel>
              <Select
                name="type"
                value={formData.type}
                label="Kategori"
                onChange={handleSelectChange}
              >
                <MenuItem value="mechanical">Mekanik</MenuItem>
                <MenuItem value="electronic">Elektronik</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Durum</InputLabel>
              <Select
                name="status"
                value={formData.status}
                label="Durum"
                onChange={handleSelectChange}
              >
                <MenuItem value="active">Aktif</MenuItem>
                <MenuItem value="inactive">Pasif</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>İptal</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {formData.id ? 'Güncelle' : 'Kaydet'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ServiceList; 
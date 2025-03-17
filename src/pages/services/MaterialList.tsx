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
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import { usePageTitle } from '../../contexts/PageTitleContext';

interface Material {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  status: 'active' | 'inactive';
  type: 'mechanical' | 'electronic';
}

interface MaterialFormData {
  id?: number;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  status: 'active' | 'inactive';
  type: 'mechanical' | 'electronic';
}

const MaterialList = () => {
  const { setTitle } = usePageTitle();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<MaterialFormData>({
    id: undefined,
    name: '',
    category: '',
    description: '',
    price: 0,
    unit: '',
    status: 'active',
    type: 'mechanical'
  });

  useEffect(() => {
    setTitle('Malzemeler');
  }, [setTitle]);

  // Geçici mock veri
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: 1,
      name: 'Klima Filtresi',
      category: 'Mekanik',
      description: 'Klima bakım filtresi',
      price: 50,
      unit: 'Adet',
      status: 'active',
      type: 'mechanical'
    },
    {
      id: 2,
      name: 'Elektrik Kablosu',
      category: 'Elektronik',
      description: 'Elektrik tesisat kablosu',
      price: 25,
      unit: 'Metre',
      status: 'active',
      type: 'electronic'
    },
    {
      id: 3,
      name: 'Su Borusu',
      category: 'Mekanik',
      description: 'Su tesisat borusu',
      price: 35,
      unit: 'Metre',
      status: 'inactive',
      type: 'mechanical'
    }
  ]);

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'Mekanik', 'Elektronik'];

  const handleEdit = (material: Material) => {
    setFormData({
      id: material.id,
      name: material.name,
      category: material.category,
      description: material.description,
      price: material.price,
      unit: material.unit,
      status: material.status,
      type: material.type
    });
    setOpenDialog(true);
  };

  const handleDelete = (material: Material) => {
    if (window.confirm('Bu malzemeyi silmek istediğinizden emin misiniz?')) {
      setMaterials(prev => prev.filter(m => m.id !== material.id));
    }
  };

  const handleSubmit = () => {
    if (formData.id) {
      // Düzenleme işlemi
      setMaterials(prev => prev.map(material => 
        material.id === formData.id ? { ...formData } : material
      ));
    } else {
      // Yeni ekleme işlemi
      const newMaterial: Material = {
        id: materials.length + 1,
        ...formData
      };
      setMaterials(prev => [...prev, newMaterial]);
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
      unit: '',
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
      unit: '',
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
          Malzemeler
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            size="small"
            placeholder="Malzeme Ara..."
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
              <TableCell>Malzeme Adı</TableCell>
              <TableCell>Kategori</TableCell>
              <TableCell>Açıklama</TableCell>
              <TableCell align="right">Fiyat</TableCell>
              <TableCell align="right">Birim</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell align="right">İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMaterials.map((material) => (
              <TableRow key={material.id}>
                <TableCell>{material.name}</TableCell>
                <TableCell>
                  <Chip 
                    label={material.type === 'mechanical' ? 'Mekanik' : 'Elektronik'} 
                    color={material.type === 'mechanical' ? 'info' : 'warning'} 
                    size="small"
                  />
                </TableCell>
                <TableCell>{material.description}</TableCell>
                <TableCell align="right">{material.price} ₺</TableCell>
                <TableCell align="right">{material.unit}</TableCell>
                <TableCell>
                  <Chip 
                    label={material.status === 'active' ? 'Aktif' : 'Pasif'} 
                    color={material.status === 'active' ? 'success' : 'default'} 
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Düzenle">
                    <IconButton size="small" onClick={() => handleEdit(material)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Sil">
                    <IconButton size="small" color="error" onClick={() => handleDelete(material)}>
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
        <DialogTitle>{formData.id ? 'Malzeme Düzenle' : 'Yeni Malzeme Ekle'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              name="name"
              label="Malzeme Adı"
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
              name="unit"
              label="Birim"
              value={formData.unit}
              onChange={handleTextChange}
              fullWidth
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

export default MaterialList; 
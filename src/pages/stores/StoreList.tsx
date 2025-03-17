import { useState, useCallback } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  IconButton, 
  useTheme, 
  useMediaQuery,
  Grid,
  Card,
  Stack,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Fab
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Store as StoreIcon
} from '@mui/icons-material';
import { Store, StoreFormData } from '../../types/store';
import { useStores, useCreateStore, useUpdateStore, useDeleteStore } from '../../hooks/useStores';
import { DeleteConfirmDialog } from '../../components/common/DeleteConfirmDialog';
import { StoreDialog } from '../../components/stores/StoreDialog';
import { usePageTitle } from '../../contexts/PageTitleContext';
import React from 'react';

const StoreList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('');

  const { data: stores = [], isLoading, error } = useStores();
  const createStoreMutation = useCreateStore();
  const updateStoreMutation = useUpdateStore();
  const deleteStoreMutation = useDeleteStore();

  const { setTitle } = usePageTitle();

  React.useEffect(() => {
    setTitle('Mağazalarım');
  }, [setTitle]);

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  const handleEdit = (store: Store) => {
    setSelectedStore(store);
    setIsEditDialogOpen(true);
  };

  const handleView = (store: Store) => {
    setSelectedStore(store);
    setIsDetailDialogOpen(true);
  };

  const handleDelete = (store: Store) => {
    setSelectedStore(store);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedStore) {
      try {
        await deleteStoreMutation.mutateAsync(selectedStore.id);
        setIsDeleteDialogOpen(false);
        setSelectedStore(null);
      } catch (error) {
        console.error('Error deleting store:', error);
      }
    }
  };

  const handleCreateStore = async (data: StoreFormData) => {
    try {
      await createStoreMutation.mutateAsync(data);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error creating store:', error);
    }
  };

  const handleUpdateStore = async (data: StoreFormData) => {
    if (selectedStore) {
      try {
        await updateStoreMutation.mutateAsync({ id: selectedStore.id, data });
        setIsEditDialogOpen(false);
        setSelectedStore(null);
      } catch (error) {
        console.error('Error updating store:', error);
      }
    }
  };

  const handleDialogClose = useCallback(() => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsDetailDialogOpen(false);
    setSelectedStore(null);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRegionChange = (event: SelectChangeEvent<string>) => {
    setSelectedRegion(event.target.value);
  };

  const handleCompanyChange = (event: SelectChangeEvent<string>) => {
    setSelectedCompany(event.target.value);
  };

  const filteredStores = stores.filter(store => {
    const matchesSearch = searchQuery === '' || 
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.phone.includes(searchQuery);

    const matchesRegion = selectedRegion === '' || store.region === selectedRegion;
    const matchesCompany = selectedCompany === '' || store.company === selectedCompany;

    return matchesSearch && matchesRegion && matchesCompany;
  });

  const regions = Array.from(new Set(stores.map(store => store.region)));
  const companies = Array.from(new Set(stores.map(store => store.company)));

  if (error) {
    return <Typography color="error">Bir hata oluştu: {error.message}</Typography>;
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ flex: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Mağaza adı, adres veya telefon ile ara..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Bölge</InputLabel>
            <Select
              value={selectedRegion}
              label="Bölge"
              onChange={handleRegionChange}
            >
              <MenuItem value="">Tümü</MenuItem>
              {regions.map(region => (
                <MenuItem key={region} value={region}>{region}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Şirket</InputLabel>
            <Select
              value={selectedCompany}
              label="Şirket"
              onChange={handleCompanyChange}
            >
              <MenuItem value="">Tümü</MenuItem>
              {companies.map(company => (
                <MenuItem key={company} value={company}>{company}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      <Grid container spacing={2}>
        {filteredStores.map(store => (
          <Grid item xs={12} sm={6} md={4} key={store.id}>
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
                  <StoreIcon sx={{ color: theme.palette.primary.main, fontSize: 40 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{store.name}</Typography>
                    <Chip
                      label={store.status}
                      size="small"
                      color={store.status === 'active' ? 'success' : store.status === 'maintenance' ? 'warning' : 'error'}
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Stack>

                <Stack spacing={1}>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationIcon fontSize="small" />
                    {store.address}
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PhoneIcon fontSize="small" />
                    {store.phone}
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon fontSize="small" />
                    {store.email}
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BusinessIcon fontSize="small" />
                    {store.company}
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon fontSize="small" />
                    {store.authorizedName}
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PhoneIcon fontSize="small" />
                    {store.authorizedPhone}
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <GroupIcon fontSize="small" />
                    {store.employeeCount} Çalışan
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <IconButton size="small" onClick={() => handleView(store)}>
                    <ViewIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleEdit(store)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(store)}>
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
        onClick={handleAdd}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16
        }}
      >
        <AddIcon />
      </Fab>

      <StoreDialog
        open={isAddDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleCreateStore}
        mode="add"
      />

      {selectedStore && (
        <>
          <StoreDialog
            open={isEditDialogOpen}
            onClose={handleDialogClose}
            onSubmit={handleUpdateStore}
            store={selectedStore}
            mode="edit"
          />

          <StoreDialog
            open={isDetailDialogOpen}
            onClose={handleDialogClose}
            onSubmit={() => {}}
            store={selectedStore}
            mode="view"
          />

          <DeleteConfirmDialog
            open={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleConfirmDelete}
            title="Mağaza Silme"
            content={`${selectedStore.name} isimli mağazayı silmek istediğinizden emin misiniz?`}
          />
        </>
      )}
    </Box>
  );
};

export default StoreList; 
import { useState, useCallback } from 'react';
import { Box, Paper, Typography, IconButton, useTheme, useMediaQuery, Grid, InputAdornment, TextField, ToggleButtonGroup, ToggleButton, Card, CardContent, Chip, Divider, Tooltip, Avatar } from '@mui/material';
import DataGrid, {
  Column,
  Paging,
  Pager,
  FilterRow,
  HeaderFilter,
  ColumnChooser,
  StateStoring,
  Export,
  Selection,
  Scrolling,
  LoadPanel
} from 'devextreme-react/data-grid';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon, GridView as GridViewIcon, ViewModule as CardViewIcon, Search as SearchIcon, Store as StoreIcon, DeviceThermostat as DeviceIcon, Warning as WarningIcon, CheckCircle as CheckIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { Store, StoreFormData } from '../../types/store';
import { useStores, useCreateStore, useUpdateStore, useDeleteStore } from '../../hooks/useStores';
import { DeleteConfirmDialog } from '../../components/common/DeleteConfirmDialog';
import { StoreDialog } from '../../components/stores/StoreDialog';
import { usePageTitle } from '../../contexts/PageTitleContext';
import React from 'react';

interface Device {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'warning' | 'error' | 'maintenance';
  temperature: number;
  lastMaintenance: string;
  nextMaintenance: string;
}

interface Store {
  id: string;
  name: string;
  address: string;
  region: string;
  devices: Device[];
}

interface StoreFormData {
  name: string;
  address: string;
  region: string;
  devices: Device[];
}

// Mock cihaz verileri
const mockDevices: Device[] = [
  {
    id: '1',
    name: 'VRF Sistem A',
    type: 'vrf',
    status: 'active',
    lastMaintenance: '2024-02-15',
    nextMaintenance: '2024-05-15'
  },
  {
    id: '2',
    name: 'Chiller Ünitesi 1',
    type: 'chiller',
    status: 'warning',
    lastMaintenance: '2024-02-01',
    nextMaintenance: '2024-04-01'
  },
  {
    id: '3',
    name: 'Havalandırma Sistemi',
    type: 'havalandirma',
    status: 'active',
    lastMaintenance: '2024-03-01',
    nextMaintenance: '2024-06-01'
  },
  {
    id: '4',
    name: 'Fan Coil Ünitesi A',
    type: 'fancoil',
    status: 'maintenance',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-04-15'
  },
  {
    id: '5',
    name: 'Split Klima 1',
    type: 'split_klima',
    status: 'active',
    lastMaintenance: '2024-02-20',
    nextMaintenance: '2024-05-20'
  },
  {
    id: '6',
    name: 'Rooftop Ünitesi',
    type: 'rooftop',
    status: 'error',
    lastMaintenance: '2024-01-30',
    nextMaintenance: '2024-04-30'
  }
];

// Mock mağaza verilerini güncelleyelim
const mockStores: Store[] = [
  {
    id: '1',
    name: 'Ataşehir Migros',
    address: 'Ataşehir Bulvarı No:123',
    region: 'İstanbul Anadolu',
    devices: [mockDevices[0], mockDevices[1], mockDevices[4]] // VRF, Chiller ve Split Klima
  },
  {
    id: '2',
    name: 'Kadıköy Migros',
    address: 'Bağdat Caddesi No:456',
    region: 'İstanbul Anadolu',
    devices: [mockDevices[2], mockDevices[3]] // Havalandırma ve Fan Coil
  },
  {
    id: '3',
    name: 'Maltepe Migros',
    address: 'Maltepe Sahil Yolu No:789',
    region: 'İstanbul Anadolu',
    devices: [mockDevices[5], mockDevices[1], mockDevices[4]] // Rooftop, Chiller ve Split Klima
  },
  {
    id: '4',
    name: 'Beşiktaş Migros',
    address: 'Barbaros Bulvarı No:101',
    region: 'İstanbul Avrupa',
    devices: [mockDevices[0], mockDevices[2], mockDevices[3]] // VRF, Havalandırma ve Fan Coil
  },
  {
    id: '5',
    name: 'Şişli Migros',
    address: 'Halaskargazi Caddesi No:202',
    region: 'İstanbul Avrupa',
    devices: [mockDevices[1], mockDevices[4], mockDevices[5]] // Chiller, Split Klima ve Rooftop
  }
];

const StoreList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'card'>('card');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: stores = mockStores, isLoading, error } = useStores();
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
      await createStoreMutation.mutateAsync({
        ...data,
        devices: data.devices || []
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error creating store:', error);
    }
  };

  const handleUpdateStore = async (data: StoreFormData) => {
    if (selectedStore) {
      try {
        await updateStoreMutation.mutateAsync({
          id: selectedStore.id,
          data: {
            ...data,
            devices: data.devices || selectedStore.devices || []
          }
        });
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

  const filteredStores = (stores || []).filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Device['status']) => {
    switch (status) {
      case 'active': return { color: '#4caf50', bg: '#e8f5e9' };
      case 'warning': return { color: '#ff9800', bg: '#fff3e0' };
      case 'error': return { color: '#f44336', bg: '#ffebee' };
      case 'maintenance': return { color: '#2196f3', bg: '#e3f2fd' };
    }
  };

  const getStatusText = (status: Device['status']) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'warning': return 'Uyarı';
      case 'error': return 'Hata';
      case 'maintenance': return 'Bakımda';
    }
  };

  if (error) {
    return <Typography color="error">Bir hata oluştu: {error.message}</Typography>;
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5">Mağazalarım</Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Mağaza Ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, newValue) => newValue && setViewMode(newValue)}
            size="small"
          >
            <ToggleButton value="grid" aria-label="tablo görünümü">
              <GridViewIcon />
            </ToggleButton>
            <ToggleButton value="card" aria-label="kart görünümü">
              <CardViewIcon />
            </ToggleButton>
          </ToggleButtonGroup>

          <IconButton color="primary" onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      {viewMode === 'grid' ? (
        <Paper sx={{ flexGrow: 1, overflow: 'hidden' }}>
          <DataGrid
            dataSource={filteredStores}
            showBorders
            rowAlternationEnabled
            columnAutoWidth
            wordWrapEnabled
            height="100%"
            remoteOperations={false}
            noDataText="Mağaza bulunamadı"
            repaintChangesOnly={true}
          >
            <LoadPanel enabled={isLoading} />
            <Scrolling mode="virtual" rowRenderingMode="virtual" />
            <StateStoring enabled type="localStorage" storageKey="storeListGridState" />
            <Selection mode="single" />
            <FilterRow visible />
            <HeaderFilter visible />
            <ColumnChooser enabled />
            <Export enabled />
            
            <Column dataField="name" caption="Mağaza Adı" />
            <Column dataField="address" caption="Adres" visible={!isMobile} />
            <Column dataField="region" caption="Bölge" />
            <Column dataField="manager" caption="Yetkili" />
            <Column dataField="managerPhone" caption="Yetkili Telefon" />
            <Column 
              dataField="devices" 
              caption="Cihaz Sayısı"
              calculateCellValue={(rowData) => rowData.devices?.length || 0}
            />
            <Column
              caption="İşlemler"
              width={120}
              alignment="center"
              cellRender={(cell: any) => (
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <IconButton size="small" onClick={() => handleView(cell.data)}>
                    <ViewIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleEdit(cell.data)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDelete(cell.data)}
                    sx={{ 
                      color: 'error.main',
                      '&:hover': {
                        color: 'error.dark'
                      }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            />

            <Paging defaultPageSize={10} />
            <Pager
              showPageSizeSelector
              allowedPageSizes={[10, 20, 50]}
              showInfo
              showNavigationButtons
            />
          </DataGrid>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredStores.map((store) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={store.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
                  border: '1px solid #e0e0e0',
                  borderRadius: 2,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <CardContent>
                  {/* Mağaza Başlığı */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: 'primary.light',
                        mr: 2
                      }}
                    >
                      <StoreIcon />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="div">
                        {store.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {store.address}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" onClick={() => handleEdit(store)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDelete(store)}
                        sx={{ 
                          color: 'error.main',
                          '&:hover': {
                            color: 'error.dark'
                          }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Mağaza Detayları */}
                  <Box sx={{ mb: 2 }}>
                    {/* Bölge */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          minWidth: '80px',
                          fontWeight: 500
                        }}
                      >
                        Bölge:
                      </Typography>
                      <Typography variant="body2">
                        {store.region}
                      </Typography>
                    </Box>

                    {/* Yetkili */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          minWidth: '80px',
                          fontWeight: 500
                        }}
                      >
                        Yetkili:
                      </Typography>
                      <Typography variant="body2">
                        {store.manager}
                      </Typography>
                    </Box>

                    {/* Yetkili Telefon */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          minWidth: '80px',
                          fontWeight: 500
                        }}
                      >
                        Telefon:
                      </Typography>
                      <Typography variant="body2">
                        {store.managerPhone}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Alt Bilgi ve Aksiyonlar */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <DeviceIcon sx={{ mr: 1, color: 'primary.main', opacity: 0.7 }} />
                      <Typography variant="body2" color="text.secondary">
                        {store.devices?.length || 0} Cihaz
                      </Typography>
                    </Box>
                    <Tooltip title="Detaylı Bilgi">
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => handleView(store)}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <StoreDialog
        open={isAddDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleCreateStore}
        mode="add"
        initialData={{
          devices: []
        }}
      />

      {selectedStore && (
        <>
          <StoreDialog
            open={isEditDialogOpen}
            onClose={handleDialogClose}
            onSubmit={handleUpdateStore}
            store={{
              ...selectedStore,
              devices: selectedStore.devices || []
            }}
            mode="edit"
          />

          <StoreDialog
            open={isDetailDialogOpen}
            onClose={handleDialogClose}
            onSubmit={() => {}}
            store={{
              ...selectedStore,
              devices: selectedStore.devices || []
            }}
            mode="view"
          />

          <DeleteConfirmDialog
            open={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleConfirmDelete}
            title="Mağaza Silme"
            content={`${selectedStore.name} isimli mağazayı ve bağlı ${selectedStore.devices?.length || 0} cihazı silmek istediğinizden emin misiniz?`}
          />
        </>
      )}
    </Box>
  );
};

export default StoreList; 
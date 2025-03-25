import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Autocomplete,
  IconButton,
  Card,
  CardContent,
  Stack,
  Divider,
  List,
  Dialog,
  Avatar,
  Tooltip,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Chip
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon, GridView as GridViewIcon, ViewModule as CardViewIcon, Search as SearchIcon, Store as StoreIcon, DeviceThermostat as DeviceIcon, ArrowBack } from '@mui/icons-material';
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
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSnackbar } from 'notistack';
import { usePageTitle } from '../../contexts/PageTitleContext';
import { useStores, useCreateStore, useUpdateStore, useDeleteStore } from '../../hooks/useStores';
import { DeleteConfirmDialog } from '../../components/common/DeleteConfirmDialog';
import { StoreDialog } from '../../components/stores/StoreDialog';
import { StoreDetailDialog } from '../../components/stores/StoreDetailDialog';
import { Device, Store, StoreFormData, StoreStatus } from '../../types/store';

// Mock cihaz verileri
const mockDevices: Device[] = [
  {
    id: '1',
    name: 'VRF Sistem A',
    type: 'vrf',
    status: 'active',
    serialNumber: 'VRF-2024-0001',
    lastMaintenance: '2024-02-15',
    nextMaintenance: '2024-05-15'
  },
  {
    id: '2',
    name: 'Split Klima B',
    type: 'split_klima',
    status: 'active',
    serialNumber: 'SPL-2024-0002',
    lastMaintenance: '2024-02-01',
    nextMaintenance: '2024-05-01'
  },
  {
    id: '3',
    name: 'Chiller C',
    type: 'chiller',
    status: 'active',
    serialNumber: 'CHL-2024-0003',
    lastMaintenance: '2024-03-01',
    nextMaintenance: '2024-06-01'
  },
  {
    id: '4',
    name: 'Rooftop D',
    type: 'rooftop',
    status: 'maintenance',
    serialNumber: 'RTF-2024-0004',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-04-15'
  },
  {
    id: '5',
    name: 'Fan Coil E',
    type: 'fancoil',
    status: 'warning',
    serialNumber: 'FCL-2024-0005',
    lastMaintenance: '2024-02-20',
    nextMaintenance: '2024-05-20'
  },
  {
    id: '6',
    name: 'Isı Pompası F',
    type: 'isi_pompasi',
    status: 'active',
    serialNumber: 'ISP-2024-0006',
    lastMaintenance: '2024-03-10',
    nextMaintenance: '2024-06-10'
  }
];

// Mock mağaza verilerini güncelleyelim
const mockStores: Store[] = [
  {
    id: '1',
    name: 'Ataşehir Migros',
    address: 'Ataşehir Bulvarı No:123',
    city: 'İstanbul',
    region: 'Ataşehir',
    zone: '2',
    company: 'Migros',
    status: 'active',
    manager: 'Ahmet Yılmaz',
    managerPhone: '0532 123 4567',
    devices: [mockDevices[0], mockDevices[1], mockDevices[4]],
    createdAt: '2024-01-01',
    updatedAt: '2024-03-15'
  },
  {
    id: '2',
    name: 'Kadıköy Migros',
    address: 'Bağdat Caddesi No:456',
    city: 'İstanbul',
    region: 'Kadıköy',
    zone: '1',
    company: 'Migros',
    status: 'active',
    manager: 'Ayşe Demir',
    managerPhone: '0533 234 5678',
    devices: [mockDevices[2], mockDevices[3]],
    createdAt: '2024-01-15',
    updatedAt: '2024-03-15'
  },
  {
    id: '3',
    name: 'Maltepe Migros',
    address: 'Maltepe Sahil Yolu No:789',
    city: 'İstanbul',
    region: 'Maltepe',
    zone: '2',
    company: 'Migros',
    status: 'active',
    manager: 'Mehmet Kaya',
    managerPhone: '0534 345 6789',
    devices: [mockDevices[5], mockDevices[1], mockDevices[4]],
    createdAt: '2024-02-01',
    updatedAt: '2024-03-15'
  },
  {
    id: '4',
    name: 'Nilüfer Migros',
    address: 'Nilüfer Caddesi No:101',
    city: 'Bursa',
    region: 'Nilüfer',
    zone: '1',
    company: 'Migros',
    status: 'active',
    manager: 'Zeynep Şahin',
    managerPhone: '0535 456 7890',
    devices: [mockDevices[0], mockDevices[2], mockDevices[3]],
    createdAt: '2024-02-15',
    updatedAt: '2024-03-15'
  },
  {
    id: '5',
    name: 'Osmangazi Migros',
    address: 'Osmangazi Caddesi No:202',
    city: 'Bursa',
    region: 'Osmangazi',
    zone: '2',
    company: 'Migros',
    status: 'active',
    manager: 'Can Öztürk',
    managerPhone: '0536 567 8901',
    devices: [mockDevices[1], mockDevices[4], mockDevices[5]],
    createdAt: '2024-03-01',
    updatedAt: '2024-03-15'
  },
  // Halkmar mağazaları
  {
    id: '6',
    name: 'İzmit Hakmar',
    address: 'İzmit Merkez No:45',
    city: 'Kocaeli',
    region: 'İzmit',
    zone: '1',
    company: 'Hakmar',
    status: 'active',
    manager: 'Ali Yıldız',
    managerPhone: '0537 678 9012',
    devices: [mockDevices[0], mockDevices[2], mockDevices[5]],
    createdAt: '2024-03-01',
    updatedAt: '2024-03-15'
  },
  {
    id: '7',
    name: 'Gebze Hakmar',
    address: 'Gebze Merkez No:67',
    city: 'Kocaeli',
    region: 'Gebze',
    zone: '3',
    company: 'Hakmar',
    status: 'active',
    manager: 'Selin Aydın',
    managerPhone: '0538 789 0123',
    devices: [mockDevices[1], mockDevices[3]],
    createdAt: '2024-01-20',
    updatedAt: '2024-03-15'
  },
  {
    id: '8',
    name: 'Yıldırım Hakmar',
    address: 'Yıldırım E5 Yanı No:89',
    city: 'Bursa',
    region: 'Yıldırım',
    zone: '2',
    company: 'Hakmar',
    status: 'active',
    manager: 'Burak Çelik',
    managerPhone: '0539 890 1234',
    devices: [mockDevices[4], mockDevices[5], mockDevices[2]],
    createdAt: '2024-02-05',
    updatedAt: '2024-03-15'
  },
  {
    id: '9',
    name: 'Derince Hakmar',
    address: 'Derince Merkez No:34',
    city: 'Kocaeli',
    region: 'Derince',
    zone: '2',
    company: 'Hakmar',
    status: 'active',
    manager: 'Deniz Koç',
    managerPhone: '0540 901 2345',
    devices: [mockDevices[0], mockDevices[1], mockDevices[3]],
    createdAt: '2024-02-20',
    updatedAt: '2024-03-15'
  },
  {
    id: '10',
    name: 'Gürsu Hakmar',
    address: 'Gürsu E5 Caddesi No:56',
    city: 'Bursa',
    region: 'Gürsu',
    zone: '3',
    company: 'Hakmar',
    status: 'active',
    manager: 'Ece Arslan',
    managerPhone: '0541 012 3456',
    devices: [mockDevices[2], mockDevices[4], mockDevices[5]],
    createdAt: '2024-03-05',
    updatedAt: '2024-03-15'
  }
];

// Ana firma grupları
const companies = ['Migros', 'Hakmar'];

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
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const { data: stores = mockStores, isLoading, error } = useStores();
  const createStoreMutation = useCreateStore();
  const updateStoreMutation = useUpdateStore();
  const deleteStoreMutation = useDeleteStore();
  const { setTitle } = usePageTitle();

  React.useEffect(() => {
    setTitle(selectedCompany ? `${selectedCompany} Mağazaları` : 'Mağazalar');
  }, [setTitle, selectedCompany]);

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
        status: 'active' as StoreStatus,
        manager: data.manager,
        managerPhone: data.managerPhone,
        company: data.company,
        devices: data.devices
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
            status: 'active' as StoreStatus,
            manager: data.manager,
            managerPhone: data.managerPhone,
            company: data.company,
            devices: data.devices
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

  // Mağazaları ana firmalara göre filtrele
  const filteredStores = mockStores.filter(store => 
    (!selectedCompany || store.company === selectedCompany) &&
    (store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address?.toLowerCase().includes(searchTerm.toLowerCase()))
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

  // Ana firma seçimi için kart bileşeni
  const CompanyCard = ({ company }: { company: string }) => {
    // Mock verileri kullan
    const companyStores = mockStores.filter(store => store.company === company);
    
    return (
      <Card
        sx={{
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[4]
          },
          bgcolor: selectedCompany === company ? 'primary.light' : 'background.paper',
          height: '100%'
        }}
        onClick={() => setSelectedCompany(company === selectedCompany ? null : company)}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
              <StoreIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>{company}</Typography>
              <Typography variant="body2" color="text.secondary">
                {companyStores.length} Mağaza
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  if (error) {
    return <Typography color="error">Bir hata oluştu: {error.message}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Ana Firma Kartları - Sadece firma seçili değilken göster */}
      {!selectedCompany && (
        <Grid container spacing={2}>
          {companies.map((company) => (
            <Grid item xs={12} sm={6} key={company}>
              <CompanyCard company={company} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Seçilen Firmaya Ait Mağazalar */}
      {selectedCompany && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton size="small" onClick={() => setSelectedCompany(null)}>
                  <ArrowBack />
                </IconButton>
                <Typography variant="h6">{selectedCompany} Mağazaları</Typography>
              </Box>
              <TextField
                placeholder="Mağaza Ara..."
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 300 }}
              />
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(_, newValue) => newValue && setViewMode(newValue)}
                size="small"
              >
                <ToggleButton value="grid">
                  <GridViewIcon />
                </ToggleButton>
                <ToggleButton value="card">
                  <CardViewIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAdd}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                height: 40,
                borderRadius: 2,
                px: 3
              }}
            >
              Yeni Mağaza Ekle
            </Button>
          </Box>

          {viewMode === 'grid' ? (
            <DataGrid
              dataSource={filteredStores}
              showBorders
              columnAutoWidth
              wordWrapEnabled
              rowAlternationEnabled
              hoverStateEnabled
            >
              <LoadPanel enabled={isLoading} />
              <Scrolling mode="virtual" rowRenderingMode="virtual" />
              <StateStoring enabled type="localStorage" storageKey="storeListGridState" />
              <Selection mode="single" />
              <FilterRow visible />
              <HeaderFilter visible />
              <ColumnChooser enabled />
              <Export enabled />
              
              <Column dataField="name" caption="Mağaza Adı" visibleIndex={0} />
              <Column dataField="address" caption="Adres" visibleIndex={1} />
              <Column dataField="city" caption="İl" visibleIndex={2} />
              <Column dataField="region" caption="İlçe" visibleIndex={3} />
              <Column dataField="zone" caption="Bölge" visibleIndex={4} />
              <Column dataField="manager" caption="Mağaza Yetkilisi" visibleIndex={5} />
              <Column dataField="managerPhone" caption="Yetkili Telefon" visibleIndex={6} />
              <Column 
                dataField="devices" 
                caption="Cihaz Sayısı"
                calculateCellValue={(rowData) => rowData.devices?.length || 0}
                visibleIndex={7}
              />
              <Column
                caption="İşlemler"
                width={120}
                alignment="center"
                fixed={true}
                fixedPosition="right"
                visibleIndex={8}
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
          ) : (
            <Grid container spacing={2}>
              {filteredStores.map((store) => (
                <Grid item xs={12} sm={6} md={4} key={store.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="h6" gutterBottom>{store.name}</Typography>
                        <Box>
                          <IconButton size="small" onClick={() => handleView(store)}>
                            <ViewIcon />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleEdit(store)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDelete(store)}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {store.address}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        İl: {store.city}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        İlçe: {store.region}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Bölge: {store.zone}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Cihazlar ({store.devices.length})
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {store.devices.map((device) => (
                            <Chip
                              key={device.id}
                              size="small"
                              icon={<DeviceIcon />}
                              label={device.name}
                              sx={{
                                bgcolor: getStatusColor(device.status).bg,
                                color: getStatusColor(device.status).color,
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      {/* Dialoglar */}
      <StoreDialog
        open={isAddDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleCreateStore}
        mode="add"
        selectedCompany={selectedCompany || ''}
      />
      <StoreDialog
        open={isEditDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleUpdateStore}
        store={selectedStore || undefined}
        mode="edit"
        selectedCompany={selectedCompany || ''}
      />
      <StoreDetailDialog
        open={isDetailDialogOpen}
        onClose={handleDialogClose}
        store={selectedStore || undefined}
      />
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Mağaza Silme"
        content="Bu mağazayı silmek istediğinizden emin misiniz?"
      />
    </Box>
  );
};

export default StoreList; 
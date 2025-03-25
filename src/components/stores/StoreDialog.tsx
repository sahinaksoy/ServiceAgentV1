import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, MenuItem, IconButton, Typography, Box, Chip, Divider, Paper, ListSubheader, InputAdornment } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, DeviceThermostat as DeviceIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Device, Store, StoreFormData } from '../../types/store';
import { storeSchema } from '../../schemas/storeSchema';
import { DeleteConfirmDialog } from '../common/DeleteConfirmDialog';
import { useState } from 'react';
import React from 'react';

// Sabit şirket listesi
const companies = ['Migros', 'Hakmar'];

// Sabit il listesi
const cities = ['İstanbul', 'Bursa', 'Kocaeli'] as const;
type City = typeof cities[number];

// Sabit ilçe listesi (illere göre)
const districts: Record<City, string[]> = {
  'İstanbul': ['Ataşehir', 'Kadıköy', 'Maltepe'],
  'Bursa': ['Nilüfer', 'Osmangazi', 'Yıldırım', 'Gürsu'],
  'Kocaeli': ['İzmit', 'Gebze', 'Derince']
};

// Sabit bölge listesi
const zones = ['1', '2', '3'];

interface StoreDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: StoreFormData) => void;
  store?: Store;
  mode: 'add' | 'edit' | 'view';
  selectedCompany?: string;
}

const statusOptions = [
  { value: 'active', label: 'Aktif' },
  { value: 'inactive', label: 'Pasif' },
  { value: 'maintenance', label: 'Bakımda' },
];

const deviceStatusOptions = [
  { value: 'active', label: 'Aktif' },
  { value: 'warning', label: 'Uyarı' },
  { value: 'error', label: 'Hata' },
  { value: 'maintenance', label: 'Bakımda' },
];

const deviceCategories = {
  iklimlendirme: [
    { value: 'split_klima', label: 'Split Klima' },
    { value: 'vrf', label: 'VRF Sistemi' },
    { value: 'fancoil', label: 'Fan Coil' }
  ],
  sogutma: [
    { value: 'chiller', label: 'Chiller' },
    { value: 'isi_pompasi', label: 'Isı Pompası' }
  ],
  havalandirma: [
    { value: 'havalandirma', label: 'Havalandırma Sistemi' },
    { value: 'rooftop', label: 'Rooftop' },
    { value: 'nem_alici', label: 'Nem Alıcı' }
  ]
};

const defaultDevices: Device[] = [
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
  }
];

export const StoreDialog = ({ open, onClose, onSubmit, store, mode, selectedCompany }: StoreDialogProps) => {
  const [deleteDeviceIndex, setDeleteDeviceIndex] = useState<number | null>(null);
  const isViewMode = mode === 'view';
  const title = {
    add: 'Yeni Mağaza Ekle',
    edit: 'Mağaza Düzenle',
    view: 'Mağaza Detayları',
  }[mode];

  const { control, handleSubmit, formState: { errors }, register, watch, setValue, reset } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: store?.name || '',
      address: store?.address || '',
      city: store?.city || cities[0],
      region: store?.region || '',
      zone: store?.zone || zones[0],
      company: store?.company || selectedCompany || companies[0],
      status: store?.status || 'active',
      manager: store?.manager || '',
      managerPhone: store?.managerPhone || '',
      devices: store?.devices || []
    }
  });

  // Form değerlerini store değiştiğinde güncelle
  React.useEffect(() => {
    if (store && mode === 'edit') {
      reset({
        name: store.name,
        address: store.address,
        city: store.city,
        region: store.region,
        zone: store.zone,
        company: store.company,
        status: store.status,
        manager: store.manager,
        managerPhone: store.managerPhone,
        devices: store.devices
      });
    }
  }, [store, mode, reset]);

  const selectedCity = watch('city');

  // İlçe seçeneklerini il değiştiğinde güncelle
  React.useEffect(() => {
    if (selectedCity) {
      const currentCity = selectedCity as City;
      const currentRegion = watch('region');
      
      // Eğer seçili ilçe, yeni ilin ilçeleri arasında yoksa ilçeyi temizle
      if (currentRegion && !districts[currentCity].includes(currentRegion)) {
        setValue('region', districts[currentCity][0]);
      }
    }
  }, [selectedCity, setValue, watch]);

  const devices = watch('devices') || [];

  const handleAddDevice = () => {
    const newDevice: Device = {
      id: Date.now().toString(),
      name: '',
      type: 'chiller',
      status: 'active',
      serialNumber: '',
      lastMaintenance: new Date().toISOString().split('T')[0],
      nextMaintenance: new Date().toISOString().split('T')[0]
    };
    setValue('devices', [...devices, newDevice]);
  };

  const handleRemoveDevice = (index: number) => {
    setDeleteDeviceIndex(index);
  };

  const handleConfirmDeviceDelete = () => {
    if (deleteDeviceIndex !== null) {
      const newDevices = [...devices];
      newDevices.splice(deleteDeviceIndex, 1);
      setValue('devices', newDevices);
      setDeleteDeviceIndex(null);
    }
  };

  const handleDeviceChange = (index: number, field: keyof Device, value: any) => {
    const newDevices = [...devices];
    newDevices[index] = { ...newDevices[index], [field]: value };
    setValue('devices', newDevices);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mağaza Adı"
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  disabled={isViewMode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="city"
                  control={control}
                  defaultValue={store?.city || cities[0]}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="İl"
                      select
                      error={!!errors.city}
                      helperText={errors.city?.message}
                      disabled={isViewMode}
                    >
                      {cities.map((city) => (
                        <MenuItem key={city} value={city}>
                          {city}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="region"
                  control={control}
                  defaultValue={store?.region || (selectedCity && districts[selectedCity as City][0]) || ''}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="İlçe"
                      select
                      error={!!errors.region}
                      helperText={errors.region?.message}
                      disabled={isViewMode}
                    >
                      {selectedCity && districts[selectedCity as City]?.map((district: string) => (
                        <MenuItem key={district} value={district}>
                          {district}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="zone"
                  control={control}
                  defaultValue={store?.zone || zones[0]}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Bölge"
                      select
                      error={!!errors.zone}
                      helperText={errors.zone?.message}
                      disabled={isViewMode}
                    >
                      {zones.map((zone) => (
                        <MenuItem key={zone} value={zone}>
                          {zone}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="company"
                  control={control}
                  defaultValue={store?.company || selectedCompany || companies[0]}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Firma İsmi"
                      select
                      error={!!errors.company}
                      helperText={errors.company?.message}
                      disabled={true}
                    >
                      {companies.map((company: string) => (
                        <MenuItem key={company} value={company}>
                          {company}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="status"
                  control={control}
                  defaultValue={store?.status || 'active'}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Durum"
                      select
                      error={!!errors.status}
                      helperText={errors.status?.message}
                      disabled={isViewMode}
                    >
                      {statusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mağaza Yetkilisi"
                  {...register('manager')}
                  error={!!errors.manager}
                  helperText={errors.manager?.message}
                  disabled={isViewMode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Yetkili Telefon"
                  {...register('managerPhone')}
                  error={!!errors.managerPhone}
                  helperText={errors.managerPhone?.message}
                  disabled={isViewMode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Adres"
                  {...register('address')}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  disabled={isViewMode}
                />
              </Grid>

              {/* Cihazlar Bölümü */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1">
                    Cihazlar ({devices.length})
                  </Typography>
                  {!isViewMode && (
                    <Button
                      startIcon={<AddIcon />}
                      onClick={handleAddDevice}
                      variant="outlined"
                      size="small"
                    >
                      Cihaz Ekle
                    </Button>
                  )}
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                {devices.map((device, index) => (
                  <Paper key={device.id} sx={{ p: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="subtitle2">
                        Cihaz #{index + 1}
                      </Typography>
                      {!isViewMode && (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRemoveDevice(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Cihaz Adı"
                          value={device.name}
                          onChange={(e) => handleDeviceChange(index, 'name', e.target.value)}
                          disabled={isViewMode}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          select
                          label="Cihaz Tipi"
                          value={device.type}
                          onChange={(e) => handleDeviceChange(index, 'type', e.target.value)}
                          disabled={isViewMode}
                        >
                          {Object.entries(deviceCategories).map(([category, devices]) => [
                            <ListSubheader key={category}>
                              {category === 'iklimlendirme' ? 'İklimlendirme' :
                               category === 'sogutma' ? 'Soğutma' :
                               'Havalandırma'}
                            </ListSubheader>,
                            ...devices.map(device => (
                              <MenuItem key={device.value} value={device.value}>
                                {device.label}
                              </MenuItem>
                            ))
                          ]).flat()}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          select
                          label="Durum"
                          value={device.status}
                          onChange={(e) => handleDeviceChange(index, 'status', e.target.value)}
                          disabled={isViewMode}
                        >
                          {deviceStatusOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Seri No"
                          value={device.serialNumber}
                          onChange={(e) => handleDeviceChange(index, 'serialNumber', e.target.value)}
                          disabled={isViewMode}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type="date"
                          label="Son Bakım"
                          value={device.lastMaintenance}
                          onChange={(e) => handleDeviceChange(index, 'lastMaintenance', e.target.value)}
                          disabled={isViewMode}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type="date"
                          label="Sonraki Bakım"
                          value={device.nextMaintenance}
                          onChange={(e) => handleDeviceChange(index, 'nextMaintenance', e.target.value)}
                          disabled={isViewMode}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>İptal</Button>
          <Button 
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={isViewMode}
          >
            {mode === 'add' ? 'Ekle' : 'Kaydet'}
          </Button>
        </DialogActions>
      </Dialog>

      <DeleteConfirmDialog
        open={deleteDeviceIndex !== null}
        onClose={() => setDeleteDeviceIndex(null)}
        onConfirm={handleConfirmDeviceDelete}
        title="Cihaz Silme"
        content="Bu cihazı silmek istediğinizden emin misiniz?"
      />
    </>
  );
} 
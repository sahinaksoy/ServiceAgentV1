import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, MenuItem, IconButton, Typography, Box, Chip, Divider, Paper, ListSubheader } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, DeviceThermostat as DeviceIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Store, StoreFormData } from '../../types/store';
import { storeSchema } from '../../schemas/storeSchema';
import { DeleteConfirmDialog } from '../common/DeleteConfirmDialog';
import { useState } from 'react';

interface StoreDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: StoreFormData) => void;
  store?: Store;
  mode: 'add' | 'edit' | 'view';
}

interface Device {
  id: string;
  name: string;
  type: string;
  serialNumber: string;
  status: 'active' | 'warning' | 'error' | 'maintenance';
  lastMaintenance: string;
  nextMaintenance: string;
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
    serialNumber: 'VRF-2024-001',
    status: 'active',
    lastMaintenance: '2024-02-15',
    nextMaintenance: '2024-05-15'
  },
  {
    id: '2',
    name: 'Chiller Ünitesi 1',
    type: 'chiller',
    serialNumber: 'CHL-2024-002',
    status: 'active',
    lastMaintenance: '2024-02-01',
    nextMaintenance: '2024-05-01'
  },
  {
    id: '3',
    name: 'Havalandırma Sistemi',
    type: 'havalandirma',
    serialNumber: 'HVL-2024-003',
    status: 'active',
    lastMaintenance: '2024-03-01',
    nextMaintenance: '2024-06-01'
  },
  {
    id: '4',
    name: 'Fan Coil Ünitesi A',
    type: 'fancoil',
    serialNumber: 'FCU-2024-004',
    status: 'maintenance',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-04-15'
  }
];

export const StoreDialog = ({ open, onClose, onSubmit, store, mode }: StoreDialogProps) => {
  const [deleteDeviceIndex, setDeleteDeviceIndex] = useState<number | null>(null);
  const isViewMode = mode === 'view';
  const title = {
    add: 'Yeni Mağaza Ekle',
    edit: 'Mağaza Düzenle',
    view: 'Mağaza Detayları',
  }[mode];

  const { control, handleSubmit, formState: { errors }, register, watch, setValue } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: store || {
      name: '',
      address: '',
      phone: '',
      email: '',
      region: '',
      company: '',
      status: 'active',
      manager: '',
      employeeCount: 1,
      devices: defaultDevices,
    },
  });

  const devices = watch('devices') || [];

  const handleAddDevice = () => {
    const newDevice: Device = {
      id: Date.now().toString(),
      name: '',
      type: 'chiller',
      serialNumber: '',
      status: 'active',
      lastMaintenance: new Date().toISOString().split('T')[0],
      nextMaintenance: new Date().toISOString().split('T')[0],
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
                  disabled={mode === 'view'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="E-posta"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={mode === 'view'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Telefon"
                  {...register('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  disabled={mode === 'view'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Bölge"
                  {...register('region')}
                  error={!!errors.region}
                  helperText={errors.region?.message}
                  disabled={mode === 'view'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Şirket"
                  {...register('company')}
                  error={!!errors.company}
                  helperText={errors.company?.message}
                  disabled={mode === 'view'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Durum"
                  {...register('status')}
                  select
                  error={!!errors.status}
                  helperText={errors.status?.message}
                  disabled={mode === 'view'}
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mağaza Yetkilisi"
                  {...register('manager')}
                  error={!!errors.manager}
                  helperText={errors.manager?.message}
                  disabled={mode === 'view'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Yetkili Telefon"
                  {...register('managerPhone')}
                  error={!!errors.managerPhone}
                  helperText={errors.managerPhone?.message}
                  disabled={mode === 'view'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Çalışan Sayısı"
                  {...register('employeeCount')}
                  type="number"
                  error={!!errors.employeeCount}
                  helperText={errors.employeeCount?.message}
                  disabled={mode === 'view'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Adres"
                  {...register('address')}
                  multiline
                  rows={3}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  disabled={mode === 'view'}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
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
                  <Divider />
                </Box>

                {devices.map((device, index) => (
                  <Paper 
                    key={device.id} 
                    sx={{ 
                      p: 2, 
                      mb: 2, 
                      bgcolor: '#f8f9fa',
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                        <DeviceIcon sx={{ mr: 1 }} />
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
                          label="Seri No"
                          value={device.serialNumber}
                          onChange={(e) => handleDeviceChange(index, 'serialNumber', e.target.value)}
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
                            <ListSubheader key={category}>{category.toUpperCase()}</ListSubheader>,
                            ...devices.map(option => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))
                          ])}
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
                          type="date"
                          label="Son Bakım Tarihi"
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
                          label="Sonraki Bakım Tarihi"
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

            {mode !== 'view' && (
              <DialogActions>
                <Button onClick={onClose}>İptal</Button>
                <Button type="submit" variant="contained">
                  {mode === 'add' ? 'Ekle' : 'Güncelle'}
                </Button>
              </DialogActions>
            )}
          </Box>
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={deleteDeviceIndex !== null}
        onClose={() => setDeleteDeviceIndex(null)}
        onConfirm={handleConfirmDeviceDelete}
        title="Cihaz Silme"
        content={`Bu cihazı silmek istediğinizden emin misiniz?`}
      />
    </>
  );
} 
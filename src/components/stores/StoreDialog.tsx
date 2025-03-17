import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, MenuItem, Stack, FormControl, InputLabel, Select } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Store, StoreFormData } from '../../types/store';
import { storeSchema } from '../../schemas/storeSchema';

interface StoreDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: StoreFormData) => void;
  store?: Store;
  mode: 'add' | 'edit' | 'view';
}

const statusOptions = [
  { value: 'active', label: 'Aktif' },
  { value: 'inactive', label: 'Pasif' },
  { value: 'maintenance', label: 'Bakımda' },
];

export const StoreDialog = ({ open, onClose, onSubmit, store, mode }: StoreDialogProps) => {
  const isViewMode = mode === 'view';
  const title = {
    add: 'Yeni Mağaza Ekle',
    edit: 'Mağaza Düzenle',
    view: 'Mağaza Detayları',
  }[mode];

  const { control, handleSubmit, formState: { errors } } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: store || {
      name: '',
      address: '',
      phone: '',
      email: '',
      region: '',
      company: '',
      status: 'active' as const,
      authorizedName: '',
      authorizedPhone: '',
      employeeCount: 0
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Mağaza Adı"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  disabled={isViewMode}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Adres"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  disabled={isViewMode}
                  multiline
                  rows={3}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Telefon"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  disabled={isViewMode}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="E-posta"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={isViewMode}
                  type="email"
                />
              )}
            />
            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Bölge"
                  error={!!errors.region}
                  helperText={errors.region?.message}
                  disabled={isViewMode}
                />
              )}
            />
            <Controller
              name="company"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Şirket"
                  error={!!errors.company}
                  helperText={errors.company?.message}
                  disabled={isViewMode}
                />
              )}
            />
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.status}>
                  <InputLabel>Durum</InputLabel>
                  <Select
                    {...field}
                    label="Durum"
                    disabled={isViewMode}
                  >
                    <MenuItem value="active">Aktif</MenuItem>
                    <MenuItem value="inactive">Kapalı</MenuItem>
                    <MenuItem value="maintenance">Bakımda</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="authorizedName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Yetkili İsmi"
                  error={!!errors.authorizedName}
                  helperText={errors.authorizedName?.message}
                  disabled={isViewMode}
                />
              )}
            />
            <Controller
              name="authorizedPhone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Yetkili Tel No"
                  error={!!errors.authorizedPhone}
                  helperText={errors.authorizedPhone?.message}
                  disabled={isViewMode}
                />
              )}
            />
            <Controller
              name="employeeCount"
              control={control}
              render={({ field: { value, onChange, ...field } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Çalışan Sayısı"
                  type="number"
                  value={value}
                  onChange={(e) => onChange(Number(e.target.value))}
                  error={!!errors.employeeCount}
                  helperText={errors.employeeCount?.message}
                  disabled={isViewMode}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            {isViewMode ? 'Kapat' : 'İptal'}
          </Button>
          {!isViewMode && (
            <Button type="submit" variant="contained" color="primary">
              {mode === 'add' ? 'Ekle' : 'Güncelle'}
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
} 
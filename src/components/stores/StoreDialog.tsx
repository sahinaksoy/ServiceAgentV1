import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, MenuItem } from '@mui/material';
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
      status: 'active',
      manager: '',
      employeeCount: 1,
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Mağaza Adı"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    disabled={isViewMode}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="E-posta"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    disabled={isViewMode}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Telefon"
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    disabled={isViewMode}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="region"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Bölge"
                    fullWidth
                    error={!!errors.region}
                    helperText={errors.region?.message}
                    disabled={isViewMode}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="company"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Şirket"
                    fullWidth
                    error={!!errors.company}
                    helperText={errors.company?.message}
                    disabled={isViewMode}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Durum"
                    fullWidth
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
              <Controller
                name="manager"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Yönetici"
                    fullWidth
                    error={!!errors.manager}
                    helperText={errors.manager?.message}
                    disabled={isViewMode}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="employeeCount"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <TextField
                    {...field}
                    type="number"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    label="Çalışan Sayısı"
                    fullWidth
                    error={!!errors.employeeCount}
                    helperText={errors.employeeCount?.message}
                    disabled={isViewMode}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Adres"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    disabled={isViewMode}
                  />
                )}
              />
            </Grid>
          </Grid>
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
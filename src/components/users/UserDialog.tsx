import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, MenuItem, Autocomplete, Chip } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, UserFormData, UserRole, UserStatus } from '../../types/user';
import { userSchema } from '../../schemas/userSchema';
import { useCreateUser, useUpdateUser } from '../../hooks/useUsers';

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  user?: User;
}

const roles: UserRole[] = [
  'saha_calisani',
  'ekip_sefi',
  'muhendis',
  'yonetici',
  'mudur',
  'taseron_saha_calisani',
  'taseron_ekip_sefi'
];
const statuses: UserStatus[] = ['active', 'inactive', 'pending'];
const regions = ['Kadıköy', 'Beşiktaş', 'Şişli']; // API'den gelebilir
const companies = ['Meser', 'Arveta', 'Noord']; // API'den gelebilir

export const UserDialog = ({ open, onClose, mode, user }: UserDialogProps) => {
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      roles: [],
      status: 'active',
      region: '',
      company: '',
    }
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      if (mode === 'add') {
        await createUser.mutateAsync(data);
      } else if (user) {
        await updateUser.mutateAsync({ id: user.id, data });
      }
      onClose();
      reset();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2
        }
      }}
    >
      <DialogTitle>
        {mode === 'add' ? 'Yeni Kullanıcı Ekle' : 'Kullanıcı Düzenle'}
      </DialogTitle>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Ad"
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Soyad"
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
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
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="roles"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    options={roles}
                    getOptionLabel={(option) => {
                      const roleLabels: Record<string, string> = {
                        'saha_calisani': 'Saha Çalışanı',
                        'ekip_sefi': 'Ekip Şefi',
                        'muhendis': 'Mühendis',
                        'yonetici': 'Yönetici',
                        'mudur': 'Müdür',
                        'taseron_saha_calisani': 'Taşeron Saha Çalışanı',
                        'taseron_ekip_sefi': 'Taşeron Ekip Şefi'
                      };
                      return roleLabels[option] || option;
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Roller"
                        error={!!errors.roles}
                        helperText={errors.roles?.message}
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => {
                        const roleLabels: Record<string, string> = {
                          'saha_calisani': 'Saha Çalışanı',
                          'ekip_sefi': 'Ekip Şefi',
                          'muhendis': 'Mühendis',
                          'yonetici': 'Yönetici',
                          'mudur': 'Müdür',
                          'taseron_saha_calisani': 'Taşeron Saha Çalışanı',
                          'taseron_ekip_sefi': 'Taşeron Ekip Şefi'
                        };
                        return (
                          <Chip
                            {...getTagProps({ index })}
                            key={option}
                            label={roleLabels[option] || option}
                            color="primary"
                            variant="outlined"
                          />
                        );
                      })
                    }
                    onChange={(_, value) => field.onChange(value)}
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
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
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
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Bölge"
                    fullWidth
                    error={!!errors.region}
                    helperText={errors.region?.message}
                  >
                    {regions.map((region) => (
                      <MenuItem key={region} value={region}>
                        {region}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="company"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Şirket"
                    fullWidth
                    error={!!errors.company}
                    helperText={errors.company?.message}
                  >
                    {companies.map((company) => (
                      <MenuItem key={company} value={company}>
                        {company}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>İptal</Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isSubmitting || createUser.isPending || updateUser.isPending}
          >
            {mode === 'add' ? 'Ekle' : 'Güncelle'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}; 
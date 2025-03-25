import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, MenuItem, Autocomplete, Chip, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, UserFormData, UserRole, UserStatus } from '../../types/user';
import { userSchema } from '../../schemas/userSchema';
import { useCreateUser, useUpdateUser } from '../../hooks/useUsers';
import { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import ArticleIcon from '@mui/icons-material/Article';

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
  'taseron_saha_calisani',
  'taseron_ekip_sefi',
  'admin'
];
const statuses: UserStatus[] = ['active', 'inactive', 'pending'];
const companies = ['Meser', 'Arveta', 'Noord'];

const cities = ['İstanbul', 'Bursa', 'Kocaeli'];

const districts: Record<string, string[]> = {
  'İstanbul': ['Kadıköy', 'Beşiktaş', 'Şişli', 'Üsküdar', 'Maltepe', 'Ataşehir', 'Kartal', 'Pendik', 'Bakırköy', 'Beylikdüzü'],
  'Bursa': ['Nilüfer', 'Osmangazi', 'Yıldırım', 'Gemlik', 'Mudanya', 'İnegöl'],
  'Kocaeli': ['İzmit', 'Gebze', 'Darıca', 'Körfez', 'Gölcük', 'Derince']
};

const regions = ['1. Bölge', '2. Bölge', '3. Bölge'];

export const UserDialog = ({ open, onClose, mode, user }: UserDialogProps) => {
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const [selectedCity, setSelectedCity] = useState<string>('');

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
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
      city: '',
      district: '',
      region: '',
      company: '',
    }
  });

  // İl değiştiğinde ilçeyi sıfırla
  const cityValue = watch('city');
  useEffect(() => {
    if (cityValue !== selectedCity) {
      setSelectedCity(cityValue);
      setValue('district', '');
    }
  }, [cityValue, setValue, selectedCity]);

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

            <Grid item xs={12} sm={6}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.city}>
                    <InputLabel>İl</InputLabel>
                    <Select
                      {...field}
                      label="İl"
                    >
                      {cities.map((city) => (
                        <MenuItem key={city} value={city}>
                          {city}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.city && (
                      <FormHelperText>{errors.city.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="district"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.district}>
                    <InputLabel>İlçe</InputLabel>
                    <Select
                      {...field}
                      label="İlçe"
                      disabled={!selectedCity}
                    >
                      {selectedCity && districts[selectedCity]?.map((district) => (
                        <MenuItem key={district} value={district}>
                          {district}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.district && (
                      <FormHelperText>{errors.district.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="region"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.region}>
                    <InputLabel>Bölge</InputLabel>
                    <Select
                      {...field}
                      label="Bölge"
                    >
                      {regions.map((region) => (
                        <MenuItem key={region} value={region}>
                          {region}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.region && (
                      <FormHelperText>{errors.region.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="company"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.company}>
                    <InputLabel>Şirket</InputLabel>
                    <Select
                      {...field}
                      label="Şirket"
                    >
                      {companies.map((company) => (
                        <MenuItem key={company} value={company}>
                          {company}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.company && (
                      <FormHelperText>{errors.company.message}</FormHelperText>
                    )}
                  </FormControl>
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
                        'taseron_saha_calisani': 'Taşeron Saha Çalışanı',
                        'taseron_ekip_sefi': 'Taşeron Ekip Şefi',
                        'admin': 'Admin'
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
                          'taseron_saha_calisani': 'Taşeron Saha Çalışanı',
                          'taseron_ekip_sefi': 'Taşeron Ekip Şefi',
                          'admin': 'Admin'
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

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EngineeringIcon />
            <Typography variant="h6">Servisler</Typography>
          </Box>
          <Button variant="outlined" startIcon={<AddIcon />}>
            Ekle
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Box>
              <Typography variant="subtitle1">PANO ARIZASI</Typography>
              <Typography variant="body2" color="text.secondary">Kategori: Elektrik panosu bakımı</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Süre</Typography>
                <Typography>120 Saat</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Durum</Typography>
                <Chip label="Beklemede" color="warning" size="small" />
              </Box>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BuildIcon />
            <Typography variant="h6">Parçalar</Typography>
          </Box>
          <Button variant="outlined" startIcon={<AddIcon />}>
            Ekle
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Box>
              <Typography variant="subtitle1">Sigortalar</Typography>
              <Typography variant="body2" color="text.secondary">Sigorta değişimi</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Miktar</Typography>
                <Typography>4 ADET</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Birim Fiyat</Typography>
                <Typography>100 ₺</Typography>
              </Box>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ArticleIcon />
          <Typography variant="h6">Form</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <ArticleIcon />
            <Box>
              <Typography variant="subtitle1">Teknik Servis Formu</Typography>
              <Typography variant="body2" color="text.secondary">Form henüz doldurulmadı</Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Button variant="contained" color="primary">
              Formu Doldur
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}; 
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Grid, Box } from '@mui/material';
import { Customer, CustomerFormData, customerSchema } from '../types/customer';

interface CustomerFormProps {
  initialData?: Customer;
  onSubmit: (data: CustomerFormData) => void;
  isSubmitting?: boolean;
}

export const CustomerForm = ({ initialData, onSubmit, isSubmitting }: CustomerFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema.omit({ id: true })),
    defaultValues: initialData,
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            {...register('name')}
            label="İsim"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('email')}
            label="E-posta"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('phone')}
            label="Telefon"
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('address')}
            label="Adres"
            fullWidth
            multiline
            rows={3}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
          >
            {initialData ? 'Güncelle' : 'Kaydet'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}; 
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Typography, Paper } from '@mui/material';
import { CustomerForm } from '../../components/CustomerForm';
import { customerService } from '../../services/customerService';
import type { CustomerFormData } from '../../types/customer';

export const CustomerEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isNewCustomer = id === 'new';

  const { data: customer, isLoading } = useQuery({
    queryKey: ['customer', id],
    queryFn: () => customerService.getById(Number(id)),
    enabled: !isNewCustomer,
  });

  const mutation = useMutation({
    mutationFn: (data: CustomerFormData) => {
      if (isNewCustomer) {
        return customerService.create(data);
      }
      return customerService.update(Number(id), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      navigate('/customers');
    },
  });

  if (!isNewCustomer && isLoading) {
    return <Typography>Yükleniyor...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {isNewCustomer ? 'Yeni Müşteri' : 'Müşteri Düzenle'}
      </Typography>
      <Paper sx={{ p: 2 }}>
        <CustomerForm
          initialData={customer}
          onSubmit={mutation.mutate}
          isSubmitting={mutation.isPending}
        />
      </Paper>
    </Box>
  );
}; 
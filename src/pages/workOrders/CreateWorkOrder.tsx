import { Box } from '@mui/material';
import { WorkOrder } from '../../types/workOrder';
import { WorkOrderForm } from '../../components/work-orders';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { workOrderAPI } from '../../services/api';
import { usePageTitle } from '../../contexts/PageTitleContext';
import React from 'react';
import { useSnackbar } from 'notistack';
import dayjs from 'dayjs';

const CreateWorkOrder = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setTitle } = usePageTitle();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    setTitle('Yeni İş Emri Oluştur');
  }, [setTitle]);

  const createMutation = useMutation({
    mutationFn: workOrderAPI.createWorkOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workOrders'] });
      enqueueSnackbar('İş emri başarıyla oluşturuldu', { variant: 'success' });
      navigate('/work-orders');
    },
    onError: (error) => {
      console.error('İş emri oluşturulurken hata oluştu:', error);
      enqueueSnackbar('İş emri oluşturulurken bir hata oluştu', { variant: 'error' });
    }
  });

  const handleCreateWorkOrder = async (workOrder: WorkOrder) => {
    try {
      await createMutation.mutateAsync(workOrder);
    } catch (error) {
      throw error;
    }
  };

  const handleCancel = () => {
    navigate('/work-orders');
  };

  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: 800,
      mx: 'auto',
      bgcolor: 'background.paper',
      borderRadius: 1,
      boxShadow: 1
    }}>
      <WorkOrderForm
        onSubmit={handleCreateWorkOrder}
        onCancel={handleCancel}
      />
    </Box>
  );
};

export default CreateWorkOrder; 
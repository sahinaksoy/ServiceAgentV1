import { Box } from '@mui/material';
import { WorkOrderFormData } from '../../types/workOrder';
import { WorkOrderForm } from '../../components/work-orders';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { workOrderAPI } from '../../services/api';
import { usePageTitle } from '../../contexts/PageTitleContext';
import React from 'react';

const CreateWorkOrder = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setTitle } = usePageTitle();

  React.useEffect(() => {
    setTitle('Yeni İş Emri Oluştur');
  }, [setTitle]);

  const createMutation = useMutation({
    mutationFn: workOrderAPI.createWorkOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workOrders'] });
      navigate('/work-orders');
    },
  });

  const handleCreateWorkOrder = async (data: WorkOrderFormData) => {
    try {
      await createMutation.mutateAsync(data);
    } catch (error) {
      console.error('Error creating work order:', error);
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
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { workOrderAPI } from '../../services/api';
import { WorkOrder } from '../../types/workOrder';
import WorkOrderForm from '../../components/work-orders/WorkOrderForm';
import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
import { usePageTitle } from '../../contexts/PageTitleContext';

const WorkOrderEdit = () => {
  const { workOrderId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { setTitle } = usePageTitle();

  React.useEffect(() => {
    setTitle('İş Emri Düzenle');
  }, [setTitle]);

  const { data: workOrder, isLoading } = useQuery<WorkOrder>({
    queryKey: ['workOrder', workOrderId],
    queryFn: () => workOrderAPI.getWorkOrderById(Number(workOrderId)),
    enabled: !!workOrderId
  });

  const handleSubmit = async (updatedWorkOrder: WorkOrder) => {
    try {
      const result = await workOrderAPI.updateWorkOrder(updatedWorkOrder.id, updatedWorkOrder);
      queryClient.invalidateQueries({ queryKey: ['workOrders'] });
      navigate('/work-orders');
      enqueueSnackbar('İş emri başarıyla güncellendi', { variant: 'success' });
    } catch (error) {
      console.error('İş emri güncellenirken bir hata oluştu:', error);
      enqueueSnackbar('İş emri güncellenirken bir hata oluştu', { variant: 'error' });
    }
  };

  const handleCancel = () => {
    navigate('/work-orders');
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Yükleniyor...</Typography>
      </Box>
    );
  }

  if (!workOrder) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>İş emri bulunamadı</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <WorkOrderForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialData={workOrder}
      />
    </Box>
  );
};

export default WorkOrderEdit; 
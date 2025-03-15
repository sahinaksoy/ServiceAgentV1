import { useState } from 'react';
import { Box, Paper, Typography, IconButton, useTheme, useMediaQuery, Chip } from '@mui/material';
import DataGrid, {
  Column,
  Paging,
  Pager,
  FilterRow,
  HeaderFilter,
  ColumnChooser,
  StateStoring,
  Export,
  Selection,
  Scrolling,
  LoadPanel
} from 'devextreme-react/data-grid';
import { Add as AddIcon } from '@mui/icons-material';
import { WorkOrder, WorkOrderFormData } from '../../types/workOrder';
import { WorkOrderDialog } from '../../components/workOrders/WorkOrderDialog';
import { useGlobalUsers } from '../../hooks/useGlobalUsers';

const mockRegions = ['Kadıköy', 'Beşiktaş', 'Şişli', 'Üsküdar'];

const mockWorkOrders: WorkOrder[] = [
  {
    id: '1',
    type: 'emergency',
    region: 'Kadıköy',
    date: new Date().toISOString(),
    description: 'Acil arıza bildirimi',
    assignedTo: '1',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const statusColors = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
  inProgress: 'info',
  completed: 'default',
} as const;

const statusLabels = {
  pending: 'Onay Bekliyor',
  approved: 'Onaylandı',
  rejected: 'Reddedildi',
  inProgress: 'Devam Ediyor',
  completed: 'Tamamlandı',
} as const;

const typeLabels = {
  emergency: 'Acil Çağrılar',
  maintenance: 'Bakım',
  investment: 'Yatırım',
} as const;

const WorkOrderList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { data: users = [] } = useGlobalUsers();

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  const handleCreateWorkOrder = async (data: WorkOrderFormData) => {
    try {
      // API çağrısı yapılacak
      console.log('Creating work order:', data);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error creating work order:', error);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">İş Emirlerim</Typography>
        <IconButton color="primary" onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </Box>

      <Paper sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <DataGrid
          dataSource={mockWorkOrders}
          showBorders
          rowAlternationEnabled
          columnAutoWidth
          wordWrapEnabled
          height="100%"
          remoteOperations={false}
          noDataText="İş emri bulunamadı"
          repaintChangesOnly={true}
        >
          <LoadPanel enabled={false} />
          <Scrolling mode="virtual" rowRenderingMode="virtual" />
          <StateStoring enabled type="localStorage" storageKey="workOrderListGridState" />
          <Selection mode="single" />
          <FilterRow visible />
          <HeaderFilter visible />
          <ColumnChooser enabled />
          <Export enabled />
          
          <Column
            dataField="type"
            caption="Arıza Türü"
            cellRender={(cell: any) => typeLabels[cell.value as keyof typeof typeLabels]}
          />
          <Column dataField="region" caption="Bölge" />
          <Column 
            dataField="date" 
            caption="Tarih"
            dataType="date"
            format="dd.MM.yyyy"
          />
          <Column dataField="description" caption="Açıklama" />
          <Column
            dataField="assignedTo"
            caption="Atanan Kişi"
            cellRender={(cell: any) => {
              const user = users.find(u => u.id === cell.value);
              return user ? `${user.firstName} ${user.lastName}` : '';
            }}
          />
          <Column
            dataField="status"
            caption="Durum"
            cellRender={(cell: any) => (
              <Chip
                label={statusLabels[cell.value as keyof typeof statusLabels]}
                color={statusColors[cell.value as keyof typeof statusColors]}
                size="small"
              />
            )}
          />

          <Paging defaultPageSize={10} />
          <Pager
            showPageSizeSelector
            allowedPageSizes={[10, 20, 50]}
            showInfo
            showNavigationButtons
          />
        </DataGrid>
      </Paper>

      <WorkOrderDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleCreateWorkOrder}
        regions={mockRegions}
      />
    </Box>
  );
};

export default WorkOrderList; 
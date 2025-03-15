import { useState, useCallback } from 'react';
import { Box, Paper, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
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
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { Store, StoreFormData } from '../../types/store';
import { useStores, useCreateStore, useUpdateStore, useDeleteStore } from '../../hooks/useStores';
import { DeleteConfirmDialog } from '../../components/common/DeleteConfirmDialog';
import { StoreDialog } from '../../components/stores/StoreDialog';

const StoreList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: stores, isLoading, error } = useStores();
  const createStoreMutation = useCreateStore();
  const updateStoreMutation = useUpdateStore();
  const deleteStoreMutation = useDeleteStore();

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  const handleEdit = (store: Store) => {
    setSelectedStore(store);
    setIsEditDialogOpen(true);
  };

  const handleView = (store: Store) => {
    setSelectedStore(store);
    setIsDetailDialogOpen(true);
  };

  const handleDelete = (store: Store) => {
    setSelectedStore(store);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedStore) {
      try {
        await deleteStoreMutation.mutateAsync(selectedStore.id);
        setIsDeleteDialogOpen(false);
        setSelectedStore(null);
      } catch (error) {
        console.error('Error deleting store:', error);
      }
    }
  };

  const handleCreateStore = async (data: StoreFormData) => {
    try {
      await createStoreMutation.mutateAsync(data);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error creating store:', error);
    }
  };

  const handleUpdateStore = async (data: StoreFormData) => {
    if (selectedStore) {
      try {
        await updateStoreMutation.mutateAsync({ id: selectedStore.id, data });
        setIsEditDialogOpen(false);
        setSelectedStore(null);
      } catch (error) {
        console.error('Error updating store:', error);
      }
    }
  };

  const handleDialogClose = useCallback(() => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsDetailDialogOpen(false);
    setSelectedStore(null);
  }, []);

  if (error) {
    return <Typography color="error">Bir hata oluştu: {error.message}</Typography>;
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Mağazalarım</Typography>
        <IconButton color="primary" onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </Box>

      <Paper sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <DataGrid
          dataSource={stores || []}
          showBorders
          rowAlternationEnabled
          columnAutoWidth
          wordWrapEnabled
          height="100%"
          remoteOperations={false}
          noDataText="Mağaza bulunamadı"
          repaintChangesOnly={true}
        >
          <LoadPanel enabled={isLoading} />
          <Scrolling mode="virtual" rowRenderingMode="virtual" />
          <StateStoring enabled type="localStorage" storageKey="storeListGridState" />
          <Selection mode="single" />
          <FilterRow visible />
          <HeaderFilter visible />
          <ColumnChooser enabled />
          <Export enabled />
          
          <Column dataField="name" caption="Mağaza Adı" />
          <Column dataField="address" caption="Adres" visible={!isMobile} />
          <Column dataField="phone" caption="Telefon" />
          <Column dataField="email" caption="E-posta" visible={!isMobile} />
          <Column dataField="region" caption="Bölge" />
          <Column dataField="company" caption="Şirket" />
          <Column dataField="status" caption="Durum" />
          <Column dataField="manager" caption="Yönetici" />
          <Column dataField="employeeCount" caption="Çalışan Sayısı" dataType="number" />
          <Column
            caption="İşlemler"
            width={120}
            alignment="center"
            cellRender={(cell: any) => (
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                <IconButton size="small" onClick={() => handleView(cell.data)}>
                  <ViewIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => handleEdit(cell.data)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => handleDelete(cell.data)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
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

      <StoreDialog
        open={isAddDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleCreateStore}
        mode="add"
      />

      {selectedStore && (
        <>
          <StoreDialog
            open={isEditDialogOpen}
            onClose={handleDialogClose}
            onSubmit={handleUpdateStore}
            store={selectedStore}
            mode="edit"
          />

          <StoreDialog
            open={isDetailDialogOpen}
            onClose={handleDialogClose}
            onSubmit={() => {}}
            store={selectedStore}
            mode="view"
          />

          <DeleteConfirmDialog
            open={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleConfirmDelete}
            title="Mağaza Silme"
            content={`${selectedStore.name} isimli mağazayı silmek istediğinizden emin misiniz?`}
          />
        </>
      )}
    </Box>
  );
};

export default StoreList; 
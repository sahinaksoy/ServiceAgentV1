import { useState, useCallback } from 'react';
import { Box, Paper, Typography, IconButton, useTheme, useMediaQuery, CircularProgress } from '@mui/material';
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
import { User } from '../../types/user';
import { UserDialog } from '../../components/users/UserDialog';
import { UserDetailDialog } from '../../components/users/UserDetailDialog';
import { DeleteConfirmDialog } from '../../components/common/DeleteConfirmDialog';
import { useUsers, useDeleteUser } from '../../hooks/useUsers';
import { usePageTitle } from '../../contexts/PageTitleContext';
import React from 'react';

const UserList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: users, isLoading, error } = useUsers();
  const deleteUserMutation = useDeleteUser();
  const { setTitle } = usePageTitle();

  React.useEffect(() => {
    setTitle('Kullanıcılar');
  }, [setTitle]);

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
    setIsDetailDialogOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      try {
        await deleteUserMutation.mutateAsync(selectedUser.id);
        setIsDeleteDialogOpen(false);
        setSelectedUser(null);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleDialogClose = useCallback(() => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsDetailDialogOpen(false);
    setSelectedUser(null);
  }, []);

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">
          Bir hata oluştu: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Kullanıcılar</Typography>
        <IconButton color="primary" onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </Box>

      <Paper sx={{ flexGrow: 1, position: 'relative' }}>
        {isLoading ? (
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: 'rgba(255, 255, 255, 0.7)',
              zIndex: 1
            }}
          >
            <CircularProgress />
          </Box>
        ) : null}

        <DataGrid
          dataSource={users || []}
          showBorders
          rowAlternationEnabled
          columnAutoWidth
          wordWrapEnabled
          height="100%"
          remoteOperations={false}
          noDataText="Kullanıcı bulunamadı"
          repaintChangesOnly={true}
        >
          <StateStoring enabled type="localStorage" storageKey="userListGridState" />
          <FilterRow visible />
          <HeaderFilter visible />
          <ColumnChooser enabled />
          
          <Column dataField="firstName" caption="Ad" />
          <Column dataField="lastName" caption="Soyad" />
          <Column dataField="email" caption="E-posta" />
          <Column dataField="phone" caption="Telefon" />
          <Column dataField="roles" caption="Roller" />
          <Column dataField="status" caption="Durum" />
          <Column dataField="region" caption="Bölge" />
          <Column dataField="company" caption="Şirket" />
          
          <Column
            caption="İşlemler"
            width={120}
            alignment="center"
            cellRender={(cell) => (
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

      <UserDialog
        open={isAddDialogOpen}
        onClose={handleDialogClose}
        mode="add"
      />

      {selectedUser && (
        <>
          <UserDialog
            open={isEditDialogOpen}
            onClose={handleDialogClose}
            mode="edit"
            user={selectedUser}
          />

          <UserDetailDialog
            open={isDetailDialogOpen}
            onClose={handleDialogClose}
            user={selectedUser}
          />

          <DeleteConfirmDialog
            open={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleConfirmDelete}
            title="Kullanıcı Silme"
            content={`${selectedUser.firstName} ${selectedUser.lastName} isimli kullanıcıyı silmek istediğinizden emin misiniz?`}
          />
        </>
      )}
    </Box>
  );
};

export default UserList; 
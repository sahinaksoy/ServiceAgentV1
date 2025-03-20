import { useUsers } from '../hooks/useUsers';
import { Chip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

const Users = () => {
  const { data: users = [] } = useUsers();
  
  const ROW_HEIGHT = 52;
  const HEADER_HEIGHT = 56;
  const PAGINATION_HEIGHT = 60;
  
  const calculatedHeight = Math.min(
    Math.max(
      (users.length * ROW_HEIGHT) + HEADER_HEIGHT + PAGINATION_HEIGHT,
      400 // minimum yükseklik
    ),
    800 // maksimum yükseklik
  );

  const columns: GridColDef[] = [
    {
      field: 'status',
      headerName: 'Durum',
      width: 120,
      renderCell: (params) => {
        const isActive = params.value === 'Aktif';
        return (
          <Chip
            label={params.value}
            size="small"
            color={isActive ? 'success' : 'error'}
            sx={{
              minWidth: '80px',
              '& .MuiChip-label': {
                px: 1,
                fontSize: '0.75rem',
                fontWeight: 500
              },
              backgroundColor: isActive ? 'rgba(46, 125, 50, 0.1)' : 'rgba(211, 47, 47, 0.1)',
              color: isActive ? '#2e7d32' : '#d32f2f',
              border: '1px solid',
              borderColor: isActive ? 'rgba(46, 125, 50, 0.2)' : 'rgba(211, 47, 47, 0.2)'
            }}
          />
        );
      },
      align: 'center',
      headerAlign: 'center'
    },
  ];

  const mockUsers = [
    {
      id: 1,
      // ... diğer alanlar ...
      status: 'active' // veya 'inactive'
    },
    // ... diğer kullanıcılar
  ];

  const transformUserData = (user) => ({
    ...user,
    status: user.status === 'active' ? 'Aktif' : 'Pasif'
  });

  return (
    <Box sx={{ p: 3 }}>
      <Paper 
        elevation={0}
        sx={{ 
          height: calculatedHeight,
          overflow: 'hidden'
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          autoHeight
          hideFooterPagination
          hideFooter
          disableRowSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid',
              borderColor: 'divider'
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'background.paper',
              borderBottom: '2px solid',
              borderColor: 'divider'
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default Users; 
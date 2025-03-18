import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DataGrid } from 'devextreme-react/data-grid';
import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { customerService } from '../../services/customerService';

export const CustomerList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: customerService.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: customerService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });

  const columns = [
    { dataField: 'name', caption: 'İsim' },
    { dataField: 'email', caption: 'E-posta' },
    { dataField: 'phone', caption: 'Telefon', visible: !isMobile },
    { dataField: 'address', caption: 'Adres', visible: !isMobile },
    {
      type: 'buttons',
      buttons: [
        {
          hint: 'Düzenle',
          icon: 'edit',
          onClick: (e: any) => {
            navigate(`/customers/${e.row?.data.id}/edit`);
          },
        },
        {
          hint: 'Sil',
          icon: 'trash',
          onClick: (e: any) => {
            if (window.confirm('Bu müşteriyi silmek istediğinizden emin misiniz?')) {
              deleteMutation.mutate(Number(e.row?.data.id));
            }
          },
        },
      ],
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Müşteriler</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/customers/new')}
        >
          Yeni Müşteri
        </Button>
      </Box>
      <DataGrid
        dataSource={customers}
        columns={columns as any[]}
        showBorders
        columnAutoWidth
        rowAlternationEnabled
        height="calc(100vh - 200px)"
        loadPanel={{ enabled: isLoading }}
      />
    </Box>
  );
}; 
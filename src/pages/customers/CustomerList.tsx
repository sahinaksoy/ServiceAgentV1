import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DataGrid, Column } from 'devextreme-react/data-grid';
import { Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { customerService } from '../../services/customerService';
import type { Customer } from '../../types/customer';

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

  const columns: Column[] = [
    { dataField: 'firstName', caption: 'İsim' },
    { dataField: 'lastName', caption: 'Soyisim' },
    { dataField: 'email', caption: 'E-posta' },
    { dataField: 'phone', caption: 'Telefon', visible: !isMobile },
    { dataField: 'address', caption: 'Adres', visible: !isMobile },
    {
      type: 'buttons',
      buttons: [
        {
          hint: 'Düzenle',
          icon: 'edit',
          onClick: (e: { row: { data: Customer } }) => {
            navigate(`/customers/${e.row.data.id}/edit`);
          },
        },
        {
          hint: 'Sil',
          icon: 'trash',
          onClick: (e: { row: { data: Customer } }) => {
            if (window.confirm('Bu müşteriyi silmek istediğinizden emin misiniz?')) {
              deleteMutation.mutate(e.row.data.id!);
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
        columns={columns}
        showBorders
        columnAutoWidth
        rowAlternationEnabled
        height="calc(100vh - 200px)"
        loadPanel={{ enabled: isLoading }}
      />
    </Box>
  );
}; 
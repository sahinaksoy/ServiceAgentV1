import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Paper, 
  useTheme, 
  useMediaQuery,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Chip,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { usePageTitle } from '../contexts/PageTitleContext';
import DataGrid, {
  Column,
  Paging,
  FilterRow,
} from 'devextreme-react/data-grid';
import { Service, serviceCategoryLabels, serviceStatusLabels } from '../types/service';
import { mockServices } from '../mocks/services';
import ServiceDialog from '../components/services/ServiceDialog';

const Services: React.FC = () => {
  const { setTitle } = usePageTitle();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [services, setServices] = useState<Service[]>(mockServices);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    setTitle('Servisler');
  }, [setTitle]);

  const handleAdd = () => {
    setSelectedService(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setDialogOpen(true);
  };

  const handleDelete = (service: Service) => {
    setSelectedService(service);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = (serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedService) {
      // Güncelleme
      setServices(services.map(service =>
        service.id === selectedService.id
          ? {
              ...service,
              ...serviceData,
              updatedAt: new Date().toISOString(),
            }
          : service
      ));
    } else {
      // Yeni ekleme
      const newService: Service = {
        ...serviceData,
        id: Math.max(...services.map(s => s.id)) + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setServices([...services, newService]);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedService) {
      setServices(services.filter(service => service.id !== selectedService.id));
      setDeleteDialogOpen(false);
      setSelectedService(undefined);
    }
  };

  return (
    <Box sx={{ 
      p: { xs: 1, sm: 2, md: 3 },
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Paper 
        elevation={isMobile ? 0 : 1}
        sx={{ 
          p: { xs: 2, sm: 3 },
          flex: 1,
          borderRadius: { xs: 0, sm: 1 }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Chip
            icon={<AddIcon />}
            label="Yeni Servis Ekle"
            onClick={handleAdd}
            sx={{
              bgcolor: 'primary.light',
              color: 'primary.main',
              border: '1px solid',
              borderColor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
              },
              cursor: 'pointer'
            }}
          />
        </Box>
        
        <DataGrid
          dataSource={services}
          showBorders={true}
          columnAutoWidth={true}
          height="calc(100% - 60px)"
        >
          <Paging defaultPageSize={10} />
          <FilterRow visible={true} />

          <Column dataField="id" caption="ID" allowEditing={false} />
          <Column 
            dataField="category" 
            caption="Kategori"
            lookup={{
              dataSource: Object.entries(serviceCategoryLabels).map(([value, text]) => ({
                value,
                text
              })),
              valueExpr: 'value',
              displayExpr: 'text'
            }}
          />
          <Column dataField="name" caption="Servis Adı" />
          <Column 
            dataField="duration" 
            caption="Süre (dk)"
            dataType="number"
          />
          <Column 
            dataField="status" 
            caption="Durum"
            lookup={{
              dataSource: Object.entries(serviceStatusLabels).map(([value, text]) => ({
                value,
                text
              })),
              valueExpr: 'value',
              displayExpr: 'text'
            }}
          />
          <Column 
            dataField="createdAt" 
            caption="Oluşturulma Tarihi" 
            allowEditing={false}
            dataType="datetime"
            format="dd.MM.yyyy HH:mm"
          />
          <Column 
            dataField="updatedAt" 
            caption="Güncellenme Tarihi" 
            allowEditing={false}
            dataType="datetime"
            format="dd.MM.yyyy HH:mm"
          />
          <Column
            caption="İşlemler"
            width={120}
            cellRender={(cellElement: any) => {
              const service = cellElement.data;
              return (
                <Box>
                  <Tooltip title="Düzenle">
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(service)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Sil">
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(service)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              );
            }}
          />
        </DataGrid>
      </Paper>

      <ServiceDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedService}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Servis Sil</DialogTitle>
        <DialogContent>
          <Typography>
            "{selectedService?.name}" servisini silmek istediğinizden emin misiniz?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>İptal</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Services; 
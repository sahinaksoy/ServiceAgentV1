import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { tr } from 'date-fns/locale';
import ServiceSelection from './ServiceSelection';
import ServiceDialog from './ServiceDialog';
import { Service } from '../../types/service';
import AddIcon from '@mui/icons-material/Add';

interface WorkOrderFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const WorkOrderForm: React.FC<WorkOrderFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    description: '',
    scheduledDate: new Date(),
  });

  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);

  const handleServiceSelect = (service: Service) => {
    if (!selectedServices.find(s => s.id === service.id)) {
      setSelectedServices([...selectedServices, service]);
    }
    setServiceDialogOpen(false);
  };

  const handleRemoveService = (serviceId: number) => {
    setSelectedServices(selectedServices.filter(service => service.id !== serviceId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      services: selectedServices,
    });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Müşteri Adı"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Müşteri Telefonu"
              value={formData.customerPhone}
              onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Müşteri Adresi"
              value={formData.customerAddress}
              onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
              required
              multiline
              rows={2}
            />
          </Grid>

          {/* Servis Seçimi */}
          <Grid item xs={12}>
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 2,
                backgroundColor: 'background.default'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" color="primary">
                  Servisler
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setServiceDialogOpen(true)}
                >
                  Servis Ekle
                </Button>
              </Box>
              <ServiceSelection
                selectedServices={selectedServices}
                onRemoveService={handleRemoveService}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={tr}>
              <DateTimePicker
                label="Planlanan Tarih"
                value={formData.scheduledDate}
                onChange={(newValue) => setFormData({ ...formData, scheduledDate: newValue || new Date() })}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Açıklama"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={onCancel}>
                İptal
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={selectedServices.length === 0}
              >
                İş Emri Oluştur
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

      <ServiceDialog
        open={serviceDialogOpen}
        onClose={() => setServiceDialogOpen(false)}
        onSelect={handleServiceSelect}
        selectedServices={selectedServices}
      />
    </Paper>
  );
};

export default WorkOrderForm; 
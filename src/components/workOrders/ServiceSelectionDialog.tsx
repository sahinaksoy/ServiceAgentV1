import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { Service } from '../../types/service';
import { mockServices } from '../../mocks/services';

interface ServiceSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (selectedServices: Service[]) => void;
}

const ServiceSelectionDialog: React.FC<ServiceSelectionDialogProps> = ({
  open,
  onClose,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const filteredServices = mockServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleServiceToggle = (service: Service) => {
    setSelectedServices(prev => {
      const isSelected = prev.some(s => s.id === service.id);
      if (isSelected) {
        return prev.filter(s => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleConfirm = () => {
    onSelect(selectedServices);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Servis Seç</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Servis Ara"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
          {filteredServices.map(service => (
            <Box
              key={service.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedServices.some(s => s.id === service.id)}
                    onChange={() => handleServiceToggle(service)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">{service.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Kategori: {service.category} | Süre: {service.duration} dk
                    </Typography>
                  </Box>
                }
              />
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">
          Seç
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceSelectionDialog; 
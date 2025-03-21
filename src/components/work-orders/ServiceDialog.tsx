import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  TextField,
} from '@mui/material';
import { Service, ServiceCategory, serviceCategoryLabels } from '../../types/service';
import { mockServices } from '../../mocks/services';

interface ServiceDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (service: Service) => void;
  selectedServices: Service[];
}

const ServiceDialog: React.FC<ServiceDialogProps> = ({
  open,
  onClose,
  onSelect,
  selectedServices,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const availableServices = mockServices.filter(
    service => !selectedServices.find(s => s.id === service.id)
  );

  const filteredServices = availableServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Servis Seç</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Servis Ara"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {filteredServices.map((service) => (
            <Chip
              key={service.id}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2">
                    {service.name}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      backgroundColor: 'primary.light',
                      color: 'primary.contrastText',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1
                    }}
                  >
                    {serviceCategoryLabels[service.category as ServiceCategory]}
                  </Typography>
                </Box>
              }
              onClick={() => onSelect(service)}
              sx={{
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Kapat</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceDialog; 
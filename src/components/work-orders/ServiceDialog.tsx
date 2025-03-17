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
  const availableServices = mockServices.filter(
    service => !selectedServices.find(s => s.id === service.id)
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Servis Seç</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
          {availableServices.map((service) => (
            <Chip
              key={service.id}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2">
                    {service.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    ({serviceCategoryLabels[service.category as ServiceCategory]})
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
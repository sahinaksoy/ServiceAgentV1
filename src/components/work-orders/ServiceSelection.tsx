import React from 'react';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Paper,
  Divider,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Service, ServiceCategory, serviceCategoryLabels } from '../../types/service';

interface ServiceSelectionProps {
  selectedServices: Service[];
  onRemoveService: (serviceId: number) => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  selectedServices,
  onRemoveService,
}) => {
  if (selectedServices.length === 0) {
    return (
      <Box 
        sx={{ 
          p: 3, 
          textAlign: 'center',
          backgroundColor: 'background.default',
          borderRadius: 1,
          border: '1px dashed',
          borderColor: 'divider'
        }}
      >
        <Typography color="text.secondary">
          Henüz servis seçilmedi
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 1,
      '& > *': {
        m: 0.5,
      }
    }}>
      {selectedServices.map((service) => (
        <Chip
          key={service.id}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
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
          onDelete={() => onRemoveService(service.id)}
          deleteIcon={
            <Tooltip title="Servisi Kaldır">
              <IconButton size="small">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          }
          sx={{
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            '& .MuiChip-deleteIcon': {
              color: 'text.secondary',
              '&:hover': {
                color: 'error.main',
              },
            },
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        />
      ))}
    </Box>
  );
};

export default ServiceSelection; 
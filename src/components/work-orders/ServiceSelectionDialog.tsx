import React from 'react';
import { Dialog, DialogTitle } from '@mui/material';
import { Service } from '../../types/service';

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
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      disablePortal
      keepMounted
      slotProps={{
        backdrop: {
          'aria-hidden': true
        }
      }}
    >
      <DialogTitle>Servis Seç</DialogTitle>
      {/* ... existing code ... */}
    </Dialog>
  );
};

export default ServiceSelectionDialog; 
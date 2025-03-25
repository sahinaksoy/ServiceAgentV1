import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from '@mui/material';
import { Service, ServiceCategory, ServiceStatus, serviceCategoryLabels, serviceStatusLabels } from '../../types/service';

interface ServiceDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Service;
}

const ServiceDialog: React.FC<ServiceDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = React.useState<Omit<Service, 'id' | 'createdAt' | 'updatedAt'>>({
    category: ServiceCategory.MECHANIC,
    name: '',
    duration: 0,
    price: 0,
    status: ServiceStatus.ACTIVE,
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        category: initialData.category,
        name: initialData.name,
        duration: initialData.duration,
        price: initialData.price,
        status: initialData.status,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {initialData ? 'Servis Düzenle' : 'Yeni Servis Ekle'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              select
              label="Kategori"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as ServiceCategory })}
              fullWidth
              required
            >
              {Object.entries(serviceCategoryLabels).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Servis Adı"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              required
            />

            <TextField
              label="Süre (dk)"
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
              fullWidth
              required
              inputProps={{ min: 0 }}
            />

            <TextField
              label="Fiyat"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              fullWidth
              required
              inputProps={{ min: 0 }}
            />

            <TextField
              select
              label="Durum"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as ServiceStatus })}
              fullWidth
              required
            >
              {Object.entries(serviceStatusLabels).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>İptal</Button>
          <Button type="submit" variant="contained" color="primary">
            {initialData ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ServiceDialog; 
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Typography, Chip, Box, Paper, Divider } from '@mui/material';
import { Store } from '../../types/store';
import { DeviceThermostat as DeviceIcon } from '@mui/icons-material';

interface StoreDetailDialogProps {
  open: boolean;
  onClose: () => void;
  store?: Store;
}

const DetailRow = ({ label, value }: { label: string; value: string | number }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={4}>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>{value}</Typography>
      </Grid>
    </Grid>
  );
};

const deviceStatusLabels: Record<string, string> = {
  'active': 'Aktif',
  'warning': 'Uyarı',
  'error': 'Hata',
  'maintenance': 'Bakımda'
};

const deviceTypeLabels: Record<string, string> = {
  'split_klima': 'Split Klima',
  'vrf': 'VRF Sistemi',
  'fancoil': 'Fan Coil',
  'chiller': 'Chiller',
  'isi_pompasi': 'Isı Pompası',
  'havalandirma': 'Havalandırma Sistemi',
  'rooftop': 'Rooftop',
  'nem_alici': 'Nem Alıcı'
};

export const StoreDetailDialog = ({ open, onClose, store }: StoreDetailDialogProps) => {
  if (!store) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2
        }
      }}
    >
      <DialogTitle>
        Mağaza Detayları
      </DialogTitle>

      <DialogContent>
        <DetailRow label="Mağaza Adı" value={store.name} />
        <DetailRow label="İl" value={store.city} />
        <DetailRow label="İlçe" value={store.region} />
        <DetailRow label="Bölge" value={store.zone} />
        <DetailRow label="Şirket" value={store.company} />
        <DetailRow label="Durum" value={store.status === 'active' ? 'Aktif' : store.status === 'inactive' ? 'Pasif' : 'Bakımda'} />
        <DetailRow label="Mağaza Yetkilisi" value={store.manager} />
        <DetailRow label="Yetkili Telefon" value={store.managerPhone || '-'} />
        <DetailRow label="Çalışan Sayısı" value={store.employeeCount} />
        <DetailRow label="Adres" value={store.address} />

        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Cihazlar ({store.devices?.length || 0})
          </Typography>
          <Divider />
        </Box>

        {store.devices?.map((device, index) => (
          <Paper 
            key={device.id} 
            sx={{ 
              p: 2, 
              mb: 2, 
              bgcolor: '#f8f9fa',
              border: '1px solid #e0e0e0'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <DeviceIcon sx={{ mr: 1 }} />
              <Typography variant="subtitle1">
                {device.name}
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Cihaz Tipi
                </Typography>
                <Typography variant="body1">
                  {deviceTypeLabels[device.type] || device.type}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Durum
                </Typography>
                <Chip
                  label={deviceStatusLabels[device.status] || device.status}
                  size="small"
                  color={
                    device.status === 'active' ? 'success' :
                    device.status === 'warning' ? 'warning' :
                    device.status === 'error' ? 'error' :
                    'default'
                  }
                  sx={{ mt: 0.5 }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Seri No
                </Typography>
                <Typography variant="body1">
                  {device.serialNumber}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Son Bakım
                </Typography>
                <Typography variant="body1">
                  {new Date(device.lastMaintenance).toLocaleDateString('tr-TR')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Sonraki Bakım
                </Typography>
                <Typography variant="body1">
                  {new Date(device.nextMaintenance).toLocaleDateString('tr-TR')}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}

        <DetailRow 
          label="Oluşturulma Tarihi" 
          value={new Date(store.createdAt).toLocaleDateString('tr-TR')} 
        />
        <DetailRow 
          label="Güncellenme Tarihi" 
          value={new Date(store.updatedAt).toLocaleDateString('tr-TR')} 
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Kapat</Button>
      </DialogActions>
    </Dialog>
  );
}; 
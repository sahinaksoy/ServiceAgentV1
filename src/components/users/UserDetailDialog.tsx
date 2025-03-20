import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Typography, Chip, Box } from '@mui/material';
import { User } from '../../types/user';

interface UserDetailDialogProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

const DetailRow = ({ label, value }: { label: string; value: string | string[] }) => {
  const roleLabels: Record<string, string> = {
    'saha_calisani': 'Saha Çalışanı',
    'ekip_sefi': 'Ekip Şefi',
    'muhendis': 'Mühendis',
    'yonetici': 'Yönetici',
    'mudur': 'Müdür',
    'taseron_saha_calisani': 'Taşeron Saha Çalışanı',
    'taseron_ekip_sefi': 'Taşeron Ekip Şefi'
  };

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={4}>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        {Array.isArray(value) ? (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {value.map((v) => (
              <Chip
                key={v}
                label={roleLabels[v] || v}
                color="primary"
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
        ) : (
          <Typography>{value}</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export const UserDetailDialog = ({ open, onClose, user }: UserDetailDialogProps) => {
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
        Kullanıcı Detayları
      </DialogTitle>

      <DialogContent>
        <DetailRow label="Ad" value={user.firstName} />
        <DetailRow label="Soyad" value={user.lastName} />
        <DetailRow label="E-posta" value={user.email} />
        <DetailRow label="Telefon" value={user.phone} />
        <DetailRow label="Roller" value={user.roles} />
        <DetailRow label="Durum" value={user.status} />
        <DetailRow label="Bölge" value={user.region} />
        <DetailRow label="Şirket" value={user.company} />
        <DetailRow 
          label="Oluşturulma Tarihi" 
          value={new Date(user.createdAt).toLocaleDateString('tr-TR')} 
        />
        <DetailRow 
          label="Güncellenme Tarihi" 
          value={new Date(user.updatedAt).toLocaleDateString('tr-TR')} 
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Kapat</Button>
      </DialogActions>
    </Dialog>
  );
}; 
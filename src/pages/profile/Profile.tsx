import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Avatar,
  Divider,
  Chip,
  IconButton,
  Button,
} from '@mui/material';
import {
  Edit as EditIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Engineering as EngineeringIcon,
} from '@mui/icons-material';
import { usePageTitle } from '../../contexts/PageTitleContext';
import { User } from '../../types/user';
import { useUsers } from '../../hooks/useUsers';

const Profile = () => {
  const { setTitle } = usePageTitle();
  const { data: users } = useUsers();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    setTitle('Profilim');
    // TODO: Gerçek kullanıcı verisi ile değiştirilecek
    if (users && users.length > 0) {
      setCurrentUser(users[0]);
    }
  }, [setTitle, users]);

  if (!currentUser) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Yükleniyor...</Typography>
      </Box>
    );
  }

  const roleLabels: Record<string, string> = {
    'saha_calisani': 'Saha Çalışanı',
    'ekip_sefi': 'Ekip Şefi',
    'muhendis': 'Mühendis',
    'yonetici': 'Yönetici',
    'taseron_saha_calisani': 'Taşeron Saha Çalışanı',
    'taseron_ekip_sefi': 'Taşeron Ekip Şefi',
    'admin': 'Yönetici'
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, position: 'relative' }}>
        <IconButton 
          sx={{ position: 'absolute', right: 16, top: 16 }}
          onClick={() => {/* TODO: Düzenleme işlevi */}}
        >
          <EditIcon />
        </IconButton>

        <Grid container spacing={3}>
          {/* Profil Başlığı */}
          <Grid item xs={12} display="flex" alignItems="center" gap={2}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
                fontSize: '2rem'
              }}
            >
              {currentUser.firstName.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h5" gutterBottom>
                {currentUser.firstName} {currentUser.lastName}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {currentUser.roles.map((role) => (
                  <Chip
                    key={role}
                    label={roleLabels[role] || role}
                    size="small"
                    icon={<EngineeringIcon />}
                    sx={{
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      color: 'primary.main',
                      border: '1px solid rgba(25, 118, 210, 0.2)',
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* İletişim Bilgileri */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              İletişim Bilgileri
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon color="action" />
                <Typography>{currentUser.phone || 'Telefon bilgisi girilmemiş'}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon color="action" />
                <Typography>{currentUser.email || 'E-posta bilgisi girilmemiş'}</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Şirket Bilgileri */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Şirket Bilgileri
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BusinessIcon color="action" />
                <Typography>{currentUser.company || 'Şirket bilgisi girilmemiş'}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationIcon color="action" />
                <Typography>{currentUser.region || 'Bölge bilgisi girilmemiş'}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Şifre Değiştirme */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={() => {/* TODO: Şifre değiştirme işlevi */}}
              >
                Şifre Değiştir
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile; 
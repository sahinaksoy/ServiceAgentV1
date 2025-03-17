import { useState, useCallback } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  IconButton, 
  useTheme, 
  useMediaQuery,
  Grid,
  Card,
  Stack,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Fab
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import { User, roleLabels, UserRole } from '../../types/user';
import { UserDialog } from '../../components/users/UserDialog';
import { UserDetailDialog } from '../../components/users/UserDetailDialog';
import { DeleteConfirmDialog } from '../../components/common/DeleteConfirmDialog';
import { useUsers, useDeleteUser } from '../../hooks/useUsers';
import { usePageTitle } from '../../contexts/PageTitleContext';
import React from 'react';

const UserList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('');

  const { data: users = [], isLoading, error } = useUsers();
  const deleteUserMutation = useDeleteUser();
  const { setTitle } = usePageTitle();

  React.useEffect(() => {
    setTitle('Kullanıcılar');
  }, [setTitle]);

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
    setIsDetailDialogOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      try {
        await deleteUserMutation.mutateAsync(selectedUser.id);
        setIsDeleteDialogOpen(false);
        setSelectedUser(null);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleDialogClose = useCallback(() => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsDetailDialogOpen(false);
    setSelectedUser(null);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setSelectedRole(event.target.value);
  };

  const handleCompanyChange = (event: SelectChangeEvent<string>) => {
    setSelectedCompany(event.target.value);
  };

  // Filtre fonksiyonları
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === '' || 
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = selectedRole === '' || user.roles.includes(selectedRole as UserRole);
    const matchesCompany = selectedCompany === '' || user.company === selectedCompany;

    return matchesSearch && matchesRole && matchesCompany;
  });

  // Benzersiz şirketleri al
  const companies = Array.from(new Set(users.map(user => user.company)));

  if (error) {
    return <Typography color="error">Bir hata oluştu: {error.message}</Typography>;
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Filtreler */}
      <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ flex: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Ad, soyad veya telefon ile ara..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Rol</InputLabel>
            <Select
              value={selectedRole}
              label="Rol"
              onChange={handleRoleChange}
            >
              <MenuItem value="">Tümü</MenuItem>
              {Object.entries(roleLabels).map(([value, label]) => (
                <MenuItem key={value} value={value}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Şirket</InputLabel>
            <Select
              value={selectedCompany}
              label="Şirket"
              onChange={handleCompanyChange}
            >
              <MenuItem value="">Tümü</MenuItem>
              {companies.map(company => (
                <MenuItem key={company} value={company}>{company}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      {/* Kullanıcı Kartları */}
      <Grid container spacing={2}>
        {filteredUsers.map(user => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card sx={{
              p: 2,
              height: '100%',
              transition: '0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4
              }
            }}>
              <Stack spacing={2}>
                {/* Avatar ve İsim */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                    {user.firstName[0]}{user.lastName[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
                    <Typography variant="body2" color="text.secondary">{user.company}</Typography>
                  </Box>
                </Stack>

                {/* Roller */}
                <Box>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {user.roles.map(role => (
                      <Chip
                        key={role}
                        label={roleLabels[role]}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </Box>

                {/* İletişim Bilgileri */}
                <Stack spacing={1}>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationIcon fontSize="small" />
                    {user.region}
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PhoneIcon fontSize="small" />
                    {user.phone}
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BusinessIcon fontSize="small" />
                    {user.company}
                  </Typography>
                </Stack>

                {/* İşlem Butonları */}
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <IconButton size="small" onClick={() => handleView(user)}>
                    <ViewIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleEdit(user)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(user)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        onClick={handleAdd}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16
        }}
      >
        <AddIcon />
      </Fab>

      <UserDialog
        open={isAddDialogOpen}
        onClose={handleDialogClose}
        mode="add"
      />

      {selectedUser && (
        <>
          <UserDialog
            open={isEditDialogOpen}
            onClose={handleDialogClose}
            mode="edit"
            user={selectedUser}
          />

          <UserDetailDialog
            open={isDetailDialogOpen}
            onClose={handleDialogClose}
            user={selectedUser}
          />

          <DeleteConfirmDialog
            open={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleConfirmDelete}
            title="Kullanıcı Silme"
            content={`${selectedUser.firstName} ${selectedUser.lastName} isimli kullanıcıyı silmek istediğinizden emin misiniz?`}
          />
        </>
      )}
    </Box>
  );
};

export default UserList; 
import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  DialogContentText,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { User, UserRole, UserStatus, CompanyType, mockUsers, roleLabels, companyLabels, statusLabels } from '../types/user';
import { mockRegions } from '../types/region';

interface FormErrors {
  name?: string;
  phoneNumber?: string;
  email?: string;
  company?: string;
  role?: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    company: '' as CompanyType,
    role: '' as UserRole,
    region: '',
    status: 'ACTIVE' as UserStatus,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Ad Soyad zorunludur';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Telefon zorunludur';
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Geçerli bir telefon numarası giriniz';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-posta zorunludur';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }

    if (!formData.company) {
      newErrors.company = 'Firma seçimi zorunludur';
    }

    if (!formData.role) {
      newErrors.role = 'Rol seçimi zorunludur';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Ad Soyad', width: 200 },
    { field: 'phoneNumber', headerName: 'Telefon', width: 150 },
    { field: 'email', headerName: 'E-posta', width: 200 },
    { 
      field: 'company', 
      headerName: 'Firma', 
      width: 130,
      valueFormatter: ({ value }) => companyLabels[value as CompanyType] || ''
    },
    { 
      field: 'role', 
      headerName: 'Rol', 
      width: 150,
      valueFormatter: ({ value }) => roleLabels[value as UserRole] || ''
    },
    { 
      field: 'region', 
      headerName: 'Bölge', 
      width: 130,
      valueFormatter: ({ value, row }: { value: any, row: User }) => row.region?.name || '-'
    },
    { 
      field: 'status', 
      headerName: 'Durum', 
      width: 100,
      valueFormatter: ({ value }) => statusLabels[value as UserStatus] || ''
    },
    {
      field: 'actions',
      headerName: 'İşlemler',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={() => handleEdit(params.row as User)}
          >
            Düzenle
          </Button>
        </Box>
      ),
    },
  ];

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      phoneNumber: user.phoneNumber,
      email: user.email,
      company: user.company,
      role: user.role,
      region: user.region?.id || '',
      status: user.status,
    });
    setErrors({});
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Kullanıcı ekleme/düzenleme işlemleri burada yapılacak
      console.log(formData);
      setIsDialogOpen(false);
      setSelectedUser(null);
      setFormData({
        name: '',
        phoneNumber: '',
        email: '',
        company: '' as CompanyType,
        role: '' as UserRole,
        region: '',
        status: 'ACTIVE' as UserStatus,
      });
      setErrors({});
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
    setFormData({
      name: '',
      phoneNumber: '',
      email: '',
      company: '' as CompanyType,
      role: '' as UserRole,
      region: '',
      status: 'ACTIVE' as UserStatus,
    });
    setErrors({});
  };

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Kullanıcılar</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsDialogOpen(true)}
        >
          Yeni Kullanıcı
        </Button>
      </Box>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={mockUsers}
          columns={columns}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
        />
      </Paper>

      <Dialog open={isDialogOpen} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Ad Soyad"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Telefon"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="E-posta"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.company}>
                <InputLabel>Firma</InputLabel>
                <Select
                  value={formData.company}
                  label="Firma"
                  onChange={(e) => setFormData({ ...formData, company: e.target.value as CompanyType })}
                >
                  {Object.entries(companyLabels).map(([value, label]) => (
                    <MenuItem key={value} value={value}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.role}>
                <InputLabel>Rol</InputLabel>
                <Select
                  value={formData.role}
                  label="Rol"
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                >
                  {Object.entries(roleLabels).map(([value, label]) => (
                    <MenuItem key={value} value={value}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Bölge</InputLabel>
                <Select
                  value={formData.region}
                  label="Bölge"
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                >
                  {mockRegions.filter(region => region.isActive).map((region) => (
                    <MenuItem key={region.id} value={region.id}>
                      {region.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Durum</InputLabel>
                <Select
                  value={formData.status}
                  label="Durum"
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as UserStatus })}
                >
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <MenuItem key={value} value={value}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {selectedUser ? 'Güncelle' : 'Kaydet'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users; 
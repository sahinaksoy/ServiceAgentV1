import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  Autocomplete,
  Chip,
  IconButton,
  Card,
  CardContent,
  Stack,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WorkOrderFormData } from '../../types/workOrder';
import { workOrderSchema } from '../../schemas/workOrderSchema';
import { useGlobalUsers } from '../../hooks/useGlobalUsers';
import { useGlobalCustomers } from '../../hooks/useGlobalCustomers';
import { Service } from '../../types/service';
import ServiceSelectionDialog from '../workOrders/ServiceSelectionDialog';
import { Part, partUnitLabels } from '../../types/part';
import PartSelectionDialog from './PartSelectionDialog';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface WorkOrderFormProps {
  onSubmit: (data: WorkOrderFormData) => Promise<void>;
  onCancel: () => void;
}

interface SelectedPart extends Part {
  quantity: number;
}

const priorityOptions = [
  { value: 'high', label: 'Yüksek' },
  { value: 'medium', label: 'Orta' },
  { value: 'low', label: 'Düşük' },
];

const typeOptions = [
  { value: 'emergency', label: 'Acil Çağrı' },
  { value: 'maintenance', label: 'Periyodik Bakım' },
  { value: 'renovation', label: 'Tadilat' },
  { value: 'additional', label: 'İlave İş' },
  { value: 'investment', label: 'Yatırım' },
];

const categoryOptions = [
  { value: 'mechanical', label: 'Mekanik' },
  { value: 'electrical', label: 'Elektrik' },
];

const WorkOrderForm: React.FC<WorkOrderFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const { data: users = [], isLoading: isUsersLoading } = useGlobalUsers();
  const { data: customers = [], isLoading: isCustomersLoading } = useGlobalCustomers();
  const activeUsers = users.filter(user => user.status === 'active');
  const [serviceDialogOpen, setServiceDialogOpen] = React.useState(false);
  const [selectedServices, setSelectedServices] = React.useState<Service[]>([]);
  const [partDialogOpen, setPartDialogOpen] = React.useState(false);
  const [selectedParts, setSelectedParts] = React.useState<SelectedPart[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<WorkOrderFormData>({
    resolver: zodResolver(workOrderSchema),
    defaultValues: {
      summary: '',
      priority: 'medium',
      type: 'emergency',
      category: 'mechanical',
      dueDate: dayjs().format(),
      company: '',
      contact: '',
      email: '',
      phone: '',
      mobile: '',
      serviceAddress: '',
      billingAddress: '',
      preferredDate1: '',
      assignedTo: '',
      services: selectedServices.map(service => service.id),
    },
  });

  const findPriorityOption = (value: string | null) => {
    return value ? priorityOptions.find(option => option.value === value) || null : null;
  };

  const findTypeOption = (value: string | null) => {
    return value ? typeOptions.find(option => option.value === value) || null : null;
  };

  const findCategoryOption = (value: string | null) => {
    return value ? categoryOptions.find(option => option.value === value) || null : null;
  };

  const findUser = (id: string | null) => {
    return id ? activeUsers.find(user => user.id === id) || null : null;
  };

  const findCustomer = (id: string | null) => {
    return id ? customers.find(customer => customer.id === id) || null : null;
  };

  const datePickerProps = {
    fullWidth: true as const,
    error: !!errors.dueDate,
    helperText: errors.dueDate?.message,
  };

  const handleServiceSelect = (services: Service[]) => {
    setSelectedServices(services);
  };

  const handleServiceDelete = (serviceId: number) => {
    const updatedServices = selectedServices.filter(service => service.id !== serviceId);
    setSelectedServices(updatedServices);
  };

  const handlePartSelect = (parts: Part[]) => {
    const newParts = parts.map(part => ({
      ...part,
      quantity: 1
    }));
    setSelectedParts(newParts);
  };

  const handlePartQuantityChange = (partId: number, quantity: number) => {
    setSelectedParts(prev => prev.map(part => 
      part.id === partId ? { ...part, quantity: Math.max(1, quantity) } : part
    ));
  };

  const handlePartDelete = (partId: number) => {
    setSelectedParts(prev => prev.filter(part => part.id !== partId));
  };

  const calculateTotalPartsCost = () => {
    return selectedParts.reduce((total, part) => total + (part.price * part.quantity), 0);
  };

  const handleFormSubmit = async (data: WorkOrderFormData) => {
    try {
      await onSubmit({
        ...data,
        services: selectedServices.map(service => service.id),
        parts: selectedParts.map(part => part.id),
        partQuantities: selectedParts.reduce((acc, part) => ({
          ...acc,
          [part.id]: part.quantity
        }), {}),
      });
    } catch (error) {
      console.error('Error submitting work order:', error);
    }
  };

  const renderPartItem = (part: SelectedPart) => {
    if (isMobile) {
      return (
        <ListItem
          key={part.id}
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            mb: 1,
            flexDirection: 'column',
            alignItems: 'stretch',
            p: 0,
          }}
        >
          <Box sx={{ p: 2, pb: 1 }}>
            <ListItemText
              primary={part.name}
              secondary={`Birim: ${partUnitLabels[part.unit]} | Birim Fiyat: ${part.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}`}
            />
          </Box>
          <Divider />
          <Box sx={{ p: 2, pt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  size="small"
                  type="number"
                  defaultValue={part.quantity}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value);
                    if (!isNaN(newValue) && newValue > 0) {
                      handlePartQuantityChange(part.id, newValue);
                    }
                  }}
                  InputProps={{
                    inputProps: { 
                      min: 1,
                      style: { textAlign: 'right' }
                    },
                    endAdornment: <InputAdornment position="end">{partUnitLabels[part.unit]}</InputAdornment>,
                  }}
                  fullWidth
                />
              </Box>
              <IconButton
                size="small"
                color="error"
                onClick={() => handlePartDelete(part.id)}
                sx={{ ml: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                textAlign: 'right', 
                fontWeight: 500,
                mt: 1,
                color: 'primary.main'
              }}
            >
              Toplam: {(part.price * part.quantity).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
            </Typography>
          </Box>
        </ListItem>
      );
    }

    return (
      <Box
        key={part.id}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          bgcolor: 'background.paper',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1">{part.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            Birim: {partUnitLabels[part.unit]} | Birim Fiyat: {part.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            size="small"
            type="number"
            defaultValue={part.quantity}
            onChange={(e) => {
              const newValue = parseInt(e.target.value);
              if (!isNaN(newValue) && newValue > 0) {
                handlePartQuantityChange(part.id, newValue);
              }
            }}
            InputProps={{
              inputProps: { 
                min: 1,
                style: { textAlign: 'right' }
              },
              endAdornment: <InputAdornment position="end">{partUnitLabels[part.unit]}</InputAdornment>,
            }}
            sx={{ width: 120 }}
          />
          <Typography variant="body2" sx={{ minWidth: 120, textAlign: 'right' }}>
            {(part.price * part.quantity).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
          </Typography>
          <IconButton
            size="small"
            color="error"
            onClick={() => handlePartDelete(part.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    );
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {/* İş Emri Özeti */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>İş Emri Özeti</Typography>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="summary"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Özet"
                  fullWidth
                  multiline
                  rows={2}
                  error={!!errors.summary}
                  helperText={errors.summary?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="priority"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <Autocomplete
                  {...field}
                  options={priorityOptions}
                  getOptionLabel={(option) => option.label}
                  value={findPriorityOption(value)}
                  onChange={(_, newValue) => onChange(newValue?.value || '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Öncelik"
                      error={!!errors.priority}
                      helperText={errors.priority?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="type"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <Autocomplete
                  {...field}
                  options={typeOptions}
                  getOptionLabel={(option) => option.label}
                  value={findTypeOption(value)}
                  onChange={(_, newValue) => onChange(newValue?.value || '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tip"
                      error={!!errors.type}
                      helperText={errors.type?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="category"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <Autocomplete
                  {...field}
                  options={categoryOptions}
                  getOptionLabel={(option) => option.label}
                  value={findCategoryOption(value)}
                  onChange={(_, newValue) => onChange(newValue?.value || '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Kategori"
                      error={!!errors.category}
                      helperText={errors.category?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
              <Controller
                name="dueDate"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <DatePicker
                    {...field}
                    label="Son Tarih"
                    value={value ? dayjs(value) : null}
                    onChange={(newValue) => {
                      onChange(newValue ? newValue.format() : '');
                    }}
                    slotProps={{
                      textField: datePickerProps
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="assignedTo"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <Autocomplete
                  {...field}
                  options={activeUsers}
                  getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                  value={findUser(value)}
                  onChange={(_, newValue) => onChange(newValue?.id || '')}
                  loading={isUsersLoading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Atanacak Kullanıcı"
                      error={!!errors.assignedTo}
                      helperText={errors.assignedTo?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>

          {/* İletişim Bilgileri */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>İletişim Bilgileri</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="company"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <Autocomplete
                  {...field}
                  options={customers}
                  getOptionLabel={(option) => option.name}
                  value={findCustomer(value)}
                  onChange={(_, newValue) => onChange(newValue?.id || '')}
                  loading={isCustomersLoading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Firma"
                      error={!!errors.company}
                      helperText={errors.company?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="contact"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="İletişim Kişisi"
                  fullWidth
                  error={!!errors.contact}
                  helperText={errors.contact?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="E-posta"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mobil"
                  fullWidth
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                />
              )}
            />
          </Grid>

          {/* Adres Bilgileri */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>Adres Bilgileri</Typography>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="serviceAddress"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Servis Adresi"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.serviceAddress}
                  helperText={errors.serviceAddress?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="billingAddress"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Fatura Adresi"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.billingAddress}
                  helperText={errors.billingAddress?.message}
                />
              )}
            />
          </Grid>

          {/* Servisler */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1">Servisler</Typography>
                  <Button
                    variant="text"
                    color="primary"
                    endIcon={<AddIcon />}
                    onClick={() => setServiceDialogOpen(true)}
                  >
                    Ekle
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedServices.map((service) => (
                    <Chip
                      key={service.id}
                      label={service.name}
                      onDelete={() => handleServiceDelete(service.id)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Parçalar */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1">Parçalar</Typography>
                  <Button
                    variant="text"
                    color="primary"
                    endIcon={<AddIcon />}
                    onClick={() => setPartDialogOpen(true)}
                  >
                    Ekle
                  </Button>
                </Box>
                {selectedParts.length > 0 ? (
                  <Stack spacing={1}>
                    {isMobile ? (
                      <List disablePadding>
                        {selectedParts.map(renderPartItem)}
                      </List>
                    ) : (
                      selectedParts.map(renderPartItem)
                    )}
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1 }}>
                      <Typography variant="subtitle1">
                        Toplam: {calculateTotalPartsCost().toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                      </Typography>
                    </Box>
                  </Stack>
                ) : (
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
                    Henüz parça eklenmedi
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Butonlar */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
              <Button variant="outlined" onClick={onCancel}>
                İptal
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                Kaydet
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <ServiceSelectionDialog
        open={serviceDialogOpen}
        onClose={() => setServiceDialogOpen(false)}
        onSelect={handleServiceSelect}
      />

      <PartSelectionDialog
        open={partDialogOpen}
        onClose={() => setPartDialogOpen(false)}
        onSelect={handlePartSelect}
      />
    </form>
  );
};

export default WorkOrderForm; 
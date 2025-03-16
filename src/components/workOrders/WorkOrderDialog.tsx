import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, MenuItem, Autocomplete, Typography, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WorkOrder, WorkOrderFormData } from '../../types/workOrder';
import { workOrderSchema } from '../../schemas/workOrderSchema';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import { useGlobalUsers } from '../../hooks/useGlobalUsers';
import { useGlobalCustomers } from '../../hooks/useGlobalCustomers';
import { useNavigate } from 'react-router-dom';

interface WorkOrderDialogProps {
  isPage?: boolean;
  open?: boolean;
  mode?: 'add' | 'edit';
  onClose?: () => void;
  onSubmit: (data: WorkOrderFormData) => Promise<void>;
  regions: string[];
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

export const WorkOrderDialog = ({ 
  isPage = false, 
  open = false, 
  mode = 'add',
  onClose,
  onSubmit,
  regions 
}: WorkOrderDialogProps) => {
  const navigate = useNavigate();
  const { data: users = [], isLoading: isUsersLoading } = useGlobalUsers();
  const { data: customers = [], isLoading: isCustomersLoading } = useGlobalCustomers();
  const activeUsers = users.filter(user => user.status === 'active');

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

  const formContent = (
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
        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>İletişim Bilgileri</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="company"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <Autocomplete
              {...field}
              options={customers}
              getOptionLabel={(option) => option.name || ''}
              value={findCustomer(value)}
              onChange={(_, newValue) => {
                onChange(newValue?.id || '');
                if (newValue) {
                  const formMethods = control._formValues;
                  formMethods.email = newValue.email || '';
                  formMethods.phone = newValue.phone || '';
                  formMethods.serviceAddress = newValue.address || '';
                  formMethods.billingAddress = newValue.address || '';
                }
              }}
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
                  label="İletişim Kişisi"
                  error={!!errors.contact}
                  helperText={errors.contact?.message}
                />
              )}
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
        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>Adres Bilgileri</Typography>
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
              rows={2}
              error={!!errors.serviceAddress}
              helperText={errors.serviceAddress?.message}
            />
          )}
        />
      </Grid>
    </Grid>
  );

  return isPage ? (
    <Box sx={{ p: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {formContent}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            Kaydet
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/work-orders')}
          >
            İptal
          </Button>
        </Box>
      </form>
    </Box>
  ) : (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {mode === 'edit' ? 'İş Emri Düzenle' : 'Yeni İş Emri'}
      </DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {formContent}
        </form>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={onClose}>İptal</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 
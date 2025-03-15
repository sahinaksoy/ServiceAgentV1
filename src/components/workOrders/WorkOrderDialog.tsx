import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, MenuItem } from '@mui/material';
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

interface WorkOrderDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: WorkOrderFormData) => void;
  workOrder?: WorkOrder;
  regions: string[];
}

const typeOptions = [
  { value: 'emergency', label: 'Acil Çağrılar' },
  { value: 'maintenance', label: 'Bakım' },
  { value: 'investment', label: 'Yatırım' },
];

export const WorkOrderDialog = ({ open, onClose, onSubmit, workOrder, regions }: WorkOrderDialogProps) => {
  const { data: users = [], isLoading: isUsersLoading } = useGlobalUsers();
  const activeUsers = users.filter(user => user.status === 'active');

  const { control, handleSubmit, formState: { errors } } = useForm<WorkOrderFormData>({
    resolver: zodResolver(workOrderSchema),
    defaultValues: workOrder || {
      type: 'emergency',
      region: '',
      date: dayjs().format(),
      description: '',
      assignedTo: '',
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Yeni İş Emri Oluştur</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Arıza Türü"
                    fullWidth
                    error={!!errors.type}
                    helperText={errors.type?.message}
                  >
                    {typeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="region"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Bölge"
                    fullWidth
                    error={!!errors.region}
                    helperText={errors.region?.message}
                  >
                    {regions.map((region) => (
                      <MenuItem key={region} value={region}>
                        {region}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
                <Controller
                  name="date"
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <DatePicker
                      {...field}
                      label="Tarih"
                      value={value ? dayjs(value) : null}
                      onChange={(newValue) => {
                        onChange(newValue ? newValue.format() : '');
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.date,
                          helperText: errors.date?.message,
                        },
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
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Atanacak Kişi"
                    fullWidth
                    error={!!errors.assignedTo}
                    helperText={errors.assignedTo?.message}
                    disabled={isUsersLoading}
                  >
                    {activeUsers.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {`${user.firstName} ${user.lastName}`}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Açıklama"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>İptal</Button>
          <Button type="submit" variant="contained" color="primary">
            Ekip Şefi Onayına Gönder
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}; 
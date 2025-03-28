import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Autocomplete,
  IconButton,
  Card,
  CardContent,
  Stack,
  Divider,
  List,
  Dialog
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import { useForm, Controller } from 'react-hook-form';
import { WorkOrder, WorkOrderFormData, WorkOrderPriority, WorkOrderType, WorkOrderService, WorkOrderPart } from '../../types/workOrder';
import { useGlobalUsers } from '../../hooks/useGlobalUsers';
import { useGlobalCustomers } from '../../hooks/useGlobalCustomers';
import { Service } from '../../types/service';
import ServiceSelectionDialog from '../workOrders/ServiceSelectionDialog';
import { Part, PartUnit, PartStatus, partUnitLabels } from '../../types/part';
import PartSelectionDialog from './PartSelectionDialog';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSnackbar } from 'notistack';

interface WorkOrderFormProps {
  onSubmit: (data: WorkOrder) => Promise<void>;
  onCancel: () => void;
  initialData?: WorkOrder;
}

interface SelectedPart extends Omit<Part, 'unit'> {
  quantity: number;
  unit: string;
}

type ServiceStatus = 'completed' | 'partially_completed' | 'pending';

interface SelectedService {
  id: number;
  name: string;
  description?: string;
  duration: number;
  price: number;
  status: ServiceStatus;
  category: string;
  estimatedDuration: number;
  createdAt: string;
  updatedAt: string;
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

const getPartUnitLabel = (unit: string): string => {
  const partUnit = Object.values(PartUnit).find(value => value === unit);
  return partUnit ? partUnitLabels[partUnit] : unit;
};

const WorkOrderForm: React.FC<WorkOrderFormProps> = ({
  onSubmit,
  onCancel,
  initialData
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { enqueueSnackbar } = useSnackbar();
  const { data: activeUsers = [], isLoading: isUsersLoading } = useGlobalUsers();
  const { data: customers = [], isLoading: isCustomersLoading } = useGlobalCustomers();
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [partDialogOpen, setPartDialogOpen] = useState(false);
  const [serviceFormDialogOpen, setServiceFormDialogOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    initialData?.services?.map((service) => ({
      id: service.id,
      name: service.name,
      description: service.description,
      duration: service.duration,
      status: (service.status || 'pending') as ServiceStatus,
      category: 'mechanical',
      estimatedDuration: service.duration,
      price: service.price || 0,
      createdAt: dayjs().format(),
      updatedAt: dayjs().format()
    })) || []
  );
  const [selectedParts, setSelectedParts] = useState<SelectedPart[]>(
    initialData?.parts.map((part: WorkOrderPart) => ({
      id: part.id,
      name: part.name,
      description: part.description,
      price: part.unitPrice,
      status: PartStatus.ACTIVE,
      unit: part.unit,
      createdAt: dayjs().format(),
      updatedAt: dayjs().format(),
      quantity: part.quantity
    })) || []
  );
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  const { control, handleSubmit, setValue, formState: { errors, isSubmitting }, reset } = useForm<WorkOrderFormData>({
    defaultValues: initialData ? {
      summary: initialData.summary,
      priority: initialData.priority as WorkOrderPriority,
      type: initialData.type as WorkOrderType,
      category: initialData.category,
      dueDate: initialData.dueDate,
      company: initialData.company.id,
      store: '',
      contact: initialData.company.contactPerson,
      email: initialData.company.email,
      phone: '',
      mobile: initialData.company.mobile,
      serviceAddress: initialData.company.address,
      preferredDate1: '',
      assignedTo: initialData.assignedTo?.id || '',
      services: initialData.services.map((s: WorkOrderService) => s.id)
    } : {
      summary: '',
      priority: 'medium' as WorkOrderPriority,
      type: 'maintenance' as WorkOrderType,
      category: 'mechanical',
      dueDate: '',
      company: '',
      store: '',
      contact: '',
      email: '',
      phone: '',
      mobile: '',
      serviceAddress: '',
      preferredDate1: '',
      assignedTo: '',
      services: []
    }
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

  const findUser = (id: string | undefined | null) => {
    return id ? activeUsers.find(user => user.id === id) || null : null;
  };

  const findCustomer = (id: string | undefined | null) => {
    return id ? customers.find(customer => customer.id === id) || null : null;
  };

  const datePickerProps = {
    fullWidth: true as const,
    error: !!errors.dueDate,
    helperText: errors.dueDate?.message,
  };

  const handleServiceSelect = (services: Service[]) => {
    const newServices: SelectedService[] = services.map(service => ({
      id: service.id,
      name: service.name,
      description: service.description || '',
      duration: service.estimatedDuration || 1,
      status: 'pending' as ServiceStatus,
      category: service.category,
      estimatedDuration: service.estimatedDuration || 1,
      price: service.price || 0,
      createdAt: service.createdAt || dayjs().format(),
      updatedAt: service.updatedAt || dayjs().format()
    }));
    setSelectedServices(newServices);
    setValue('services', newServices.map(s => s.id));
  };

  const handleServiceDurationChange = (serviceId: number, duration: number) => {
    setSelectedServices(prev => prev.map(service => 
      service.id === serviceId ? { ...service, duration: Math.max(1, duration) } : service
    ));
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

  const calculateTotalDuration = () => {
    return selectedServices.reduce((total, service) => total + service.duration, 0);
  };

  const handleFormSubmit = async (data: WorkOrderFormData) => {
    try {
      console.log('Form verileri:', data);
      const selectedUser = findUser(data.assignedTo);
      const selectedCustomer = findCustomer(data.store);

      console.log('Seçilen kullanıcı:', selectedUser);
      console.log('Seçilen mağaza:', selectedCustomer);

      if (!selectedCustomer) {
        enqueueSnackbar('Lütfen bir mağaza seçin', { variant: 'error' });
        return;
      }

      if (!selectedUser) {
        enqueueSnackbar('Lütfen bir kullanıcı seçin', { variant: 'error' });
        return;
      }

      if (selectedServices.length === 0) {
        enqueueSnackbar('Lütfen en az bir servis seçin', { variant: 'error' });
        return;
      }

      const workOrder: WorkOrder = {
        id: Date.now(),
        summary: data.summary,
        priority: data.priority,
        type: data.type,
        category: data.category,
        status: 'pending',
        dueDate: data.dueDate,
        createdAt: dayjs().format(),
        updatedAt: dayjs().format(),
        company: {
          id: selectedCustomer.id,
          name: selectedCustomer.name,
          contactPerson: data.contact,
          email: data.email,
          mobile: data.mobile,
          address: data.serviceAddress
        },
        assignedTo: {
          id: selectedUser.id,
          firstName: selectedUser.firstName,
          lastName: selectedUser.lastName,
          email: selectedUser.email,
          status: selectedUser.status
        },
        services: selectedServices.map(service => ({
          id: service.id,
          name: service.name,
          category: service.category,
          duration: service.duration,
          status: service.status,
          description: service.description || '',
          price: service.price || 0,
          createdAt: service.createdAt,
          updatedAt: service.updatedAt
        })),
        parts: selectedParts.map(part => ({
          id: part.id,
          name: part.name,
          description: part.description || '',
          unit: part.unit,
          quantity: part.quantity,
          unitPrice: part.price
        })),
        totalAmount: calculateTotalPartsCost(),
        totalDuration: calculateTotalDuration()
      };

      console.log('Oluşturulan iş emri:', workOrder);
      await onSubmit(workOrder);
      enqueueSnackbar('İş emri başarıyla kaydedildi', { variant: 'success' });
    } catch (error) {
      console.error('İş emri kaydedilirken hata oluştu:', error);
      enqueueSnackbar('İş emri kaydedilirken bir hata oluştu', { variant: 'error' });
    }
  };

  const renderPartItem = (part: SelectedPart) => {
    if (isMobile) {
      return (
        <Box
          key={part.id}
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
            mb: 1,
            '&:hover': {
              borderColor: 'primary.main',
              boxShadow: 1,
            },
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            p: 2,
            pb: 1,
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{part.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Birim: {getPartUnitLabel(part.unit)} | Birim Fiyat: {part.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
              </Typography>
            </Box>
            <IconButton
              size="small"
              color="error"
              onClick={() => handlePartDelete(part.id)}
              sx={{ 
                mt: -0.5, 
                mr: -0.5,
                '&:hover': {
                  bgcolor: 'error.lighter',
                }
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            p: 2,
            pt: 1.5,
            gap: 1.5
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 1
            }}>
              <Typography variant="body2" color="text.secondary">Miktar:</Typography>
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                overflow: 'hidden',
                flex: 1,
                maxWidth: 120,
                '&:hover': {
                  borderColor: 'primary.main',
                },
              }}>
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
                      style: { 
                        textAlign: 'center',
                        padding: '4px 0',
                        width: '100%',
                      }
                    },
                    disableUnderline: true,
                    sx: { 
                      fontSize: '0.875rem',
                      '& input': {
                        p: 0,
                        height: 24,
                      }
                    }
                  }}
                  variant="standard"
                />
              </Box>
              <Typography variant="body2" color="text.secondary">{getPartUnitLabel(part.unit)}</Typography>
            </Box>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: 600,
                color: 'primary.main',
                textAlign: 'right'
              }}
            >
              {(part.price * part.quantity).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
            </Typography>
          </Box>
        </Box>
      );
    }

    return (
      <Box
        key={part.id}
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
          '&:hover': {
            borderColor: 'primary.main',
            boxShadow: 1,
          },
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          p: 2,
          pb: 1,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{part.name}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Birim: {getPartUnitLabel(part.unit)} | Birim Fiyat: {part.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
            </Typography>
          </Box>
          <IconButton
            size="small"
            color="error"
            onClick={() => handlePartDelete(part.id)}
            sx={{ 
              mt: -0.5, 
              mr: -0.5,
              '&:hover': {
                bgcolor: 'error.lighter',
              }
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 2,
          pt: 1.5,
          gap: 2 
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1,
            flex: 1
          }}>
            <Typography variant="body2" color="text.secondary">Miktar:</Typography>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              overflow: 'hidden',
              width: 120,
              '&:hover': {
                borderColor: 'primary.main',
              },
            }}>
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
                    style: { 
                      textAlign: 'center',
                      padding: '4px 0',
                      width: '100%',
                    }
                  },
                  disableUnderline: true,
                  sx: { 
                    fontSize: '0.875rem',
                    '& input': {
                      p: 0,
                      height: 24,
                    }
                  }
                }}
                variant="standard"
              />
            </Box>
            <Typography variant="body2" color="text.secondary">{getPartUnitLabel(part.unit)}</Typography>
          </Box>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontWeight: 600,
              color: 'primary.main',
              minWidth: 100,
              textAlign: 'right'
            }}
          >
            {(part.price * part.quantity).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderServiceItem = (service: SelectedService) => {
    if (isMobile) {
      return (
        <Box
          key={service.id}
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
            mb: 1,
            '&:hover': {
              borderColor: 'primary.main',
              boxShadow: 1,
            },
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            p: 2,
            pb: 1,
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{service.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Kategori: {service.category}
              </Typography>
            </Box>
            <IconButton
              size="small"
              color="error"
              onClick={() => handleServiceDelete(service.id)}
              sx={{ 
                mt: -0.5, 
                mr: -0.5,
                '&:hover': {
                  bgcolor: 'error.lighter',
                }
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            p: 2,
            pt: 1.5,
            gap: 1.5
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 1
            }}>
              <Typography variant="body2" color="text.secondary">Süre:</Typography>
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                overflow: 'hidden',
                flex: 1,
                maxWidth: 120,
                '&:hover': {
                  borderColor: 'primary.main',
                },
              }}>
                <TextField
                  size="small"
                  type="number"
                  defaultValue={service.duration}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value);
                    if (!isNaN(newValue) && newValue > 0) {
                      handleServiceDurationChange(service.id, newValue);
                    }
                  }}
                  InputProps={{
                    inputProps: { 
                      min: 1,
                      style: { 
                        textAlign: 'center',
                        padding: '4px 0',
                        width: '100%',
                      }
                    },
                    disableUnderline: true,
                    sx: { 
                      fontSize: '0.875rem',
                      '& input': {
                        p: 0,
                        height: 24,
                      }
                    }
                  }}
                  variant="standard"
                />
              </Box>
              <Typography variant="body2" color="text.secondary">Saat</Typography>
            </Box>
          </Box>
        </Box>
      );
    }

    return (
      <Box
        key={service.id}
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
          mb: 1,
          '&:hover': {
            borderColor: 'primary.main',
            boxShadow: 1,
          },
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          p: 2,
          pb: 1,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{service.name}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Kategori: {service.category}
            </Typography>
          </Box>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleServiceDelete(service.id)}
            sx={{ 
              mt: -0.5, 
              mr: -0.5,
              '&:hover': {
                bgcolor: 'error.lighter',
              }
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          p: 2,
          pt: 1.5,
          gap: 1
        }}>
          <Typography variant="body2" color="text.secondary">Süre:</Typography>
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            overflow: 'hidden',
            width: 120,
            '&:hover': {
              borderColor: 'primary.main',
            },
          }}>
            <TextField
              size="small"
              type="number"
              defaultValue={service.duration}
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                if (!isNaN(newValue) && newValue > 0) {
                  handleServiceDurationChange(service.id, newValue);
                }
              }}
              InputProps={{
                inputProps: { 
                  min: 1,
                  style: { 
                    textAlign: 'center',
                    padding: '4px 0',
                    width: '100%',
                  }
                },
                disableUnderline: true,
                sx: { 
                  fontSize: '0.875rem',
                  '& input': {
                    p: 0,
                    height: 24,
                  }
                }
              }}
              variant="standard"
            />
          </Box>
          <Typography variant="body2" color="text.secondary">Saat</Typography>
        </Box>
      </Box>
    );
  };

  // Ana firmaları filtrele
  const mainCompanies = customers.filter(customer => 
    customer.name === 'Migros' || customer.name === 'Halkmar'
  );

  // Seçilen firmaya ait mağazaları filtrele
  const storeOptions = customers.filter(customer => 
    customer.parentCompany === selectedCompany
  );

  const companies = ['Migros', 'Halkmar'];

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

          {/* Firma Bilgileri */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>Firma Bilgileri</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="company"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <Autocomplete
                  {...field}
                  options={mainCompanies}
                  getOptionLabel={(option) => option.name}
                  value={findCustomer(value)}
                  onChange={(_, newValue) => {
                    onChange(newValue?.id || '');
                    setSelectedCompany(newValue?.id || null);
                    setSelectedStore(null);
                    setValue('store', '');
                  }}
                  loading={isCustomersLoading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Ana Firma"
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
              name="store"
              control={control}
              rules={{ required: 'Mağaza seçimi zorunludur' }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={companies}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Mağaza"
                      error={!!errors.store}
                      helperText={errors.store?.message}
                      fullWidth
                    />
                  )}
                  onChange={(_, value) => field.onChange(value)}
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
                  label="Telefon"
                  fullWidth
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="serviceAddress"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Adres"
                  fullWidth
                  error={!!errors.serviceAddress}
                  helperText={errors.serviceAddress?.message}
                />
              )}
            />
          </Grid>

          {/* İş Emri Detayları */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>İş Emri Detayları</Typography>
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
            <Controller
              name="dueDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
                  <DatePicker
                    {...datePickerProps}
                    label="Termin Tarihi"
                    value={value ? dayjs(value) : null}
                    onChange={(newValue) => onChange(newValue ? newValue.format() : '')}
                  />
                </LocalizationProvider>
              )}
            />
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
                      label="Atanan Kişi"
                      error={!!errors.assignedTo}
                      helperText={errors.assignedTo?.message}
                    />
                  )}
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
                {selectedServices.length > 0 ? (
                  <Stack spacing={1}>
                    {isMobile ? (
                      <List disablePadding>
                        {selectedServices.map(renderServiceItem)}
                      </List>
                    ) : (
                      selectedServices.map(renderServiceItem)
                    )}
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1 }}>
                      <Typography variant="subtitle1">
                        Toplam Süre: {calculateTotalDuration()} Saat
                      </Typography>
                    </Box>
                  </Stack>
                ) : (
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
                    Henüz servis seçilmedi
                  </Typography>
                )}
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

      {/* Servis Seçme Dialog */}
      <ServiceSelectionDialog
        open={serviceDialogOpen}
        onClose={() => setServiceDialogOpen(false)}
        onSelect={handleServiceSelect}
      />

      {/* Parça Seçme Dialog */}
      <PartSelectionDialog
        open={partDialogOpen}
        onClose={() => setPartDialogOpen(false)}
        onSelect={handlePartSelect}
      />

      {/* Teknik Servis Form Dialog */}
      <Dialog
        open={serviceFormDialogOpen}
        onClose={() => setServiceFormDialogOpen(false)}
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
        {/* ... existing code ... */}
      </Dialog>
    </form>
  );
};

export default WorkOrderForm; 
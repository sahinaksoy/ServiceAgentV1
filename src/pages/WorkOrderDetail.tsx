import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workOrderAPI } from '../services/api';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent,
  CardHeader,
  CardActions,
  Avatar, 
  Grid, 
  Chip,
  Stack,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  Engineering as ServiceIcon,
  Build as PartIcon,
  MonetizationOn as MoneyIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Category as CategoryIcon,
  Flag as FlagIcon,
  PriorityHigh as PriorityIcon,
  Schedule as ScheduleIcon,
  Business as BusinessIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Description as DescriptionIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import { usePageTitle } from '../contexts/PageTitleContext';
import { Service, ServiceCategory, serviceCategoryLabels } from '../types/service';
import ServiceSelectionDialog from '../components/workOrders/ServiceSelectionDialog';
import { WorkOrder, WorkOrderService, WorkOrderPart, WorkOrderStatus, WorkOrderType, WorkOrderCategory, WorkOrderPriority } from '../types/workOrder';
import { alpha } from '@mui/material/styles';
import SignaturePad from 'react-signature-canvas';
import type SignaturePadType from 'react-signature-canvas';

const priorityLabels = {
  high: 'Yüksek',
  medium: 'Orta',
  low: 'Düşük',
} as const;

const typeLabels = {
  emergency: 'Acil Çağrı',
  maintenance: 'Periyodik Bakım',
  renovation: 'Tadilat',
  additional: 'İlave İş',
  investment: 'Yatırım',
} as const;

const categoryLabels = {
  mechanical: 'Mekanik',
  electrical: 'Elektrik',
  sensor: 'Sensör',
  maintenance: 'Bakım',
  temperature: 'Sıcaklık',
  glass: 'Cam',
  water: 'Su',
  monitoring: 'İzleme',
} as const;

const statusLabels = {
  pending: 'Bekliyor',
  in_progress: 'Devam Ediyor',
  completed: 'Tamamlandı',
  cancelled: 'İptal Edildi',
} as const;

const statusColors = {
  pending: 'warning',
  in_progress: 'info',
  completed: 'success',
  cancelled: 'error',
} as const;

const WorkOrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setTitle } = usePageTitle();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const queryClient = useQueryClient();

  // Dialog states
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [partDialogOpen, setPartDialogOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<WorkOrderPart | null>(null);
  const [localWorkOrder, setLocalWorkOrder] = useState<WorkOrder | null>(null);
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
  const [editedDuration, setEditedDuration] = useState<number>(0);
  const [serviceFormDialogOpen, setServiceFormDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<WorkOrderService | null>(null);
  const [formData, setFormData] = useState({
    genelGorunum: {
      temizlik: false,
      paslanma: false,
      boyaBozulmasi: false,
      fizikselHasar: false,
      titresim: false,
      sesliCalisma: false,
    },
    merkeziSistem: {
      marka: '',
      model: '',
      seriNo: '',
      kapasiteKcal: '',
      uretimYili: '',
      yakitTipi: '',
    },
    sistemGorunum: {
      suBasinci: '',
      calismaSicakligi: '',
      donusSicakligi: '',
      bacaGaziSicakligi: '',
    }
  });

  const signatureRef = useRef<SignaturePadType>(null);
  const [signature, setSignature] = useState<string>('');
  const [signatureModalOpen, setSignatureModalOpen] = useState(false);

  React.useEffect(() => {
    setTitle('İş Emri Detayı');
  }, [setTitle]);

  const { data: workOrder, isLoading, error } = useQuery<WorkOrder, Error>({
    queryKey: ['workOrder', id],
    queryFn: () => workOrderAPI.getWorkOrderById(Number(id)),
    enabled: !!id,
  });

  React.useEffect(() => {
    if (workOrder) {
      setLocalWorkOrder(workOrder);
    }
  }, [workOrder]);

  const handleServiceAdd = () => {
    setServiceDialogOpen(true);
  };

  const handleServiceDelete = (serviceId: number) => {
    if (localWorkOrder) {
      const updatedServices = localWorkOrder.services.filter((s: WorkOrderService) => s.id !== serviceId);
      const updatedWorkOrder = {
        ...localWorkOrder,
        services: updatedServices,
      };
      setLocalWorkOrder(updatedWorkOrder);
    }
  };

  const handleServiceSelect = (selectedServices: Service[]) => {
    if (localWorkOrder) {
      // Seçilen servisleri WorkOrderService formatına dönüştür
      const newServices: WorkOrderService[] = selectedServices.map(service => ({
        id: service.id,
        name: service.name,
        description: serviceCategoryLabels[service.category as ServiceCategory],
        duration: service.duration,
        price: service.price,
        hasServiceForm: false, // Başlangıçta form yok
      }));

      // Mevcut servislere yeni seçilenleri ekle
      const updatedServices = [
        ...localWorkOrder.services,
        ...newServices.filter(newService => 
          !localWorkOrder.services.some((existingService: WorkOrderService) => existingService.id === newService.id)
        )
      ];

      // Toplam tutarı hesapla
      const totalAmount = updatedServices.reduce((total: number, service: WorkOrderService) => total + service.price, 0) + 
        localWorkOrder.parts.reduce((total: number, part: WorkOrderPart) => total + (part.quantity * part.unitPrice), 0);

      // Local state'i güncelle
      const updatedWorkOrder = {
        ...localWorkOrder,
        services: updatedServices,
        totalAmount: totalAmount,
      };
      setLocalWorkOrder(updatedWorkOrder);
    }
    setServiceDialogOpen(false);
  };

  const handlePartAdd = () => {
    setSelectedPart(null);
    setPartDialogOpen(true);
  };

  const handlePartEdit = (part: WorkOrderPart) => {
    setSelectedPart(part);
    setPartDialogOpen(true);
  };

  const handlePartDelete = (partId: number) => {
    if (localWorkOrder) {
      const updatedParts = localWorkOrder.parts.filter((p: WorkOrderPart) => p.id !== partId);
      const updatedWorkOrder = {
        ...localWorkOrder,
        parts: updatedParts,
      };
      setLocalWorkOrder(updatedWorkOrder);
    }
  };

  const handlePartSave = (partData: Partial<WorkOrderPart>) => {
    if (localWorkOrder) {
      const updatedParts = selectedPart
        ? localWorkOrder.parts.map((p: WorkOrderPart) => p.id === selectedPart.id ? { ...p, ...partData } : p)
        : [...localWorkOrder.parts, { ...partData, id: Date.now() } as WorkOrderPart];

      const updatedWorkOrder = {
        ...localWorkOrder,
        parts: updatedParts,
      };
      setLocalWorkOrder(updatedWorkOrder);
    }
    setPartDialogOpen(false);
  };

  // Toplam süreyi hesapla
  const calculateTotalDuration = () => {
    if (!localWorkOrder) return 0;
    return localWorkOrder.services.reduce((total: number, service: WorkOrderService) => total + service.duration, 0);
  };

  const handleServiceEdit = (service: WorkOrderService) => {
    setEditingServiceId(service.id);
    setEditedDuration(service.duration);
  };

  const handleServiceDurationSave = (serviceId: number) => {
    if (localWorkOrder && editedDuration >= 0) {
      const updatedServices = localWorkOrder.services.map(service => 
        service.id === serviceId 
          ? { ...service, duration: editedDuration }
          : service
      );

      const updatedWorkOrder = {
        ...localWorkOrder,
        services: updatedServices,
      };
      setLocalWorkOrder(updatedWorkOrder);
      setEditingServiceId(null);
    }
  };

  const handleServiceFormOpen = (service: WorkOrderService) => {
    setSelectedService(service);
    // Eğer servisin önceden kaydedilmiş form verisi varsa, onu yükle
    if (service.formData) {
      setFormData(service.formData);
      if (service.formData.signature) {
        setSignature(service.formData.signature);
      }
    } else {
      // Form verisi yoksa varsayılan değerleri kullan
      setFormData({
        genelGorunum: {
          temizlik: false,
          paslanma: false,
          boyaBozulmasi: false,
          fizikselHasar: false,
          titresim: false,
          sesliCalisma: false,
        },
        merkeziSistem: {
          marka: '',
          model: '',
          seriNo: '',
          kapasiteKcal: '',
          uretimYili: '',
          yakitTipi: '',
        },
        sistemGorunum: {
          suBasinci: '',
          calismaSicakligi: '',
          donusSicakligi: '',
          bacaGaziSicakligi: '',
        }
      });
      setSignature('');
    }
    setServiceFormDialogOpen(true);
  };

  const handleServiceFormSave = () => {
    if (localWorkOrder && selectedService) {
      // Form verilerini hazırla
      const formDataToSave = {
        ...formData,
        signature: signature
      };

      // Servisleri güncelle
      const updatedServices = localWorkOrder.services.map(service => 
        service.id === selectedService.id 
          ? { 
              ...service, 
              hasServiceForm: true,
              formData: formDataToSave
            }
          : service
      );

      // WorkOrder'ı güncelle
      const updatedWorkOrder = {
        ...localWorkOrder,
        services: updatedServices,
      };

      setLocalWorkOrder(updatedWorkOrder);
      setServiceFormDialogOpen(false);
    }
  };

  const clearSignature = () => {
    signatureRef.current?.clear();
    setSignature('');
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Typography>Yükleniyor...</Typography>
      </Box>
    );
  }

  if (error || !localWorkOrder) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Typography color="error">İş emri bulunamadı veya bir hata oluştu.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: isMobile ? 1 : 3 }}>
      <Card elevation={3}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <BusinessIcon />
            </Avatar>
          }
          title={
            <Box sx={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              gap: 1,
              alignItems: isMobile ? 'flex-start' : 'center', 
            }}>
              <Typography variant={isMobile ? "h6" : "h5"} component="h1">
                {localWorkOrder.company.name}
              </Typography>
              <Chip
                label={statusLabels[localWorkOrder.status as WorkOrderStatus]}
                color={statusColors[localWorkOrder.status as WorkOrderStatus]}
                sx={{ 
                  fontWeight: 'medium',
                  ml: isMobile ? 0 : 2
                }}
              />
            </Box>
          }
          subheader={
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {localWorkOrder.summary}
            </Typography>
          }
        />
        <CardContent sx={{ p: isMobile ? 1 : 2 }}>
          <Grid container spacing={isMobile ? 2 : 3}>
            {/* Temel Bilgiler */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardHeader
                  avatar={<PersonIcon color="primary" />}
                  title="Firma Bilgileri"
                  sx={{ pb: 0 }}
                />
                <CardContent sx={{ pt: 1 }}>
                  <List disablePadding>
                    <ListItem disablePadding sx={{ mb: 2 }}>
                      <ListItemIcon>
                        <PersonIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="İletişim Kişisi"
                        secondary={localWorkOrder.company.contactPerson}
                      />
                    </ListItem>
                    <ListItem disablePadding sx={{ mb: 2 }}>
                      <ListItemIcon>
                        <EmailIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="E-posta"
                        secondary={localWorkOrder.company.email}
                      />
                    </ListItem>
                    <ListItem disablePadding sx={{ mb: 2 }}>
                      <ListItemIcon>
                        <PhoneIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Telefon"
                        secondary={localWorkOrder.company.mobile}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <LocationIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Adres"
                        secondary={localWorkOrder.company.address}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* İş Emri Detayları */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardHeader
                  avatar={<CategoryIcon color="primary" />}
                  title="İş Emri Detayları"
                  sx={{ pb: 0 }}
                />
                <CardContent sx={{ pt: 1 }}>
                  <List disablePadding>
                    <ListItem disablePadding sx={{ mb: 2 }}>
                      <ListItemIcon>
                        <FlagIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Tip"
                        secondary={typeLabels[localWorkOrder.type as WorkOrderType]}
                      />
                    </ListItem>
                    <ListItem disablePadding sx={{ mb: 2 }}>
                      <ListItemIcon>
                        <CategoryIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Kategori"
                        secondary={categoryLabels[localWorkOrder.category as WorkOrderCategory]}
                      />
                    </ListItem>
                    <ListItem disablePadding sx={{ mb: 2 }}>
                      <ListItemIcon>
                        <PriorityIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Öncelik"
                        secondary={priorityLabels[localWorkOrder.priority as WorkOrderPriority]}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <ScheduleIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Son Tarih"
                        secondary={dayjs(localWorkOrder.dueDate).format('DD.MM.YYYY HH:mm')}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Atanan Kişi */}
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardHeader
                  avatar={<PersonIcon color="primary" />}
                  title="Atanan Teknisyen"
                  sx={{ pb: 0 }}
                />
                <CardContent sx={{ pt: 1 }}>
                  {localWorkOrder.assignedTo ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.light' }}>
                        {localWorkOrder.assignedTo.firstName[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="body1">
                          {localWorkOrder.assignedTo.firstName} {localWorkOrder.assignedTo.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {localWorkOrder.assignedTo.email}
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Typography color="text.secondary">
                      Henüz atama yapılmamış
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Hizmetler */}
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardHeader
                  avatar={<ServiceIcon color="primary" />}
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <Typography variant="h6">Servisler</Typography>
                      <Button
                        startIcon={<AddIcon />}
                        onClick={handleServiceAdd}
                        color="primary"
                        variant="outlined"
                        size="small"
                        sx={{ textTransform: 'none' }}
                      >
                        EKLE
                      </Button>
                    </Box>
                  }
                />
                <CardContent>
                  <Stack spacing={2}>
                    {localWorkOrder?.services.map((service: WorkOrderService) => (
                      <Box 
                        key={service.id}
                        sx={{
                          p: 2,
                          borderRadius: 1,
                          bgcolor: 'background.paper',
                          border: '1px solid',
                          borderColor: 'divider',
                          '&:hover': {
                            borderColor: theme.palette.primary.main,
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                          }
                        }}
                      >
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          mb: 1.5
                        }}>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="medium">
                              {service.name}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{ mt: 0.5 }}
                            >
                              Kategori: {service.description}
                            </Typography>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: 2,
                              mt: 1.5,
                              color: 'text.secondary'
                            }}>
                              <Box 
                                sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: 0.5,
                                  cursor: 'pointer',
                                  '&:hover': {
                                    color: 'primary.main',
                                  }
                                }}
                                onClick={() => handleServiceFormOpen(service)}
                              >
                                <DescriptionIcon fontSize="small" />
                                <Typography variant="body2">
                                  Teknik Servis Formu
                                </Typography>
                              </Box>
                              {service.hasServiceForm ? (
                                <CheckCircleIcon 
                                  fontSize="small" 
                                  sx={{ 
                                    color: 'success.main',
                                    ml: 'auto'
                                  }} 
                                />
                              ) : (
                                <RadioButtonUncheckedIcon 
                                  fontSize="small" 
                                  sx={{ 
                                    color: 'action.disabled',
                                    ml: 'auto'
                                  }} 
                                />
                              )}
                            </Box>
                          </Box>
                          <IconButton 
                            size="small" 
                            onClick={() => handleServiceDelete(service.id)}
                            color="error"
                            sx={{
                              opacity: 0.7,
                              '&:hover': {
                                opacity: 1,
                                bgcolor: 'error.lighter'
                              }
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1,
                            mt: 1,
                            pt: 1.5,
                            borderTop: '1px solid',
                            borderColor: 'divider'
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Süre:
                          </Typography>
                          <TextField
                            type="number"
                            size="small"
                            value={editingServiceId === service.id ? editedDuration : service.duration}
                            onChange={(e) => {
                              if (editingServiceId !== service.id) {
                                setEditingServiceId(service.id);
                              }
                              setEditedDuration(Number(e.target.value));
                            }}
                            onBlur={() => {
                              if (editingServiceId === service.id) {
                                handleServiceDurationSave(service.id);
                              }
                            }}
                            inputProps={{ 
                              min: 0,
                              style: { 
                                width: '60px',
                                padding: '4px 8px',
                              }
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'transparent',
                                },
                                '&:hover fieldset': {
                                  borderColor: 'primary.main',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: 'primary.main',
                                },
                                bgcolor: 'background.paper',
                              },
                            }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            Saat
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                  {localWorkOrder?.services.length > 0 && (
                    <Box sx={{ 
                      mt: 3, 
                      pt: 2, 
                      borderTop: '1px solid',
                      borderColor: 'divider',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Toplam Süre:
                      </Typography>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {calculateTotalDuration()}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        Saat
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Parçalar */}
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardHeader
                  avatar={<PartIcon color="primary" />}
                  title="Parçalar"
                  action={
                    <Button
                      startIcon={<AddIcon />}
                      onClick={handlePartAdd}
                      color="primary"
                    >
                      Parça Ekle
                    </Button>
                  }
                />
                <CardContent>
                  <Stack spacing={2}>
                    {localWorkOrder.parts.map((part) => (
                      <Card key={part.id} variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                              <Typography variant="subtitle1" fontWeight="medium">
                                {part.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {part.description}
                              </Typography>
                              <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
                                <Typography variant="body2">
                                  {part.quantity} {part.unit}
                                </Typography>
                                <Typography variant="body2" fontWeight="medium">
                                  {(part.unitPrice * part.quantity).toLocaleString('tr-TR')} ₺
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <IconButton 
                                size="small" 
                                onClick={() => handlePartEdit(part)}
                                color="primary"
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                onClick={() => handlePartDelete(part.id)}
                                color="error"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Toplam Tutar */}
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ bgcolor: 'primary.light' }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <MoneyIcon />
                    </Avatar>
                  }
                  title={
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: isMobile ? 'column' : 'row',
                      alignItems: isMobile ? 'flex-start' : 'center',
                      justifyContent: 'space-between',
                      gap: 2
                    }}>
                      <Typography variant="h6" color="primary.dark">Toplam Tutar</Typography>
                      <Typography 
                        variant={isMobile ? "h5" : "h4"} 
                        sx={{ 
                          color: 'primary.dark',
                          fontWeight: 'bold'
                        }}
                      >
                        {localWorkOrder.totalAmount.toLocaleString('tr-TR')} ₺
                      </Typography>
                    </Box>
                  }
                />
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Servis Seçme Dialog */}
      <ServiceSelectionDialog
        open={serviceDialogOpen}
        onClose={() => setServiceDialogOpen(false)}
        onSelect={handleServiceSelect}
      />

      {/* Parça Ekleme/Düzenleme Dialog */}
      <Dialog 
        open={partDialogOpen} 
        onClose={() => setPartDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedPart ? 'Parça Düzenle' : 'Yeni Parça Ekle'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Parça Adı"
              fullWidth
              defaultValue={selectedPart?.name}
              required
            />
            <TextField
              label="Açıklama"
              fullWidth
              multiline
              rows={2}
              defaultValue={selectedPart?.description}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Miktar"
                type="number"
                defaultValue={selectedPart?.quantity}
                required
                sx={{ flex: 1 }}
              />
              <TextField
                select
                label="Birim"
                defaultValue={selectedPart?.unit || 'adet'}
                sx={{ flex: 1 }}
              >
                <MenuItem value="adet">Adet</MenuItem>
                <MenuItem value="metre">Metre</MenuItem>
                <MenuItem value="kg">Kilogram</MenuItem>
                <MenuItem value="litre">Litre</MenuItem>
              </TextField>
            </Box>
            <TextField
              label="Birim Fiyat (₺)"
              type="number"
              defaultValue={selectedPart?.unitPrice}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPartDialogOpen(false)}>İptal</Button>
          <Button onClick={() => handlePartSave({})} variant="contained">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>

      {/* Teknik Servis Form Dialog */}
      <Dialog
        open={serviceFormDialogOpen}
        onClose={() => setServiceFormDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Teknik Servis Formu - {selectedService?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Genel Görünüm ve Bakım */}
            <Box>
              <Typography variant="h6" gutterBottom color="primary">
                Genel Görünüm ve Bakım
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(formData.genelGorunum).map(([key, value]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        p: 1,
                        borderRadius: 1,
                        '&:hover': { bgcolor: 'action.hover' },
                        cursor: 'pointer',
                      }}
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        genelGorunum: {
                          ...prev.genelGorunum,
                          [key]: !value
                        }
                      }))}
                    >
                      {value ? (
                        <CheckBoxIcon color="primary" />
                      ) : (
                        <CheckBoxOutlineBlankIcon />
                      )}
                      <Typography>
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Merkezi Sistem Bilgisi */}
            <Box>
              <Typography variant="h6" gutterBottom color="primary">
                Merkezi Sistem Bilgisi
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(formData.merkeziSistem).map(([key, value]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <TextField
                      fullWidth
                      label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      value={value}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        merkeziSistem: {
                          ...prev.merkeziSistem,
                          [key]: e.target.value
                        }
                      }))}
                      size="small"
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Merkezi Sistem Genel Görünümü */}
            <Box>
              <Typography variant="h6" gutterBottom color="primary">
                Merkezi Sistem Genel Görünümü
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(formData.sistemGorunum).map(([key, value]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <TextField
                      fullWidth
                      label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      value={value}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        sistemGorunum: {
                          ...prev.sistemGorunum,
                          [key]: e.target.value
                        }
                      }))}
                      size="small"
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* İmza Alanı */}
            <Box>
              <Typography variant="h6" gutterBottom color="primary">
                Teknisyen İmzası
              </Typography>
              <Box 
                sx={{ 
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  bgcolor: 'background.paper',
                  p: 1
                }}
              >
                {signature ? (
                  <Box sx={{ position: 'relative' }}>
                    <img 
                      src={signature} 
                      alt="İmza" 
                      style={{ 
                        width: '100%', 
                        height: 'auto', 
                        maxHeight: 200,
                        cursor: 'pointer'
                      }}
                      onClick={() => setSignatureModalOpen(true)}
                    />
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearSignature();
                      }}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        '&:hover': {
                          bgcolor: 'error.lighter'
                        }
                      }}
                    >
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </Box>
                ) : (
                  <Box 
                    onClick={() => setSignatureModalOpen(true)}
                    sx={{ 
                      border: '1px dashed',
                      borderColor: 'primary.main',
                      borderRadius: 1,
                      bgcolor: '#fff',
                      height: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.05)
                      }
                    }}
                  >
                    <Typography color="text.secondary">
                      İmza eklemek için tıklayın
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setServiceFormDialogOpen(false)}>
            İptal
          </Button>
          <Button onClick={handleServiceFormSave} variant="contained">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>

      {/* İmza Modal */}
      <Dialog
        open={signatureModalOpen}
        onClose={() => setSignatureModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          İmza
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Box 
              sx={{ 
                border: '1px dashed',
                borderColor: 'primary.main',
                borderRadius: 1,
                bgcolor: '#fff',
                height: 300,
                touchAction: 'none'
              }}
            >
              <SignaturePad
                ref={signatureRef}
                canvasProps={{
                  style: {
                    width: '100%',
                    height: '100%'
                  }
                }}
              />
            </Box>
            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
              <Button 
                size="small"
                onClick={clearSignature}
                startIcon={<DeleteIcon />}
              >
                Temizle
              </Button>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSignatureModalOpen(false)}>
            İptal
          </Button>
          <Button 
            onClick={() => {
              if (signatureRef.current) {
                const canvas = signatureRef.current.getCanvas();
                const signatureData = canvas.toDataURL('image/png');
                setSignature(signatureData);
                setSignatureModalOpen(false);
              }
            }} 
            variant="contained"
          >
            İmzayı Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WorkOrderDetail; 
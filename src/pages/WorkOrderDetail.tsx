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
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  SelectChangeEvent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  Menu,
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
  ArrowForward as ArrowForwardIcon,
  ExpandMore as ExpandMoreIcon,
  AttachFile as AttachFileIcon,
  CloudUpload as CloudUploadIcon,
  Download as DownloadIcon,
  Send as SendIcon,
  Timeline as TimelineIcon,
  Circle as CircleIcon,
  MoreVert as MoreVertIcon,
  PlayArrow as PlayArrowIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import { usePageTitle } from '../contexts/PageTitleContext';
import { Service, ServiceCategory, serviceCategoryLabels } from '../types/service';
import ServiceSelectionDialog from '../components/workOrders/ServiceSelectionDialog';
import PartSelectionDialog from '../components/workOrders/PartSelectionDialog';
import { WorkOrder, WorkOrderService, WorkOrderPart, WorkOrderStatus, WorkOrderType, WorkOrderCategory, WorkOrderPriority } from '../types/workOrder';
import { alpha } from '@mui/material/styles';
import SignaturePad from 'react-signature-canvas';
import type SignaturePadType from 'react-signature-canvas';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

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
  pool: 'Havuz',
  pending: 'Beklemede',
  in_progress: 'Devam Ediyor',
  completed: 'Tamamlandı',
  cancelled: 'İptal',
  awaiting_approval: 'Onay Bekliyor',
} as const;

const statusColors = {
  pool: 'info',
  pending: 'warning',
  in_progress: 'primary',
  completed: 'success',
  cancelled: 'error',
  awaiting_approval: 'secondary',
} as const;

// Durum seçenekleri için sabit tanımlayalım
const serviceStatusOptions = [
  { value: 'completed', label: 'Tamamlandı', color: 'success' },
  { value: 'partially_completed', label: 'Eksik Tamamlandı', color: 'warning' },
  { value: 'pending', label: 'Beklemede', color: 'info' },
] as const;

// Kart bileşeni için ortak stiller
const CardContainer = ({ children, icon, title, action }: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Card 
      variant="outlined" 
      sx={{
        height: '100%',
        borderRadius: 2,
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          borderColor: 'primary.main',
        }
      }}
    >
      <CardHeader
        avatar={
          <Box 
            sx={{ 
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              p: 1,
              borderRadius: 1,
              color: 'primary.main'
            }}
          >
            {icon}
          </Box>
        }
        title={
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between'
          }}>
            <Typography variant="h6" sx={{ fontSize: isMobile ? 16 : 18 }}>
              {title}
            </Typography>
            {action}
          </Box>
        }
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ pt: 2 }}>
        {children}
      </CardContent>
    </Card>
  );
};

// Durum çipi için özel bileşen
const StatusChip = ({ status }: { status: WorkOrderStatus }) => (
  <Chip
    label={statusLabels[status]}
    color={statusColors[status]}
    size="small"
    sx={{
      borderRadius: 1,
      fontWeight: 500,
      px: 1,
      '& .MuiChip-label': {
        px: 1,
      }
    }}
  />
);

// Liste öğesi için özel bileşen
const InfoListItem = ({ icon, value, isAddress = false }: { icon: React.ReactNode, value: string, isAddress?: boolean }) => {
  const handleAddressClick = () => {
    if (isAddress) {
      const encodedAddress = encodeURIComponent(value);
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    }
  };

  return (
    <ListItem 
      disablePadding 
      sx={{ 
        mb: 1,
        '&:last-child': {
          mb: 0
        },
        ...(isAddress && {
          cursor: 'pointer',
          '&:hover': {
            '& .MuiTypography-root': {
              color: 'primary.main',
              textDecoration: 'underline'
            },
            '& .MuiListItemIcon-root': {
              color: 'primary.main'
            }
          }
        })
      }}
      onClick={handleAddressClick}
    >
      <ListItemIcon sx={{ minWidth: 36 }}>
        {icon}
      </ListItemIcon>
      <ListItemText 
        primary={
          <Typography variant="body1">
            {value}
          </Typography>
        }
      />
    </ListItem>
  );
};

interface PageHeaderProps {
  workOrder: WorkOrder;
  localWorkOrder: WorkOrder | null;
  setLocalWorkOrder: (workOrder: WorkOrder | null) => void;
  timelineEvents: TimelineEvent[];
  setTimelineEvents: (events: TimelineEvent[]) => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  workOrder, 
  localWorkOrder, 
  setLocalWorkOrder, 
  timelineEvents, 
  setTimelineEvents 
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value;
    if (localWorkOrder) {
      const updatedWorkOrder = {
        ...localWorkOrder,
        status: newStatus as WorkOrderStatus
      };
      setLocalWorkOrder(updatedWorkOrder);

      let eventType: TimelineEventType = 'status_change';
      let content = 'Durum güncellendi';

      switch (newStatus) {
        case 'in_progress':
          eventType = 'start';
          content = 'İşe başlandı';
          break;
        case 'completed':
          eventType = 'complete';
          content = 'İş tamamlandı';
          break;
        case 'cancelled':
          content = 'İş emri iptal edildi';
          break;
      }

      const newEvent: TimelineEvent = {
        id: Date.now(),
        type: eventType,
        content: content,
        timestamp: new Date().toISOString(),
        user: {
          id: 1,
          name: 'Ahmet Yılmaz',
          avatar: 'AY'
        },
        metadata: {
          oldStatus: workOrder.status,
          newStatus: newStatus as WorkOrderStatus
        }
      };
      setTimelineEvents([...timelineEvents, newEvent]);
    }
  };

  return (
    <Box 
      sx={{ 
        mb: 3,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: 2,
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'flex-start',
          gap: 2,
        }}>
          <Avatar 
            sx={{ 
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              color: 'primary.main',
              width: 48,
              height: 48
            }}
          >
            <BusinessIcon />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              mb: 0.5
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
                  {workOrder.company.name}
                </Typography>
                <StatusChip status={workOrder.status as WorkOrderStatus} />
              </Box>
               
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              {workOrder.summary}
            </Typography>
            {workOrder.assignedTo && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                mt: 1
              }}>
                <Avatar 
                  sx={{ 
                    width: 24, 
                    height: 24, 
                    fontSize: 14,
                    bgcolor: 'primary.main'
                  }}
                >
                  {workOrder.assignedTo.firstName[0]}
                </Avatar>
                <Typography variant="body2" color="text.secondary">
                  {workOrder.assignedTo.firstName} {workOrder.assignedTo.lastName}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 2,
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'divider'
        }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <Select
              value=""
              displayEmpty
              onChange={handleStatusChange}
              renderValue={() => "Durum Değiştir"}
              sx={{
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }
              }}
            >
              {workOrder.status === 'pending' && (
                <MenuItem value="in_progress">
                  <ListItemIcon>
                    <PlayArrowIcon fontSize="small" color="success" />
                  </ListItemIcon>
                  <ListItemText>İşe Başla</ListItemText>
                </MenuItem>
              )}
              {workOrder.status === 'in_progress' && (
                <MenuItem value="awaiting_approval">
                  <ListItemIcon>
                    <CheckCircleIcon fontSize="small" color="success" />
                  </ListItemIcon>
                  <ListItemText>İşi Tamamla</ListItemText>
                </MenuItem>
              )}
              {workOrder.status === 'awaiting_approval' && (
                <MenuItem value="completed">
                  <ListItemIcon>
                    <CheckCircleIcon fontSize="small" color="success" />
                  </ListItemIcon>
                  <ListItemText>Onayla</ListItemText>
                </MenuItem>
              )}
              {(workOrder.status === 'pending' || workOrder.status === 'in_progress' || workOrder.status === 'awaiting_approval') && (
                <MenuItem value="cancelled">
                  <ListItemIcon>
                    <CancelIcon fontSize="small" color="error" />
                  </ListItemIcon>
                  <ListItemText>İptal Et</ListItemText>
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

// Timeline için tip tanımlamaları
type TimelineEventType = 'status_change' | 'note' | 'start' | 'complete' | 'assign' | 'create';

interface TimelineEvent {
  id: number;
  type: TimelineEventType;
  content: string;
  timestamp: string;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  metadata?: {
    oldStatus?: WorkOrderStatus;
    newStatus?: WorkOrderStatus;
    note?: string;
  };
}

// Örnek timeline verileri
const sampleTimelineEvents: TimelineEvent[] = [
  {
    id: 1,
    type: 'create',
    content: 'İş emri oluşturuldu',
    timestamp: '2024-03-15T09:00:00',
    user: {
      id: 1,
      name: 'Ahmet Yılmaz',
      avatar: 'AY'
    }
  },
  {
    id: 2,
    type: 'assign',
    content: 'Teknisyen atandı',
    timestamp: '2024-03-15T09:15:00',
    user: {
      id: 2,
      name: 'Mehmet Demir',
      avatar: 'MD'
    }
  },
  {
    id: 3,
    type: 'note',
    content: 'Müşteri ile görüşüldü, randevu saati 14:00 olarak belirlendi',
    timestamp: '2024-03-15T10:30:00',
    user: {
      id: 1,
      name: 'Ahmet Yılmaz',
      avatar: 'AY'
    }
  },
  {
    id: 4,
    type: 'start',
    content: 'İşe başlandı',
    timestamp: '2024-03-15T14:00:00',
    user: {
      id: 3,
      name: 'Ali Kaya',
      avatar: 'AK'
    }
  },
  {
    id: 5,
    type: 'status_change',
    content: 'Durum güncellendi',
    timestamp: '2024-03-15T14:01:00',
    user: {
      id: 3,
      name: 'Ali Kaya',
      avatar: 'AK'
    },
    metadata: {
      oldStatus: 'pending',
      newStatus: 'in_progress'
    }
  },
  {
    id: 6,
    type: 'note',
    content: 'Ek parça gerekiyor, tedarik edilecek',
    timestamp: '2024-03-15T15:30:00',
    user: {
      id: 3,
      name: 'Ali Kaya',
      avatar: 'AK'
    }
  },
  {
    id: 7,
    type: 'complete',
    content: 'İş tamamlandı',
    timestamp: '2024-03-15T17:00:00',
    user: {
      id: 3,
      name: 'Ali Kaya',
      avatar: 'AK'
    }
  },
  {
    id: 8,
    type: 'status_change',
    content: 'Durum güncellendi',
    timestamp: '2024-03-15T17:01:00',
    user: {
      id: 3,
      name: 'Ali Kaya',
      avatar: 'AK'
    },
    metadata: {
      oldStatus: 'in_progress',
      newStatus: 'completed'
    }
  }
];

// Timeline event için renk ve ikon seçici
const getTimelineConfig = (type: TimelineEventType) => {
  switch (type) {
    case 'status_change':
      return {
        color: 'info' as const,
        icon: <EditIcon fontSize="small" />
      };
    case 'note':
      return {
        color: 'primary' as const,
        icon: <DescriptionIcon fontSize="small" />
      };
    case 'start':
      return {
        color: 'warning' as const,
        icon: <ScheduleIcon fontSize="small" />
      };
    case 'complete':
      return {
        color: 'success' as const,
        icon: <CheckCircleIcon fontSize="small" />
      };
    case 'assign':
      return {
        color: 'secondary' as const,
        icon: <PersonIcon fontSize="small" />
      };
    case 'create':
      return {
        color: 'primary' as const,
        icon: <AddIcon fontSize="small" />
      };
    default:
      return {
        color: 'grey' as const,
        icon: <CircleIcon fontSize="small" />
      };
  }
};

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
  const [editingPartId, setEditingPartId] = useState<number | null>(null);
  const [editedQuantity, setEditedQuantity] = useState<number>(0);
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
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(sampleTimelineEvents);
  const [newNote, setNewNote] = useState('');

  // Ortak stil tanımlamaları
  const commonStyles = {
    card: {
      borderRadius: 2,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
      }
    },
    cardHeader: {
      pb: 0,
      pt: isMobile ? 1 : 2,
      '& .MuiCardHeader-avatar': {
        bgcolor: 'primary.main',
        borderRadius: 1,
      }
    },
    listItem: {
      px: 0,
      py: isMobile ? 0.5 : 1,
      '& .MuiListItemIcon-root': {
        minWidth: 36,
      }
    },
    chip: {
      borderRadius: 1,
      fontWeight: 500,
    },
    actionButton: {
      textTransform: 'none',
      borderRadius: 1,
      px: 2,
    }
  };

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
        hasServiceForm: false,
        status: 'pending',
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

  const handlePartSelect = (selectedParts: WorkOrderPart[]) => {
    if (localWorkOrder) {
      // Mevcut parçalara yeni seçilenleri ekle
      const updatedParts = [
        ...localWorkOrder.parts,
        ...selectedParts.filter(newPart => 
          !localWorkOrder.parts.some((existingPart: WorkOrderPart) => existingPart.id === newPart.id)
        )
      ];

      // Toplam tutarı hesapla
      const totalAmount = localWorkOrder.services.reduce((total: number, service: WorkOrderService) => total + service.price, 0) + 
        updatedParts.reduce((total: number, part: WorkOrderPart) => total + (part.quantity * part.unitPrice), 0);

      // Local state'i güncelle
      const updatedWorkOrder = {
        ...localWorkOrder,
        parts: updatedParts,
        totalAmount: totalAmount,
      };
      setLocalWorkOrder(updatedWorkOrder);
    }
    setPartDialogOpen(false);
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

  const handlePartQuantitySave = (partId: number) => {
    if (localWorkOrder && editedQuantity >= 0) {
      const updatedParts = localWorkOrder.parts.map(part => 
        part.id === partId 
          ? { ...part, quantity: editedQuantity }
          : part
      );

      // Toplam tutarı güncelle
      const totalAmount = localWorkOrder.services.reduce((total: number, service: WorkOrderService) => total + service.price, 0) + 
        updatedParts.reduce((total: number, part: WorkOrderPart) => total + (part.quantity * part.unitPrice), 0);

      const updatedWorkOrder = {
        ...localWorkOrder,
        parts: updatedParts,
        totalAmount: totalAmount,
      };
      setLocalWorkOrder(updatedWorkOrder);
      setEditingPartId(null);
    }
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

  const handleServiceStatusChange = (serviceId: number, event: SelectChangeEvent<string>) => {
    const status = event.target.value as 'completed' | 'partially_completed' | 'pending';
    if (localWorkOrder) {
      const updatedServices = localWorkOrder.services.map(service =>
        service.id === serviceId
          ? { ...service, status }
          : service
      );

      const updatedWorkOrder = {
        ...localWorkOrder,
        services: updatedServices,
      };
      setLocalWorkOrder(updatedWorkOrder);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileDelete = (fileToDelete: File) => {
    setFiles(prev => prev.filter(file => file !== fileToDelete));
  };

  const handleFileDownload = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const newEvent: TimelineEvent = {
        id: Date.now(),
        type: 'note',
        content: newNote,
        timestamp: new Date().toISOString(),
        user: {
          id: 1, // Örnek kullanıcı
          name: 'Ahmet Yılmaz',
          avatar: 'AY'
        }
      };
      setTimelineEvents(prev => [...prev, newEvent]);
      setNewNote('');
    }
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
      <PageHeader
        workOrder={localWorkOrder as WorkOrder}
        localWorkOrder={localWorkOrder}
        setLocalWorkOrder={setLocalWorkOrder}
        timelineEvents={timelineEvents}
        setTimelineEvents={setTimelineEvents}
      />
      <Grid container spacing={isMobile ? 1 : 3}>
        {/* Firma Bilgileri */}
        <Grid item xs={12} md={6}>
          <CardContainer
            icon={<PersonIcon />}
            title="Firma Bilgileri"
          >
            <List disablePadding>
              <InfoListItem
                icon={<PersonIcon color="action" fontSize="small" />}
                value={localWorkOrder.company.contactPerson}
              />
              <InfoListItem
                icon={<EmailIcon color="action" fontSize="small" />}
                value={localWorkOrder.company.email}
              />
              <InfoListItem
                icon={<PhoneIcon color="action" fontSize="small" />}
                value={localWorkOrder.company.mobile}
              />
              <InfoListItem
                icon={<LocationIcon color="action" fontSize="small" />}
                value={localWorkOrder.company.address}
                isAddress={true}
              />
            </List>
          </CardContainer>
        </Grid>

        {/* İş Emri Detayları */}
        <Grid item xs={12} md={6}>
          <CardContainer
            icon={<CategoryIcon />}
            title="İş Emri Detayları"
          >
            <List disablePadding>
              <InfoListItem
                icon={<FlagIcon color="action" fontSize="small" />}
                value={typeLabels[localWorkOrder.type as WorkOrderType]}
              />
              <InfoListItem
                icon={<CategoryIcon color="action" fontSize="small" />}
                value={categoryLabels[localWorkOrder.category as WorkOrderCategory]}
              />
              <InfoListItem
                icon={<PriorityIcon color="action" fontSize="small" />}
                value={priorityLabels[localWorkOrder.priority as WorkOrderPriority]}
              />
              <InfoListItem
                icon={<ScheduleIcon color="action" fontSize="small" />}
                value={dayjs(localWorkOrder.dueDate).format('DD.MM.YYYY HH:mm')}
              />
            </List>
          </CardContainer>
        </Grid>

        {/* Hizmetler */}
        <Grid item xs={12}>
          <CardContainer
            icon={<ServiceIcon />}
            title="Servisler"
            action={
              <Button
                startIcon={<AddIcon />}
                onClick={handleServiceAdd}
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 1,
                  textTransform: 'none',
                  px: 2
                }}
              >
                Ekle
              </Button>
            }
          >
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
                        color: 'text.secondary',
                        flexWrap: 'wrap'
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
                              color: 'success.main'
                            }} 
                          />
                        ) : (
                          <RadioButtonUncheckedIcon 
                            fontSize="small" 
                            sx={{ 
                              color: 'action.disabled'
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
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      gap: 1,
                      mt: 1,
                      pt: 1.5,
                      borderTop: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      width: { xs: '100%', sm: 'auto' }
                    }}>
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
                    <Box sx={{ 
                      width: { xs: '100%', sm: 'auto' },
                      mt: { xs: 1, sm: 0 }
                    }}>
                      <Select
                        size="small"
                        value={service.status || 'pending'}
                        onChange={(event) => handleServiceStatusChange(service.id, event)}
                        fullWidth
                        sx={{
                          '& .MuiSelect-select': {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          }
                        }}
                      >
                        {serviceStatusOptions.map((option) => (
                          <MenuItem 
                            key={option.value} 
                            value={option.value}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <CheckCircleIcon 
                              fontSize="small" 
                              sx={{ 
                                color: `${option.color}.main`,
                              }} 
                            />
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
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
          </CardContainer>
        </Grid>

        {/* Parçalar */}
        <Grid item xs={12}>
          <CardContainer
            icon={<PartIcon />}
            title="Parçalar"
            action={
              <Button
                startIcon={<AddIcon />}
                onClick={handlePartAdd}
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 1,
                  textTransform: 'none',
                  px: 2
                }}
              >
                Ekle
              </Button>
            }
          >
            <Stack spacing={2}>
              {localWorkOrder.parts.map((part) => (
                <Box 
                  key={part.id}
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
                        {part.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        {part.description}
                      </Typography>
                    </Box>
                    <IconButton 
                      size="small" 
                      onClick={() => handlePartDelete(part.id)}
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
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      justifyContent: { xs: 'flex-start', sm: 'space-between' },
                      gap: 1,
                      mt: 1,
                      pt: 1.5,
                      borderTop: '1px solid',
                      borderColor: 'divider',
                      width: '100%'
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      width: { xs: '100%', sm: 'auto' }
                    }}>
                      
                      <TextField
                        type="number"
                        size="small"
                        value={editingPartId === part.id ? editedQuantity : part.quantity}
                        onChange={(e) => {
                          if (editingPartId !== part.id) {
                            setEditingPartId(part.id);
                          }
                          setEditedQuantity(Number(e.target.value));
                        }}
                        onBlur={() => {
                          if (editingPartId === part.id) {
                            handlePartQuantitySave(part.id);
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
                        {part.unit}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>
          </CardContainer>
        </Grid>

        {/* Dosyalar */}
        <Grid item xs={12}>
          <CardContainer
            icon={<AttachFileIcon />}
            title="Dosyalar"
            action={
              <Button
                startIcon={<CloudUploadIcon />}
                onClick={() => fileInputRef.current?.click()}
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 1,
                  textTransform: 'none',
                  px: 2
                }}
              >
                Yükle
              </Button>
            }
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              multiple
            />
            <Stack spacing={2}>
              {files.map((file, index) => (
                <Box 
                  key={index}
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
                    alignItems: 'center',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <AttachFileIcon color="action" />
                      <Box>
                        <Typography variant="subtitle2">
                          {file.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {(file.size / 1024).toFixed(2)} KB
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleFileDownload(file)}
                        sx={{
                          color: 'primary.main',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.1)
                          }
                        }}
                      >
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleFileDelete(file)}
                        sx={{
                          color: 'error.main',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.error.main, 0.1)
                          }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              ))}
              {files.length === 0 && (
                <Box 
                  sx={{ 
                    p: 4,
                    textAlign: 'center',
                    border: '2px dashed',
                    borderColor: 'divider',
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    }
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Typography color="text.secondary">
                    Dosya yüklemek için tıklayın veya sürükleyip bırakın
                  </Typography>
                </Box>
              )}
            </Stack>
          </CardContainer>
        </Grid>

        {/* Geçmiş İş Emirleri */}
        <Grid item xs={12}>
          <Accordion 
            defaultExpanded={false}
            sx={{
              borderRadius: 2,
              '&:before': {
                display: 'none',
              },
              '& .MuiAccordionSummary-root': {
                borderRadius: 2,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                }
              }
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                width: '100%'
              }}>
                <AccessTimeIcon color="primary" />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">
                    Geçmiş İş Emirleri
                  </Typography>
                </Box>
                <Chip 
                  label={`${localWorkOrder.company.previousWorkOrders?.length || 0} Kayıt`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2 }}>
              <Stack spacing={2}>
                {localWorkOrder.company.previousWorkOrders?.map((workOrder) => (
                  <Box 
                    key={workOrder.id}
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
                          {workOrder.summary}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ mt: 0.5 }}
                        >
                          {typeLabels[workOrder.type as WorkOrderType]} - {categoryLabels[workOrder.category as WorkOrderCategory]}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          label={statusLabels[workOrder.status as WorkOrderStatus]}
                          color={statusColors[workOrder.status as WorkOrderStatus]}
                          size="small"
                        />
                        <IconButton
                          size="small"
                          onClick={() => window.location.href = `/work-orders/${workOrder.id}`}
                          sx={{
                            color: 'primary.main',
                            '&:hover': {
                              bgcolor: alpha(theme.palette.primary.main, 0.1)
                            }
                          }}
                        >
                          <ArrowForwardIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        justifyContent: 'space-between',
                        gap: 1,
                        mt: 1,
                        pt: 1.5,
                        borderTop: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2,
                        color: 'text.secondary'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTimeIcon fontSize="small" />
                          <Typography variant="body2">
                            {dayjs(workOrder.createdAt).format('DD.MM.YYYY')}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
                {(!localWorkOrder.company.previousWorkOrders || localWorkOrder.company.previousWorkOrders.length === 0) && (
                  <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                    Bu müşteriye ait geçmiş iş emri bulunmamaktadır.
                  </Typography>
                )}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Timeline */}
        <Grid item xs={12}>
          <Accordion 
            defaultExpanded={false}
            sx={{
              borderRadius: 2,
              '&:before': {
                display: 'none',
              },
              '& .MuiAccordionSummary-root': {
                borderRadius: 2,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                }
              }
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                width: '100%'
              }}>
                <TimelineIcon color="primary" />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">
                    Zaman Çizelgesi
                  </Typography>
                  {timelineEvents.length > 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      Son Aksiyon: {dayjs(timelineEvents[timelineEvents.length - 1].timestamp).format('DD.MM.YYYY HH:mm')} - {timelineEvents[timelineEvents.length - 1].user.name}
                    </Typography>
                  )}
                </Box>
                <Chip 
                  label={`${timelineEvents.length} Kayıt`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1,
                  mb: 3
                }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Not ekle..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddNote();
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleAddNote}
                    disabled={!newNote.trim()}
                    sx={{
                      minWidth: 'auto',
                      px: 2
                    }}
                  >
                    <SendIcon />
                  </Button>
                </Box>
                <Timeline>
                  {[...timelineEvents].reverse().map((event) => {
                    const config = getTimelineConfig(event.type);
                    return (
                      <TimelineItem key={event.id}>
                        <TimelineOppositeContent sx={{ flex: 0.2 }}>
                          <Typography variant="caption" color="text.secondary">
                            {dayjs(event.timestamp).format('DD.MM.YYYY HH:mm')}
                          </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot color={config.color}>
                            {config.icon}
                          </TimelineDot>
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'flex-start',
                            gap: 1
                          }}>
                            <Box>
                              <Typography variant="body2" fontWeight="medium">
                                {event.user.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {event.content}
                              </Typography>
                              {event.type === 'status_change' && event.metadata && (
                                <Box sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center',
                                  gap: 1,
                                  mt: 0.5
                                }}>
                                  <Chip
                                    label={statusLabels[event.metadata.oldStatus as WorkOrderStatus]}
                                    color={statusColors[event.metadata.oldStatus as WorkOrderStatus]}
                                    size="small"
                                  />
                                  <ArrowForwardIcon fontSize="small" color="action" />
                                  <Chip
                                    label={statusLabels[event.metadata.newStatus as WorkOrderStatus]}
                                    color={statusColors[event.metadata.newStatus as WorkOrderStatus]}
                                    size="small"
                                  />
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </TimelineContent>
                      </TimelineItem>
                    );
                  })}
                </Timeline>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>

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
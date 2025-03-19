import { useState } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  useTheme, 
  useMediaQuery, 
  Chip,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
  Tabs,
  Tab,
  Badge,
  Fab,
  Menu,
  MenuItem,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper as MuiPaper,
  Link,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Radio,
  CircularProgress,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  List as ListIcon,
  PendingActions as PendingIcon,
  Assignment as AssignedIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Cancel as CancelIcon,
  AssignmentInd as AssignmentIndIcon,
  PriorityHigh as HighPriorityIcon,
  ArrowUpward as MediumPriorityIcon,
  ArrowDownward as LowPriorityIcon,
  MonetizationOn as MoneyIcon,
  Engineering as ServiceIcon,
  Build as PartIcon,
  Category as CategoryIcon,
  Flag as TypeIcon,
  OpenInNew as OpenInNewIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { WorkOrder } from '../../types/workOrder';
import { User } from '../../types/user';
import { useGlobalUsers } from '../../hooks/useGlobalUsers';
import { useQuery } from '@tanstack/react-query';
import { workOrderAPI } from '../../services/api';
import dayjs from 'dayjs';
import { usePageTitle } from '../../contexts/PageTitleContext';
import React from 'react';
import { useQueryClient } from '@tanstack/react-query';

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
} as const;

const statusColors = {
  pool: 'info',
  pending: 'warning',
  in_progress: 'primary',
  completed: 'success',
  cancelled: 'error',
} as const;

const statusLabels = {
  pool: 'Havuz',
  pending: 'Beklemede',
  in_progress: 'Devam Ediyor',
  completed: 'Tamamlandı',
  cancelled: 'İptal',
} as const;

type FilterType = 'all' | 'pool' | 'pending' | 'in_progress' | 'completed' | 'cancelled';

type SortOption = 'dueDate' | 'priority' | 'status' | 'category';

const sortOptions = {
  dueDate: 'Tarih',
  priority: 'Öncelik',
  status: 'Durum',
  category: 'Kategori'
} as const;

const priorityIcons = {
  high: <HighPriorityIcon fontSize="small" sx={{ color: 'error.main' }} />,
  medium: <MediumPriorityIcon fontSize="small" sx={{ color: 'warning.main' }} />,
  low: <LowPriorityIcon fontSize="small" sx={{ color: 'success.main' }} />,
} as const;

const WorkOrderList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: users = [] } = useGlobalUsers();
  const { setTitle } = usePageTitle();
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [menuAnchorEl, setMenuAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});
  const [sortBy, setSortBy] = useState<SortOption>('dueDate');
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);
  const [assignmentDialogOpen, setAssignmentDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [assigningWorkOrder, setAssigningWorkOrder] = useState<WorkOrder | null>(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: workOrders = [] } = useQuery({
    queryKey: ['workOrders'],
    queryFn: workOrderAPI.getWorkOrders,
  });

  const queryClient = useQueryClient();

  React.useEffect(() => {
    setTitle('İş Emirlerim');
  }, [setTitle]);

  const handleAdd = () => {
    navigate('/work-orders/create');
  };



  const filteredWorkOrders = workOrders.filter(workOrder => {
    switch (currentFilter) {
      case 'pool':
        return workOrder.status === 'pool';
      case 'pending':
        return workOrder.status === 'pending';
      case 'in_progress':
        return workOrder.status === 'in_progress';
      case 'completed':
        return workOrder.status === 'completed';
      case 'cancelled':
        return workOrder.status === 'cancelled';
      default:
        return true;
    }
  });

  const filterCounts = {
    all: workOrders.length,
    pool: workOrders.filter(wo => wo.status === 'pool').length,
    pending: workOrders.filter(wo => wo.status === 'pending').length,
    in_progress: workOrders.filter(wo => wo.status === 'in_progress').length,
    completed: workOrders.filter(wo => wo.status === 'completed').length,
    cancelled: workOrders.filter(wo => wo.status === 'cancelled').length,
  };

  const handleCardMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, workOrderId: string) => {
    setMenuAnchorEl({
      ...menuAnchorEl,
      [workOrderId]: event.currentTarget
    });
  };

  const handleCardMenuClose = (workOrderId: string) => {
    setMenuAnchorEl({
      ...menuAnchorEl,
      [workOrderId]: null
    });
  };

  const handleViewDetails = (workOrderId: string) => {
    handleCardMenuClose(workOrderId);
    const workOrder = workOrders.find(wo => wo.id.toString() === workOrderId);
    if (workOrder) {
      setSelectedWorkOrder(workOrder);
    }
  };

  const handleCloseDetails = () => {
    setSelectedWorkOrder(null);
  };

  const handleEdit = (workOrderId: string) => {
    handleCardMenuClose(workOrderId);
    navigate(`/work-orders/${workOrderId}/edit`);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as SortOption);
  };

  const getSortedWorkOrders = (orders: WorkOrder[]) => {
    return [...orders].sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return dayjs(a.dueDate).isBefore(dayjs(b.dueDate)) ? -1 : 1;
        case 'priority':
          const priorityOrder = { high: 1, medium: 2, low: 3 };
          return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
        case 'status':
          return (statusLabels[a.status as keyof typeof statusLabels] || '').localeCompare(
            statusLabels[b.status as keyof typeof statusLabels] || ''
          );
        case 'category':
          return (categoryLabels[a.category as keyof typeof categoryLabels] || '').localeCompare(
            categoryLabels[b.category as keyof typeof categoryLabels] || ''
          );
        default:
          return 0;
      }
    });
  };

  const sortedAndFilteredWorkOrders = getSortedWorkOrders(filteredWorkOrders);

  const getGoogleMapsUrl = (address: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  const handleAssignmentOpen = (workOrderId: string) => {
    handleCardMenuClose(workOrderId);
    const workOrder = workOrders.find(wo => wo.id.toString() === workOrderId);
    if (workOrder) {
      setAssigningWorkOrder(workOrder);
      setSelectedUserId(workOrder.assignedTo?.id || null);
      setAssignmentDialogOpen(true);
    }
  };

  const handleAssignmentClose = () => {
    setAssignmentDialogOpen(false);
    setAssigningWorkOrder(null);
    setSelectedUserId(null);
  };

  const handleAssignmentSave = async () => {
    if (!assigningWorkOrder || !selectedUserId) return;

    setIsAssigning(true);
    try {
      const selectedUser = users.find(u => u.id === selectedUserId);
      if (!selectedUser) return;

      const updatedWorkOrder = {
        ...assigningWorkOrder,
        assignedTo: selectedUser,
        status: assigningWorkOrder.status === 'pending' ? 'in_progress' : assigningWorkOrder.status
      };

      await workOrderAPI.updateWorkOrder(assigningWorkOrder.id, updatedWorkOrder);
      
      // Invalidate and refetch work orders
      await queryClient.invalidateQueries({ queryKey: ['workOrders'] });
      
      handleAssignmentClose();
    } catch (error) {
      console.error('Atama yapılırken bir hata oluştu:', error);
    } finally {
      setIsAssigning(false);
    }
  };

  const filteredUsers = users.filter((user: User) => {
    const searchText = searchQuery.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(searchText) ||
      user.lastName.toLowerCase().includes(searchText) ||
      user.company?.toLowerCase().includes(searchText) ||
      user.region?.toLowerCase().includes(searchText)
    );
  });

  return (
    <Box sx={{ position: 'relative', minHeight: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'stretch', sm: 'center' },
        mb: 3,
        gap: 2
      }}>
        <Tabs
          value={currentFilter}
          onChange={(_, newValue) => setCurrentFilter(newValue)}
          variant="scrollable"
          scrollButtons={isMobile ? false : "auto"}
          allowScrollButtonsMobile
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            minHeight: { xs: '40px', sm: '48px' },
            '& .MuiTab-root': {
              minWidth: { xs: '25%', sm: 160 },
              minHeight: { xs: '40px', sm: '48px' },
              padding: { xs: '6px 8px', sm: '12px 16px' },
              '& .MuiBadge-badge': {
                fontSize: { xs: '0.65rem', sm: '0.75rem' },
                height: { xs: '14px', sm: '18px' },
                minWidth: { xs: '14px', sm: '18px' },
                padding: { xs: '0 4px', sm: '0 6px' },
              },
              '& .MuiSvgIcon-root': {
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
              },
            },
            '& .MuiTabs-flexContainer': {
              justifyContent: { xs: 'space-between', sm: 'flex-start' },
            },
          }}
        >
          <Tab 
            icon={
              <Badge 
                badgeContent={filterCounts.all} 
                color="primary"
                sx={{ '& .MuiBadge-badge': { right: -3, top: -3 } }}
              >
                <ListIcon />
              </Badge>
            }
            label={!isMobile && "Tümü"}
            value="all"
            iconPosition="start"
          />
          <Tab 
            icon={
              <Badge 
                badgeContent={filterCounts.pool} 
                color="info"
                sx={{ '& .MuiBadge-badge': { right: -3, top: -3 } }}
              >
                <ListIcon />
              </Badge>
            }
            label={!isMobile && "Havuz"}
            value="pool"
            iconPosition="start"
          />
          <Tab 
            icon={
              <Badge 
                badgeContent={filterCounts.pending} 
                color="warning"
                sx={{ '& .MuiBadge-badge': { right: -3, top: -3 } }}
              >
                <PendingIcon />
              </Badge>
            }
            label={!isMobile && "Beklemede"}
            value="pending"
            iconPosition="start"
          />
          <Tab 
            icon={
              <Badge 
                badgeContent={filterCounts.in_progress} 
                color="primary"
                sx={{ '& .MuiBadge-badge': { right: -3, top: -3 } }}
              >
                <AssignedIcon />
              </Badge>
            }
            label={!isMobile && "Devam Ediyor"}
            value="in_progress"
            iconPosition="start"
          />
          <Tab 
            icon={
              <Badge 
                badgeContent={filterCounts.completed} 
                color="success"
                sx={{ '& .MuiBadge-badge': { right: -3, top: -3 } }}
              >
                <AssignedIcon />
              </Badge>
            }
            label={!isMobile && "Tamamlandı"}
            value="completed"
            iconPosition="start"
          />
          <Tab 
            icon={
              <Badge 
                badgeContent={filterCounts.cancelled} 
                color="error"
                sx={{ '& .MuiBadge-badge': { right: -3, top: -3 } }}
              >
                <CancelIcon />
              </Badge>
            }
            label={!isMobile && "İptal"}
            value="cancelled"
            iconPosition="start"
          />
        </Tabs>
        <FormControl 
          size="small" 
          sx={{ 
            minWidth: 200,
            bgcolor: 'background.paper',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'divider',
              },
            },
          }}
        >
          <InputLabel id="sort-select-label">Sıralama</InputLabel>
          <Select
            labelId="sort-select-label"
            id="sort-select"
            value={sortBy}
            label="Sıralama"
            onChange={handleSortChange}
          >
            {Object.entries(sortOptions).map(([value, label]) => (
              <MenuItem key={value} value={value}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2}>
        {sortedAndFilteredWorkOrders.length === 0 ? (
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '200px',
                width: '100%',
                bgcolor: 'background.paper',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                border: '1px dashed',
                borderColor: 'divider'
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Kayıt bulunamadı
              </Typography>
            </Box>
          </Grid>
        ) : (
          sortedAndFilteredWorkOrders.map((workOrder) => (
            <Grid item xs={12} sm={6} md={4} key={workOrder.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 2,
                  boxShadow: 3,
                  position: 'relative',
                  overflow: 'visible',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 8,
                  }
                }}
              >
                {/* Status Banner */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '28px',
                    bgcolor: theme => theme.palette[statusColors[workOrder.status]].main,
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  {statusLabels[workOrder.status]}
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3, pt: 4 }}>
                  <Stack spacing={2.5}>
                    {/* Başlık ve Actions */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1, overflow: 'hidden' }}>
                        <Typography 
                          variant="h6" 
                          component="div" 
                          noWrap
                          sx={{ 
                            fontWeight: 600,
                            color: 'text.primary',
                          }}
                        >
                          {workOrder.company.name}
                        </Typography>
                        <IconButton 
                          size="small"
                          aria-label="actions"
                          onClick={(e) => handleCardMenuOpen(e, workOrder.id.toString())}
                          sx={{ 
                            ml: 'auto',
                            color: 'action.active',
                            '&:hover': { bgcolor: 'action.hover' }
                          }}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                        <Menu
                          anchorEl={menuAnchorEl[workOrder.id.toString()]}
                          open={Boolean(menuAnchorEl[workOrder.id.toString()])}
                          onClose={() => handleCardMenuClose(workOrder.id.toString())}
                        >
                          <MenuItem onClick={() => handleViewDetails(workOrder.id.toString())}>
                            <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
                            Detaylar
                          </MenuItem>
                          <MenuItem onClick={() => handleEdit(workOrder.id.toString())}>
                            <EditIcon fontSize="small" sx={{ mr: 1 }} />
                            Düzenle
                          </MenuItem>
                          <MenuItem onClick={() => handleAssignmentOpen(workOrder.id.toString())}>
                            <AssignmentIndIcon fontSize="small" sx={{ mr: 1 }} />
                            Atama Yap
                          </MenuItem>
                          <MenuItem onClick={() => handleCardMenuClose(workOrder.id.toString())}>
                            <CancelIcon fontSize="small" sx={{ mr: 1 }} />
                            İptal Et
                          </MenuItem>
                        </Menu>
                      </Box>
                    </Box>

                    {/* Özet */}
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                      }}
                    >
                      {workOrder.summary}
                    </Typography>

                    {/* Atanan Kişi - Öne Çıkarılmış */}
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      p: 1.5,
                      borderRadius: 1,
                      bgcolor: 'background.default',
                      border: '1px solid',
                      borderColor: 'divider'
                    }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'primary.main',
                          width: 40,
                          height: 40,
                          fontWeight: 'bold'
                        }}
                      >
                        {workOrder.assignedTo ? workOrder.assignedTo.firstName.charAt(0) : '?'}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {workOrder.assignedTo ? `${workOrder.assignedTo.firstName} ${workOrder.assignedTo.lastName}` : 'Atanmamış'}
                        </Typography>
                      </Box>
                      <Stack 
                        direction={{ xs: 'column', sm: 'row' }} 
                        spacing={1}
                        alignItems="flex-end"
                      >
                        <Chip
                          size="small"
                          label={`${Math.floor(workOrder.totalDuration / 60)}s ${workOrder.totalDuration % 60}d`}
                          color="info"
                          sx={{ 
                            fontWeight: 'medium',
                            fontSize: '0.7rem',
                            minWidth: { xs: '80px', sm: 'auto' }
                          }}
                          icon={<AccessTimeIcon fontSize="small" />}
                        />
                        <Chip
                          size="small"
                          label={dayjs(workOrder.dueDate).format('DD.MM.YYYY')}
                          color={dayjs(workOrder.dueDate).isBefore(dayjs()) ? 'error' : 'default'}
                          sx={{ 
                            fontWeight: dayjs(workOrder.dueDate).isBefore(dayjs()) ? 'bold' : 'normal',
                            fontSize: '0.7rem',
                            minWidth: { xs: '80px', sm: 'auto' }
                          }}
                          icon={<AccessTimeIcon fontSize="small" />}
                        />
                      </Stack>
                    </Box>

                    {/* Tip, Kategori ve Öncelik */}
                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                      <Chip
                        label={typeLabels[workOrder.type]}
                        variant="outlined"
                        size="small"
                        sx={{ borderRadius: '12px' }}
                      />
                      <Chip
                        label={categoryLabels[workOrder.category]}
                        variant="outlined"
                        size="small"
                        color="info"
                        sx={{ borderRadius: '12px' }}
                      />
                      <Chip
                        label={priorityLabels[workOrder.priority]}
                        variant="outlined"
                        size="small"
                        icon={priorityIcons[workOrder.priority]}
                        sx={{ 
                          borderRadius: '12px',
                          fontWeight: 'medium'
                        }}
                      />
                    </Stack>

                    <Divider sx={{ borderStyle: 'dashed' }} />

                    {/* İletişim Bilgileri */}
                    <Stack spacing={1}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <LocationOnIcon fontSize="small" color="action" />
                        <Box
                          component={Link}
                          href={getGoogleMapsUrl(workOrder.company.address)}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            color: 'primary.main',
                            textDecoration: 'none',
                            '&:hover': {
                              textDecoration: 'underline',
                              '& .MuiSvgIcon-root': {
                                opacity: 1
                              }
                            }
                          }}
                        >
                          <Typography variant="body2" sx={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {workOrder.company.address}
                          </Typography>
                          <OpenInNewIcon 
                            fontSize="small" 
                            sx={{ 
                              fontSize: '1rem',
                              opacity: 0.5,
                              transition: 'opacity 0.2s'
                            }} 
                          />
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <PhoneIcon fontSize="small" color="action" />
                        <Typography variant="body2">
                          {workOrder.company.mobile}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Detay Dialog */}
      <Dialog
        open={selectedWorkOrder !== null}
        onClose={handleCloseDetails}
        maxWidth="sm"
        fullWidth
      >
        {selectedWorkOrder && (
          <>
            <DialogTitle sx={{ 
              pb: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
                İş Emri Detayları
              </Typography>
              <Chip
                label={statusLabels[selectedWorkOrder.status]}
                color={statusColors[selectedWorkOrder.status]}
                size="small"
                sx={{ fontWeight: 'medium' }}
              />
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2}>
                {/* Temel Bilgiler */}
                <TableContainer component={MuiPaper} variant="outlined">
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" sx={{ width: '40%', fontWeight: 'medium' }}>
                          Firma
                        </TableCell>
                        <TableCell>{selectedWorkOrder.company.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" sx={{ fontWeight: 'medium' }}>
                          İletişim Kişisi
                        </TableCell>
                        <TableCell>{selectedWorkOrder.company.contactPerson}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" sx={{ fontWeight: 'medium' }}>
                          Telefon
                        </TableCell>
                        <TableCell>{selectedWorkOrder.company.mobile}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" sx={{ fontWeight: 'medium' }}>
                          Adres
                        </TableCell>
                        <TableCell>
                          <Box
                            component={Link}
                            href={getGoogleMapsUrl(selectedWorkOrder?.company.address || '')}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              color: 'primary.main',
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline',
                                '& .MuiSvgIcon-root': {
                                  opacity: 1
                                }
                              }
                            }}
                          >
                            {selectedWorkOrder?.company.address}
                            <OpenInNewIcon 
                              fontSize="small" 
                              sx={{ 
                                fontSize: '1rem',
                                opacity: 0.5,
                                transition: 'opacity 0.2s'
                              }} 
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" sx={{ fontWeight: 'medium' }}>
                          Atanan Kişi
                        </TableCell>
                        <TableCell>
                          {selectedWorkOrder.assignedTo 
                            ? `${selectedWorkOrder.assignedTo.firstName} ${selectedWorkOrder.assignedTo.lastName}`
                            : 'Atanmamış'
                          }
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* İş Detayları */}
                <TableContainer component={MuiPaper} variant="outlined">
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" sx={{ width: '40%', fontWeight: 'medium' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TypeIcon fontSize="small" color="action" />
                            Tip
                          </Box>
                        </TableCell>
                        <TableCell>{typeLabels[selectedWorkOrder.type]}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" sx={{ fontWeight: 'medium' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CategoryIcon fontSize="small" color="action" />
                            Kategori
                          </Box>
                        </TableCell>
                        <TableCell>{categoryLabels[selectedWorkOrder.category]}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" sx={{ fontWeight: 'medium' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {priorityIcons[selectedWorkOrder.priority]}
                            Öncelik
                          </Box>
                        </TableCell>
                        <TableCell>{priorityLabels[selectedWorkOrder.priority]}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" sx={{ fontWeight: 'medium' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccessTimeIcon fontSize="small" color="action" />
                            Toplam Süre
                          </Box>
                        </TableCell>
                        <TableCell>
                          {`${Math.floor(selectedWorkOrder.totalDuration / 60)} saat ${selectedWorkOrder.totalDuration % 60} dakika`}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" sx={{ fontWeight: 'medium' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <MoneyIcon fontSize="small" color="action" />
                            Toplam Tutar
                          </Box>
                        </TableCell>
                        <TableCell>{`${selectedWorkOrder.totalAmount.toLocaleString('tr-TR')} ₺`}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Hizmetler */}
                {selectedWorkOrder.services.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ServiceIcon fontSize="small" color="action" />
                      Hizmetler
                    </Typography>
                    <TableContainer component={MuiPaper} variant="outlined">
                      <Table size="small">
                        <TableBody>
                          {selectedWorkOrder.services.map((service) => (
                            <TableRow key={service.id}>
                              <TableCell sx={{ width: '40%' }}>{service.name}</TableCell>
                              <TableCell>{service.description}</TableCell>
                              <TableCell align="right">{`${service.duration} dk`}</TableCell>
                              <TableCell align="right">{`${service.price.toLocaleString('tr-TR')} ₺`}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}

                {/* Parçalar */}
                {selectedWorkOrder.parts.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PartIcon fontSize="small" color="action" />
                      Parçalar
                    </Typography>
                    <TableContainer component={MuiPaper} variant="outlined">
                      <Table size="small">
                        <TableBody>
                          {selectedWorkOrder.parts.map((part) => (
                            <TableRow key={part.id}>
                              <TableCell sx={{ width: '40%' }}>{part.name}</TableCell>
                              <TableCell>{part.description}</TableCell>
                              <TableCell align="right">{`${part.quantity} ${part.unit}`}</TableCell>
                              <TableCell align="right">{`${(part.quantity * part.unitPrice).toLocaleString('tr-TR')} ₺`}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Atama Dialog */}
      <Dialog
        open={assignmentDialogOpen}
        onClose={handleAssignmentClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" component="span">
            İş Emri Atama
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {/* İş Emri Bilgileri */}
            {assigningWorkOrder && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  İş Emri Bilgileri
                </Typography>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Firma:
                    </Typography>
                    <Typography variant="body2">
                      {assigningWorkOrder.company.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Tip:
                    </Typography>
                    <Typography variant="body2">
                      {typeLabels[assigningWorkOrder.type]}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Öncelik:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {priorityIcons[assigningWorkOrder.priority]}
                      <Typography variant="body2">
                        {priorityLabels[assigningWorkOrder.priority]}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            )}

            <Divider />

            {/* Kullanıcı Listesi */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Atanacak Kullanıcı
              </Typography>
              
              {/* Arama Alanı */}
              <TextField
                fullWidth
                size="small"
                placeholder="İsim, şirket veya bölge ile ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" color="action" />
                    </InputAdornment>
                  )
                }}
              />

              <List sx={{ 
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                maxHeight: 400,
                overflow: 'auto'
              }}>
                {filteredUsers.length === 0 ? (
                  <ListItem>
                    <ListItemText
                      primary="Sonuç bulunamadı"
                      primaryTypographyProps={{
                        color: 'text.secondary',
                        textAlign: 'center'
                      }}
                    />
                  </ListItem>
                ) : (
                  filteredUsers.map((user: User) => (
                    <ListItem
                      key={user.id}
                      disablePadding
                      secondaryAction={
                        <Radio
                          checked={selectedUserId === user.id}
                          onChange={() => setSelectedUserId(user.id)}
                        />
                      }
                    >
                      <ListItemButton onClick={() => setSelectedUserId(user.id)}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {user.firstName.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${user.firstName} ${user.lastName}`}
                          secondary={
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Typography variant="body2" component="span" color="text.secondary">
                                {user.company || 'Şirket bilgisi yok'}
                              </Typography>
                              {user.region && (
                                <>
                                  <Typography variant="body2" component="span" color="text.secondary">•</Typography>
                                  <Typography variant="body2" component="span" color="text.secondary">
                                    {user.region}
                                  </Typography>
                                </>
                              )}
                            </Stack>
                          }
                          primaryTypographyProps={{
                            fontWeight: selectedUserId === user.id ? 'bold' : 'normal'
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))
                )}
              </List>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, gap: 1 }}>
          <Button 
            onClick={handleAssignmentClose}
            color="inherit"
          >
            İptal
          </Button>
          <Button
            onClick={handleAssignmentSave}
            variant="contained"
            disabled={!selectedUserId || isAssigning}
            startIcon={isAssigning ? <CircularProgress size={20} /> : null}
          >
            {isAssigning ? 'Atanıyor...' : 'Kaydet'}
          </Button>
        </DialogActions>
      </Dialog>

      <Fab
        color="primary"
        onClick={handleAdd}
        sx={{
          position: 'fixed',
          bottom: (theme) => theme.spacing(3),
          right: (theme) => theme.spacing(3),
          zIndex: (theme) => theme.zIndex.speedDial,
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default WorkOrderList; 
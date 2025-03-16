import { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  IconButton, 
  useTheme, 
  useMediaQuery, 
  Chip,
  Grid,
  Card,
  CardContent,
  CardActions,
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
  SelectChangeEvent
} from '@mui/material';
import {
  Add as AddIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  List as ListIcon,
  PendingActions as PendingIcon,
  PriorityHigh as UrgentIcon,
  Assignment as AssignedIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Cancel as CancelIcon,
  AssignmentInd as AssignmentIndIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { WorkOrder } from '../../types/workOrder';
import { useGlobalUsers } from '../../hooks/useGlobalUsers';
import { useGlobalCustomers } from '../../hooks/useGlobalCustomers';
import { useGlobalStores } from '../../hooks/useGlobalStores';
import { useQuery } from '@tanstack/react-query';
import { workOrderAPI } from '../../services/api';
import dayjs from 'dayjs';
import { usePageTitle } from '../../contexts/PageTitleContext';
import React from 'react';

const priorityLabels = {
  high: 'Yüksek',
  medium: 'Orta',
  low: 'Düşük',
} as const;

const priorityColors = {
  high: 'error',
  medium: 'warning',
  low: 'success',
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
  pool: 'default',
  waitingForAssignment: 'info',
  pending: 'warning',
  inProgress: 'primary',
  waitingForCompletion: 'secondary',
  completed: 'success',
  cancelled: 'error',
} as const;

const statusLabels = {
  pool: 'Havuz',
  waitingForAssignment: 'Atama Onayı Bekliyor',
  pending: 'Beklemede',
  inProgress: 'Devam Ediyor',
  waitingForCompletion: 'Tamamlanma Onayı Bekliyor',
  completed: 'Tamamlandı',
  cancelled: 'İptal',
} as const;

type FilterType = 'all' | 'pool' | 'waitingForAssignment' | 'inProgress' | 'pending';

type SortOption = 'dueDate' | 'priority' | 'status' | 'category';

const sortOptions = {
  dueDate: 'Tarih',
  priority: 'Öncelik',
  status: 'Durum',
  category: 'Kategori'
} as const;

const WorkOrderList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: users = [] } = useGlobalUsers();
  const { data: customers = [] } = useGlobalCustomers();
  const { data: stores = [] } = useGlobalStores();
  const { setTitle } = usePageTitle();
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [menuAnchorEl, setMenuAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});
  const [sortBy, setSortBy] = useState<SortOption>('dueDate');

  const { data: workOrders = [], isLoading } = useQuery({
    queryKey: ['workOrders'],
    queryFn: workOrderAPI.getWorkOrders,
  });

  React.useEffect(() => {
    setTitle('İş Emirlerim');
  }, [setTitle]);

  const handleAdd = () => {
    navigate('/work-orders/create');
  };

  const getStoreName = (id: string) => {
    console.log('Store ID:', id);
    console.log('Stores:', stores);
    const store = stores.find(s => s.id === id);
    console.log('Found store:', store);
    return store ? store.name : id;
  };

  const getContactName = (id: string) => {
    const user = users.find(u => u.id === id);
    return user ? `${user.firstName} ${user.lastName}` : '';
  };

  const filteredWorkOrders = workOrders.filter(workOrder => {
    switch (currentFilter) {
      case 'pool':
        return workOrder.status === 'pool';
      case 'waitingForAssignment':
        return workOrder.status === 'waitingForAssignment';
      case 'inProgress':
        return workOrder.status === 'inProgress';
      case 'pending':
        return workOrder.status === 'pending';
      default:
        return true;
    }
  });

  const filterCounts = {
    all: workOrders.length,
    pool: workOrders.filter(wo => wo.status === 'pool').length,
    waitingForAssignment: workOrders.filter(wo => wo.status === 'waitingForAssignment').length,
    inProgress: workOrders.filter(wo => wo.status === 'inProgress').length,
    pending: workOrders.filter(wo => wo.status === 'pending').length,
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
    navigate(`/work-orders/${workOrderId}`);
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
                color="warning"
                sx={{ '& .MuiBadge-badge': { right: -3, top: -3 } }}
              >
                <PendingIcon />
              </Badge>
            }
            label={!isMobile && "Havuz"}
            value="pool"
            iconPosition="start"
          />
          <Tab 
            icon={
              <Badge 
                badgeContent={filterCounts.waitingForAssignment} 
                color="info"
                sx={{ '& .MuiBadge-badge': { right: -3, top: -3 } }}
              >
                <UrgentIcon />
              </Badge>
            }
            label={!isMobile && "Atama Onayı Bekliyor"}
            value="waitingForAssignment"
            iconPosition="start"
          />
          <Tab 
            icon={
              <Badge 
                badgeContent={filterCounts.inProgress} 
                color="primary"
                sx={{ '& .MuiBadge-badge': { right: -3, top: -3 } }}
              >
                <AssignedIcon />
              </Badge>
            }
            label={!isMobile && "Devam Ediyor"}
            value="inProgress"
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
                  },
                  ...(workOrder.priority === 'high' && {
                    borderTop: '4px solid',
                    borderColor: 'error.main',
                  }),
                  ...(workOrder.priority === 'medium' && {
                    borderTop: '4px solid',
                    borderColor: 'warning.main',
                  }),
                  ...(workOrder.priority === 'low' && {
                    borderTop: '4px solid',
                    borderColor: 'success.main',
                  }),
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
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
                          {getStoreName(workOrder.store)}
                        </Typography>
                        <IconButton 
                          size="small"
                          aria-label="actions"
                          onClick={(e) => handleCardMenuOpen(e, workOrder.id)}
                          sx={{ 
                            ml: 'auto',
                            color: 'action.active',
                            '&:hover': { bgcolor: 'action.hover' }
                          }}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                        <Menu
                          anchorEl={menuAnchorEl[workOrder.id]}
                          open={Boolean(menuAnchorEl[workOrder.id])}
                          onClose={() => handleCardMenuClose(workOrder.id)}
                        >
                          <MenuItem onClick={() => handleViewDetails(workOrder.id)}>
                            <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
                            Detaylar
                          </MenuItem>
                          <MenuItem onClick={() => handleEdit(workOrder.id)}>
                            <EditIcon fontSize="small" sx={{ mr: 1 }} />
                            Düzenle
                          </MenuItem>
                          <MenuItem onClick={() => handleCardMenuClose(workOrder.id)}>
                            <AssignmentIndIcon fontSize="small" sx={{ mr: 1 }} />
                            Atama Yap
                          </MenuItem>
                          <MenuItem onClick={() => handleCardMenuClose(workOrder.id)}>
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
                        {getContactName(workOrder.assignedTo) ? getContactName(workOrder.assignedTo).charAt(0) : '?'}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {getContactName(workOrder.assignedTo) || 'Atanmamış'}
                        </Typography>
                      </Box>
                      <Chip
                        size="small"
                        label={dayjs(workOrder.dueDate).format('DD.MM.YYYY')}
                        color={dayjs(workOrder.dueDate).isBefore(dayjs()) ? 'error' : 'default'}
                        sx={{ 
                          fontWeight: dayjs(workOrder.dueDate).isBefore(dayjs()) ? 'bold' : 'normal',
                          fontSize: '0.7rem'
                        }}
                        icon={<AccessTimeIcon fontSize="small" />}
                      />
                    </Box>

                    {/* Status */}
                    <Box>
                      <Chip
                        label={statusLabels[workOrder.status as keyof typeof statusLabels]}
                        color={statusColors[workOrder.status as keyof typeof statusColors]}
                        size="small"
                        sx={{ 
                          fontWeight: 'medium',
                          borderRadius: '16px',
                          boxShadow: 1
                        }}
                      />
                    </Box>

                    {/* Tip, Kategori ve Öncelik */}
                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                      <Chip
                        label={typeLabels[workOrder.type as keyof typeof typeLabels]}
                        variant="outlined"
                        size="small"
                        sx={{ borderRadius: '12px' }}
                      />
                      <Chip
                        label={categoryLabels[workOrder.category as keyof typeof categoryLabels]}
                        variant="outlined"
                        size="small"
                        color="info"
                        sx={{ borderRadius: '12px' }}
                      />
                      <Chip
                        label={priorityLabels[workOrder.priority as keyof typeof priorityLabels]}
                        color={priorityColors[workOrder.priority as keyof typeof priorityColors]}
                        size="small"
                        sx={{ 
                          borderRadius: '12px',
                          fontWeight: 'bold'
                        }}
                      />
                    </Stack>

                    <Divider sx={{ borderStyle: 'dashed' }} />

                    {/* İletişim Bilgileri */}
                    <Stack spacing={1.5}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <LocationOnIcon fontSize="small" color="action" />
                        <Typography variant="body2" noWrap>
                          {workOrder.serviceAddress}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <PhoneIcon fontSize="small" color="action" />
                        <Typography variant="body2">
                          {workOrder.phone}
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
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
  Fab
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
  Assignment as AssignedIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { WorkOrder } from '../../types/workOrder';
import { useGlobalUsers } from '../../hooks/useGlobalUsers';
import { useGlobalCustomers } from '../../hooks/useGlobalCustomers';
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
  low: 'default',
} as const;

const typeLabels = {
  emergency: 'Acil Çağrı',
  maintenance: 'Periyodik Bakım',
  renovation: 'Tadilat',
  additional: 'İlave İş',
  investment: 'Yatırım',
} as const;

const statusColors = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
  inProgress: 'info',
  completed: 'default',
} as const;

const statusLabels = {
  pending: 'Onay Bekliyor',
  approved: 'Onaylandı',
  rejected: 'Reddedildi',
  inProgress: 'Devam Ediyor',
  completed: 'Tamamlandı',
} as const;

type FilterType = 'all' | 'pending' | 'urgent' | 'assigned';

const WorkOrderList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: users = [] } = useGlobalUsers();
  const { data: customers = [] } = useGlobalCustomers();
  const { setTitle } = usePageTitle();
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');

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

  const getCustomerName = (id: string) => {
    const customer = customers.find(c => c.id === id);
    return customer ? customer.name : '';
  };

  const getContactName = (id: string) => {
    const user = users.find(u => u.id === id);
    return user ? `${user.firstName} ${user.lastName}` : '';
  };

  const filteredWorkOrders = workOrders.filter(workOrder => {
    switch (currentFilter) {
      case 'pending':
        return workOrder.status === 'pending';
      case 'urgent':
        return workOrder.priority === 'high';
      case 'assigned':
        return workOrder.assignedTo === 'current-user-id'; // TODO: Gerçek kullanıcı ID'si ile değiştirilecek
      default:
        return true;
    }
  });

  const filterCounts = {
    all: workOrders.length,
    pending: workOrders.filter(wo => wo.status === 'pending').length,
    urgent: workOrders.filter(wo => wo.priority === 'high').length,
    assigned: workOrders.filter(wo => wo.assignedTo === 'current-user-id').length, // TODO: Gerçek kullanıcı ID'si ile değiştirilecek
  };

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
                badgeContent={filterCounts.pending} 
                color="warning"
                sx={{ '& .MuiBadge-badge': { right: -3, top: -3 } }}
              >
                <PendingIcon />
              </Badge>
            }
            label={!isMobile && "Onay Bekleyenler"}
            value="pending"
            iconPosition="start"
          />
          <Tab 
            icon={
              <Badge 
                badgeContent={filterCounts.urgent} 
                color="error"
                sx={{ '& .MuiBadge-badge': { right: -3, top: -3 } }}
              >
                <UrgentIcon />
              </Badge>
            }
            label={!isMobile && "Acil"}
            value="urgent"
            iconPosition="start"
          />
          <Tab 
            icon={
              <Badge 
                badgeContent={filterCounts.assigned} 
                color="info"
                sx={{ '& .MuiBadge-badge': { right: -3, top: -3 } }}
              >
                <AssignedIcon />
              </Badge>
            }
            label={!isMobile && "Bana Atananlar"}
            value="assigned"
            iconPosition="start"
          />
        </Tabs>
      </Box>

      <Grid container spacing={2}>
        {filteredWorkOrders.map((workOrder) => (
          <Grid item xs={12} sm={6} md={4} key={workOrder.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack spacing={2}>
                  {/* Başlık ve Durum */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" component="div" noWrap>
                      {getCustomerName(workOrder.company)}
                    </Typography>
                    <Chip
                      label={statusLabels[workOrder.status as keyof typeof statusLabels]}
                      color={statusColors[workOrder.status as keyof typeof statusColors]}
                      size="small"
                    />
                  </Box>

                  {/* Tip ve Öncelik */}
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label={typeLabels[workOrder.type as keyof typeof typeLabels]}
                      variant="outlined"
                      size="small"
                    />
                    <Chip
                      label={priorityLabels[workOrder.priority as keyof typeof priorityLabels]}
                      color={priorityColors[workOrder.priority as keyof typeof priorityColors]}
                      size="small"
                    />
                  </Stack>

                  {/* Özet */}
                  <Typography variant="body2" color="text.secondary">
                    {workOrder.summary}
                  </Typography>

                  <Divider />

                  {/* İletişim Bilgileri */}
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon fontSize="small" color="action" />
                      <Typography variant="body2">
                        Atanan: {getContactName(workOrder.assignedTo)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon fontSize="small" color="action" />
                      <Typography variant="body2">
                        Son Tarih: {dayjs(workOrder.dueDate).format('DD.MM.YYYY')}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOnIcon fontSize="small" color="action" />
                      <Typography variant="body2" noWrap>
                        {workOrder.serviceAddress}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon fontSize="small" color="action" />
                      <Typography variant="body2">
                        {workOrder.phone}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>
              <CardActions>
                <Button size="small">Detaylar</Button>
                <Button size="small" color="primary">Düzenle</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
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
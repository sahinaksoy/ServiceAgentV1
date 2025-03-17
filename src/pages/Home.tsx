import { useState, useEffect } from 'react';
import { 
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  Tooltip,
  Button,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  CalendarToday as CalendarIcon,
  KeyboardArrowDown as ChevronDownIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { tr } from 'date-fns/locale';
import { usePageTitle } from '../contexts/PageTitleContext';
import { useNavigate } from 'react-router-dom';
import { addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, format } from 'date-fns';

interface WorkOrderStats {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
  delayed: number;
}

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface WorkOrder {
  id: number;
  customerName: string;
  serviceType: string;
  status: string;
  priority: string;
  date: Date;
  description: string;
  technician: string;
  location: string;
}

const Home = () => {
  const { setTitle } = usePageTitle();
  const navigate = useNavigate();
  const [stats, setStats] = useState<WorkOrderStats>({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
    delayed: 0,
  });
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([
    {
      id: 1,
      customerName: 'Ahmet Yılmaz',
      serviceType: 'Klima Bakımı',
      status: 'beklemede',
      priority: 'normal',
      date: new Date('2024-03-20'),
      description: 'Klima bakım ve temizlik hizmeti',
      technician: 'Mehmet Demir',
      location: 'Kadıköy, İstanbul'
    },
    {
      id: 2,
      customerName: 'Ayşe Kaya',
      serviceType: 'Elektrik Tesisatı',
      status: 'devam_ediyor',
      priority: 'yuksek',
      date: new Date('2024-03-21'),
      description: 'Elektrik tesisat kurulum ve onarım',
      technician: 'Ali Yıldız',
      location: 'Beşiktaş, İstanbul'
    },
    {
      id: 3,
      customerName: 'Mehmet Demir',
      serviceType: 'Su Tesisatı',
      status: 'tamamlandi',
      priority: 'normal',
      date: new Date('2024-03-19'),
      description: 'Su tesisat kurulum ve onarım',
      technician: 'Can Öz',
      location: 'Üsküdar, İstanbul'
    },
    {
      id: 4,
      customerName: 'Fatma Şahin',
      serviceType: 'Klima Bakımı',
      status: 'beklemede',
      priority: 'dusuk',
      date: new Date('2024-03-22'),
      description: 'Klima bakım ve temizlik hizmeti',
      technician: 'Mehmet Demir',
      location: 'Şişli, İstanbul'
    },
    {
      id: 5,
      customerName: 'Ali Yılmaz',
      serviceType: 'Elektrik Tesisatı',
      status: 'devam_ediyor',
      priority: 'yuksek',
      date: new Date('2024-03-21'),
      description: 'Elektrik tesisat kurulum ve onarım',
      technician: 'Ali Yıldız',
      location: 'Beyoğlu, İstanbul'
    }
  ]);

  useEffect(() => {
    setTitle('Dashboard');
    // Geçici mock veri
    setStats({
      total: 150,
      completed: 85,
      inProgress: 45,
      pending: 15,
      delayed: 5,
    });
  }, [setTitle]);

  const handleDateRangeClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDateRangeClose = () => {
    setAnchorEl(null);
  };

  const handleQuickSelect = (range: string) => {
    const today = new Date();
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    switch (range) {
      case 'today':
        startDate = today;
        endDate = today;
        break;
      case 'yesterday':
        startDate = addDays(today, -1);
        endDate = addDays(today, -1);
        break;
      case 'thisWeek':
        startDate = startOfWeek(today);
        endDate = endOfWeek(today);
        break;
      case 'thisMonth':
        startDate = startOfMonth(today);
        endDate = endOfMonth(today);
        break;
      case 'custom':
        setShowCustomPicker(true);
        handleDateRangeClose();
        return;
    }

    setDateRange({ startDate, endDate });
    handleDateRangeClose();
  };

  const getDateRangeText = () => {
    if (!dateRange.startDate || !dateRange.endDate) {
      return 'Tüm Zamanlar';
    }

    if (dateRange.startDate.getTime() === dateRange.endDate.getTime()) {
      return format(dateRange.startDate, 'd MMMM yyyy', { locale: tr });
    }

    return `${format(dateRange.startDate, 'd MMMM yyyy', { locale: tr })} - ${format(dateRange.endDate, 'd MMMM yyyy', { locale: tr })}`;
  };

  const StatCard = ({ 
    title, 
    value, 
    icon, 
    color, 
    onClick 
  }: { 
    title: string; 
    value: number; 
    icon: JSX.Element; 
    color: string;
    onClick?: () => void;
  }) => (
    <Card 
      sx={{ 
        cursor: onClick ? 'pointer' : 'default',
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
      onClick={onClick}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{ 
            p: 1, 
            borderRadius: 1, 
            bgcolor: `${color}15`,
            color: color 
          }}>
            {icon}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );

  const ProgressCard = ({ 
    title, 
    value, 
    total, 
    color 
  }: { 
    title: string; 
    value: number; 
    total: number; 
    color: string;
  }) => (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ flex: 1 }}>
            <LinearProgress 
              variant="determinate" 
              value={(value / total) * 100} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                bgcolor: `${color}15`,
                '& .MuiLinearProgress-bar': {
                  bgcolor: color,
                }
              }} 
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {value}/{total}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<CalendarIcon />}
            endIcon={<ChevronDownIcon />}
            onClick={handleDateRangeClick}
          >
            {getDateRangeText()}
          </Button>
          <Tooltip title="Yenile">
            <IconButton>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDateRangeClose}
      >
        <MenuItem onClick={() => handleQuickSelect('today')}>Bugün</MenuItem>
        <MenuItem onClick={() => handleQuickSelect('yesterday')}>Dün</MenuItem>
        <MenuItem onClick={() => handleQuickSelect('thisWeek')}>Bu Hafta</MenuItem>
        <MenuItem onClick={() => handleQuickSelect('thisMonth')}>Bu Ay</MenuItem>
        <Divider />
        <MenuItem onClick={() => handleQuickSelect('custom')}>Özel Tarih Aralığı</MenuItem>
      </Menu>

      {showCustomPicker && (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={tr}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <DatePicker
                label="Başlangıç Tarihi"
                value={dateRange.startDate}
                onChange={(newValue) => setDateRange(prev => ({ ...prev, startDate: newValue }))}
                slotProps={{ textField: { size: 'small' } }}
              />
              <DatePicker
                label="Bitiş Tarihi"
                value={dateRange.endDate}
                onChange={(newValue) => setDateRange(prev => ({ ...prev, endDate: newValue }))}
                slotProps={{ textField: { size: 'small' } }}
              />
              <Button 
                variant="contained" 
                onClick={() => setShowCustomPicker(false)}
                sx={{ height: 40 }}
              >
                Uygula
              </Button>
            </Stack>
          </Paper>
        </LocalizationProvider>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Toplam İş Emri"
            value={stats.total}
            icon={<AssignmentIcon />}
            color="#1976d2"
            onClick={() => navigate('/work-orders')}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Tamamlanan"
            value={stats.completed}
            icon={<CheckCircleIcon />}
            color="#2e7d32"
            onClick={() => navigate('/work-orders?status=completed')}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Devam Eden"
            value={stats.inProgress}
            icon={<PendingIcon />}
            color="#ed6c02"
            onClick={() => navigate('/work-orders?status=in-progress')}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Geciken"
            value={stats.delayed}
            icon={<ErrorIcon />}
            color="#d32f2f"
            onClick={() => navigate('/work-orders?status=delayed')}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              İş Emri Durumları
            </Typography>
            <Stack spacing={2}>
              <ProgressCard
                title="Tamamlanan İş Emirleri"
                value={stats.completed}
                total={stats.total}
                color="#2e7d32"
              />
              <ProgressCard
                title="Devam Eden İş Emirleri"
                value={stats.inProgress}
                total={stats.total}
                color="#ed6c02"
              />
              <ProgressCard
                title="Bekleyen İş Emirleri"
                value={stats.pending}
                total={stats.total}
                color="#1976d2"
              />
              <ProgressCard
                title="Geciken İş Emirleri"
                value={stats.delayed}
                total={stats.total}
                color="#d32f2f"
              />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Özet Bilgiler
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Tamamlanma Oranı
                </Typography>
                <Typography variant="h4" color="primary">
                  {((stats.completed / stats.total) * 100).toFixed(1)}%
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Gecikme Oranı
                </Typography>
                <Typography variant="h4" color="error">
                  {((stats.delayed / stats.total) * 100).toFixed(1)}%
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Ortalama Tamamlanma Süresi
                </Typography>
                <Typography variant="h4">
                  2.5 Gün
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home; 
import { ReactNode, useState } from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  useTheme, 
  useMediaQuery, 
  BottomNavigation, 
  BottomNavigationAction, 
  Paper, 
  Container,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Collapse,
  Tooltip
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Home as HomeIcon, 
  Person as PersonIcon, 
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
  ExitToApp as LogoutIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  ChevronLeft as ChevronLeftIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  List as ListIcon,
  Add as AddIcon,
  Store as StoreIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/navigation/Sidebar';
import { PageTitleProvider, usePageTitle } from '../contexts/PageTitleContext';

interface MainLayoutProps {
  children: ReactNode;
}

interface MenuItem {
  text: string;
  icon: JSX.Element;
  path: string;
  subItems?: MenuItem[];
}

const DRAWER_WIDTH = 240;
const MENU_ITEMS: MenuItem[] = [
  { text: 'Ana Sayfa', icon: <HomeIcon />, path: '/' },
  { text: 'İş Emirlerim', icon: <ListIcon />, path: '/work-orders' },
  { text: 'Kullanıcılar', icon: <PersonIcon />, path: '/users' },
  { text: 'Mağazalarım', icon: <StoreIcon />, path: '/stores' },
  { text: 'Ayarlar', icon: <SettingsIcon />, path: '/settings' },
];

const MainLayoutContent = ({ children }: MainLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { title } = usePageTitle();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      <AppBar
        position="fixed"
        sx={{
          width: { xs: '100%', sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ 
          width: { sm: DRAWER_WIDTH },
          flexShrink: { sm: 0 }
        }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              borderRight: (theme) => `1px solid ${theme.palette.divider}`,
              mt: { xs: '56px', sm: '64px' },
              height: { xs: 'calc(100% - 56px)', sm: 'calc(100% - 64px)' }
            },
          }}
        >
          <Sidebar />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
          mt: { xs: '56px', sm: '64px' },
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: (theme) => theme.palette.grey[300],
            borderRadius: '3px',
            '&:hover': {
              backgroundColor: (theme) => theme.palette.grey[400],
            },
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <PageTitleProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </PageTitleProvider>
  );
}; 
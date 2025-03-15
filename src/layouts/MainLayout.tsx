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

interface MainLayoutProps {
  children: ReactNode;
}

interface MenuItem {
  text: string;
  icon: JSX.Element;
  path: string;
  subItems?: MenuItem[];
}

const DRAWER_WIDTH = 280;
const MENU_ITEMS: MenuItem[] = [
  { text: 'Ana Sayfa', icon: <HomeIcon />, path: '/' },
  { text: 'İş Emirlerim', icon: <ListIcon />, path: '/work-orders' },
  { text: 'Kullanıcılar', icon: <PersonIcon />, path: '/users' },
  { text: 'Mağazalarım', icon: <StoreIcon />, path: '/stores' },
  { text: 'Ayarlar', icon: <SettingsIcon />, path: '/settings' },
];

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerCollapsed, setDrawerCollapsed] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    if (isMobile) {
      setDrawerOpen(!drawerOpen);
    } else {
      setDrawerCollapsed(!drawerCollapsed);
    }
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleMenuExpand = (path: string) => {
    setExpandedMenus(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const isMenuExpanded = (path: string) => expandedMenus.includes(path);

  const isPathActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const getCurrentNavigationValue = () => {
    const path = location.pathname;
    const index = MENU_ITEMS.findIndex(item => {
      if (item.subItems) {
        return item.subItems.some(subItem => path === subItem.path);
      }
      return path === item.path;
    });
    return index === -1 ? 0 : index;
  };

  const renderMenuItem = (item: MenuItem, isSubItem: boolean = false) => (
    <ListItem 
      button 
      key={item.path} 
      onClick={() => {
        if (item.subItems) {
          handleMenuExpand(item.path);
        } else {
          navigate(item.path);
          if (isMobile) setDrawerOpen(false);
        }
      }}
      selected={isPathActive(item.path)}
      sx={{
        minHeight: 48,
        px: isSubItem ? 4 : 2.5,
        '&.Mui-selected': {
          backgroundColor: 'rgba(63, 81, 181, 0.08)',
          color: '#3F51B5',
          '&:hover': {
            backgroundColor: 'rgba(63, 81, 181, 0.12)',
          },
          '& .MuiListItemIcon-root': {
            color: '#3F51B5',
          },
        },
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      <Tooltip title={drawerCollapsed && !isMobile ? item.text : ''} placement="right">
        <ListItemIcon 
          sx={{ 
            minWidth: 40,
            color: isPathActive(item.path) ? '#3F51B5' : 'rgba(0, 0, 0, 0.54)'
          }}
        >
          {item.icon}
        </ListItemIcon>
      </Tooltip>
      {(!drawerCollapsed || isMobile) && (
        <>
          <ListItemText 
            primary={item.text}
            primaryTypographyProps={{
              fontSize: '0.875rem',
              fontWeight: isPathActive(item.path) ? 500 : 400
            }}
          />
          {item.subItems && (
            <Box component="span" sx={{ ml: 'auto' }}>
              {isMenuExpanded(item.path) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
          )}
        </>
      )}
    </ListItem>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: '#3F51B5',
          color: 'white',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 48, sm: 56 }, px: { xs: 1, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <IconButton
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, color: 'inherit' }}
              size="small"
            >
              <MenuIcon />
            </IconButton>
            
            <Box 
              component="img"
              src="/logo.png"
              alt="Service Agent"
              sx={{ 
                height: { xs: 24, sm: 32 },
                cursor: 'pointer',
                mr: 2
              }}
              onClick={() => navigate('/')}
            />

            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" size="small">
                <SearchIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton color="inherit" size="small">
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              
              <IconButton
                onClick={handleProfileMenuOpen}
                size="small"
                sx={{ ml: 1 }}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? drawerOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerCollapsed && !isMobile ? 64 : DRAWER_WIDTH,
            backgroundColor: '#fff',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            [theme.breakpoints.up('sm')]: {
              marginTop: '48px',
              height: 'calc(100% - 48px)',
            },
            overflowX: 'hidden',
          },
        }}
      >
        <List sx={{ pt: isMobile ? 6 : 0 }}>
          {!isMobile && (
            <ListItem 
              button 
              onClick={handleDrawerToggle}
              sx={{ 
                minHeight: 48,
                justifyContent: drawerCollapsed ? 'center' : 'flex-end',
                px: 2.5
              }}
            >
              <ChevronLeftIcon sx={{ transform: drawerCollapsed ? 'rotate(180deg)' : 'none' }} />
            </ListItem>
          )}
          {MENU_ITEMS.map((item) => (
            <Box key={item.path}>
              {renderMenuItem(item)}
              {item.subItems && (!drawerCollapsed || isMobile) && (
                <Collapse in={isMenuExpanded(item.path)} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => renderMenuItem(subItem, true))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          backgroundColor: '#F5F5F5',
          pt: { xs: '48px', sm: '56px' },
          overflow: 'auto',
        }}
      >
        <Container 
          maxWidth={false} 
          sx={{ 
            p: { xs: 2, sm: 3 },
            maxWidth: '1440px'
          }}
        >
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 2, sm: 3 },
              backgroundColor: 'white',
              borderRadius: 1,
              border: '1px solid rgba(0, 0, 0, 0.12)'
            }}
          >
            {children}
          </Paper>
        </Container>
      </Box>

      {isMobile && (
        <Paper 
          sx={{ 
            position: 'fixed', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            zIndex: theme.zIndex.appBar,
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
          }} 
          elevation={0}
        >
          <BottomNavigation
            showLabels
            value={getCurrentNavigationValue()}
            onChange={(_, newValue) => {
              navigate(MENU_ITEMS[newValue].path);
            }}
            sx={{
              backgroundColor: '#fff',
              height: 56
            }}
          >
            {MENU_ITEMS.map((item) => (
              <BottomNavigationAction
                key={item.text}
                label={item.text}
                icon={item.icon}
                sx={{
                  color: 'rgba(0, 0, 0, 0.54)',
                  '&.Mui-selected': {
                    color: '#3F51B5'
                  }
                }}
              />
            ))}
          </BottomNavigation>
        </Paper>
      )}

      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 2,
          sx: { 
            mt: 1,
            minWidth: 200,
            borderRadius: 1
          }
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Kullanıcı Adı</Typography>
          <Typography variant="body2" color="text.secondary">user@example.com</Typography>
        </Box>
        <Divider />
        <MenuItem onClick={() => navigate('/profile')} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <PersonIcon fontSize="small" sx={{ color: 'rgba(0, 0, 0, 0.54)' }} />
          </ListItemIcon>
          <ListItemText>Profilim</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => navigate('/settings')} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" sx={{ color: 'rgba(0, 0, 0, 0.54)' }} />
          </ListItemIcon>
          <ListItemText>Ayarlar</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 1.5 }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: 'rgba(0, 0, 0, 0.54)' }} />
          </ListItemIcon>
          <ListItemText>Çıkış Yap</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}; 
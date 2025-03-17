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
  Tooltip,
  ListItemButton
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
  Assignment as AssignmentIcon,
  Add as AddIcon,
  Store as StoreIcon,
  Build as BuildIcon,
  Inventory as InventoryIcon,
  Handyman as HandymanIcon
} from '@mui/icons-material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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
  { text: 'İş Emirlerim', icon: <AssignmentIcon />, path: '/work-orders' },
  { text: 'Kullanıcılar', icon: <PersonIcon />, path: '/users' },
  { text: 'Mağazalarım', icon: <StoreIcon />, path: '/stores' },
  { 
    text: 'Hizmetler',
    icon: <HandymanIcon />,
    path: '/services',
    subItems: [
      { text: 'Servisler', icon: <BuildIcon />, path: '/services' },
      { text: 'Malzemeler', icon: <InventoryIcon />, path: '/materials' }
    ]
  },
  { text: 'Ayarlar', icon: <SettingsIcon />, path: '/settings' },
];

const MainLayoutContent = ({ children }: MainLayoutProps) => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { title } = usePageTitle();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
    setOpenSubMenu(null);
  };

  const handleSubMenuClick = (text: string) => {
    setOpenSubMenu(openSubMenu === text ? null : text);
  };

  const renderMenuItem = (item: MenuItem) => {
    const isSelected = location.pathname === item.path || 
                      (item.subItems?.some(subItem => location.pathname === subItem.path) ?? false);
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isSubMenuOpen = openSubMenu === item.text;
    const iconColor = isSelected ? '#1976d2' : '#2c3e50';

    return (
      <Box key={item.text}>
        <Tooltip title={!drawerOpen ? item.text : ""} placement="right">
          <ListItem disablePadding>
            <ListItemButton
              selected={isSelected}
              onClick={() => hasSubItems ? handleSubMenuClick(item.text) : undefined}
              component={hasSubItems ? 'div' : Link}
              to={hasSubItems ? undefined : item.path}
              sx={{
                minHeight: 48,
                height: 48,
                justifyContent: drawerOpen ? 'initial' : 'center',
                px: 2,
                '&.Mui-selected': {
                  bgcolor: 'rgba(25, 118, 210, 0.04)',
                  '&:hover': {
                    bgcolor: 'rgba(25, 118, 210, 0.08)',
                  },
                },
                '&:hover': {
                  bgcolor: 'rgba(25, 118, 210, 0.04)',
                },
              }}
            >
              <ListItemIcon 
                sx={{ 
                  minWidth: drawerOpen ? 40 : 24,
                  width: drawerOpen ? 40 : 24,
                  mr: drawerOpen ? 2 : 0,
                  justifyContent: 'center',
                  color: iconColor,
                  '& .MuiSvgIcon-root': {
                    fontSize: 22,
                    transition: 'all 0.2s ease-in-out',
                    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                  }
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  opacity: drawerOpen ? 1 : 0,
                  '& .MuiTypography-root': {
                    fontWeight: isSelected ? 600 : 400,
                    color: isSelected ? '#1976d2' : 'text.primary',
                    transition: 'all 0.2s ease-in-out',
                  }
                }} 
              />
              {hasSubItems && drawerOpen && (
                <IconButton
                  size="small"
                  sx={{ 
                    color: isSubMenuOpen ? '#1976d2' : '#2c3e50',
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  {isSubMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              )}
            </ListItemButton>
          </ListItem>
        </Tooltip>
        {hasSubItems && drawerOpen && (
          <Collapse in={isSubMenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.subItems?.map((subItem) => {
                const isSubItemSelected = location.pathname === subItem.path;
                const subItemIconColor = isSubItemSelected ? '#1976d2' : '#2c3e50';

                return (
                  <Tooltip key={subItem.text} title={!drawerOpen ? subItem.text : ""} placement="right">
                    <ListItem disablePadding>
                      <ListItemButton
                        component={Link}
                        to={subItem.path}
                        selected={isSubItemSelected}
                        sx={{
                          minHeight: 48,
                          height: 48,
                          justifyContent: drawerOpen ? 'initial' : 'center',
                          px: 2,
                          pl: drawerOpen ? 4 : 2,
                          '&.Mui-selected': {
                            bgcolor: 'rgba(25, 118, 210, 0.04)',
                            '&:hover': {
                              bgcolor: 'rgba(25, 118, 210, 0.08)',
                            },
                          },
                          '&:hover': {
                            bgcolor: 'rgba(25, 118, 210, 0.04)',
                          },
                        }}
                      >
                        <ListItemIcon 
                          sx={{ 
                            minWidth: drawerOpen ? 40 : 24,
                            width: drawerOpen ? 40 : 24,
                            mr: drawerOpen ? 2 : 0,
                            justifyContent: 'center',
                            color: subItemIconColor,
                            '& .MuiSvgIcon-root': {
                              fontSize: 22,
                              transition: 'all 0.2s ease-in-out',
                              transform: isSubItemSelected ? 'scale(1.1)' : 'scale(1)',
                            }
                          }}
                        >
                          {subItem.icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={subItem.text} 
                          sx={{ 
                            opacity: drawerOpen ? 1 : 0,
                            '& .MuiTypography-root': {
                              fontWeight: isSubItemSelected ? 600 : 400,
                              color: isSubItemSelected ? '#1976d2' : 'text.primary',
                              transition: 'all 0.2s ease-in-out',
                            }
                          }} 
                        />
                      </ListItemButton>
                    </ListItem>
                  </Tooltip>
                );
              })}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerOpen ? DRAWER_WIDTH : 65}px)` },
          ml: { sm: `${drawerOpen ? DRAWER_WIDTH : 65}px` },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerOpen ? DRAWER_WIDTH : 65,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerOpen ? DRAWER_WIDTH : 65,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.default,
            borderRight: `1px solid ${theme.palette.divider}`,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
          },
        }}
      >
        <Box sx={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end',
          px: 1,
        }}>
          <IconButton onClick={handleDrawerToggle}>
            {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ mt: 1 }}>
          {MENU_ITEMS.map(renderMenuItem)}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerOpen ? DRAWER_WIDTH : 65}px)` },
          mt: '64px',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
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
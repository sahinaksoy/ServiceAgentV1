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
  List as ListIcon,
  Add as AddIcon,
  Store as StoreIcon,
  Build as BuildIcon,
  Inventory as InventoryIcon,
  Handyman as HandymanIcon
} from '@mui/icons-material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { title } = usePageTitle();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSubMenuClick = (text: string) => {
    setOpenSubMenu(openSubMenu === text ? null : text);
  };

  const renderMenuItem = (item: MenuItem) => {
    const isSelected = location.pathname === item.path;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isSubMenuOpen = openSubMenu === item.text;
    const iconColor = isSelected ? '#1976d2' : '#2c3e50';

    return (
      <Box key={item.text}>
        <ListItem disablePadding>
          <ListItemButton
            selected={isSelected}
            onClick={() => hasSubItems ? handleSubMenuClick(item.text) : undefined}
            component={hasSubItems ? 'div' : Link}
            to={hasSubItems ? undefined : item.path}
            sx={{
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
                minWidth: 40,
                color: iconColor,
                '& .MuiSvgIcon-root': {
                  fontSize: 24,
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
                '& .MuiTypography-root': {
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? '#1976d2' : 'text.primary',
                  transition: 'all 0.2s ease-in-out',
                }
              }} 
            />
            {hasSubItems && (
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
        {hasSubItems && (
          <Collapse in={isSubMenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.subItems?.map((subItem) => {
                const isSubItemSelected = location.pathname === subItem.path;
                const subItemIconColor = isSubItemSelected ? '#1976d2' : '#2c3e50';

                return (
                  <ListItem key={subItem.text} disablePadding>
                    <ListItemButton
                      component={Link}
                      to={subItem.path}
                      selected={isSubItemSelected}
                      sx={{
                        pl: 4,
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
                          minWidth: 40,
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
                          '& .MuiTypography-root': {
                            fontWeight: isSubItemSelected ? 600 : 400,
                            color: isSubItemSelected ? '#1976d2' : 'text.primary',
                            transition: 'all 0.2s ease-in-out',
                          }
                        }} 
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
        )}
      </Box>
    );
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
              bgcolor: 'background.default',
              mt: { xs: '56px', sm: '64px' },
              height: { xs: 'calc(100% - 56px)', sm: 'calc(100% - 64px)' }
            },
          }}
        >
          <List component="nav">
            {MENU_ITEMS.map(renderMenuItem)}
          </List>
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
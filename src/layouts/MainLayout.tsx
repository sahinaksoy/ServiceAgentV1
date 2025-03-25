import { ReactNode, useState, useEffect } from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Drawer, 
  useTheme, 
  useMediaQuery,
  Menu,
  MenuItem,
  Button} from '@mui/material';
import { 
  Menu as MenuIcon, 
  ChevronLeft as ChevronLeftIcon,
  AccountCircle as AccountIcon,
  Notifications as NotificationsIcon} from '@mui/icons-material';
import { Sidebar } from '../components/navigation/Sidebar';
import { PageTitleProvider, usePageTitle } from '../contexts/PageTitleContext';
import { queryClient } from '../hooks/useUsers';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

const DRAWER_WIDTH = 240;

const Logo = styled('img')({
  height: '35px',
  width: 'auto',
  objectFit: 'contain'
});

const MainLayoutContent = ({ children }: MainLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { title } = usePageTitle();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setDesktopOpen(!desktopOpen);
    }
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleProfileMenuClose();
  };

  const handleLogout = () => {
    // Çıkış işlemleri burada yapılacak
    handleProfileMenuClose();
  };

  useEffect(() => {
    // Uygulama açılır açılmaz kullanıcı verilerini arka planda yükle
    queryClient.prefetchQuery({
      queryKey: ['users'],
      queryFn: async () => {
        const response = await fetch('/api/users');
        return response.json();
      },
    });
  }, []);

  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      <AppBar
        position="fixed"
        sx={{
          width: { xs: '100%', sm: `calc(100% - ${desktopOpen ? DRAWER_WIDTH : 0}px)` },
          ml: { sm: `${desktopOpen ? DRAWER_WIDTH : 0}px` },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          zIndex: theme.zIndex.drawer + 2,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            {desktopOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box 
            sx={{ 
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            <img 
              src="/logo-circle.png" 
              alt="Logo" 
              style={{ 
                height: '64px', 
                width: '64px',
                objectFit: 'contain',
                padding: 0,
                margin: 0
              }} 
            />
          </Box>
          <Box 
            sx={{ 
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center'
            }}
          >
            <IconButton
              onClick={handleNotificationMenuOpen}
              sx={{ 
                height: '64px',
                width: '64px',
                borderRadius: 0,
                color: 'inherit',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <NotificationsIcon sx={{ fontSize: 28 }} />
            </IconButton>
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{ 
                height: '64px',
                width: '64px',
                borderRadius: 0,
                color: 'inherit',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <AccountIcon sx={{ fontSize: 35 }} />
            </IconButton>
          </Box>
          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                width: 320,
                maxWidth: '90vw',
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiMenuItem-root': {
                  px: 2,
                  py: 1.5,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:last-child': {
                    borderBottom: 'none'
                  }
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
          >
            <MenuItem>
              <Box sx={{ width: '100%', overflow: 'hidden' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5, whiteSpace: 'normal' }}>
                  Yeni İş Emri Atandı
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', whiteSpace: 'normal' }}>
                  Ataşehir Migros mağazasına yeni bir iş emri atandı.
                </Typography>
                <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.5 }}>
                  2 saat önce
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem>
              <Box sx={{ width: '100%', overflow: 'hidden' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5, whiteSpace: 'normal' }}>
                  İş Emri Tamamlandı
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', whiteSpace: 'normal' }}>
                  Kadıköy Carrefour mağazasındaki iş emri tamamlandı.
                </Typography>
                <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.5 }}>
                  5 saat önce
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem>
              <Box sx={{ width: '100%', overflow: 'hidden' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5, whiteSpace: 'normal' }}>
                  Onay Bekleyen İş Emri
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', whiteSpace: 'normal' }}>
                  Maltepe Park AVM mağazasındaki iş emri onayınızı bekliyor.
                </Typography>
                <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.5 }}>
                  1 gün önce
                </Typography>
              </Box>
            </MenuItem>
          </Menu>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiMenuItem-root': {
                  px: 2,
                  py: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
          >
            <MenuItem onClick={handleProfileClick}>
              <AccountIcon sx={{ mr: 1 }} />
              Profilim
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
              Çıkış Yap
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ 
          width: { sm: desktopOpen ? DRAWER_WIDTH : 0 },
          flexShrink: { sm: 0 },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Box
          sx={{
            height: { xs: '56px', sm: '64px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: DRAWER_WIDTH,
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderRight: '1px solid',
            borderColor: 'divider',
            zIndex: theme.zIndex.drawer
          }}
        >
          <Logo src="/logo-square.png" alt="Logo" />
        </Box>

        <Drawer
          variant={isMobile ? 'temporary' : 'persistent'}
          open={isMobile ? mobileOpen : desktopOpen}
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
              height: { xs: 'calc(100% - 56px)', sm: 'calc(100% - 64px)' },
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: 'hidden',
            },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ flexGrow: 1, overflow: 'auto', mt: 1 }}>
              <Sidebar />
            </Box>
          </Box>
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 0, sm: 3 },
          width: { sm: `calc(100% - ${desktopOpen ? DRAWER_WIDTH : 0}px)` },
          height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
          mt: { xs: '56px', sm: '64px' },
          overflow: 'auto',
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
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
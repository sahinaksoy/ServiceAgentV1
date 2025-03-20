import { ReactNode, useState, useEffect } from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Drawer, 
  useTheme, 
  useMediaQuery} from '@mui/material';
import { 
  Menu as MenuIcon, 
  ChevronLeft as ChevronLeftIcon} from '@mui/icons-material';
import { Sidebar } from '../components/navigation/Sidebar';
import { PageTitleProvider, usePageTitle } from '../contexts/PageTitleContext';
import { queryClient } from '../hooks/useUsers';
import { styled } from '@mui/material/styles';

interface MainLayoutProps {
  children: ReactNode;
}

const DRAWER_WIDTH = 240;

const LogoContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#1B3160', // Lacivert arka plan
  height: '64px', // AppBar ile aynı yükseklik
  position: 'fixed', // Sabit pozisyon
  top: 0,
  left: 0,
  width: '240px', // Drawer genişliği kadar
  zIndex: theme.zIndex.drawer + 2, // AppBar'dan daha üstte
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}));

const Logo = styled('img')({
  height: '35px',
  width: 'auto',
  objectFit: 'contain',
  filter: 'brightness(0) invert(1)' // Logo'yu beyaz yap
});

const MainLayoutContent = ({ children }: MainLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { title } = usePageTitle();

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setDesktopOpen(!desktopOpen);
    }
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
            {!isMobile && (
              <LogoContainer>
                <Logo src="/logo-square.png" alt="Logo" />
              </LogoContainer>
            )}
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
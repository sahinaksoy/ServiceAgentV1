import { List, ListItemIcon, ListItemText, Collapse, ListItemButton } from '@mui/material';
import {
  Home as HomeIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Store as StoreIcon,
  Settings as SettingsIcon,
  Build as BuildIcon,
  DirectionsCar as CarIcon,
  ExpandLess,
  ExpandMore,
  Inventory as InventoryIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const MENU_ITEMS = [
  { text: 'Ana Sayfa', icon: <HomeIcon />, path: '/' },
  { text: 'İş Emirleri', icon: <AssignmentIcon />, path: '/work-orders' },
  { text: 'Kullanıcılar', icon: <PeopleIcon />, path: '/users' },
  { text: 'Mağazalar', icon: <StoreIcon />, path: '/stores' },
  { text: 'Raporlar', icon: <AssessmentIcon />, path: '/reports' },
  { text: 'Hizmetlerim', icon: <BuildIcon />, path: '/services', hasSubmenu: true },
];

const SETTINGS_MENU = { text: 'Ayarlar', icon: <SettingsIcon />, path: '/settings' };

const SERVICES_MENU_ITEMS = [
  { text: 'Servisler', icon: <CarIcon />, path: '/services' },
  { text: 'Parçalar', icon: <InventoryIcon />, path: '/parts' },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [servicesOpen, setServicesOpen] = useState(false);

  const isPathActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleServicesClick = () => {
    setServicesOpen(!servicesOpen);
  };

  return (
    <List sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1 }}>
        {MENU_ITEMS.map((item) => !item.hasSubmenu ? (
          <ListItemButton
            key={item.path}
            onClick={() => navigate(item.path)}
            selected={isPathActive(item.path)}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(63, 81, 181, 0.08)',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(63, 81, 181, 0.12)',
                },
                '& .MuiListItemIcon-root': {
                  color: 'primary.main',
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: isPathActive(item.path) ? 'primary.main' : 'action.active',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ) : null)}

        <ListItemButton onClick={handleServicesClick}>
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary="Hizmetlerim" />
          {servicesOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={servicesOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {SERVICES_MENU_ITEMS.map((item) => (
              <ListItemButton
                key={item.path}
                onClick={() => navigate(item.path)}
                selected={isPathActive(item.path)}
                sx={{ 
                  pl: 4,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(63, 81, 181, 0.08)',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'rgba(63, 81, 181, 0.12)',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.main',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isPathActive(item.path) ? 'primary.main' : 'action.active',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </div>

      <div>
        <ListItemButton
          onClick={() => navigate(SETTINGS_MENU.path)}
          selected={isPathActive(SETTINGS_MENU.path)}
          sx={{
            borderTop: 1,
            borderColor: 'divider',
            mt: 'auto',
            '&.Mui-selected': {
              backgroundColor: 'rgba(63, 81, 181, 0.08)',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(63, 81, 181, 0.12)',
              },
              '& .MuiListItemIcon-root': {
                color: 'primary.main',
              },
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: isPathActive(SETTINGS_MENU.path) ? 'primary.main' : 'action.active',
            }}
          >
            {SETTINGS_MENU.icon}
          </ListItemIcon>
          <ListItemText primary={SETTINGS_MENU.text} />
        </ListItemButton>
      </div>
    </List>
  );
}; 
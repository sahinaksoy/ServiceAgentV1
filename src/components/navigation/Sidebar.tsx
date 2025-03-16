import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  Home as HomeIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Store as StoreIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const MENU_ITEMS = [
  { text: 'Ana Sayfa', icon: <HomeIcon />, path: '/' },
  { text: 'İş Emirleri', icon: <AssignmentIcon />, path: '/work-orders' },
  { text: 'Kullanıcılar', icon: <PeopleIcon />, path: '/users' },
  { text: 'Mağazalar', icon: <StoreIcon />, path: '/stores' },
  { text: 'Ayarlar', icon: <SettingsIcon />, path: '/settings' },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isPathActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <List>
      {MENU_ITEMS.map((item) => (
        <ListItem
          button
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
        </ListItem>
      ))}
    </List>
  );
}; 
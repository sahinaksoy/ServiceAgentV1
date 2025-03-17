import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  IconButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  SupervisorAccount as SupervisorAccountIcon,
  Store as StoreIcon,
  Build as BuildIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

interface MenuItem {
  icon: any;
  label: string;
  path?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { icon: DashboardIcon, label: 'Dashboard', path: '/' },
  { icon: AssignmentIcon, label: 'İş Emirleri', path: '/work-orders' },
  { icon: PeopleIcon, label: 'Teknisyenler', path: '/technicians' },
  { icon: StoreIcon, label: 'Mağazalar', path: '/stores' },
  { 
    icon: BuildIcon, 
    label: 'Hizmetler',
    children: [
      { icon: BuildIcon, label: 'Servisler', path: '/services' },
      { icon: InventoryIcon, label: 'Malzemeler', path: '/materials' },
    ]
  },
  { icon: SupervisorAccountIcon, label: 'Müşteriler', path: '/customers' },
];

const MenuItem = ({ item, level = 0 }: { item: MenuItem; level?: number }) => {
  const location = useLocation();
  const isActive = item.path === location.pathname;
  const hasChildren = item.children && item.children.length > 0;
  const [isOpen, setIsOpen] = useState(
    hasChildren && item.children?.some(child => child.path === location.pathname)
  );

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          component={item.path ? RouterLink : 'div'}
          to={item.path}
          onClick={handleClick}
          selected={isActive || (hasChildren && item.children?.some(child => child.path === location.pathname))}
          sx={{ 
            pl: level * 4 + 2,
            color: 'white',
            '&.Mui-selected': {
              bgcolor: 'primary.dark',
            },
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
            <item.icon />
          </ListItemIcon>
          <ListItemText primary={item.label} />
          {hasChildren && (
            <IconButton 
              size="small" 
              sx={{ color: 'white' }}
            >
              {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
        </ListItemButton>
      </ListItem>
      {hasChildren && item.children && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child) => (
              <MenuItem key={child.path} item={child} level={level + 1} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        bgcolor: 'primary.main',
        position: 'sticky',
        top: 0,
        py: 2,
      }}
    >
      <List component="nav">
        {menuItems.map((item) => (
          <MenuItem key={item.path || item.label} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default Sidebar; 
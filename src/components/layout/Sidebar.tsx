import { 
  Settings as SettingsIcon,
  // ... diğer importlar ...
} from '@mui/icons-material';
// ... diğer importlar ...

export function Sidebar() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%', // Tam yükseklik
      }}
    >
      {/* Ana menü öğeleri */}
      <Box sx={{ flex: 1 }}> {/* Esnek alan */}
        <List>
          <ListItem>
            <ListItemButton component={Link} to="/dashboard">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} to="/stores">
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText primary="Mağazalar" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} to="/customers">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Müşteriler" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} to="/work-orders">
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="İş Emirleri" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} to="/users">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Kullanıcılar" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} to="/services">
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText primary="Hizmetler" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Ayırıcı çizgi */}
      <Box>
        <Divider />
        <List>
          <ListItem>
            <ListItemButton component={Link} to="/settings">
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Ayarlar" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
} 
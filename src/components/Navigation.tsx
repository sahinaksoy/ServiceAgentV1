// Props tipini ekleyin
interface NavigationProps {
  open?: boolean;
}

const Navigation = ({ open = true }: NavigationProps) => {
  return (
    <List>
      {menuItems.map((item) => (
        <ListItem 
          key={item.path} 
          disablePadding 
          sx={{ display: 'block' }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                color: '#fff'
              }}
            >
              {item.icon}
            </ListItemIcon>
            {open && (
              <ListItemText 
                primary={item.title} 
                sx={{ opacity: 1 }}
              />
            )}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}; 
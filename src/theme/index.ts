import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1B3160',
      light: '#E8ECF4',
      dark: '#142548',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#6B7A99',
      light: '#F8FAFD',
      dark: '#4A5568',
      contrastText: '#ffffff'
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#2D3748',
      secondary: '#6B7A99'
    },
    divider: 'rgba(107, 122, 153, 0.12)'
  },
  typography: {
    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 600,
      color: '#1B3160'
    },
    h2: {
      fontWeight: 600,
      color: '#1B3160'
    },
    h3: {
      fontWeight: 600,
      color: '#1B3160'
    },
    h4: {
      fontWeight: 600,
      color: '#1B3160'
    },
    h5: {
      fontWeight: 600,
      color: '#1B3160'
    },
    h6: {
      fontWeight: 600,
      color: '#1B3160'
    },
    button: {
      textTransform: 'none',
      fontWeight: 500
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1B3160',
          color: '#ffffff',
          boxShadow: '0 2px 4px rgba(27, 49, 96, 0.08)',
          '& .MuiTypography-root': {
            color: '#ffffff'
          },
          '& .MuiIconButton-root': {
            color: '#ffffff'
          },
          '& .MuiInputBase-root': {
            color: '#ffffff',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.3)'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffffff'
            }
          }
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          '& .MuiListItemButton-root': {
            borderRadius: 8,
            margin: '4px 8px',
            '&.Mui-selected': {
              backgroundColor: '#E8ECF4',
              color: '#1B3160',
              '&:hover': {
                backgroundColor: '#E8ECF4'
              }
            }
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid rgba(107, 122, 153, 0.12)',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(107, 122, 153, 0.08)',
            borderColor: '#1B3160'
          },
          transition: 'all 0.3s ease'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        },
        contained: {
          '&:hover': {
            backgroundColor: '#142548'
          }
        },
        outlined: {
          borderColor: '#1B3160',
          '&:hover': {
            backgroundColor: 'rgba(27, 49, 96, 0.04)'
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(27, 49, 96, 0.08)'
          }
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          '&.Mui-selected': {
            backgroundColor: '#E8ECF4',
            color: '#1B3160',
            '&:hover': {
              backgroundColor: '#E8ECF4'
            },
            '& .MuiListItemIcon-root': {
              color: '#1B3160'
            }
          },
          '&:hover': {
            backgroundColor: 'rgba(27, 49, 96, 0.04)'
          }
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#6B7A99',
          minWidth: 40
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1B3160'
            }
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          backgroundColor: '#E8ECF4',
          color: '#1B3160',
          '&.MuiChip-outlined': {
            borderColor: '#1B3160',
            color: '#1B3160'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    }
  }
}); 
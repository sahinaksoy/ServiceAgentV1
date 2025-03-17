import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Chip,
  InputAdornment,
} from '@mui/material';
import { Part } from '../../types/part';
import { mockParts } from '../../mocks/parts';
import { Search as SearchIcon } from '@mui/icons-material';

interface PartSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (selectedParts: Part[]) => void;
}

const PartSelectionDialog: React.FC<PartSelectionDialogProps> = ({
  open,
  onClose,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParts, setSelectedParts] = useState<Part[]>([]);

  const filteredParts = mockParts.filter(part =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePartToggle = (part: Part) => {
    setSelectedParts(prev => {
      const isSelected = prev.some(p => p.id === part.id);
      if (isSelected) {
        return prev.filter(p => p.id !== part.id);
      } else {
        return [...prev, part];
      }
    });
  };

  const handleConfirm = () => {
    onSelect(selectedParts);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Parça Seç</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Parça ara..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Seçilen Parçalar:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedParts.map((part) => (
              <Chip
                key={part.id}
                label={part.name}
                onDelete={() => handlePartToggle(part)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
        <Box sx={{ 
          maxHeight: 400, 
          overflow: 'auto',
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 1
        }}>
          {filteredParts.map(part => (
            <Box
              key={part.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedParts.some(p => p.id === part.id)}
                    onChange={() => handlePartToggle(part)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">{part.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Birim: {part.unit} | Fiyat: {part.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                    </Typography>
                  </Box>
                }
              />
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button 
          onClick={handleConfirm} 
          variant="contained" 
          color="primary"
          disabled={selectedParts.length === 0}
        >
          {selectedParts.length} Parça Seç
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PartSelectionDialog; 
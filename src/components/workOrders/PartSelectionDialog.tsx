import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  Checkbox,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  useTheme,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { WorkOrderPart } from '../../types/workOrder';

interface PartSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (parts: WorkOrderPart[]) => void;
}

// Örnek parça listesi - Bu veriyi API'den alacaksınız
const availableParts: WorkOrderPart[] = [
  {
    id: 1,
    name: 'Kompresör',
    description: 'Birim: PIECE | Fiyat: ₺15.000,00',
    quantity: 1,
    unit: 'PIECE',
    unitPrice: 15000,
  },
  {
    id: 2,
    name: 'Kondenser',
    description: 'Birim: PIECE | Fiyat: ₺8.000,00',
    quantity: 1,
    unit: 'PIECE',
    unitPrice: 8000,
  },
  {
    id: 3,
    name: 'Evaporatör',
    description: 'Birim: PIECE | Fiyat: ₺6.000,00',
    quantity: 1,
    unit: 'PIECE',
    unitPrice: 6000,
  },
  {
    id: 4,
    name: 'Termostatik Genleşme Valfi',
    description: 'Birim: PIECE | Fiyat: ₺1.200,00',
    quantity: 1,
    unit: 'PIECE',
    unitPrice: 1200,
  },
  {
    id: 5,
    name: 'Kuru Filtre',
    description: 'Birim: PIECE | Fiyat: ₺800,00',
    quantity: 1,
    unit: 'PIECE',
    unitPrice: 800,
  },
];

const PartSelectionDialog: React.FC<PartSelectionDialogProps> = ({
  open,
  onClose,
  onSelect,
}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParts, setSelectedParts] = useState<number[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleTogglePart = (partId: number) => {
    setSelectedParts(prev =>
      prev.includes(partId)
        ? prev.filter(id => id !== partId)
        : [...prev, partId]
    );
  };

  const handleSave = () => {
    const selectedPartObjects = availableParts.filter(part => 
      selectedParts.includes(part.id)
    );
    onSelect(selectedPartObjects);
    onClose();
  };

  const filteredParts = availableParts.filter(part =>
    part.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h6">Parça Seç</Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            placeholder="Parça ara..."
            value={searchQuery}
            onChange={handleSearch}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="subtitle2" color="text.secondary">
            Seçilen Parçalar:
          </Typography>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {filteredParts.map((part) => (
              <ListItem
                key={part.id}
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Checkbox
                  checked={selectedParts.includes(part.id)}
                  onChange={() => handleTogglePart(part.id)}
                  color="primary"
                />
                <ListItemText
                  primary={part.name}
                  secondary={part.description}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: selectedParts.includes(part.id) ? 'bold' : 'normal',
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          disabled={selectedParts.length === 0}
        >
          {selectedParts.length} PARÇA SEÇ
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PartSelectionDialog; 
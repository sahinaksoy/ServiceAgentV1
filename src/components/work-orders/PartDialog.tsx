import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  TextField,
} from '@mui/material';
import { Part, partUnitLabels } from '../../types/part';
import { mockParts } from '../../mocks/parts';

interface PartDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (part: Part) => void;
  selectedParts: Part[];
}

const PartDialog: React.FC<PartDialogProps> = ({
  open,
  onClose,
  onSelect,
  selectedParts,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const availableParts = mockParts.filter(
    part => !selectedParts.find(p => p.id === part.id)
  );

  const filteredParts = availableParts.filter(part =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Parça Seç</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Parça Ara"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {filteredParts.map((part) => (
            <Chip
              key={part.id}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2">
                    {part.name}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      backgroundColor: 'primary.light',
                      color: 'primary.contrastText',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1
                    }}
                  >
                    {partUnitLabels[part.unit]} - {part.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                  </Typography>
                </Box>
              }
              onClick={() => onSelect(part)}
              sx={{
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Kapat</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PartDialog; 
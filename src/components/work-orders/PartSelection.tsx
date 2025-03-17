import React from 'react';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Paper,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Part, partUnitLabels } from '../../types/part';

interface PartSelectionProps {
  selectedParts: Part[];
  onRemovePart: (partId: number) => void;
}

const PartSelection: React.FC<PartSelectionProps> = ({
  selectedParts,
  onRemovePart,
}) => {
  if (selectedParts.length === 0) {
    return (
      <Box 
        sx={{ 
          p: 3, 
          textAlign: 'center',
          backgroundColor: 'background.default',
          borderRadius: 1,
          border: '1px dashed',
          borderColor: 'divider'
        }}
      >
        <Typography color="text.secondary">
          Henüz parça seçilmedi
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 1,
      '& > *': {
        m: 0.5,
      }
    }}>
      {selectedParts.map((part) => (
        <Chip
          key={part.id}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
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
          onDelete={() => onRemovePart(part.id)}
          deleteIcon={
            <Tooltip title="Parçayı Kaldır">
              <IconButton size="small">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          }
          sx={{
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            '& .MuiChip-deleteIcon': {
              color: 'text.secondary',
              '&:hover': {
                color: 'error.main',
              },
            },
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        />
      ))}
    </Box>
  );
};

export default PartSelection; 
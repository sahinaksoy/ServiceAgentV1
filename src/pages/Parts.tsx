import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Paper, 
  useTheme, 
  useMediaQuery,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Chip,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { usePageTitle } from '../contexts/PageTitleContext';
import DataGrid, {
  Column,
  Paging,
  FilterRow,
} from 'devextreme-react/data-grid';
import { Part, partUnitLabels, partStatusLabels } from '../types/part';
import { mockParts } from '../mocks/parts';
import PartDialog from '../components/parts/PartDialog';

const Parts: React.FC = () => {
  const { setTitle } = usePageTitle();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [parts, setParts] = useState<Part[]>(mockParts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<Part | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    setTitle('Parçalar');
  }, [setTitle]);

  const handleAdd = () => {
    setSelectedPart(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (part: Part) => {
    setSelectedPart(part);
    setDialogOpen(true);
  };

  const handleDelete = (part: Part) => {
    setSelectedPart(part);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = (partData: Omit<Part, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedPart) {
      // Güncelleme
      setParts(parts.map(part =>
        part.id === selectedPart.id
          ? {
              ...part,
              ...partData,
              updatedAt: new Date().toISOString(),
            }
          : part
      ));
    } else {
      // Yeni ekleme
      const newPart: Part = {
        ...partData,
        id: Math.max(...parts.map(p => p.id)) + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setParts([...parts, newPart]);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedPart) {
      setParts(parts.filter(part => part.id !== selectedPart.id));
      setDeleteDialogOpen(false);
      setSelectedPart(undefined);
    }
  };

  return (
    <Box sx={{ 
      p: { xs: 1, sm: 2, md: 3 },
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Paper 
        elevation={isMobile ? 0 : 1}
        sx={{ 
          p: { xs: 2, sm: 3 },
          flex: 1,
          borderRadius: { xs: 0, sm: 1 }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Chip
            icon={<AddIcon />}
            label="Yeni Parça Ekle"
            onClick={handleAdd}
            sx={{
              bgcolor: 'primary.light',
              color: 'primary.main',
              border: '1px solid',
              borderColor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
              },
              cursor: 'pointer'
            }}
          />
        </Box>
        
        <DataGrid
          dataSource={parts}
          showBorders={true}
          columnAutoWidth={true}
          height="calc(100% - 60px)"
        >
          <Paging defaultPageSize={10} />
          <FilterRow visible={true} />

          <Column dataField="id" caption="ID" allowEditing={false} />
          <Column dataField="name" caption="Parça Adı" />
          <Column 
            dataField="unit" 
            caption="Birim"
            lookup={{
              dataSource: Object.entries(partUnitLabels).map(([value, text]) => ({
                value,
                text
              })),
              valueExpr: 'value',
              displayExpr: 'text'
            }}
          />
          <Column 
            dataField="price" 
            caption="Fiyat"
            dataType="number"
            format="#,##0.00 ₺"
          />
          <Column 
            dataField="status" 
            caption="Durum"
            lookup={{
              dataSource: Object.entries(partStatusLabels).map(([value, text]) => ({
                value,
                text
              })),
              valueExpr: 'value',
              displayExpr: 'text'
            }}
          />
          <Column 
            dataField="createdAt" 
            caption="Oluşturulma Tarihi" 
            allowEditing={false}
            dataType="datetime"
            format="dd.MM.yyyy HH:mm"
          />
          <Column 
            dataField="updatedAt" 
            caption="Güncellenme Tarihi" 
            allowEditing={false}
            dataType="datetime"
            format="dd.MM.yyyy HH:mm"
          />
          <Column
            caption="İşlemler"
            width={120}
            cellRender={(cellElement: any) => {
              const part = cellElement.data;
              return (
                <Box>
                  <Tooltip title="Düzenle">
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(part)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Sil">
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(part)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              );
            }}
          />
        </DataGrid>
      </Paper>

      <PartDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedPart}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Parça Sil</DialogTitle>
        <DialogContent>
          <Typography>
            "{selectedPart?.name}" parçasını silmek istediğinizden emin misiniz?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>İptal</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Parts; 
import { Box, Typography, Paper } from '@mui/material';
import { useEffect, useState, useMemo } from 'react';
import { usePageTitle } from '../contexts/PageTitleContext';
import PivotGrid, {
  FieldChooser,
  Scrolling,
  Export,
  FieldPanel,
} from 'devextreme-react/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

interface WorkOrderReport {
  id: string;
  createdAt: Date;
  completedAt: Date | null;
  store: string;
  technician: string;
  issueType: string;
  priority: string;
  status: string;
  responseTime: number;
  resolutionTime: number;
  customerSatisfaction: number;
  cost: number;
  partsUsed: number;
  notes: string;
  temperature: number;
  energyEfficiency: number;
  services: { name: string; duration: number; totalCost: number }[];
  parts: { name: string; quantity: number; totalCost: number; unit: string }[];
  totalServiceCost: number;
  totalPartsCost: number;
  totalCost: number;
}

const WorkOrderAnalysis = () => {
  const { setTitle } = usePageTitle();
  const [reportData, setReportData] = useState<WorkOrderReport[]>([]);

  useEffect(() => {
    setTitle('Pivot Tablosu');
    fetchReportData();
  }, [setTitle]);

  const fetchReportData = async () => {
    try {
      const response = await fetch('/api/work-order-reports');
      const data = await response.json();
      // Tarihleri string'den Date objesine çevir
      const formattedData = data.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt),
        completedAt: item.completedAt ? new Date(item.completedAt) : null
      }));
      setReportData(formattedData);
    } catch (error) {
      console.error('Veri çekme hatası:', error);
    }
  };

  const dataSource = useMemo(() => {
    if (!reportData.length) return null;

    return new PivotGridDataSource({
      fields: [
        {
          caption: 'Mağaza',
          dataField: 'store',
          area: 'row',
          expanded: true
        },
        {
          caption: 'Teknisyen',
          dataField: 'technician',
          area: 'row'
        },
        {
          caption: 'Arıza Tipi',
          dataField: 'issueType',
          area: 'row'
        },
        {
          caption: 'Durum',
          dataField: 'status',
          area: 'column'
        },
        {
          caption: 'Öncelik',
          dataField: 'priority',
          area: 'column'
        },
        {
          caption: 'Kullanılan Servisler',
          dataField: 'services',
          area: 'row',
          selector: (data: WorkOrderReport) => data.services.map(s => s.name).join(', '),
        },
        {
          caption: 'Kullanılan Parçalar',
          dataField: 'parts',
          area: 'row',
          selector: (data: WorkOrderReport) => data.parts.map(p => `${p.name} (${p.quantity} ${p.unit})`).join(', '),
        },
        {
          caption: 'İş Emri Sayısı',
          dataField: 'id',
          dataType: 'number',
          summaryType: 'count',
          area: 'data'
        },
        {
          caption: 'Toplam Süre (dk)',
          dataField: 'services',
          dataType: 'number',
          summaryType: 'sum',
          selector: (data: WorkOrderReport) => data.services.reduce((acc, service) => acc + service.duration, 0),
          area: 'data'
        },
        {
          caption: 'Servis Maliyeti',
          dataField: 'totalServiceCost',
          dataType: 'number',
          summaryType: 'sum',
          format: 'currency',
          area: 'data'
        },
        {
          caption: 'Parça Maliyeti',
          dataField: 'totalPartsCost',
          dataType: 'number',
          summaryType: 'sum',
          format: 'currency',
          area: 'data'
        },
        {
          caption: 'Toplam Maliyet',
          dataField: 'totalCost',
          dataType: 'number',
          summaryType: 'sum',
          format: 'currency',
          area: 'data'
        }
      ],
      store: reportData
    });
  }, [reportData]);

  if (!dataSource) {
    return <Box sx={{ p: 3 }}>Veriler yükleniyor...</Box>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2, mb: 3 }}>
        <PivotGrid
          dataSource={dataSource}
          allowSortingBySummary={true}
          allowFiltering={true}
          allowSorting={true}
          showBorders={true}
          showColumnTotals={true}
          showColumnGrandTotals={true}
          showRowTotals={true}
          showRowGrandTotals={true}
          height={600}
        >
          <FieldChooser enabled={true} height={600} allowSearch={true} />
          <Scrolling mode="virtual" />
          <Export enabled={true} />
          <FieldPanel
            showFilterFields={true}
            allowFieldDragging={true}
            showDataFields={true}
            showColumnFields={true}
            showRowFields={true}
            visible={true}
          />
        </PivotGrid>
      </Paper>
    </Box>
  );
};

export default WorkOrderAnalysis; 
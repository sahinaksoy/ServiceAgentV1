import { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { usePageTitle } from '../../contexts/PageTitleContext';
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  SearchPanel,
  FilterRow,
  HeaderFilter,
  Export,
  Paging,
  Pager,
  Summary,
  GroupItem
} from 'devextreme-react/data-grid';

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
  services: { name: string; duration: number; totalCost: number }[];
  parts: { name: string; quantity: number; totalCost: number; unit: string }[];
  totalServiceCost: number;
  totalPartsCost: number;
  totalCost: number;
  notes: string;
}

const WorkOrderReport = () => {
  const { setTitle } = usePageTitle();
  const [reportData, setReportData] = useState<WorkOrderReport[]>([]);

  useEffect(() => {
    setTitle('İş Emri Raporu');
    fetchReportData();
  }, [setTitle]);

  const fetchReportData = async () => {
    try {
      const response = await fetch('/api/work-order-reports');
      const data = await response.json();
      const formattedData = data.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt),
        completedAt: item.completedAt ? new Date(item.completedAt) : null,
        servicesText: item.services.map((s: any) => s.name).join(', '),
        partsText: item.parts.map((p: any) => `${p.name} (${p.quantity} ${p.unit})`).join(', '),
        totalDuration: item.services.reduce((acc: number, service: any) => acc + service.duration, 0)
      }));
      setReportData(formattedData);
    } catch (error) {
      console.error('Veri çekme hatası:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          İş Emri Raporu
        </Typography>
        <DataGrid
          dataSource={reportData}
          showBorders={true}
          allowColumnReordering={true}
          allowColumnResizing={true}
          columnAutoWidth={true}
          rowAlternationEnabled={true}
          height={600}
        >
          <GroupPanel visible={true} />
          <SearchPanel visible={true} highlightCaseSensitive={true} />
          <Grouping autoExpandAll={false} />
          <FilterRow visible={true} />
          <HeaderFilter visible={true} />
          <Export enabled={true} />
          <Paging defaultPageSize={20} />
          <Pager
            showPageSizeSelector={true}
            allowedPageSizes={[10, 20, 50]}
            showInfo={true}
          />

          <Summary>
            <GroupItem
              column="store"
              summaryType="count"
              displayFormat="{0} İş Emri"
              showInGroupFooter={false}
              alignByColumn={true}
            />
          </Summary>

          <Column
            dataField="createdAt"
            caption="Oluşturma Tarihi"
            dataType="date"
            format="dd.MM.yyyy HH:mm"
            sortOrder="desc"
          />
          <Column
            dataField="store"
            caption="Mağaza"
            groupIndex={0}
          />
          <Column
            dataField="technician"
            caption="Teknisyen"
          />
          <Column
            dataField="issueType"
            caption="Arıza Tipi"
          />
          <Column
            dataField="status"
            caption="Durum"
          />
          <Column
            dataField="priority"
            caption="Öncelik"
          />
          <Column
            dataField="totalDuration"
            caption="Toplam Süre (dk)"
            dataType="number"
          />
          <Column
            dataField="servicesText"
            caption="Hizmetler"
            width={200}
          />
          <Column
            dataField="partsText"
            caption="Parçalar"
            width={200}
          />
          <Column
            dataField="totalServiceCost"
            caption="Servis Maliyeti"
            dataType="number"
            format="₺#,##0.00"
          />
          <Column
            dataField="totalPartsCost"
            caption="Parça Maliyeti"
            dataType="number"
            format="₺#,##0.00"
          />
          <Column
            dataField="totalCost"
            caption="Toplam Maliyet"
            dataType="number"
            format="₺#,##0.00"
          />
        </DataGrid>
      </Paper>
    </Box>
  );
};

export default WorkOrderReport; 
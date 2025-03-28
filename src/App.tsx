import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { theme } from './theme';
import { MainLayout } from './layouts/MainLayout';
import Home from './pages/Home';
import UserList from './pages/users/UserList';
import StoreList from './pages/stores/StoreList';
import WorkOrderList from './pages/workOrders/WorkOrderList';
import Settings from './pages/Settings';
import CreateWorkOrder from './pages/workOrders/CreateWorkOrder';
import Services from './pages/Services';
import Parts from './pages/Parts';
import { PageTitleProvider } from './contexts/PageTitleContext';
import WorkOrderDetail from './pages/WorkOrderDetail';
import { queryClient } from './hooks/useUsers';
import Dashboard from './pages/dashboard/Dashboard';
import Reports from './pages/Reports';
import WorkOrderAnalysis from './pages/WorkOrderAnalysis';
import WorkOrderReport from './pages/reports/WorkOrderReport';
import Profile from './pages/profile/Profile';

// DevExtreme CSS imports
import 'devextreme/dist/css/dx.light.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider 
          maxSnack={3} 
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={3000}
        >
          <PageTitleProvider>
            <Router>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/work-orders" element={<WorkOrderList />} />
                  <Route path="/work-orders/create" element={<CreateWorkOrder />} />
                  <Route path="/users" element={<UserList />} />
                  <Route path="/stores" element={<StoreList />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/parts" element={<Parts />} />
                  <Route path="/work-orders/:id/edit" element={<WorkOrderDetail />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/reports/work-order-analysis" element={<WorkOrderAnalysis />} />
                  <Route path="/reports/work-order-report" element={<WorkOrderReport />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </MainLayout>
            </Router>
          </PageTitleProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App; 
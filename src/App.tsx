import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { theme } from './theme';
import { MainLayout } from './layouts/MainLayout';
import Home from './pages/Home';
import UserList from './pages/users/UserList';
import StoreList from './pages/stores/StoreList';
import WorkOrderList from './pages/workOrders/WorkOrderList';
import Settings from './pages/Settings';
import CreateWorkOrder from './pages/workOrders/CreateWorkOrder';
import { PageTitleProvider } from './contexts/PageTitleContext';

// DevExtreme CSS imports
import 'devextreme/dist/css/dx.light.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 1,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PageTitleProvider>
          <Router>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/work-orders" element={<WorkOrderList />} />
                <Route path="/work-orders/create" element={<CreateWorkOrder />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/stores" element={<StoreList />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </MainLayout>
          </Router>
        </PageTitleProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App; 
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/home/Home';
import { CustomerList } from './pages/customers/CustomerList';
import { CustomerEdit } from './pages/customers/CustomerEdit';
import Services from './pages/Services';
import Parts from './pages/Parts';
import WorkOrderList from './pages/workOrders/WorkOrderList';
import WorkOrderDetail from './pages/workOrders/WorkOrderDetail';
import CreateWorkOrder from './pages/workOrders/CreateWorkOrder';
import EditWorkOrderCard from './pages/workOrders/EditWorkOrderCard';

const MainLayoutWrapper = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayoutWrapper />,
    children: [
      {
        path: '',
        element: <Navigate to="/work-orders/3" replace />,
      },
      // Müşteriler
      {
        path: 'customers',
        children: [
          {
            path: '',
            element: <CustomerList />,
          },
          {
            path: 'new',
            element: <CustomerEdit />,
          },
          {
            path: ':id/edit',
            element: <CustomerEdit />,
          },
        ],
      },
      // Servisler ve Parçalar
      {
        path: 'services',
        element: <Services />,
      },
      {
        path: 'parts',
        element: <Parts />,
      },
      // İş Emirleri
      {
        path: 'work-orders',
        children: [
          {
            path: 'list',
            element: <WorkOrderList />,
          },
          {
            path: 'create',
            element: <CreateWorkOrder />,
          },
          {
            path: ':id/edit',
            element: <WorkOrderDetail />,
          },
          {
            path: ':id/card/edit',
            element: <EditWorkOrderCard />,
          },
          {
            path: ':id',
            element: <WorkOrderDetail />,
          },
        ],
      },
      // 404 - Sayfa Bulunamadı
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: '/ServiceAgent',
  future: {
    v7_relativeSplatPath: true
  }
}); 
import { Navigate, useRoutes } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { CustomerList } from './pages/customers/CustomerList';
import { CustomerEdit } from './pages/customers/CustomerEdit';
import Services from './pages/Services';
import Parts from './pages/Parts';
import WorkOrderList from './pages/workOrders/WorkOrderList';
import CreateWorkOrder from './pages/workOrders/CreateWorkOrder';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/customers',
    element: <CustomerList />,
  },
  {
    path: '/customers/:id/edit',
    element: <CustomerEdit />,
  },
  {
    path: '/customers/new',
    element: <CustomerEdit />,
  },
  {
    path: '/services',
    element: <Services />,
  },
  {
    path: '/parts',
    element: <Parts />,
  },
  {
    path: '/work-orders',
    element: <WorkOrderList />,
  },
  {
    path: '/work-orders/new',
    element: <CreateWorkOrder />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default function AppRoutes() {
  return useRoutes(routes);
} 
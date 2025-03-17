import { Navigate, useRoutes } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { CustomerList } from './pages/customers/CustomerList';
import { CustomerEdit } from './pages/customers/CustomerEdit';
import StoreList from './pages/stores/StoreList';
import ServiceList from './pages/services/ServiceList';
import MaterialList from './pages/services/MaterialList';

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
    path: '/stores',
    element: <StoreList />,
  },
  {
    path: '/services',
    element: <ServiceList />,
  },
  {
    path: '/materials',
    element: <MaterialList />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default function AppRoutes() {
  return useRoutes(routes);
} 
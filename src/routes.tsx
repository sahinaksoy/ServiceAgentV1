import { Navigate, useRoutes } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { CustomerList } from './pages/customers/CustomerList';
import { CustomerEdit } from './pages/customers/CustomerEdit';

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
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default function AppRoutes() {
  return useRoutes(routes);
} 
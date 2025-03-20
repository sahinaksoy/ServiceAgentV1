import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../contexts/PageTitleContext';

const Reports = () => {
  const { setTitle } = usePageTitle();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle('İş Emri Raporu');
    navigate('/reports/work-order-report');
  }, [setTitle, navigate]);

  return null;
};

export default Reports; 
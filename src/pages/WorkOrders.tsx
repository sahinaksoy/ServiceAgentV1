import { useLocation } from 'react-router-dom';

const WorkOrders = () => {
  const location = useLocation();
  const { filterType } = location.state || {};

  useEffect(() => {
    if (filterType === 'emergency') {
      // Acil müdahale filtresi uygula
      // Örnek: setFilter('emergency') veya benzeri bir işlem
    }
  }, [filterType]);

  // ... diğer kodlar ...
}; 
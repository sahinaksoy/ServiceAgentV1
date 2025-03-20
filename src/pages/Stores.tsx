import { useLocation } from 'react-router-dom';

const Stores = () => {
  const location = useLocation();
  const { filterType } = location.state || {};

  useEffect(() => {
    if (filterType === 'planned') {
      // Planlı bakım filtresi uygula
      // Örnek: setFilter('planned') veya benzeri bir işlem
    }
  }, [filterType]);

  // ... diğer kodlar ...
}; 
export interface Region {
  id: string;
  name: string;
  city: string;
  district: string;
  isActive: boolean;
}

export const mockRegions: Region[] = [
  {
    id: '1',
    name: 'Kadıköy',
    city: 'İstanbul',
    district: 'Kadıköy',
    isActive: true
  },
  {
    id: '2',
    name: 'Beşiktaş',
    city: 'İstanbul',
    district: 'Beşiktaş',
    isActive: true
  },
  {
    id: '3',
    name: 'Şişli',
    city: 'İstanbul',
    district: 'Şişli',
    isActive: true
  },
  {
    id: '4',
    name: 'Ataşehir',
    city: 'İstanbul',
    district: 'Ataşehir',
    isActive: true
  },
  {
    id: '5',
    name: 'Maltepe',
    city: 'İstanbul',
    district: 'Maltepe',
    isActive: true
  }
]; 
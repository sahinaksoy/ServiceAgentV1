import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Store, StoreFormData } from '../types/store';
import { storeAPI } from '../services/api';

// Rastgele seri numarası oluşturan fonksiyon
const generateSerialNumber = (type: string) => {
  const prefix = {
    'vrf': 'VRF',
    'chiller': 'CHL',
    'havalandirma': 'HVL',
    'fancoil': 'FCU',
    'split_klima': 'SPL',
    'rooftop': 'RTU',
    'nem_alici': 'DHU',
    'isi_pompasi': 'HPU'
  }[type] || 'DEV';

  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const batch = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z arası random harf

  return `${prefix}-${year}-${batch}${random}`;
};

// Mock cihaz verileri
const mockDevices = [
  {
    id: '1',
    name: 'VRF Sistem A',
    type: 'vrf',
    serialNumber: generateSerialNumber('vrf'), // Örn: VRF-2024-A1234
    status: 'active',
    lastMaintenance: '2024-02-15',
    nextMaintenance: '2024-05-15'
  },
  {
    id: '2',
    name: 'Chiller Ünitesi 1',
    type: 'chiller',
    serialNumber: generateSerialNumber('chiller'), // Örn: CHL-2024-B5678
    status: 'warning',
    lastMaintenance: '2024-02-01',
    nextMaintenance: '2024-04-01'
  },
  {
    id: '3',
    name: 'Havalandırma Sistemi',
    type: 'havalandirma',
    serialNumber: generateSerialNumber('havalandirma'), // Örn: HVL-2024-C9012
    status: 'active',
    lastMaintenance: '2024-03-01',
    nextMaintenance: '2024-06-01'
  },
  {
    id: '4',
    name: 'Fan Coil Ünitesi A',
    type: 'fancoil',
    serialNumber: generateSerialNumber('fancoil'), // Örn: FCU-2024-D3456
    status: 'maintenance',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-04-15'
  },
  {
    id: '5',
    name: 'Split Klima 1',
    type: 'split_klima',
    serialNumber: generateSerialNumber('split_klima'), // Örn: SPL-2024-E7890
    status: 'active',
    lastMaintenance: '2024-02-20',
    nextMaintenance: '2024-05-20'
  },
  {
    id: '6',
    name: 'Rooftop Ünitesi',
    type: 'rooftop',
    serialNumber: generateSerialNumber('rooftop'), // Örn: RTU-2024-F1234
    status: 'error',
    lastMaintenance: '2024-01-30',
    nextMaintenance: '2024-04-30'
  }
];

// Mock mağaza verileri
const mockStores: Store[] = [
  {
    id: '1',
    name: 'Ataşehir Migros',
    address: 'Ataşehir Bulvarı No:123',
    region: 'İstanbul Anadolu',
    manager: 'Ahmet Yılmaz',
    managerPhone: '0532 123 45 67',
    devices: [mockDevices[0], mockDevices[1], mockDevices[4]] // VRF, Chiller ve Split Klima
  },
  {
    id: '2',
    name: 'Kadıköy Migros',
    address: 'Bağdat Caddesi No:456',
    region: 'İstanbul Anadolu',
    manager: 'Mehmet Demir',
    managerPhone: '0533 234 56 78',
    devices: [mockDevices[2], mockDevices[3]] // Havalandırma ve Fan Coil
  },
  {
    id: '3',
    name: 'Maltepe Migros',
    address: 'Maltepe Sahil Yolu No:789',
    region: 'İstanbul Anadolu',
    manager: 'Ayşe Kaya',
    managerPhone: '0535 345 67 89',
    devices: [mockDevices[5], mockDevices[1], mockDevices[4]] // Rooftop, Chiller ve Split Klima
  },
  {
    id: '4',
    name: 'Beşiktaş Migros',
    address: 'Barbaros Bulvarı No:101',
    region: 'İstanbul Avrupa',
    manager: 'Fatma Şahin',
    managerPhone: '0536 456 78 90',
    devices: [mockDevices[0], mockDevices[2], mockDevices[3]] // VRF, Havalandırma ve Fan Coil
  },
  {
    id: '5',
    name: 'Şişli Migros',
    address: 'Halaskargazi Caddesi No:202',
    region: 'İstanbul Avrupa',
    manager: 'Ali Öztürk',
    managerPhone: '0537 567 89 01',
    devices: [mockDevices[1], mockDevices[4], mockDevices[5]] // Chiller, Split Klima ve Rooftop
  }
];

// Mock veri döndüren useStores hook'u
export const useStores = () => {
  return useQuery<Store[], Error>({
    queryKey: ['stores'],
    queryFn: () => Promise.resolve(mockStores), // Mock veriyi döndür
    staleTime: Infinity // Veriyi her zaman taze tut
  });
};

// Mock veri ile çalışan createStore mutation'ı
export const useCreateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newStoreData: StoreFormData) => {
      const newStore = {
        ...newStoreData,
        id: Date.now().toString(),
        devices: newStoreData.devices?.map(device => ({
          ...device,
          serialNumber: device.serialNumber || generateSerialNumber(device.type)
        })) || []
      };
      return Promise.resolve(newStore);
    },
    onSuccess: (newStore) => {
      const previousStores = queryClient.getQueryData<Store[]>(['stores']) || [];
      queryClient.setQueryData(['stores'], [...previousStores, newStore]);
    },
  });
};

// Mock veri ile çalışan updateStore mutation'ı
export const useUpdateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: StoreFormData }) => {
      const updatedStore = {
        ...data,
        id,
        devices: data.devices?.map(device => ({
          ...device,
          serialNumber: device.serialNumber || generateSerialNumber(device.type)
        })) || []
      };
      return Promise.resolve(updatedStore);
    },
    onSuccess: (updatedStore) => {
      const previousStores = queryClient.getQueryData<Store[]>(['stores']) || [];
      queryClient.setQueryData(['stores'], 
        previousStores.map(store => 
          store.id === updatedStore.id ? updatedStore : store
        )
      );
    },
  });
};

// Mock veri ile çalışan deleteStore mutation'ı
export const useDeleteStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => Promise.resolve(id),
    onSuccess: (deletedId) => {
      const previousStores = queryClient.getQueryData<Store[]>(['stores']) || [];
      queryClient.setQueryData(['stores'], 
        previousStores.filter(store => store.id !== deletedId)
      );
    },
  });
}; 
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  HStack,
  Input,
  Select,
  Heading,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const Assets = () => {
  // Demo verisi
  const assets = [
    {
      id: 'AST-001',
      name: 'Merkezi Klima Sistemi',
      type: 'HVAC',
      location: 'Ana Bina - Kat 1',
      status: 'active',
      lastMaintenance: '2024-02-15',
      nextMaintenance: '2024-04-15',
      assignedTo: 'Ahmet Yılmaz',
    },
    {
      id: 'AST-002',
      name: 'Network Switch',
      type: 'Network',
      location: 'Sunucu Odası',
      status: 'maintenance',
      lastMaintenance: '2024-03-01',
      nextMaintenance: '2024-05-01',
      assignedTo: 'Mehmet Demir',
    },
    {
      id: 'AST-003',
      name: 'Güvenlik Kamera Sistemi',
      type: 'Security',
      location: 'Tüm Bina',
      status: 'active',
      lastMaintenance: '2024-03-10',
      nextMaintenance: '2024-06-10',
      assignedTo: 'Ayşe Kaya',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'maintenance':
        return 'orange';
      case 'retired':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'maintenance':
        return 'Bakımda';
      case 'retired':
        return 'Emekli';
      default:
        return status;
    }
  };

  return (
    <Box>
      <Box mb={6}>
        <Heading size="lg" mb={4}>Varlıklar</Heading>
        
        <HStack spacing={4} mb={4}>
          <Button leftIcon={<AddIcon />} colorScheme="blue">
            Yeni Varlık
          </Button>
          <Select placeholder="Tür" w="200px">
            <option value="all">Tümü</option>
            <option value="HVAC">HVAC</option>
            <option value="Network">Network</option>
            <option value="Security">Güvenlik</option>
          </Select>
          <Select placeholder="Durum" w="200px">
            <option value="all">Tümü</option>
            <option value="active">Aktif</option>
            <option value="maintenance">Bakımda</option>
            <option value="retired">Emekli</option>
          </Select>
          <Input placeholder="Ara..." w="300px" />
        </HStack>
      </Box>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Varlık No</Th>
            <Th>Ad</Th>
            <Th>Tür</Th>
            <Th>Konum</Th>
            <Th>Durum</Th>
            <Th>Son Bakım</Th>
            <Th>Sonraki Bakım</Th>
            <Th>Sorumlu</Th>
          </Tr>
        </Thead>
        <Tbody>
          {assets.map((asset) => (
            <Tr key={asset.id}>
              <Td>{asset.id}</Td>
              <Td>{asset.name}</Td>
              <Td>{asset.type}</Td>
              <Td>{asset.location}</Td>
              <Td>
                <Badge colorScheme={getStatusColor(asset.status)}>
                  {getStatusText(asset.status)}
                </Badge>
              </Td>
              <Td>{asset.lastMaintenance}</Td>
              <Td>{asset.nextMaintenance}</Td>
              <Td>{asset.assignedTo}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Assets; 
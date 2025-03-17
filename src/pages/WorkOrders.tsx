import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Heading,
  HStack,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Stack,
  Textarea,
  useDisclosure,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import {
  Box as MuiBox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl as MuiFormControl,
  InputLabel,
  MenuItem,
  TextField,
  Grid,
  Typography,
  Paper,
  FormControlLabel,
} from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Priority, IssueType, WorkOrder, priorityLabels, issueTypeLabels, statusLabels, WorkOrderStatus } from '../types/workOrder';
import {
  Thead as ChakraThead,
  Tbody as ChakraTbody,
  Tr as ChakraTr,
  Th as ChakraTh,
  Td as ChakraTd,
  Badge as ChakraBadge,
  Heading as ChakraHeading,
  HStack as ChakraHStack,
  Input as ChakraInput,
} from '@chakra-ui/react';

// Demo verisi
const mockWorkOrders: WorkOrder[] = [
  {
    id: '1',
    priority: 'HIGH',
    issueType: 'EMERGENCY',
    store: {
      id: '1',
      name: '5M Migros',
      region: 'Beşiktaş',
      teamLead: 'Ahmet Taşkın'
    },
    description: 'Acil arıza bildirimi',
    status: 'PENDING_APPROVAL',
    createdBy: {
      id: '1',
      name: 'Osman Mert',
      role: 'CONTRACTOR_EMPLOYEE',
      company: 'NOOD'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

interface FormData {
  priority: string;
  issueType: string;
  deviceSerialNumber: string;
  store: string;
  assignedTo: string;
  isPool: boolean;
  description: string;
}

const WorkOrders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<FormData>({
    priority: '',
    issueType: '',
    deviceSerialNumber: '',
    store: '',
    assignedTo: '',
    isPool: false,
    description: '',
  });

  const pendingColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { 
      field: 'priority', 
      headerName: 'Öncelik', 
      width: 130,
      valueFormatter: ({ value }) => priorityLabels[value as Priority] || ''
    },
    { 
      field: 'issueType', 
      headerName: 'Arıza Türü', 
      width: 150,
      valueFormatter: ({ value }) => issueTypeLabels[value as IssueType] || ''
    },
    { 
      field: 'store', 
      headerName: 'Mağaza', 
      width: 200,
      valueGetter: (params: GridValueGetterParams) => params.row?.store?.name || ''
    },
    { field: 'description', headerName: 'Açıklama', width: 300 },
    { 
      field: 'status', 
      headerName: 'Durum', 
      width: 130,
      valueFormatter: ({ value }) => statusLabels[value as WorkOrderStatus] || ''
    },
  ];

  const workOrders = [
    {
      id: 'WO-001',
      title: 'Klima Bakımı',
      customer: 'ABC Şirketi',
      priority: 'high',
      status: 'pending',
      assignedTo: 'Ahmet Yılmaz',
      dueDate: '2024-03-20',
    },
    {
      id: 'WO-002',
      title: 'Yazıcı Tamiri',
      customer: 'XYZ Ltd.',
      priority: 'medium',
      status: 'in-progress',
      assignedTo: 'Mehmet Demir',
      dueDate: '2024-03-21',
    },
    {
      id: 'WO-003',
      title: 'Server Bakımı',
      customer: 'Tech Corp',
      priority: 'low',
      status: 'completed',
      assignedTo: 'Ayşe Kaya',
      dueDate: '2024-03-19',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'in-progress':
        return 'blue';
      case 'completed':
        return 'green';
      default:
        return 'gray';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'gray';
    }
  };

  const handleSubmit = () => {
    console.log(formData);
    onClose();
  };

  return (
    <Box>
      <Box mb={6}>
        <Heading size="lg" mb={4}>İş Emirleri</Heading>
        
        <HStack spacing={4} mb={4}>
          <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={onOpen}>
            Yeni İş Emri
          </Button>
          <Select placeholder="Durum" w="200px">
            <option value="all">Tümü</option>
            <option value="pending">Bekliyor</option>
            <option value="in-progress">Devam Ediyor</option>
            <option value="completed">Tamamlandı</option>
          </Select>
          <Select placeholder="Öncelik" w="200px">
            <option value="all">Tümü</option>
            <option value="high">Yüksek</option>
            <option value="medium">Orta</option>
            <option value="low">Düşük</option>
          </Select>
          <Input placeholder="Ara..." w="300px" />
        </HStack>
      </Box>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>İş Emri No</Th>
            <Th>Başlık</Th>
            <Th>Müşteri</Th>
            <Th>Öncelik</Th>
            <Th>Durum</Th>
            <Th>Atanan Kişi</Th>
            <Th>Termin</Th>
          </Tr>
        </Thead>
        <Tbody>
          {workOrders.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.title}</Td>
              <Td>{order.customer}</Td>
              <Td>
                <Badge colorScheme={getPriorityColor(order.priority)}>
                  {order.priority.toUpperCase()}
                </Badge>
              </Td>
              <Td>
                <Badge colorScheme={getStatusColor(order.status)}>
                  {order.status.toUpperCase()}
                </Badge>
              </Td>
              <Td>{order.assignedTo}</Td>
              <Td>{order.dueDate}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Yeni İş Emri Oluştur</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Öncelik</FormLabel>
                <Select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="HIGH">Yüksek</option>
                  <option value="MEDIUM">Orta</option>
                  <option value="LOW">Düşük</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Arıza Türü</FormLabel>
                <Select
                  value={formData.issueType}
                  onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                >
                  <option value="EMERGENCY">Acil</option>
                  <option value="MAINTENANCE">Bakım</option>
                  <option value="REPAIR">Onarım</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Cihaz Seri No</FormLabel>
                <Input
                  value={formData.deviceSerialNumber}
                  onChange={(e) => setFormData({ ...formData, deviceSerialNumber: e.target.value })}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Mağaza</FormLabel>
                <Select
                  value={formData.store}
                  onChange={(e) => setFormData({ ...formData, store: e.target.value })}
                >
                  <option value="1">5M Migros - Beşiktaş</option>
                </Select>
              </FormControl>

              <FormControl as="fieldset">
                <FormLabel as="legend">Atama Tipi</FormLabel>
                <RadioGroup
                  value={formData.isPool ? 'pool' : 'person'}
                  onChange={(value) => setFormData({ ...formData, isPool: value === 'pool' })}
                >
                  <Stack direction="row">
                    <Radio value="person">Kişiye Ata</Radio>
                    <Radio value="pool">Havuza Ata</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              {!formData.isPool && (
                <FormControl>
                  <FormLabel>Atanacak Kişi</FormLabel>
                  <Select
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                  >
                    <option value="1">Osman Mert - Taşeron Çalışanı</option>
                  </Select>
                </FormControl>
              )}

              <FormControl isRequired>
                <FormLabel>Açıklama</FormLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              İptal
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Onaya Gönder
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default WorkOrders; 
import {
  Box,
  SimpleGrid,
  Card,
  CardBody,
  Heading,
  Text,
  Button,
  HStack,
  Input,
  VStack,
  Badge,
  Divider,
} from '@chakra-ui/react';
import { AddIcon, PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import { FiMapPin } from 'react-icons/fi';

const Customers = () => {
  // Demo verisi
  const customers = [
    {
      id: 'CUS-001',
      name: 'ABC Şirketi',
      type: 'Kurumsal',
      contact: {
        name: 'Ali Yılmaz',
        email: 'ali.yilmaz@abccompany.com',
        phone: '+90 555 111 2233',
      },
      address: 'Maslak, İstanbul',
      activeContracts: 2,
      activeWorkOrders: 3,
    },
    {
      id: 'CUS-002',
      name: 'XYZ Ltd. Şti.',
      type: 'KOBİ',
      contact: {
        name: 'Zeynep Kaya',
        email: 'zeynep.kaya@xyzltd.com',
        phone: '+90 555 333 4455',
      },
      address: 'Çankaya, Ankara',
      activeContracts: 1,
      activeWorkOrders: 1,
    },
    {
      id: 'CUS-003',
      name: 'Tech Corp',
      type: 'Kurumsal',
      contact: {
        name: 'Mehmet Demir',
        email: 'mehmet.demir@techcorp.com',
        phone: '+90 555 666 7788',
      },
      address: 'Konak, İzmir',
      activeContracts: 3,
      activeWorkOrders: 2,
    },
  ];

  return (
    <Box>
      <Box mb={6}>
        <Heading size="lg" mb={4}>Müşteriler</Heading>
        
        <HStack spacing={4} mb={4}>
          <Button leftIcon={<AddIcon />} colorScheme="blue">
            Yeni Müşteri
          </Button>
          <Input placeholder="Ara..." w="300px" />
        </HStack>
      </Box>

      <SimpleGrid columns={3} spacing={6}>
        {customers.map((customer) => (
          <Card key={customer.id}>
            <CardBody>
              <VStack align="start" spacing={4}>
                <Box width="100%">
                  <HStack justify="space-between" width="100%" mb={2}>
                    <Heading size="md">{customer.name}</Heading>
                    <Badge colorScheme="blue">{customer.type}</Badge>
                  </HStack>
                  <Text color="gray.600">#{customer.id}</Text>
                </Box>

                <Divider />

                <Box>
                  <Text fontWeight="medium" mb={2}>İletişim Bilgileri:</Text>
                  <VStack align="start" spacing={2}>
                    <HStack>
                      <EmailIcon />
                      <Text>{customer.contact.email}</Text>
                    </HStack>
                    <HStack>
                      <PhoneIcon />
                      <Text>{customer.contact.phone}</Text>
                    </HStack>
                    <HStack>
                      <FiMapPin />
                      <Text>{customer.address}</Text>
                    </HStack>
                  </VStack>
                </Box>

                <Divider />

                <HStack spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Aktif Sözleşmeler</Text>
                    <Text fontWeight="bold" fontSize="xl">{customer.activeContracts}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">Aktif İş Emirleri</Text>
                    <Text fontWeight="bold" fontSize="xl">{customer.activeWorkOrders}</Text>
                  </Box>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Customers; 
 
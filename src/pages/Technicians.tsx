import {
  Box,
  SimpleGrid,
  Card,
  CardBody,
  Heading,
  Text,
  Avatar,
  Badge,
  HStack,
  Button,
  VStack,
  Input,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const Technicians = () => {
  // Demo verisi
  const technicians = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      email: 'ahmet.yilmaz@example.com',
      phone: '+90 555 123 4567',
      skills: ['Klima', 'Elektrik', 'Soğutma'],
      status: 'active',
      currentTask: 'Klima Bakımı - ABC Şirketi',
    },
    {
      id: 2,
      name: 'Mehmet Demir',
      email: 'mehmet.demir@example.com',
      phone: '+90 555 234 5678',
      skills: ['Yazıcı', 'Network', 'BT'],
      status: 'busy',
      currentTask: 'Yazıcı Tamiri - XYZ Ltd.',
    },
    {
      id: 3,
      name: 'Ayşe Kaya',
      email: 'ayse.kaya@example.com',
      phone: '+90 555 345 6789',
      skills: ['Server', 'Network', 'Güvenlik'],
      status: 'offline',
      currentTask: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'busy':
        return 'orange';
      case 'offline':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Müsait';
      case 'busy':
        return 'Meşgul';
      case 'offline':
        return 'Çevrimdışı';
      default:
        return status;
    }
  };

  return (
    <Box>
      <Box mb={6}>
        <Heading size="lg" mb={4}>Teknisyenler</Heading>
        
        <HStack spacing={4} mb={4}>
          <Button leftIcon={<AddIcon />} colorScheme="blue">
            Yeni Teknisyen
          </Button>
          <Input placeholder="Ara..." w="300px" />
        </HStack>
      </Box>

      <SimpleGrid columns={3} spacing={6}>
        {technicians.map((tech) => (
          <Card key={tech.id}>
            <CardBody>
              <VStack align="start" spacing={4}>
                <HStack spacing={4} width="100%">
                  <Avatar name={tech.name} size="lg" />
                  <Box flex="1">
                    <Text fontWeight="bold" fontSize="lg">{tech.name}</Text>
                    <Badge colorScheme={getStatusColor(tech.status)}>
                      {getStatusText(tech.status)}
                    </Badge>
                  </Box>
                </HStack>

                <Box>
                  <Text color="gray.600">{tech.email}</Text>
                  <Text color="gray.600">{tech.phone}</Text>
                </Box>

                <Box>
                  <Text fontWeight="medium" mb={2}>Uzmanlık Alanları:</Text>
                  <HStack spacing={2}>
                    {tech.skills.map((skill) => (
                      <Badge key={skill} colorScheme="blue">
                        {skill}
                      </Badge>
                    ))}
                  </HStack>
                </Box>

                {tech.currentTask && (
                  <Box>
                    <Text fontWeight="medium">Mevcut Görev:</Text>
                    <Text color="gray.600">{tech.currentTask}</Text>
                  </Box>
                )}
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Technicians; 
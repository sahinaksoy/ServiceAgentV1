import {
  Box,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Heading,
  Card,
  CardBody,
} from '@chakra-ui/react';

const Dashboard = () => {
  return (
    <Box>
      <Heading mb={6}>Dashboard</Heading>
      
      <Grid templateColumns="repeat(4, 1fr)" gap={6} mb={8}>
        <GridItem>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Aktif İş Emirleri</StatLabel>
                <StatNumber>24</StatNumber>
                <StatHelpText>Son 24 saat</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Aktif Teknisyenler</StatLabel>
                <StatNumber>12</StatNumber>
                <StatHelpText>Sahada</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Bakım Bekleyen Varlıklar</StatLabel>
                <StatNumber>8</StatNumber>
                <StatHelpText>Bu hafta</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Müşteri Memnuniyeti</StatLabel>
                <StatNumber>4.8</StatNumber>
                <StatHelpText>Son 30 gün</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      {/* Buraya daha sonra grafik ve tablolar eklenecek */}
    </Box>
  );
};

export default Dashboard; 
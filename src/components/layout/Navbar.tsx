import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { SearchIcon, BellIcon } from '@chakra-ui/icons';

const Navbar = () => {
  return (
    <Box bg="white" px={4} py={2} borderBottom="1px" borderColor="gray.200">
      <Flex justify="space-between" align="center">
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input placeholder="Ara..." />
        </InputGroup>

        <Flex align="center">
          <IconButton
            aria-label="Notifications"
            icon={<BellIcon />}
            variant="ghost"
            mr={4}
          />
          
          <Menu>
            <MenuButton>
              <Avatar size="sm" name="Kullanıcı" />
            </MenuButton>
            <MenuList>
              <MenuItem>Profil</MenuItem>
              <MenuItem>Ayarlar</MenuItem>
              <MenuItem color="red.500">Çıkış Yap</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar; 
import { ReactNode } from 'react';
import {
  Box,
  Text,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverTrigger,
  Divider,
} from '@chakra-ui/react';
import { MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons';
import { ConnectButton } from '@rainbow-me/rainbowkit';





 function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
   return
  };
  return (
    <>
      <Box bg={useColorModeValue('gray.200', 'gray.900')} px={4}>
      <Flex
          h={20}
          alignItems={'center'}
          justifyContent={'space-between'}
          fontSize={16}
        >
          <Box
            as="b"
            top={'25px'}
            left={'70px'}
            height={'45px'}
            width={'278px'}
            textColor={'white.200'}
            fontWeight={600}
            lineHeight={'45.35px'}
            fontSize={'36px'}
            fontStyle={'outfit'}
            fontFamily={'outfit'}
          >
            Web3AfricanBlog
          </Box>
           <DesktopNav/>
          <Box ml={9} pl={9} mx={-162}>
      <InputGroup>
        <Input
          type="text"
          placeholder="Search"
          onChange={handleSearch}
        />
        <InputRightElement pointerEvents="none">
          <SearchIcon color="gray.500" />
        </InputRightElement>
      </InputGroup>
    </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode} mx={5}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

         
              <ConnectButton showBalance={false}  />;
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
 
const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200')
    const linkHoverColor = useColorModeValue('gray.800', 'white')
    const popoverContentBgColor = useColorModeValue('white', 'gray.800')
  
    return (
      <Stack px={5} pr={5} mx={5} direction={'row'} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
            
          <Box key={navItem.label}>
            
            <Popover trigger={'hover'} placement={'bottom-start'}>
            
              <PopoverTrigger>
              
                <Link
                  p={2}
                  href={navItem.href ?? '#'}
                  fontSize={'md'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                
                </Link>
              </PopoverTrigger>
            </Popover>
          </Box>
        ))}
      </Stack>
    )
  }
  interface NavItem {
    label: string
    subLabel?: string
    children?: Array<NavItem>
    href?: string
  }
  
  const NAV_ITEMS: Array<NavItem> = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Articles',
      href: '/articles',
    },
    {
      label: 'Governance',
      href: '/market',
    },
    
  ]
  
  export default Navbar
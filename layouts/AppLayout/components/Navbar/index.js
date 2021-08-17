import NextLink from 'next/link';
import { useRouter } from 'next/dist/client/router';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';

import { ROUTE_PATHS } from '@/src/constants/routePaths';
import SwitchColorMode from '@/src/components/SwitchColorMode';
import useCustomTheme from '@/src/hooks/useCustomTheme';

const NAV_ITEMS = [
  // {
  //   label: 'About me',
  //   href: ROUTE_PATHS.ABOUT_ROUTE
  // },
  {
    label: 'Projects',
    href: ROUTE_PATHS.PROJECTS_ROUTE
  },
  {
    label: 'Blogs',
    href: ROUTE_PATHS.BLOGS_ROUTE
  },
  // {
  //   label: 'Hire Me',
  //   href: ROUTE_PATHS.HIRE_ME_ROUTE
  // },
];

const DesktopNav = () => {
  const router = useRouter();
  const { primaryColor } = useCustomTheme();
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue(primaryColor, `${primaryColor}.300`);

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <NextLink href={navItem.href} passHref>
            <Link
              p={2}
              fontSize={'sm'}
              fontWeight={500}
              color={router.pathname.indexOf(navItem.href) === 0 ? primaryColor : linkColor}
              _hover={{
                textDecoration: 'none',
                color: linkHoverColor,
              }}
            >
              {navItem.label}
            </Link>
          </NextLink>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();
  const { primaryColor } = useCustomTheme();
  const router = useRouter();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={router.pathname.indexOf(href) === 0 ? primaryColor : useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <NextLink href={child.href} key={child.label} passHref>
                <Link py={2} >
                  {child.label}
                </Link>
              </NextLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const bg = useColorModeValue('white', 'gray.800');
  const { textColor, primaryColor } = useCustomTheme();

  return (
    <Box bg={bg} color={textColor}>
      <Flex
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        maxW={'6xl'}
        margin="auto"
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <NextLink href={ROUTE_PATHS.INDEX}>
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue(primaryColor, primaryColor)}
              fontWeight="bold"
              cursor="pointer"
            >
              BUIDUCTAI.COM
            </Text>
          </NextLink>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'flex-end' }}>
          <SwitchColorMode />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

export default Navbar;
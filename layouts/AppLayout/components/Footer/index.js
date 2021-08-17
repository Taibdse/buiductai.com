import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';

import useCustomTheme from '@/src/hooks/useCustomTheme';

const SocialButton = (props) => {
  const {
    children,
    label,
    href,
  } = props;

  return (
    <Link href={href} isExternal>
      <chakra.button
        bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
        rounded={'full'}
        w={8}
        h={8}
        cursor={'pointer'}
        // as={'a'}
        // href={href}
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
        transition={'background 0.3s ease'}
        _hover={{
          bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
        }}>
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
    </Link>
  );
};

const socialSites = [
  { label: 'Twitter', href: 'https://twitter.com/TaiBui52074508', icon: <FaTwitter /> },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100006632731348', icon: <FaFacebook /> },
  { label: 'Instagram', href: 'https://www.instagram.com/bductai/', icon: <FaInstagram /> },
  { label: 'Github', href: 'https://github.com/taibdse', icon: <FaGithub /> },
]

function Footer() {

  const { textColor } = useCustomTheme();

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={textColor}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© 2021 BUIDUCTAI.COM</Text>
        <Stack direction={'row'} spacing={6}>
          {socialSites.map(socialSite => (
            <SocialButton label={socialSite.label} href={socialSite.href}>
              {socialSite.icon}
            </SocialButton>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
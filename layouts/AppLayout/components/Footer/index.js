import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaFacebook, FaGithub, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const SocialButton = (props) => {
  const {
    children,
    label,
    href,
  } = props;

  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
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
  );
};

const socialSites = [
  { label: 'Twitter', href: '', icon: <FaTwitter /> },
  { label: 'Facebook', href: '', icon: <FaFacebook /> },
  { label: 'Instagram', href: '', icon: <FaInstagram /> },
  { label: 'Github', href: '', icon: <FaGithub /> },
]

function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
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
          {/* <SocialButton label={'Twitter'} href={'#'}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={'Facebook'} href={'#'}>
            <FaFacebook />
          </SocialButton>
          <SocialButton label={'Instagram'} href={'#'}>
            <FaInstagram />
          </SocialButton>
          <SocialButton label={'Github'} href={'#'}>
            <FaGithub />
          </SocialButton> */}
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
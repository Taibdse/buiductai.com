
import { Container, Heading, Text, Stack, Box } from '@chakra-ui/react';

import AppLayout from '@/layouts/AppLayout';
import useCustomTheme from '@/src/hooks/useCustomTheme';
import { SITE_NAME } from '@/src/constants/app';

export default function Home() {
  const { textColor, primaryColor } = useCustomTheme();
  return (
    <AppLayout seo={{ title: 'Homepage' }}>
      <Container maxW="xl">
        <Heading as="h2" textAlign="center" color={primaryColor} my="5">{SITE_NAME}</Heading>
        <Box boxShadow="inner" borderWidth="1px" padding="4" borderRadius="5">
          <Stack spacing="4" color={textColor}>
            <Text>Hello, My name is Duc Tai.</Text>
            <Text>I am a fullstack developer living in Ho Chi Minh City.</Text>
            <Text>I have passion about coding, playing sports such as badminton, soccer, king chess, swimming,...</Text>
            <Text>I also love cute pets too, cats, dogs,...</Text>
            <Text>This website is where i share my knowledge to all of you guys</Text>
            <Text>I hope you will enjoy my contents, big thanks to you.</Text>
          </Stack>
        </Box>
      </Container>
    </AppLayout>
  )
}

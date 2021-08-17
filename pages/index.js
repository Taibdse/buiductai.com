import AppLayout from '@/layouts/AppLayout';
import { Container, Heading } from '@chakra-ui/react';

export default function Home() {
  return (
    <AppLayout seo={{ title: 'Homepage' }}>
      <Container maxW="container.lg" background="orange">
        <Heading as="h2" textAlign="center">BUI DUC TAI</Heading>
      </Container>
    </AppLayout>
  )
}

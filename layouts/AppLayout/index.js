import Head from 'next/head';
import { Container } from '@chakra-ui/react';

import Footer from './components/Footer';
import Navbar from './components/Navbar';

function AppLayout(props) {
  const { children, seo } = props;
  return (
    <div>
      <Head>
        <title>{seo?.title}</title>
      </Head>
      <Navbar />
      <Container maxW={'7xl'} marginBottom="50px" minHeight="100vh">
        {children}
      </Container>
      <Footer />
    </div>
  )
}

export default AppLayout

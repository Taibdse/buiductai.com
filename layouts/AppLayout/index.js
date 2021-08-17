import Head from 'next/head';
import { Container } from '@chakra-ui/react';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PageScrollProgress from '@/src/components/PageScrollProgress';


function AppLayout(props) {
  const { children, seo, isShowPageScrollProgress } = props;
  return (
    <div>
      <Head>
        <title>{seo?.title}</title>
      </Head>
      {isShowPageScrollProgress && <PageScrollProgress />}
      <Navbar />
      <Container maxW={'7xl'} marginBottom="50px" minHeight="100vh">
        {children}
      </Container>
      <Footer />
    </div>
  )
}

export default AppLayout

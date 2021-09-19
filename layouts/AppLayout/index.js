import { Container } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import PageScrollProgress from '@/src/components/PageScrollProgress';
import { SITE_NAME } from '@/src/constants/app';

import Footer from './components/Footer';
import Navbar from './components/Navbar';

function AppLayout(props) {
  const { children, seo, isShowPageScrollProgress } = props;
  return (
    <div>
      <NextSeo
        title={`${seo.title} – ${SITE_NAME}`}
        description={seo.description}
        canonical={seo.canonical}
        openGraph={seo.openGraph}
      />
      {isShowPageScrollProgress && <PageScrollProgress />}
      <Navbar />
      <Container maxW={'6xl'} paddingBottom="50px" minHeight="calc(100vh - 120px)" marginTop="60px">
        {children}
      </Container>
      <Footer />
    </div>
  )
}

export default AppLayout;

import AppLayout from '@/layouts/AppLayout';
import ProjectCard from '@/src/components/ProjectCard';
import { WrapItem, Wrap, Heading, Divider } from '@chakra-ui/react';
import React from 'react';

function PortfolioPage(props) {
  return (
    <AppLayout seo={{ title: 'portfolio' }}>
      <Heading as="h2" textAlign="center" marginTop="20px">Portfolio</Heading>
      <Heading as="h3" fontSize="2xl">Real world projects</Heading>
      <Divider marginTop="5" marginBottom="5" />
      <Wrap spacing="0">
        {[1, 2, 3, 4, 5, 6].map(it => (
          <WrapItem key={it} width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }} p={[1, 2, 4]}>
            <ProjectCard />
          </WrapItem>
        ))}
      </Wrap>

      <Heading as="h3" fontSize="2xl">Side projects</Heading>
      <Divider marginTop="5" marginBottom="5" />
      <Wrap spacing="0">
        {[1, 2, 3, 4, 5, 6].map(it => (
          <WrapItem key={it} width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }} p={[1, 2, 4]}>
            <ProjectCard />
          </WrapItem>
        ))}
      </Wrap>
    </AppLayout>
  )
}

export default PortfolioPage;
import React from 'react';
import { WrapItem, Wrap, Heading, Divider, Box, SimpleGrid } from '@chakra-ui/react';

import AppLayout from '@/layouts/AppLayout';
import ProjectCard from '@/src/components/ProjectCard';
import useCustomTheme from '@/src/hooks/useCustomTheme';
import { CONTENT_TYPE, PROJECT_TYPES } from '@/src/constants/enum';
import { readAllPosts } from '@/libs/mdx';

function ProjectsPage(props) {

  const { projects } = props;
  const { textColor } = useCustomTheme();

  const seo = {
    title: 'Projects',
    description: "Duc-Tai Bui's projects come here.",
  };

  const realWorldProjects = projects.filter(p => p.type === PROJECT_TYPES.REAL_WORLD);
  const sideProjects = projects.filter(p => p.type === PROJECT_TYPES.SIDE_PROJECT);

  return (
    <AppLayout seo={seo}>
      {projects.length === 0 && (<Heading as="h3">Projects will be added later!</Heading>)}

      {realWorldProjects.length > 0 && (
        <Box marginBottom="10">
          <Heading as="h3" fontSize="2xl" color={textColor} marginTop="5">Real world projects</Heading>
          <Divider marginTop="5" marginBottom="5" />

          <SimpleGrid columns={[1, 2, 3]} spacing={['10px', '15px', '20px']}>
            {realWorldProjects.map(project => (
              <ProjectCard project={project} key={project.slug} />
            ))}
          </SimpleGrid>
        </Box>
      )}

      {sideProjects.length > 0 && (
        <Box>
          <Heading as="h3" fontSize="2xl" color={textColor}>Side projects</Heading>
          <Divider marginTop="5" marginBottom="5" />
          <SimpleGrid columns={[1, 2, 3]} spacing={['10px', '15px', '20px']}>
            {sideProjects.map(project => (
              <ProjectCard project={project} key={project.slug} />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </AppLayout>
  )
}

export async function getStaticProps() {
  const projects = await readAllPosts(CONTENT_TYPE.PROJECTS);

  return {
    props: {
      projects,
    }
  }
}

export default ProjectsPage;
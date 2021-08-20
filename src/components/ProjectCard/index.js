import React from 'react';
import NextLink from 'next/link';
import { Box, Heading, Link, Text } from '@chakra-ui/react';

import useCustomTheme from '@/src/hooks/useCustomTheme';
import { ROUTE_PATHS } from '@/src/constants/routePaths';

import Tags from '../Tags';
import AuthorInfo from '../AuthorInfo';
import ImageDisplay from '../ImageDisplay';


function ProjectCard(props) {
  const { project } = props;
  const { textColor, primaryColor } = useCustomTheme();
  const tags = project.tags.map(t => ({ name: t, href: '#' }))

  return (
    <Box
      w="100%"
      borderWidth="1px"
      borderRadius="10"
      boxShadow="inner"
      p={1, 2, 3}
      _hover={{ transform: 'scale(1.02)' }}
      transition="0.2s ease-in-out"
      color={textColor}
      mb="5"
    >
      <Box borderRadius="lg" overflow="hidden" >
        <NextLink href={`${ROUTE_PATHS.PROJECTS_ROUTE}/${project.slug}`} passHref>
          <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
            <ImageDisplay
              transform="scale(1.0)"
              src={project.thumbnailImage}
              alt={project.thumbnailImage}
              objectFit="contain"
              width="100%"
              transition="0.3s ease-in-out"
              _hover={{
                transform: 'scale(1.05)',
              }}
            />
          </Link>
        </NextLink>
      </Box>
      <Heading fontSize="xl" my="3">
        <NextLink href={`${ROUTE_PATHS.PROJECTS_ROUTE}/${project.slug}`} passHref>
          <Link textDecoration="none" _hover={{ textDecoration: 'none', color: primaryColor }}>
            {project.title}
          </Link>
        </NextLink>
      </Heading>
      <Tags tags={tags} isLinkHidden marginTop="3" />
      <Text as="p" fontSize="md" marginTop="2">
        {project.excerpt}
      </Text>
      <Link href={project.url} color={primaryColor} isExternal>View website</Link>
      <AuthorInfo
        author={project.author}
        date={project.createdDate}
      />
    </Box >
  )
}

export default ProjectCard;
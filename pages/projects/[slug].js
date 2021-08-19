import React from 'react';
import NextLink from 'next/link';
import {
  Heading,
  Divider,
  Box,
  Badge,
  Button,
  Container,
  Link,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons'
import { MDXRemote } from 'next-mdx-remote'

import AppLayout from '@/layouts/AppLayout';
import { readAllPostSlugs, readPostBySlug } from '@/libs/mdx';
import Tags from '@/src/components/Tags';
import { ROUTE_PATHS } from '@/src/constants/routePaths';
import { MDXComponents } from '@/config/mdx';
import useCustomTheme from '@/src/hooks/useCustomTheme';
import { ROOT_WEB } from '@/src/constants/app';
import { CONTENT_TYPE } from '@/src/constants/enum';
import ImageDisplay from '@/src/components/ImageDisplay';

const ProjectDetailsPage = (props) => {
  const { project, slug } = props;
  const projectTags = project.tags.map(t => ({ name: t }));

  const { textColor, primaryColor } = useCustomTheme();

  const getSeo = () => {
    const fullUrl = `${ROOT_WEB}${ROUTE_PATHS.PROJECTS_ROUTE}/${slug}`;
    const seo = {
      title: project.title,
      description: project.excerpt,
      canonical: fullUrl,
      openGraph: {
        type: 'website',
        url: fullUrl,
        title: project.title,
        description: project.description,
        images: [
          {
            url: project.coverImage,
            alt: project.coverImage,
          },
        ],
      }
    }
    return seo;
  }

  return (
    <AppLayout seo={getSeo()} isShowPageScrollProgress>
      <Container maxW="4xl">
        <Box maxWidth="100%">
          <NextLink href={ROUTE_PATHS.PROJECTS_ROUTE}>
            <Button leftIcon={<ArrowBackIcon />} marginBottom="5" marginTop="5" color={textColor}>
              Back
            </Button>
          </NextLink>

          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="12" boxShadow="inner">
            <Heading as="h2" marginTop="5" color={textColor}>
              {project.title}
            </Heading>
            <Badge>{project.createdDate}</Badge>
            <Link href={project.url} color={primaryColor} isExternal display="block">View website</Link>
            <Tags tags={projectTags} marginTop="5" />
            <ImageDisplay src={project.largeImage} marginTop='10' />
            <Divider marginTop="5" />
            <Box as="div" color={textColor}>
              <MDXRemote components={MDXComponents} {...project.mdxSource} />
            </Box>
          </Box>
        </Box>
      </Container>
    </AppLayout>
  );
};

export async function getStaticPaths() {
  const slugs = await readAllPostSlugs(CONTENT_TYPE.PROJECTS);
  const paths = slugs.map(slug => ({
    params: { slug }
  }));

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const { params: { slug } } = context;
  const project = await readPostBySlug(CONTENT_TYPE.PROJECTS, slug);
  return {
    props: {
      project,
      slug
    }
  }
}

export default ProjectDetailsPage;
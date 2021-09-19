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
import { isEmpty } from '@/src/utils/validation';
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
            url: project.thumbnailImage,
            alt: project.thumbnailImage,
          },
        ],
      }
    }
    return seo;
  }

  return (
    <AppLayout seo={getSeo()} isShowPageScrollProgress>
      <Box overflow="hidden" p={0} maxWidth="3xl" margin="auto">
        <NextLink href={ROUTE_PATHS.PROJECTS_ROUTE}>
          <Button leftIcon={<ArrowBackIcon />} marginBottom="5" marginTop="5" color={textColor}>
            Back
          </Button>
        </NextLink>
        <Heading as="h2" marginTop="5" color={textColor}>
          {project.title}
        </Heading>
        <Badge mt="2">{project.createdDate}</Badge>
        <Link href={project.url} color={primaryColor} isExternal display="block" my="3">View website</Link>
        <Tags tags={projectTags} isLinkHidden marginTop="5" />
        {!isEmpty(project.largeImage) && <ImageDisplay src={project.largeImage} alt={project.largeImage} marginTop='10' />}
        <Divider marginTop="5" />
        <Box as="div" color={textColor}>
          <MDXRemote components={MDXComponents} {...project.mdxSource} />
        </Box>
      </Box>
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
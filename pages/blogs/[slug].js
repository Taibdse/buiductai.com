import React from 'react';
import NextLink from 'next/link';
import {
  Heading,
  Divider,
  Box,
  Badge,
  Button,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons'
import { MDXRemote } from 'next-mdx-remote'

import AppLayout from '@/layouts/AppLayout';
import { readAllPostSlugs, readAllTags, readPostBySlug } from '@/libs/mdx';
import Tags from '@/src/components/Tags';
import { ROUTE_PATHS } from '@/src/constants/routePaths';
import BlogPageContainer from '@/src/components/BlogPageContainer';
import { MDXComponents } from '@/config/mdx';
import useCustomTheme from '@/src/hooks/useCustomTheme';
import { ROOT_WEB } from '@/src/constants/app';
import { CONTENT_TYPE } from '@/src/constants/enum';
import ImageDisplay from '@/src/components/ImageDisplay';

const BlogPage = (props) => {
  const { blog, tags, slug } = props;
  const blogTags = blog.tags.map(t => ({ name: t }));

  const { textColor } = useCustomTheme();

  const getSeo = () => {
    const fullUrl = `${ROOT_WEB}${ROUTE_PATHS.BLOGS_ROUTE}/${slug}`;
    const seo = {
      title: blog.title,
      description: blog.excerpt,
      canonical: fullUrl,
      openGraph: {
        type: 'website',
        url: fullUrl,
        title: blog.title,
        description: blog.description,
        images: [
          {
            url: blog.coverImage,
            width: 800,
            height: 600,
            alt: blog.coverImage,
          },
        ],
      }
    }
    return seo;
  }


  return (
    <AppLayout seo={getSeo()} isShowPageScrollProgress>
      <BlogPageContainer tags={tags}>
        <Box maxWidth="100%">
          <Button leftIcon={<ArrowBackIcon />} marginBottom="5" marginTop="5" color={textColor}>
            <NextLink href={ROUTE_PATHS.BLOGS_ROUTE}>Back</NextLink>
          </Button>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="12" boxShadow="inner">
            <Heading as="h2" marginTop="5" color={textColor}>
              {blog.title}
            </Heading>
            <Badge mt="3">{blog.createdDate} - {blog.readingTime.text} - {blog.readingTime.words} words</Badge>
            <Tags tags={blogTags} marginTop="5" />
            <ImageDisplay src={blog.coverImage} marginTop='10' />
            <Divider marginTop="5" />
            <Box as="div" color={textColor}>
              <MDXRemote components={MDXComponents} {...blog.mdxSource} />
            </Box>
          </Box>
        </Box>
      </BlogPageContainer>
    </AppLayout>
  );
};

export async function getStaticPaths() {
  const slugs = await readAllPostSlugs(CONTENT_TYPE.BLOGS);
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
  const blog = await readPostBySlug(CONTENT_TYPE.BLOGS, slug);
  const tags = await readAllTags(CONTENT_TYPE.BLOGS);
  console.log(blog);
  return {
    props: {
      blog,
      tags,
      slug
    }
  }
}

export default BlogPage;
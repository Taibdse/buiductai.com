import NextLink from 'next/link';
import {
  Heading,
  Divider,
  Container,
  Box,
  Image,
  Badge,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons'
import { MDXRemote } from 'next-mdx-remote'

import AppLayout from '@/layouts/AppLayout';
import { getAllBlogSlugs, getAllTags, getBlogBySlug } from '@/libs/mdx';
import BlogTags from '@/src/components/Tags';
import CustomReactMarkdown from '@/src/components/CustomReactMarkdown';
import { ROUTE_PATHS } from '@/src/constants/routePaths';
import BlogPageContainer from '@/src/components/BlogPageContainer';
import { MDXComponents } from '@/config/mdx';


const BlogPage = (props) => {
  const { blog, tags } = props;
  const blogTags = blog.tags.map(t => ({ name: t }));

  return (
    <AppLayout seo={{ title: blog.title }}>
      <BlogPageContainer tags={tags}>
        <Box maxWidth="100%">
          <Button leftIcon={<ArrowBackIcon />} marginBottom="5" marginTop="5" color={useColorModeValue('gray.700', 'gray.200')}>
            <NextLink href={ROUTE_PATHS.BLOGS_ROUTE}>Back</NextLink>
          </Button>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="12" boxShadow="inner">
            <Heading as="h2" marginTop="5" color={useColorModeValue('gray.700', 'gray.200')}>
              {blog.title}
            </Heading>
            <Badge>{blog.createdDate}</Badge>
            <BlogTags tags={blogTags} marginTop="5" />
            <Image src={blog.coverImage} marginTop='10' />
            <Divider marginTop="5" />
            {/* <CustomReactMarkdown content={blog.content} /> */}

            <MDXRemote components={MDXComponents} {...blog.mdxSource} />

            {/* {blogContent} */}
          </Box>
        </Box>
      </BlogPageContainer>
      {/* <Container maxW={'container.lg'}>
        <Button leftIcon={<ArrowBackIcon />} marginBottom="5" marginTop="5">
          <NextLink href={ROUTE_PATHS.BLOGS_ROUTE}>Back</NextLink>
        </Button>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="12" boxShadow="inner">
          <Heading as="h2" marginTop="5">
            {blog.title}
          </Heading>
          <Badge>{blog.createdDate}</Badge>
          <BlogTags tags={blog.tags} marginTop="5" />
          <Image src={blog.coverImage} marginTop='10' />
          <Divider marginTop="5" />
          <CustomReactMarkdown content={blog.content} />
        </Box>
      </Container> */}
    </AppLayout>
  );
};

export async function getStaticPaths() {
  const slugs = await getAllBlogSlugs();
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
  const blog = await getBlogBySlug(slug);
  const tags = await getAllTags();
  return {
    props: {
      blog,
      tags
    }
  }
}

export default BlogPage;
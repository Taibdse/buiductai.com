import NextLink from 'next/link';
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ROUTE_PATHS } from '@/src/constants/routePaths';
import BlogTags from '../Tags';
import BlogAuthor from '../AuthorInfo';

export default function BlogCard(props) {
  const { blog, ...restProps } = props;
  const tags = blog.tags.map(t => ({ name: t }))
  return (
    <Box
      display="flex"
      flexDirection={{ base: 'column', sm: 'row' }}
      justifyContent="space-between"
      borderWidth="1px"
      borderRadius="10"
      p={[1, 2, 5]}
      boxShadow="inner"
      _hover={{ transform: 'scale(1.005)' }}
      transition="0.2s ease-in-out"
      {...restProps}
    >
      <Box
        display="flex"
        flex="1"
        position="relative"
        alignItems="center">
        <Box
          width={{ base: '100%', sm: '85%' }}
          zIndex="2"
        >
          <NextLink href={`${ROUTE_PATHS.BLOGS_ROUTE}/${blog.slug}`} passHref>
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Image
                borderRadius="lg"
                src={blog.coverImage}
                alt={blog.title}
                objectFit="contain"
              />
            </Link>
          </NextLink>
        </Box>
      </Box>
      <Box
        display="flex"
        flex="2"
        flexDirection="column"
        justifyContent="center"
        marginTop={{ base: '3', sm: '0' }}>
        <Heading as="h4" fontSize="xl">
          <NextLink href={`${ROUTE_PATHS.BLOGS_ROUTE}/${blog.slug}`} passHref>
            <Link textDecoration="none" _hover={{ textDecoration: 'none', color: 'orange' }} color={useColorModeValue('gray.700', 'gray.200')}>
              {blog.title}
            </Link>
          </NextLink>
        </Heading>
        <Text
          as="p"
          marginTop="2"
          color={useColorModeValue('gray.700', 'gray.200')}
          fontSize="md"
          marginBottom="10px"
        >
          {blog.excerpt}
        </Text>
        <BlogTags tags={tags} marginTop="1" />
        <BlogAuthor author={blog.author} date={blog.createdDate} />
      </Box>
    </Box>
  )
}

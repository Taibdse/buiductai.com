import { Box, Container, Divider, Heading, useColorModeValue, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import BlogTags from '../Tags';

function BlogPageContainer(props) {
  const { children, tags } = props;
  return (
    <Wrap spacing="0">
      <WrapItem width={{ base: '100%', md: '25%', lg: '25%', xl: '25%' }} paddingLeft={['0px', '0px', '10px']}>
        <Box>
          <Heading as="h3" marginTop="5" color={useColorModeValue('gray.700', 'gray.200')}>
            Tags
          </Heading>
          <Divider marginTop="5" marginBottom="5" />
          <BlogTags tags={tags} isShowNumOfBlog />
        </Box>
      </WrapItem>
      <WrapItem width={{ base: '100%', md: '75%', lg: '75%', xl: '75%' }} paddingRight={['0px', '0px', '10px']}>
        {children}
      </WrapItem>
    </Wrap>
  )
}

export default BlogPageContainer;
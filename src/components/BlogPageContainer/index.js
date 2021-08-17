import React from 'react';
import { Box, Divider, Heading, Wrap, WrapItem } from '@chakra-ui/react';

import useCustomTheme from '@/src/hooks/useCustomTheme';

import BlogTags from '../Tags';

function BlogPageContainer(props) {
  const { children, tags } = props;
  const { textColor } = useCustomTheme();

  return (
    <Wrap spacing="0">
      <WrapItem width={{ base: '100%', md: '25%', lg: '25%', xl: '25%' }} paddingRight={['0px', '0px', '10px']}>
        <Box w="100%">
          <Heading as="h5" marginTop="5" color={textColor}>
            Tags
          </Heading>
          <Divider marginTop="5" marginBottom="5" />
          <BlogTags tags={tags} isShowNumOfBlog />
        </Box>
      </WrapItem>
      <WrapItem width={{ base: '100%', md: '75%', lg: '75%', xl: '75%' }} paddingLeft={['0px', '0px', '10px']}>
        {children}
      </WrapItem>
    </Wrap>
  )
}

export default BlogPageContainer;
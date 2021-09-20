import React from 'react';
import { Box, Divider, Heading, Wrap, WrapItem, VStack } from '@chakra-ui/react';

import useCustomTheme from '@/src/hooks/useCustomTheme';

import BlogTags from '../Tags';

function BlogPageContainer(props) {
  const { children, tags, isBlogListContainer } = props;
  const { textColor } = useCustomTheme();

  return (
    <Wrap spacing="0">
      {isBlogListContainer ? (
        <VStack width="100%">
          <WrapItem width={{ base: '100%', lg: '50%' }} alignItems="center">
            <Box w="100%">
              <Heading as="h5" marginTop="5" color={textColor}>
                Tags
              </Heading>
              <Divider marginTop="5" marginBottom="5" />
              <BlogTags tags={tags} isShowNumOfPosts />
            </Box>
          </WrapItem>
          <WrapItem width={{ base: '100%', lg: '50%' }}>
            {children}
          </WrapItem>
        </VStack>
      ) : (
        <>
          <WrapItem width={{ base: '100%', md: '75%', lg: '75%', xl: '75%' }} paddingRight={['0px', '0px', '10px']}>
            {children}
          </WrapItem>
          <WrapItem width={{ base: '100%', md: '25%', lg: '25%', xl: '25%' }} paddingLeft={['0px', '0px', '10px']}>
            <Box w="100%">
              <Heading as="h5" marginTop="5" color={textColor}>
                Tags
              </Heading>
              <Divider marginTop="5" marginBottom="5" />
              <BlogTags tags={tags} isShowNumOfPosts />
            </Box>
          </WrapItem>
        </>
      )}

    </Wrap>
  )
}

export default BlogPageContainer;
import React from 'react';
import NextLink from 'next/link';
import { Box, Tag, TagLabel } from '@chakra-ui/react';
import { ROUTE_PATHS } from '@/src/constants/routePaths';
import useCustomTheme from '@/src/hooks/useCustomTheme';

const Tags = (props) => {
  const { tags, isShowNumOfPosts, isLinkHidden, ...restProps } = props;
  const { primaryColor } = useCustomTheme();

  return (
    <Box {...restProps}>
      {tags.map((tag) => {
        const children = (
          <React.Fragment key={tag.name}>
            <Tag size={'md'} variant="solid" cursor="pointer" margin="0 8px 10px 0" colorScheme={primaryColor}>
              <TagLabel marginRight={isShowNumOfPosts && 1}>{tag.name}</TagLabel>
              {isShowNumOfPosts && <TagLabel>({tag.numOfBlogs})</TagLabel>}
            </Tag>
          </React.Fragment>
        )
        return isLinkHidden ? children : (
          <NextLink key={tag.name} href={`${ROUTE_PATHS.BLOGS_BY_TAG_ROUTE}/${tag.name}`}>
            {children}
          </NextLink>
        );
        // return (
        //   <NextLink key={tag.name} href={`${ROUTE_PATHS.BLOGS_BY_TAG_ROUTE}/${tag.name}`}>
        //     <Tag size={'md'} variant="solid" cursor="pointer" margin="0 8px 10px 0" colorScheme={primaryColor}>
        //       <TagLabel marginRight={isShowNumOfBlog && 1}>{tag.name}</TagLabel>
        //       {isShowNumOfBlog && <TagLabel>({tag.numOfBlogs})</TagLabel>}
        //     </Tag>
        //   </NextLink>
        // ))
      })}
    </Box>
  );
};

export default Tags;
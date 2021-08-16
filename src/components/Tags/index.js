import React from 'react';
import NextLink from 'next/link';
import { HStack, Tag, Link, TagLabel } from '@chakra-ui/react';
import { ROUTE_PATHS } from '@/src/constants/routePaths';

const Tags = (props) => {
  const { tags, marginTop, isShowNumOfBlog } = props;
  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => (
        <NextLink key={tag} href={`${ROUTE_PATHS.TAGS_ROUTE}/${tag}`}>
          <Tag size={'md'} variant="solid" colorScheme="orange" cursor="pointer">
            <TagLabel marginRight={isShowNumOfBlog && 1}>{tag.name}</TagLabel>
            {isShowNumOfBlog && <TagLabel>({tag.numOfBlogs})</TagLabel>}
          </Tag>
        </NextLink>
      ))}
    </HStack>
  );
};

export default Tags;
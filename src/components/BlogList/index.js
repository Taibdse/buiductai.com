import React, { useState, useEffect } from 'react';
import { Box, Divider, Heading, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import { isEmpty } from '@/src/utils/validation';
import { include } from '@/src/utils/string';
import useCustomTheme from '@/src/hooks/useCustomTheme';

import BlogCard from '../BlogCard';

function BlogList(props) {
  const { blogs, title } = props;
  const [searchValue, setSearchValue] = useState();
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const { textColor } = useCustomTheme();

  const handleChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  }

  const handleSearchBlogs = (searchValue) => {
    const newFilteredBlogs = blogs.filter(b => include(b.title, searchValue))
    setFilteredBlogs(newFilteredBlogs);
  }

  useEffect(() => {
    handleSearchBlogs(searchValue)
  }, [searchValue, blogs]);

  return (
    <Box>
      <Heading as="h3" marginTop="5" color={textColor}>
        {title}
      </Heading>
      <Divider marginTop="5" marginBottom="5" />
      <InputGroup marginBottom="5">
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input placeholder="Search blogs..." value={searchValue} onChange={handleChangeSearchValue} color={textColor} />
      </InputGroup>
      {isEmpty(filteredBlogs) && <Heading as="h3" color={textColor}>No Blogs found</Heading>}
      {!isEmpty(filteredBlogs) && filteredBlogs.map(blog => (
        <BlogCard blog={blog} key={blog.slug} marginBottom="15px" />
      ))}
    </Box>
  )
}

export default BlogList;
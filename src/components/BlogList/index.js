import React, { useState, useEffect } from 'react';
import { Box, Divider, Heading, Input, InputGroup, InputLeftElement, useColorModeValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import BlogCard from '../BlogCard';
import { isEmpty } from '@/src/utils/validation';
import { include } from '@/src/utils/string';

function BlogList(props) {
  const { blogs, title } = props;
  const [searchValue, setSearchValue] = useState();
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  const handleChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  }

  const handleSearchBlogs = (searchValue) => {
    const newFilteredBlogs = blogs.filter(b => include(b.title, searchValue))
    setFilteredBlogs(newFilteredBlogs)
  }

  useEffect(() => {
    handleSearchBlogs(searchValue)
  }, [searchValue]);

  return (
    <Box>
      <Heading as="h3" marginTop="5" color={useColorModeValue('gray.700', 'gray.200')}>
        {title}
      </Heading>
      <Divider marginTop="5" marginBottom="5" />
      <InputGroup marginBottom="5">
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input placeholder="Search blogs..." value={searchValue} onChange={handleChangeSearchValue} color={useColorModeValue('gray.700', 'gray.200')} />
      </InputGroup>
      {isEmpty(filteredBlogs) && <Heading as="h3" color={useColorModeValue('gray.700', 'gray.200')}>No Blogs found</Heading>}
      {!isEmpty(filteredBlogs) && filteredBlogs.map(blog => (
        <BlogCard blog={blog} key={blog.slug} marginBottom="15px" />
      ))}
    </Box>
  )
}

export default BlogList;
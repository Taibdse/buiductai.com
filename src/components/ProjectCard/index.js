import React from 'react';
import { Box, Heading, Link, Image, Text } from '@chakra-ui/react';
import AuthorCard from '../AuthorInfo';
import Tags from '../Tags';

function ProjectCard(props) {
  const { project } = props;

  return (
    <Box w="100%" borderWidth="1" borderRadius="5" boxShadow="inner" p="2" _hover={{ transform: 'scale(1.03)' }} transition="0.2s ease-in-out">
      <Box borderRadius="lg" overflow="hidden" >
        <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
          <Image
            transform="scale(1.0)"
            src={
              'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
            }
            alt="some text"
            objectFit="contain"
            width="100%"
            transition="0.3s ease-in-out"
            _hover={{
              transform: 'scale(1.05)',
            }}
          />
        </Link>
      </Box>
      <Heading fontSize="xl" marginTop="2">
        <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
          Project title
        </Link>
      </Heading>
      <Tags tags={[{ name: 'ReactJS' }, { name: 'Java' }]} marginTop="3" />
      <Text as="p" fontSize="md" marginTop="2">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text
        ever since the 1500s, when an unknown printer took a galley of
        type and scrambled it to make a type specimen book.
      </Text>
      {/* <AuthorCard
        author={{ name: 'Bui Duc Tai', avatar: 'https://res.cloudinary.com/ductai/image/upload/v1629090075/buiductai.com/author/avatar_kddb1i.jpg' }}
        date={'2021-02-23'}
      /> */}
    </Box >
  )
}

export default ProjectCard
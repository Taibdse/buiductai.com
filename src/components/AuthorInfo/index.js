import { Image, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react'

function AuthorInfo(props) {
  const { author, date } = props
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center" color={useColorModeValue('gray.700', 'gray.200')}>
      <Image
        borderRadius="full"
        boxSize="40px"
        src={author.avatar}
        alt={`Avatar of ${author.name}`}
      />
      <Text fontWeight="medium">{author.name}</Text>
      <Text>—</Text>
      <Text>{date}</Text>
    </HStack>
  )
}

export default AuthorInfo;
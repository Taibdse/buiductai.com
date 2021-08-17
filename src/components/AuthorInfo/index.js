import React from 'react'
import { Image, HStack, Text } from '@chakra-ui/react';

import useCustomTheme from '@/src/hooks/useCustomTheme';

function AuthorInfo(props) {
  const { author, date } = props
  const { textColor } = useCustomTheme();

  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center" color={textColor}>
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
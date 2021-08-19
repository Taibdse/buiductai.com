import React from 'react';
import NextLink from 'next/link';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Text } from '@chakra-ui/react'

import AppLayout from '@/layouts/AppLayout'
import { ROUTE_PATHS } from '@/src/constants/routePaths'
import useCustomTheme from '@/src/hooks/useCustomTheme';

export default function Page404() {
  const { textColor, primaryColor } = useCustomTheme();

  const seo = {
    title: '404 Not Found',
    description: '404 Not Found'
  }

  return (
    <AppLayout seo={seo}>
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        mt="5"
        color={textColor}
      >
        <AlertIcon boxSize="50px" mr={0} />
        <AlertTitle my={4} fontSize="3xl">
          404 NOT FOUND!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Please come back to <NextLink href={ROUTE_PATHS.INDEX}><Text color={primaryColor} cursor="pointer" display="inline">homepage</Text></NextLink>
        </AlertDescription>
      </Alert>
    </AppLayout>
  )
}

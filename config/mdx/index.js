import useCustomTheme from '@/src/hooks/useCustomTheme'
import {
  Box,
  Alert,
  Code,
  Heading,
  Link,
  Text,
  Divider,
  useColorMode,
  IconButton,
  Tooltip,
  position
} from '@chakra-ui/react'
import { CheckIcon, CopyIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

import useCopyToClipboard from '@/src/hooks/useCopyToClipboard';

const CustomLink = (props) => {
  const { colorMode } = useColorMode()
  const color = {
    light: 'hsl(208, 99%, 44%)',
    dark: 'hsl(208, 95%, 68%)'
  }

  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref>
        <Link color={color[colorMode]} {...props} />
      </NextLink>
    )
  }

  return <Link color={color[colorMode]} isExternal {...props} />
}

const Quote = (props) => {
  const { colorMode } = useColorMode()
  const bgColor = {
    light: 'blue.50',
    dark: 'blue.900'
  }

  return (
    <Alert
      mt={4}
      w="98%"
      bg={bgColor[colorMode]}
      variant="left-accent"
      status="info"
      css={{
        '> *:first-of-type': {
          marginTop: 0,
          marginLeft: 8
        }
      }}
      {...props}
    />
  )
}

const DocsHeading = (props) => (
  <Heading
    css={{
      scrollMarginTop: '100px',
      scrollSnapMargin: '100px', // Safari
      '&[id]': {
        pointerEvents: 'none'
      },
      '&[id]:before': {
        display: 'block',
        height: ' 6rem',
        marginTop: '-6rem',
        visibility: 'hidden',
        content: `""`
      },
      '&[id]:hover a': { opacity: 1 }
    }}
    {...props}
    mb="1em"
    mt="2em"
  >
    <Box pointerEvents="auto">
      {props.children}
      {props.id && (
        <Box
          aria-label="anchor"
          as="a"
          color="blue.500"
          fontWeight="normal"
          outline="none"
          _focus={{
            opacity: 1,
            boxShadow: 'outline'
          }}
          opacity="0"
          ml="0.375rem"
          href={`#${props.id}`}
        >
          #
        </Box>
      )}
    </Box>
  </Heading>
)

const Hr = () => {
  const { colorMode } = useColorMode();
  const { primaryColor } = useCustomTheme();
  const borderColor = {
    light: `${primaryColor}.200`,
    dark: `${primaryColor}.600`
  }

  return <Divider borderColor={borderColor[colorMode]} my={4} w="100%" />
}


const Pre = (props) => {
  const { children, ...rest } = props;
  const { copied, copy, ref } = useCopyToClipboard();

  return (
    <>
      {props.className?.indexOf('language-') > -1 ? (
        <Box as="div" position="relative" marginTop="-25px">
          <Tooltip label="Copy to clipboard" placement="top">
            <IconButton
              size="sm"
              aria-label="Copy to clipboard"
              icon={copied ? <CheckIcon /> : <CopyIcon />}
              onClick={copy}
              position="absolute"
              top="-35px"
              right="15px"
              zIndex="1000"
            />
          </Tooltip>
          <pre {...rest} ref={ref} style={{ borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }}>
            {children}
          </pre>
        </Box>
      ) : (
        <pre {...rest} >
          {children}
        </pre>
      )}
    </>
    // <div style={{ position: 'relative' }}>
    //   <pre {...rest} ref={ref}>
    //     <Box as="div">
    //       <Tooltip label="Copy to clipboard" placement="top">
    //         <Box as="div" position="absolute" top="0px" right="0" display="flex">
    //           <IconButton aria-label="Copy to clipboard" size="sm" icon={copied ? <CheckIcon /> : <CopyIcon />} onClick={copy} mr="2" mt="2" />
    //         </Box>
    //       </Tooltip>
    //     </Box>
    //     {children}
    //   </pre>
    // </div>
    // <div style={{ position: 'relative' }}>
    //   <pre {...rest}>{children}</pre>
    // </div>
  )
}

export const MDXComponents = {
  h1: (props) => <Heading as="h1" size="xl" my={4} {...props} />,
  h2: (props) => <DocsHeading as="h2" size="lg" fontWeight="bold" {...props} />,
  h3: (props) => <DocsHeading as="h3" size="md" fontWeight="bold" {...props} />,
  h4: (props) => <DocsHeading as="h4" size="sm" fontWeight="bold" {...props} />,
  h5: (props) => <DocsHeading as="h5" size="sm" fontWeight="bold" {...props} />,
  h6: (props) => <DocsHeading as="h6" size="xs" fontWeight="bold" {...props} />,
  inlineCode: (props) => (
    <Code colorScheme="yellow" fontSize="1em" {...props} />
  ),
  br: (props) => <Box height="24px" {...props} />,
  hr: Hr,
  a: CustomLink,
  p: (props) => <Text as="p" my={2} lineHeight="tall" {...props} />,
  ul: (props) => <Box as="ul" pt={2} pl={4} ml={2} {...props} />,
  ol: (props) => <Box as="ol" pt={2} pl={4} ml={2} {...props} />,
  li: (props) => <Box as="li" pb={1} {...props} />,
  blockquote: Quote,
  pre: (props) => <Pre {...props} />
}
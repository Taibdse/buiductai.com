import { ChakraProvider, extendTheme, ColorModeProvider, useColorMode } from "@chakra-ui/react"
import '../styles/globals.css';
import { Global, css } from '@emotion/react';
import { MDXProvider } from '@mdx-js/react'
import { MDXComponents } from "@/config/mdx";
import { prismDarkTheme, prismLightTheme } from "@/styles/prism";

const theme = extendTheme({});

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode()

  return (
    <>
      <Global
        styles={css`
          ${colorMode === 'light' ? prismLightTheme : prismDarkTheme};
          html {
            min-width: 356px;
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: ${colorMode === 'light' ? 'white' : '#15161a'};
          }
        `}
      />
      {children}
    </>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider options={{
        initialColorMode: 'light',
        useSystemColorMode: true
      }}>
        {/* <Component {...pageProps} /> */}
        <MDXProvider components={MDXComponents}>
          <GlobalStyle>
            {/* <DefaultSeo {...SEO} /> */}
            <Component {...pageProps} />
          </GlobalStyle>
        </MDXProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )

}

export default MyApp

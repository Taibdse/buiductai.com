import { ChakraProvider, extendTheme, ColorModeProvider, useColorMode } from "@chakra-ui/react"
import { Global, css } from '@emotion/react';
import { MDXProvider } from '@mdx-js/react';
import { DefaultSeo } from "next-seo";

import { prismDarkTheme, prismLightTheme } from "@/styles/prism";
import { COLOR_MODES } from "@/src/constants/theme";
import SEODefault from '@/config/seo';
import { MDXComponents } from "@/config/mdx";
import { APP_THEME } from "@/styles/theme";

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Global
        styles={css`
          ${colorMode === COLOR_MODES.LIGHT ? prismLightTheme : prismDarkTheme};
          html {
            min-width: 356px;
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: ${colorMode === COLOR_MODES.LIGHT ? 'white' : '#15161A'};
          }
          ::selection {
            background: ${APP_THEME.primaryColor};
            color: black
          }
        `}
      />
      {children}
    </>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ColorModeProvider options={{
        initialColorMode: COLOR_MODES.LIGHT,
      }}>
        <MDXProvider components={MDXComponents}>
          <GlobalStyle>
            <DefaultSeo {...SEODefault} />
            <Component {...pageProps} />
          </GlobalStyle>
        </MDXProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp

import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/styles/theme';
import GlobalStyles from './src/styles/GlobalStyles';

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <style key="fouc-prevention" dangerouslySetInnerHTML={{ __html:
      'body { opacity: 0; transition: opacity 0.2s ease; }'
    }} />,
    <link
      key="open-sans"
      rel="stylesheet"
      href="/css/open-sans.css"
    />,
  ]);
};

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    {element}
  </ThemeProvider>
);

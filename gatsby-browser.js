import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/styles/theme';
import GlobalStyles from './src/styles/GlobalStyles';

import 'prismjs/themes/prism-tomorrow.css';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    {element}
  </ThemeProvider>
);

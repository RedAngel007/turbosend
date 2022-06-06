import React from 'react';
import { theme } from './Theme/BaseTheme';
import { GlobalStyles } from './Theme/GlobalStyle';
import { Global } from '@emotion/react';
import { MainRoute } from './Routes/MainRoute';

import { ChakraProvider } from '@chakra-ui/react';

function App() {
  console.log(" process.env.JWT_SECRET", process.env.REACT_APP_API_DEV)

  return (
    <ChakraProvider theme={theme}>
      <Global styles={GlobalStyles} />
      <MainRoute />
    </ChakraProvider>
  );
}

export default App;

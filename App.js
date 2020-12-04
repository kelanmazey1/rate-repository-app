import React from 'react';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/react-hooks';

import Main from './src/components/Main.jsx';
import createApolloClient from './src/utils/apolloClient';

const apolloClient = createApolloClient();

const App = () => (
  <NativeRouter>
    <ApolloProvider client={apolloClient}>
      <Main />
    </ApolloProvider>
  </NativeRouter>
);

export default App;

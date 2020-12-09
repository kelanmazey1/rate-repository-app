import React from 'react';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/react-hooks';

import Main from './src/components/Main.jsx';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
export const apolloClient = createApolloClient(authStorage);

const App = () => {
  const [authState, setAuthState] = React.useState(false);

  return (
  <NativeRouter>
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={{
        manage: authStorage,
        authState,
        setAuthState,
      }}>
        <Main />
      </AuthStorageContext.Provider>
    </ApolloProvider>
  </NativeRouter>
  );
};

export default App;

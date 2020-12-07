import React from 'react';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/react-hooks';

import Main from './src/components/Main.jsx';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  const [auth, setAuth] = React.useState(false);

  return (
  <NativeRouter>
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={{
        manage: authStorage,
        auth,
        setAuth,
      }}>
        <Main />
      </AuthStorageContext.Provider>
    </ApolloProvider>
  </NativeRouter>
  );
};

export default App;

import { useContext } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import { AUTHORIZE_USER } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const client = useApolloClient();

  const [authorizeUser, result] = useMutation(AUTHORIZE_USER);
  const signIn = async ({ username, password }) => {
    const authResult = await authorizeUser({
      variables: {
        username,
        password,
      },
    });
    await authStorage.setAuthState(true);
    await authStorage.manage.setAccessToken(authResult.data.authorize.accessToken);
    await client.resetStore();
    return authResult;
  };
  return [signIn, result];
};

export default useSignIn;

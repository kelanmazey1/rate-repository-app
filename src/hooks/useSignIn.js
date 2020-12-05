import { useMutation } from '@apollo/react-hooks';

import { AUTHORIZE_USER } from '../graphql/mutations';

const useSignIn = () => {
  const [authorizeUser, result] = useMutation(AUTHORIZE_USER);
  const signIn = async ({ username, password }) => {
    authorizeUser({
      variables: {
        username,
        password,
      },
    });
  };
  return [signIn, result];
};

export default useSignIn;

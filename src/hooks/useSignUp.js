import { useMutation } from '@apollo/react-hooks';

import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
  const [createUser, result] = useMutation(CREATE_USER);

  const submitNewUser = async ({ username, password }) => {
    const newUser = await createUser({
      variables: {
        username,
        password,
      },
    });
    return newUser;
  };

  return [submitNewUser, result];
};

export default useSignUp;

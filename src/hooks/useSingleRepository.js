import { useQuery } from '@apollo/react-hooks';

import { GET_REPO } from '../graphql/queries';

const useSingleRepository = (id) => {
  const { loading, data, refetch } = useQuery(GET_REPO, {
    variables: {
      id,
    },
  });

  return { repository: data?.repository, loading, refetch };
};

export default useSingleRepository;

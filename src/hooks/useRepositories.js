import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (listOrder) => {
  const { orderDirection, orderBy } = listOrder;
  console.log('list order in the hook ', listOrder);
  const { loading, data, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderDirection,
      orderBy,
    },
  });

  return { repositories: data?.repositories, loading, refetch };
};

export default useRepositories;

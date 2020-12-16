import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (listOrder, searchKeyword) => {
  const { orderDirection, orderBy } = listOrder;
  const { loading, data, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderDirection,
      orderBy,
      searchKeyword,
    },
  });

  return { repositories: data?.repositories, loading, refetch };
};

export default useRepositories;

import { useQuery } from '@apollo/react-hooks';

import { GET_REPO } from '../graphql/queries';

const useSingleRepository = (variables) => {
  const { loading, data, fetchMore } = useQuery(GET_REPO, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  console.log(variables);

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    console.log('------------------------------- new function call --------------------------');
    console.log('canfetchMore', canFetchMore);
    if (!canFetchMore) {
      return;
    }
    console.log('varibales with cursor', {
      after: data.repository.reviews.pageInfo.endCursor,
      ...variables,
    });

    fetchMore({
      query: GET_REPO,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        console.log('fetchMoreResult pageinfo', fetchMoreResult.repository.reviews.pageInfo);
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        };
        return nextResult;
      },
    });
  };

  return { repository: data?.repository, loading, fetchMore: handleFetchMore };
};

export default useSingleRepository;

import { useMutation } from '@apollo/react-hooks';

import { DELETE_REVIEW } from '../graphql/mutations';
import { CURRENT_USER } from '../graphql/queries';

const useDeleteReview = (id) => {
  const [deleteReview, result] = useMutation(DELETE_REVIEW);
  const submitDeleteReview = async () => {
    await deleteReview({
      variables: {
        id,
      },
      refetchQueries: () => [{
        query: CURRENT_USER,
        variables: {
          includeReviews: true,
          first: 8,
        },
      }],
      awaitRefetchQueries: true,
    });
  };

  return [submitDeleteReview, result];
};

export default useDeleteReview;

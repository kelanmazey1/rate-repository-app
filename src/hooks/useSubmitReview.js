import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../graphql/mutations';
import { CURRENT_USER } from '../graphql/queries';

const useSubmitReview = () => {
  const [submitReview, result] = useMutation(CREATE_REVIEW);
  const createReview = async (variables) => {
    const response = await submitReview({
      variables,
      refetchQueries: () => [{
        query: CURRENT_USER,
        variables: {
          includeReviews: true,
          first: 8,
        },
      }],
      awaitRefetchQueries: true,
    });
    // await userContext.setReviews([...userContext.reviews.edges, response]);
    return response;
  };

  return [createReview, result];
};

export default useSubmitReview;

import React from 'react';
import { FlatList } from 'react-native';

import useCurrentUser from '../hooks/useCurrentUser';

import { ReviewItem } from './SingleRepository.jsx';

const UserReviews = () => {
  const { authorizedUser, fetchMore } = useCurrentUser({
    includeReviews: true,
    first: 8,
  });
  const reviewNodes = authorizedUser && authorizedUser.reviews
    ? authorizedUser.reviews.edges.map((edge) => edge.node)
    : [];

  const onEndReach = () => {
    // eslint-disable-next-line no-console
    console.log('end of list');
    fetchMore();
  };

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} inUserReviews={true}/>}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.2}
    />
  );
};

export default UserReviews;

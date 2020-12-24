import React from 'react';
import {
  FlatList,
} from 'react-native';

import useSingleRepository from '../hooks/useSingleRepository';

import Container from './Container.jsx';
import ReviewItem from './ReviewItem.jsx';
import RepositoryItem from './RepositoryItem.jsx';

const RepositoryInfo = (props) => {
  /*
    hacky way as whole list reloads during fetchMore
    causing the top container to re render, so I've added a blank square
  */
  if (props.loading) return <Container type='blankCard'/>;
  return <RepositoryItem item={props.repository} inFocus={true} />;
};

const SingleRepository = (props) => {
  const {
    repository,
    loading,
    fetchMore,
  } = useSingleRepository({ id: props.match.params.id, first: 4 });

  const reviewNodes = repository && repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.3}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} loading={loading} />}
    />
  );
};

export default SingleRepository;

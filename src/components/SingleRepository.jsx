import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { format } from 'date-fns';

import useSingleRepository from '../hooks/useSingleRepository';

import Container from './Container.jsx';
import Text from './Text.jsx';
import RepositoryItem from './RepositoryItem.jsx';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  infoSection: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  ratingContainer: {
    marginHorizontal: 5,
    justifyContent: 'center',
    alignContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#000000',
    borderWidth: 1,
    backgroundColor: '#dbbe00',
  },
  rating: {
    alignSelf: 'center',
  },
  userAndDate: {
    marginLeft: 10,
  },
  textArea: {
    padding: 10,
    justifyContent: 'center',
  },
});

const RepositoryInfo = (props) => {
  /*
    hacky way as whole list reloads during fetchMore
    causing the top container to re render, so I've added a blank square
  */
  if (props.loading) return <Container type='blankCard'/>;
  return <RepositoryItem item={props.repository} inFocus={true} />;
};

const ReviewItem = ({ review }) => {
  const parsedDate = new Date(Date.parse(review.createdAt));

  return (
  <Container type='card' style={{ backgroundColor: '#e0e0e0' }}>
    <View style={[styles.infoSection]}>
      <View style={styles.ratingContainer}>
        <Text fontWeight='bold' style={[styles.rating]}>{review.rating}</Text>
      </View>
      <View style={[styles.userAndDate]}>
      <Text fontWeight='bold'>{review.user.username}</Text>
        <Text>{format(parsedDate, "dd'.'mm'.'yyyy")}</Text>
      </View>
    </View>
    <View style={styles.textArea}>
      <Text>{review.text}</Text>
    </View>
  </Container>
  );
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
    console.log('end of reviews');
    fetchMore();
  };

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.15}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} loading={loading} />}
    />
  );
};

export default SingleRepository;

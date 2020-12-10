import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';

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
  if (props.loading) return <Text>Loading...</Text>;
  return <RepositoryItem item={props.repository} inFocus={true} />;
};

const ReviewItem = ({ review }) => (
  <Container style={{ backgroundColor: '#e0e0e0' }}>
    <View style={[styles.infoSection]}>
      <View style={styles.ratingContainer}>
        <Text fontWeight='bold' style={[styles.rating]}>{review.rating}</Text>
      </View>
      <View style={[styles.userAndDate]}>
      <Text fontWeight='bold'>{review.user.username}</Text>
        <Text>{review.createdAt}</Text>
      </View>
    </View>
    <View style={styles.textArea}>
      <Text>{review.text}</Text>
    </View>
    </Container>
);

const SingleRepository = (props) => {
  const { repository, loading } = useSingleRepository(props.match.params.id);
  const reviewNodes = repository && repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} loading={loading} />}
    />
  );
};

export default SingleRepository;

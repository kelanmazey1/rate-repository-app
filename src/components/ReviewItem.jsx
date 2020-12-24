import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useHistory } from 'react-router-native';

import { format } from 'date-fns';

import Container from './Container.jsx';
import Text from './Text.jsx';
import Button from './SubmitButton.jsx';

import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
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
  reviewButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 5,
    marginHorizontal: 5,
  },
});

const ReviewItem = ({ review, inUserReviews }) => {
  const parsedDate = new Date(Date.parse(review.createdAt));
  const [submitDeleteReview] = useDeleteReview(review.id);
  const history = useHistory();

  const deleteReview = () => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'destructive',
        },
        {
          text: 'Delete',
          onPress: () => {
            submitDeleteReview();
          },
        },
      ],
      { cancelable: false },
    );
  };

  const viewRepository = () => history.push(`/repositories/${review.repositoryId}`);

  return (
    <Container type='card' style={{ backgroundColor: '#e0e0e0' }}>
      <View style={[styles.infoSection]}>
        <View style={styles.ratingContainer}>
          <Text fontWeight='bold' style={[styles.rating]}>{review.rating}</Text>
        </View>
        <View style={[styles.userAndDate]}>
          <Text fontWeight='bold'>{inUserReviews
            ? review.repository.fullName
            : review.user.username }
          </Text>
          <Text>{format(parsedDate, "dd'.'mm'.'yyyy")}</Text>
        </View>
      </View>
      <View style={styles.textArea}>
        <Text>{review.text}</Text>
      </View>
      {inUserReviews && (
      <View style={styles.reviewButtonsContainer}>
        <Button style={{ flex: 1 }} onPress={viewRepository}>
          <Text fontWeight='bold' color='buttonText'>View repository</Text>
        </Button>
        <Button style={{ flex: 1, backgroundColor: 'red' }} onPress={() => deleteReview()}>
          <Text fontWeight='bold' color='buttonText'>Delete review</Text>
        </Button>
      </View>)}
    </Container>
  );
};

export default ReviewItem;

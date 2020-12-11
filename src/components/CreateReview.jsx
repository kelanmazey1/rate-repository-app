import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-native';

import theme from '../theme';

import Button from './SubmitButton.jsx';
import Container from './Container.jsx';
import FormikTextInput from './FormikTextInput.jsx';
import { CREATE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  formInput: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
    marginTop: 8,
  },
  submitButtonText: {
    fontWeight: theme.fontWeights.bold,
    color: 'white',
  },
});

const CreateReview = () => {
  const [submitReview] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  const validationSchema = yup.object().shape({
    ownerName: yup
      .string()
      .required('Repository owner name is required'),
    repositoryName: yup
      .string()
      .required('Repository name is required'),
    rating: yup
      .string()
      .matches(/^[0-9][0-9]?$|^100$/, 'Rating must be between 0 and 100')
      .required('Rating is required'),
    review: yup
      .string()
      .max(200, 'Review is maximum 200 characters'),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues = {{
        ownerName: '',
        repositoryName: '',
        rating: '',
        review: '',
      }}
      onSubmit={async ({
        repositoryName,
        ownerName,
        rating,
        review,
      }) => {
        await submitReview({
          variables: {
            repositoryName,
            ownerName,
            rating: parseInt(rating, 10),
            text: review,
          },
        });
        history.push(`/repositories/${ownerName}.${repositoryName}`);
      }}
    >
      {({ handleSubmit, isValid, dirty }) => (
        <Container style={{ padding: 5 }}>
          <FormikTextInput
            style={styles.formInput}
            name='ownerName'
            placeholder='Repository owner name'
          />
          <FormikTextInput
            style={styles.formInput}
            name='repositoryName'
            placeholder='Repository name'
          />
          <FormikTextInput
            style={styles.formInput}
            name='rating'
            placeholder='Rating between 0 and 100'
          />
          <FormikTextInput
            style={styles.formInput}
            name='review'
            placeholder='Review'
            multiline={true}
          />
          <View style={{ marginTop: 5, opacity: (!dirty || !isValid) ? 0.3 : 0.9 }}>
            <Button style={{ marginTop: 5 }}onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>
                Create review
              </Text>
            </Button>
          </View>
        </Container>
      )}
    </Formik>
  );
};

export default CreateReview;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';

import { Formik } from 'formik';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';
import Text from './Text.jsx';
import Button from './SubmitButton.jsx';
import FormikTextInput from './FormikTextInput.jsx';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backdrop,
    alignContent: 'center',
  },
  signInForm: {
    margin: 20,
    padding: 5,
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  signInFormItem: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  submitButtonText: {
    fontWeight: theme.fontWeights.bold,
    color: 'white',
  },
});

export const SignInContainer = ({ onSubmit }) => {
  const initialFormValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(4, 'Username must be minumum 4 characters')
      .max(8, 'Username must be maximum 8 characters')
      .required('Username required'),
    password: yup
      .string()
      .min(4, 'Password must be minumum 4 characters')
      .max(8, 'Password must be maximum 8 characters')
      .required('Password required'),
  });

  return (
      <Formik
        initialValues={initialFormValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        >
        {({ handleSubmit, isValid, dirty }) => (
          <View style={styles.container}>
            <View style={styles.signInForm}>
              <FormikTextInput
                testID='usernameField'
                style={[styles.signInFormItem]}
                name='username'
                placeholder='username'
              />
              <FormikTextInput
                testID='passwordField'
                style={[styles.signInFormItem]}
                secureTextEntry={true}
                name='password'
                placeholder='password'
              />
              <View style={
                  { opacity: (!dirty || !isValid) ? 0.3 : 0.9 }}>
                <Button
                  testID='submitButton'
                  onPress={handleSubmit}
                  disabled={!dirty || !isValid}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </Button>
              </View>
            </View>
          </View>
        )}
      </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignInContainer
      onSubmit={onSubmit}
    />);
};

export default SignIn;

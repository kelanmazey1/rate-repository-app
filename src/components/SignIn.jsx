import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';

import { Formik } from 'formik';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';
import Text from './Text.jsx';
import Button from './SubmitButton.jsx';
import Container from './Container.jsx';
import FormikTextInput from './FormikTextInput.jsx';

const styles = StyleSheet.create({
  signInForm: {
    margin: 20,
    padding: 5,
    alignContent: 'center',
    justifyContent: 'space-between',
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
      .min(3, 'Username must be minumum 3 characters')
      .max(30, 'Username must be maximum 30 characters')
      .required('Username required'),
    password: yup
      .string()
      .min(5, 'Password must be minumum 5 characters')
      .max(50, 'Password must be maximum 50 characters')
      .required('Password required'),
  });

  return (
      <Formik
        initialValues={initialFormValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        >
        {({ handleSubmit, isValid, dirty }) => (
          <Container type='form'>
            <FormikTextInput
              testID='usernameField'
              style={[styles.signInFormItem]}
              name='username'
              placeholder='Username'
            />
            <FormikTextInput
              testID='passwordField'
              style={[styles.signInFormItem]}
              secureTextEntry={true}
              name='password'
              placeholder='Password'
            />
            <View style={
                { opacity: (!dirty || !isValid) ? 0.3 : 0.9 }}>
              <Button
                testID='submitButton'
                onPress={handleSubmit}
                disabled={!dirty || !isValid}
              >
                <Text fontWeight='bold' color='buttonText'>Submit</Text>
              </Button>
            </View>
          </Container>
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

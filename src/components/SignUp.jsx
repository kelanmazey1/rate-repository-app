import React from 'react';
import { View } from 'react-native';
import { useHistory } from 'react-router-native';

import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput.jsx';
import Container from './Container.jsx';
import Button from './SubmitButton.jsx';
import Text from './Text.jsx';

import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';

const SignUp = () => {
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(1)
      .max(30, 'Username must be between 1 and 30 characters')
      .required('Username required'),
    password: yup
      .string()
      .min(5, 'Password must be 5 or more characters')
      .max(30, 'Password must be 50 or less characters')
      .required('Password required'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Does not match given password')
      .required('Password confirmation required'),
  });

  const initialFormValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  return (
    <Formik
      initialValues = {initialFormValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isValid, dirty }) => (
        <Container type='form'>
          <FormikTextInput
            name='username'
            placeholder='Username'
          />
          <FormikTextInput
            name='password'
            placeholder='Password'
            secureTextEntry={true}
          />
          <FormikTextInput
            name='passwordConfirmation'
            placeholder='Password confirmation'
            secureTextEntry={true}
          />
          <View style={
                { opacity: (!dirty || !isValid) ? 0.3 : 0.9 }}>
            <Button
              onPress={handleSubmit}
              disabled={!dirty || !isValid}
            >
              <Text fontWeight='bold' color='buttonText'>
                Sign Up
              </Text>
            </Button>
          </View>
        </Container>
      )}
    </Formik>
  );
};

export default SignUp;

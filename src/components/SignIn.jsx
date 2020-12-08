import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';

import { Formik } from 'formik';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';
import Text from './Text.jsx';
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
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  submitButton: {
    backgroundColor: '#056dff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 5,
    margin: 5,
  },
  submitButtonText: {
    fontWeight: theme.fontWeights.bold,
    color: 'white',
  },
});

const SignIn = () => {
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
    <Formik
      initialValues={initialFormValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      >
      {({ handleSubmit, isValid, dirty }) => (
        <View style={styles.container}>
          <View style={styles.signInForm}>
            <FormikTextInput
              style={[styles.signInFormItem]}
              name='username'
              placeholder='username'
            />
            <FormikTextInput
              style={[styles.signInFormItem]}
              secureTextEntry={true}
              name='password'
              placeholder='password'
            />
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!dirty || !isValid}
            >
              <View style={[
                styles.submitButton,
                { opacity: (!dirty || !isValid) ? 0.3 : 0.9 },
              ]}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;

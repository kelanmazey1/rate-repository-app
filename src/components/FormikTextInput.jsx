import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput.jsx';
import Text from './Text.jsx';

import theme from '../theme';

const styles = StyleSheet.create({
  inputContainer: {
    alignContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  errorText: {
    marginBottom: 5,
    paddingLeft: 7,
    color: '#d73a4a',
  },

});

const FormikTextInput = ({ name, style, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const showError = meta.touched && meta.error;
  return (
    <View>
      <View style={[styles.inputContainer, style]}>
        <TextInput
          onChangeText={(value) => helpers.setValue(value)}
          onBlur={() => helpers.setTouched(true)}
          value={field.value}
          error={showError}
          {...props}
        />
      </View>
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};

export default FormikTextInput;

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput.jsx';
import Text from './Text.jsx';

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
  },
  errorText: {
    marginTop: 5,
    paddingLeft: 7,
    color: '#d73a4a',
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const showError = meta.touched && meta.error;

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};

export default FormikTextInput;

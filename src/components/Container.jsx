import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    borderRadius: 15,
    borderColor: '#002e47',
    borderWidth: 1,
    backgroundColor: '#d4d4d4',
    marginHorizontal: 5,
    marginTop: 2.5,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.backdrop,
    alignContent: 'center',
  },
  form: {
    margin: 20,
    paddingVertical: 3,
    paddingHorizontal: 5,
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});

const Container = ({ style, type, ...props }) => {
  const containerStyle = [
    styles.conatiner,
    type === 'card' && styles.card,
    type === 'form' && styles.form,
    style,
  ];

  return (
  <View style={containerStyle} {...props}>
    {props.children}
  </View>
  );
};

export default Container;

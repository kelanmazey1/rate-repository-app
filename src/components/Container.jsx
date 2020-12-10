import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    borderRadius: 15,
    borderColor: '#002e47',
    borderWidth: 1,
    backgroundColor: '#d4d4d4',
    marginHorizontal: 5,
    marginTop: 2.5,
  },
});

const Container = ({ style, ...props }) => (
  <View style={[styles.container, style]} {...props}>
    {props.children}
  </View>
);

export default Container;

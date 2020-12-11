import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#0751e6',
    padding: 10,
    margin: 5,
  },
});

const Button = ({ style, ...props }) => {
  const buttonStyle = [
    styles.button,
    style,
  ];

  return (
  <TouchableOpacity style={buttonStyle} {...props}>
    {props.children}
  </TouchableOpacity>
  );
};

export default Button;

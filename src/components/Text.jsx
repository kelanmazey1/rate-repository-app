import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextButton: {
    color: theme.colors.buttonText,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorTextAppBar: {
    color: theme.colors.appBarText,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeHeading: {
    fontSize: theme.fontSizes.heading,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});
/* eslint-disable-next-line */
const Text = ({ color, backgroundColor, fontSize, fontWeight, style, ...props}) => {
  const textStyle = [
    styles.text,
    color === 'buttonText' && styles.colorTextButton,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'appBarText' && styles.colorTextAppBar,
    color === 'primary' && styles.colorPrimary,
    fontSize === 'heading' && styles.fontSizeHeading,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;

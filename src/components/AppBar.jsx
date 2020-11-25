import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

import Text from './Text.jsx';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingTop: Constants.statusBarHeight + 5,
    paddingHorizontal: 10,
    paddingBottom: 15,
    marginBottom: 10,
    backgroundColor: theme.colors.appBar,
  },
});

const AppBarTab = (props) => {
  return (
      <View>
        <Text fontSize='heading' fontWeight='bold'>{props.tab.title}</Text>
      </View>
  );
};

const AppBar = (props) => (
  <View style={styles.container}>
    {props.tabs.map((tab) => (
      tab.link
        ? (
          <Link key={tab.title} to={tab.link}>
            <AppBarTab tab={tab} />
          </Link>)
        : <AppBarTab key={tab.title} tab={tab} />
    ))}
  </View>
);

export default AppBar;

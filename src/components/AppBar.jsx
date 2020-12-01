import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
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
    backgroundColor: theme.colors.appBar,
  },
  scrollView: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  tab: {
    marginHorizontal: 10,
  },
});

const AppBarTab = (props) => (
  <View style={styles.tab}>
    <Text fontSize='heading' fontWeight='bold'>{props.tab.title}</Text>
  </View>
);

const AppBar = (props) => (
  <View style={styles.container}>
    <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        {props.tabs.map((tab) => (
          <Link key={tab.title} to={tab.link}>
            <AppBarTab tab={tab} />
          </Link>
        ))}
    </ScrollView>
  </View>
);

export default AppBar;

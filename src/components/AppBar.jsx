import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import { useApolloClient } from '@apollo/react-hooks';
import Constants from 'expo-constants';

import AuthStorageContext from '../contexts/AuthStorageContext';
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

const AppBar = () => {
  const authStorage = useContext(AuthStorageContext);
  const client = useApolloClient();

  const tabs = [
    {
      title: 'Repositories',
      link: '/',
    },
    // token should always be in context but checking with query to be sure
    authStorage.auth
      ? {
        title: 'Sign Out',
        link: '/',
        onPress: async () => {
          await authStorage.manage.removeAccessToken();
          await client.resetStore();
          await authStorage.setAuth(false);
        },
      }
      : {
        title: 'Sign In',
        link: '/signin',
      },

  ];
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
          {tabs.map((tab) => (
            <Link
              key={tab.title}
              to={tab.link}
              onPress={
                tab.onPress
                  ? tab.onPress
                  : undefined
              }
            >
              <AppBarTab tab={tab} />
            </Link>
          ))}
      </ScrollView>
    </View>
  );
};

export default AppBar;

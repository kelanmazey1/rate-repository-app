import React, { useContext, useState, useEffect } from 'react';
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
    justifyContent: 'space-evenly',
    alignContent: 'center',
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight + 5,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: theme.colors.appBar,
  },
  scrollView: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  tab: {
    marginHorizontal: 5,
  },
});

const AppBarTab = (props) => (
  <View style={styles.tab}>
    <Text fontSize='heading' fontWeight='bold'>{props.tab.title}</Text>
  </View>
);

const AppBar = () => {
  const [appBarTabs, setAppBarTabs] = useState([
    {
      title: 'Repositories',
      link: '/',
    },
  ]);
  const authStorage = useContext(AuthStorageContext);
  const client = useApolloClient();

  const signedInTabs = [
    {
      title: 'Create Review',
      link: '/createreview',
    },
    {
      title: 'Sign Out',
      link: '/',
      onPress: async () => {
        await authStorage.manage.removeAccessToken();
        await client.resetStore();
        await authStorage.setAuthState(false);
      },
    },
  ];

  const signedOutTabs = [
    {
      title: 'Sign In',
      link: '/signin',
    },
    {
      title: 'Sign Up',
      link: '/signup',
    },
  ];

  useEffect(() => {
    setAppBarTabs(
      appBarTabs
        .filter((tab) => tab.title === 'Repositories')
        .concat(authStorage.authState ? signedInTabs : signedOutTabs),
    );
  }, [authStorage.authState]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
          {appBarTabs.map((tab) => (
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

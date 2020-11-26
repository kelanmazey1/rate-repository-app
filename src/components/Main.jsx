import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import AppBar from './AppBar.jsx';
import SignIn from './SignIn.jsx';
import RepositoryList from './RepositoryList.jsx';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const tabs = [
  {
    title: 'Repositories',
    link: '/',
  },
  {
    title: 'Sign In',
    link: '/signin',
  },

];

const Main = () => (
  <View style={styles.container}>
    <AppBar tabs={tabs} />
    <Switch>
      <Route exact path="/">
        <RepositoryList />
      </Route>
      <Route exact path="/signin" component={SignIn} />
      <Redirect to="/" />
    </Switch>
  </View>
);

export default Main;

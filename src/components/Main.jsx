import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-native';

import AppBar from './AppBar.jsx';
import SignIn from './SignIn.jsx';
import RepositoryList from './RepositoryList.jsx';
import SingleRepository from './SingleRepository.jsx';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => (
  <View style={styles.container}>
    <AppBar />
    <Switch>
      <Route exact path="/">
        <RepositoryList />
      </Route>
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/repositories/:id" render={(props) => <SingleRepository {...props} />} />
      <Redirect to="/" />
    </Switch>
  </View>
);

export default Main;

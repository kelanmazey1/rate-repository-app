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
import CreateReview from './CreateReview.jsx';
import UserReviews from './UserReviews.jsx';
import SignUp from './SignUp.jsx';

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
        <Route exact path="/" component={RepositoryList} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/createreview" component={CreateReview} />
        <Route exact path="/myreviews" component={UserReviews} />
        <Route exact path="/repositories/:id" render={(props) => <SingleRepository {...props} />} />
        <Redirect to="/" />
      </Switch>
    </View>
);

export default Main;

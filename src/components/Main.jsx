import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  Route,
  Switch,
  Redirect,
  useParams,
} from 'react-router-native';
import { useQuery } from '@apollo/client';

import AppBar from './AppBar.jsx';
import SignIn from './SignIn.jsx';
import RepositoryList from './RepositoryList.jsx';
import RepositoryItem from './RepositoryItem.jsx';

import { GET_REPO } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});
/* This is only in this file because moving it out breaks it
 may fix after completed other exercises
*/
const RepositoryItemInFocus = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPO, {
    variables: {
      id,
    },
  });
  if (loading) return <Text>Loading...</Text>;
  // eslint-disable-next-line no-console
  if (error) { console.error(error); }
  return <RepositoryItem item={data.repository} inFocus={true} />;
};

const Main = () => (
  <View style={styles.container}>
    <AppBar />
    <Switch>
      <Route exact path="/">
        <RepositoryList />
      </Route>
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/repositories/:id">
        <RepositoryItemInFocus />
      </Route>
      <Redirect to="/" />
    </Switch>
  </View>
);

export default Main;

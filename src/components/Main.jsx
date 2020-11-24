import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';

import Text from './Text.jsx';

import RepositoryList from './RepositoryList.jsx';
import { FlexboxExample } from '../Examples';

const styles = StyleSheet.create({
  constainer: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => (
  <View style={styles.constainer}>
    <FlexboxExample />
      <Text fontWeight='bold' fontSize='subheading'>Rate Repository Application</Text>
    <RepositoryList />
  </View>
);

export default Main;

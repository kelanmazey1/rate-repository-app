import React from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  Alert,
  View,
  StyleSheet,
} from 'react-native';

export const HelloWorld = (props) => <Text>{props.children}</Text>;

export const TouchableText = (props) => (
  <TouchableWithoutFeedback
    onPress={() => Alert.alert('the text was pressed!')}
  >
    <Text>You can press this text</Text>
  </TouchableWithoutFeedback>
);

export const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
  },
  flexItemA: {
    flexGrow: 0,
    backgroundColor: 'green',
  },
  flexItemB: {
    flexGrow: 1,
    backgroundColor: 'blue',
  },
});

export const FlexboxExample = () => (
  <View style={styles.flexContainer}>
    <View style={styles.flexItemA}>
      <Text>Flex Item A</Text>
    </View>
    <View style={styles.flexItemB}>
      <Text>Flex Item B</Text>
    </View>
  </View>
);

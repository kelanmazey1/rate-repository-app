import React from 'react';

import { View, Text } from 'react-native';

const RepositoryItem = ({ item }) => (
    <View>
      {
        Object.keys(item).map((objKey) => (
          <Text key={objKey}>{objKey}: {item[objKey]}</Text>
        ))
      }
    </View>
);

export default RepositoryItem;

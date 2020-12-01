import React from 'react';

import {
  View,
  StyleSheet,
  Image,
} from 'react-native';

import Text from './Text.jsx';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    borderRadius: 15,
    borderColor: '#002e47',
    borderWidth: 2,
    backgroundColor: '#d4d4d4',
    marginHorizontal: 5,
  },
  cardRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    flex: 1,
    height: 50,
    width: 50,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  titleAndDescription: {
    flex: 5,
    justifyContent: 'flex-start',
    marginHorizontal: 10,
  },
  languageSign: {
    backgroundColor: '#dbbe00',
    borderRadius: 5,
    textAlign: 'center',
    alignSelf: 'flex-start',
    marginTop: 10,
    padding: 4,
  },
});

const addKAbbreviation = (value) => {
  if (value >= 1000) {
    const returnValue = Math.round(((value / 1000) + Number.EPSILON) * 10) / 10;
    return `${returnValue}k`;
  }
  return value;
};

const StatsDisplay = ({ value, text }) => (
  <View style={{ alignItems: 'center' }}>
    <Text fontWeight='bold'>
      {addKAbbreviation(value)}
    </Text>
    <Text>
      {text}
    </Text>
  </View>
);

const RepositoryItem = ({ item }) => {
  const {
    fullName,
    ownerAvatarUrl,
    description,
  } = item;
  return (
    <View style={styles.container}>
      <View style={styles.cardRow}>
        <Image source={{ uri: ownerAvatarUrl }} style={styles.image} />
        <View style={styles.titleAndDescription}>
          <Text fontSize='subheading' fontWeight='bold'>
              {fullName}
          </Text>
          <Text fontSize='subheading'>
              {description}
          </Text>
            <Text fontSize='subheading' fontWeight='bold' style={styles.languageSign}>
                {item.language}
            </Text>
        </View>
      </View>
      <View style={[
        styles.cardRow,
        {
          justifyContent: 'space-evenly',
        }]}>
        <StatsDisplay value={item.stargazersCount} text='Stars' />
        <StatsDisplay value={item.forksCount} text='Forks' />
        <StatsDisplay value={item.ratingAverage} text='Rating' />
        <StatsDisplay value={item.reviewCount} text='Reviews' />
      </View>
    </View>
  );
};

export default RepositoryItem;

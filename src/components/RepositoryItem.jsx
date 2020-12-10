import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useHistory } from 'react-router-native';
import * as Linking from 'expo-linking';

import Text from './Text.jsx';
import Container from './Container.jsx';

const styles = StyleSheet.create({
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
  button: {
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#0751e6',
    padding: 10,
    marginHorizontal: 5,
    flex: 1,
  },
});

export const addKAbbreviation = (value) => {
  if (value >= 1000) {
    const returnValue = Math.round(((value / 1000) + Number.EPSILON) * 10) / 10;
    return `${returnValue}k`;
  }
  return value;
};

const StatsDisplay = ({ value, text, testID }) => (
  <View style={{ alignItems: 'center' }}>
    <Text fontWeight='bold' testID={testID}>
      {addKAbbreviation(value)}
    </Text>
    <Text>
      {text}
    </Text>
  </View>
);

const RepositoryItem = ({ item, inFocus }) => {
  const history = useHistory();
  const {
    fullName,
    ownerAvatarUrl,
    description,
    id,
    url,
  } = item;

  // const goToUrl = () => console.log('the button was pressed');

  return (
    <Container>
      <TouchableOpacity onPress={() => history.push(`/repositories/${id}`)}>
        <View>
          <View style={styles.cardRow}>
            <Image testID='repoImage'source={{ uri: ownerAvatarUrl }} style={styles.image} />
            <View style={styles.titleAndDescription}>
              <Text testID='repoName' fontSize='subheading' fontWeight='bold'>
                  {fullName}
              </Text>
              <Text testID='repoDescription' fontSize='subheading'>
                  {description}
              </Text>
                <Text testID='repoLanguage' fontSize='subheading' fontWeight='bold' style={styles.languageSign}>
                    {item.language}
                </Text>
            </View>
          </View>
          <View style={[
            styles.cardRow,
            {
              justifyContent: 'space-evenly',
            }]}>
            <StatsDisplay testID='stargazers' value={item.stargazersCount} text='Stars' />
            <StatsDisplay testID='forks' value={item.forksCount} text='Forks' />
            <StatsDisplay testID='rating' value={item.ratingAverage} text='Rating' />
            <StatsDisplay testID='review' value={item.reviewCount} text='Reviews' />
          </View>
        </View>
      </TouchableOpacity>
    {
      inFocus && (
        <View style={[styles.cardRow, { justifyContent: 'center' }]}>
          <TouchableOpacity style={styles.button} title="Open In Github" onPress={() => Linking.openURL(url)}>
            <Text color='primary' fontWeight='bold'>Open in GitHub</Text>
          </TouchableOpacity>
        </View>
      )
    }
    </Container>
  );
};

export default RepositoryItem;

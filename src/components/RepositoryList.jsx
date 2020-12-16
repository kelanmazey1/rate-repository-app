import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem.jsx';
import SortingMenu from './SortingMenu.jsx';

import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  listContainer: {
    margin: 1,
  },
  searchBar: {
    marginHorizontal: 5,
    marginTop: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ListHeaderComponent = ({ searchQuery, setSearchQuery, ...props }) => (
  <>
    <Searchbar
      placeholder='Search'
      onChangeText={(query) => setSearchQuery(query)}
      value={searchQuery}
      style={styles.searchBar}
    />
    <SortingMenu {...props} />
  </>
);

export const RepositoryListContainer = ({ repositories, onEndReach, ...props }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
      <FlatList
        data={repositoryNodes}
        renderItem={({ item }) => (
          <RepositoryItem item={item} />
        )}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={<ListHeaderComponent {...props} />}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
  );
};

const RepositoryList = () => {
  const [listOrder, setListOrder] = useState({
    orderDirection: 'ASC',
    orderBy: 'CREATED_AT',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 400);

  const { repositories } = useRepositories({
    listOrder,
    debouncedQuery,
  });
  
  const onEndReach = () => {
    console.log('The end is reached');
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      setSearchQuery={setSearchQuery}
      searchQuery={searchQuery}
      setListOrder={setListOrder}
      listOrder={listOrder}
    />);
};

export default RepositoryList;

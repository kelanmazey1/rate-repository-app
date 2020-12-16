import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

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
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, setListOrder, listOrder }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        // other props
        ListHeaderComponent={<SortingMenu listOder={listOrder} setListOrder={setListOrder}/>}
        renderItem={({ item }) => (
          <RepositoryItem item={item} />
        )}
      />
  );
};

const RepositoryList = () => {
  const [listOrder, setListOrder] = useState({
    orderDirection: 'ASC',
    orderBy: 'CREATED_AT',
  });
  const { repositories } = useRepositories(listOrder);

  return (
    <RepositoryListContainer
      repositories={repositories}
      setListOrder={setListOrder}
      listOrder={listOrder}
    />);
};

export default RepositoryList;

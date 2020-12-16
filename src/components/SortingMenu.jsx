import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import {
  Menu,
  Portal,
  Modal,
  Button,
} from 'react-native-paper';

const modalStyle = {
  justifyContent: 'center',
  alignContent: 'center',
  alignSelf: 'center',
  backgroundColor: 'white',
  width: Dimensions.get('window').width * 0.7,
  height: Dimensions.get('window').height * 0.4,
};
const menuItemStyle = {
  flex: 1,
};

const SortingMenu = ({ setListOrder }) => {
  const [visible, setVisible] = useState(false);
  const [buttonText, setButtonText] = useState('Latest Repositories');

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onPress = (typeSelected) => {
    if (typeSelected === 'latestRepositories') {
      setListOrder({ orderDirection: 'DESC', orderBy: 'CREATED_AT' });
      setButtonText('Latest Repositories');
    }
    if (typeSelected === 'highestRated') {
      setListOrder({ orderDirection: 'DESC', orderBy: 'RATING_AVERAGE' });
      setButtonText('Highest rated repositories');
    }
    if (typeSelected === 'lowestRated') {
      setListOrder({ orderDirection: 'ASC', orderBy: 'RATING_AVERAGE' });
      setButtonText('Lowest rate repositories');
    }
  };

  return (
  <Menu
    visible={visible}
    onDismiss={closeMenu}
    anchor={
      <Button
        style={{
          justifySelf: 'center',
          alignSelf: 'center',
        }}
        icon='sort'
        mode='text'
        onPress={openMenu}
        labelStyle={{ color: 'black' }}
      >{buttonText}</Button>}
  >
    <Portal>
      <Modal onDismiss={closeMenu} contentContainerStyle={modalStyle} visible={visible}>
        <Menu.Item style={menuItemStyle} onPress={() => onPress('latestRepositories')} title='Latest repositories' />
        <Menu.Item style={menuItemStyle} onPress={() => onPress('highestRated')} title='Highest rated repositories' />
        <Menu.Item style={menuItemStyle} onPress={() => onPress('lowestRated')} title='Lowest rate repositories' />
      </Modal>
    </Portal>
  </Menu>
  );
};

export default SortingMenu;

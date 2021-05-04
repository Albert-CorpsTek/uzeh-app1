import React from 'react';
import {View, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import {colors} from 'src/theme';

const MenuButton = ({onPress}) => {
  return (
    <View style={styles.menuButtonContainer}>
      <IconButton
        icon="menu"
        size={28}
        onPress={onPress}
        color={colors.black}
        style={styles.menuButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuButtonContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: colors.white,
    marginLeft: '5.5%',
    marginTop: '5.5%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  menuButton: {
    margin: 0,
  },
});

export default MenuButton;

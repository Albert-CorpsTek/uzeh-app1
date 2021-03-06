import React, {useState, useImperativeHandle} from 'react';
import {TouchableOpacity, Image, StyleSheet, Text, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {colors} from 'src/theme';

const Option3 = props => {
  const {onPress, isSelected, value, urlIcon, name} = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <Image
          style={[styles.icon, isSelected ? styles.active : styles.inactive]}
          source={{
            uri: urlIcon,
          }}
        />
        {isSelected && (
          <FontAwesomeIcon
            icon={faCheck}
            style={styles.selectedIcon}
            color={colors.green}
            size={32}
          />
        )}
      </View>
      <Text style={styles.iconText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 70,
    height: 70,
    marginVertical: 10,
    marginLeft: 3,
    borderRadius: 50,
  },
  active: {
    opacity: 0.7,
    borderWidth: 3,
    borderColor: colors.green,
  },
  inactive: {
    borderWidth: 3,
    borderColor: 'transparent',
  },
  iconText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    width: 75,
  },
  selectedIcon: {
    position: 'absolute',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Option3;

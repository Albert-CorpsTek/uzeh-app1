import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colors} from 'src/theme';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10
  }
});

const StyledButton = ({icon, onPress, color}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor: color, ...styles.container }}>
      <View>
        <FontAwesomeIcon icon={icon} size={32} color={colors.white} />
      </View>
    </TouchableOpacity>
  );
}

export default StyledButton;
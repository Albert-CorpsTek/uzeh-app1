import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { colors } from 'src/theme';

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'flex-start',
    padding: '2%'
  }
});

const ToggleButton = ({
  status,
  onPress,
  icon,
  value,
  size,
  color
}) => {
  return (
    <TouchableOpacity 
      onPress={() => onPress(value)} 
      style={[
        styles.buttonContainer,
        { 
          backgroundColor: status == 'checked' ? colors.lightOrange : colors.lightGreen 
        }
      ]}
    >
      <Image 
        source={icon} 
        style={{
          width: size,
          height: size,
          tintColor: color
        }}
      />
    </TouchableOpacity>
  )
};

export default ToggleButton;
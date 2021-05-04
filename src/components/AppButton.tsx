import React from 'react';
import {
  Text, ActivityIndicator, Button,
} from 'react-native-paper';
import { colors } from 'src/theme';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  appButtonContainer: {
    alignItems: 'center', 
    paddingVertical: 19,
    paddingHorizontal: 30, 
    borderRadius: 4,
  }
});

const AppButton = ({
  title,
  onPress,
  disabled = false,
  fullWidth,
  backgroundColor,
  style,
  uppercase = false,
  loading
}) => (
  <TouchableOpacity 
    style={[
      styles.appButtonContainer,
      {
        backgroundColor: backgroundColor,
        alignSelf: fullWidth ? 'stretch' : 'center',
        opacity: disabled && !loading ? 0.2 : undefined
      },
      style
    ]} 
    onPress={onPress} 
    disabled={disabled || loading}>
    {loading ? <ActivityIndicator color={disabled ? colors.textDisabled : colors.white} /> : <Text 
      style={{ 
        textTransform: uppercase ? 'uppercase' : 'none', 
        color:  disabled ? colors.textDisabled : colors.white 
      }}>
      {title}
    </Text>}
  </TouchableOpacity>
);

export default AppButton;
import React from 'react';
import { View } from 'react-native';

const ToggleSwitch = (props) => {
  return (
    <View 
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        ...props.style
      }}
    >
      <View 
        style={{
          width: '50%', 
          height: '90%', 
          ...props.switchStyle
        }}
      ></View>
    </View>
  );
};

export default ToggleSwitch;
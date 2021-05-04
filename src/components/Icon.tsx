import React from 'react';
import { Image } from 'react-native';

const Icon = ({
  icon,
  color,
  size,
  style = {}
}) => (
  <Image 
    source={icon} 
    style={{
      ...style,
      tintColor: color, 
      width: size,
      height: size
    }}
  />
);

export default Icon;
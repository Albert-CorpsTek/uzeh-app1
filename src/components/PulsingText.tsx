import React, { useRef, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';

const PulsingText = ({ children }) => {
  const fontSizeAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(
        fontSizeAnim,
        {
          toValue: 20,
          duration: 3000
        }
      )
    ).start();
  }, [fontSizeAnim]);

  return (
    <View>
      <Text 
        style={{
          fontSize: 22,
          position: 'absolute',
          textAlign: 'center',
          color: '#FF0000',
          textShadowColor: '#FFFFFFFF',
          textShadowOffset: {
            width: -1,
            height: -1
          },
          textShadowRadius: 1,
          fontWeight: 'bold'
        }}
      >
        {children}
      </Text>
      <Text
        style={{
          fontSize: 22,
          textAlign: 'center',
          color: '#FF0000',
          textShadowColor: '#FFFFFFFF',
          textShadowOffset: {
            width: 1,
            height: -1
          },
          textShadowRadius: 1,
          fontWeight: 'bold'
        }}
      >
        {children}
      </Text>
      <Text 
        style={{
          fontSize: 22,
          position: 'absolute',
          textAlign: 'center',
          color: '#FF0000',
          textShadowColor: '#FFFFFFFF',
          textShadowOffset: {
            width: -1,
            height: 1
          },
          textShadowRadius: 1,
          fontWeight: 'bold'
        }}
      >
        {children}
      </Text>
      <Text 
        style={{
          fontSize: 22,
          position: 'absolute',
          textAlign: 'center',
          color: '#FF0000',
          textShadowColor: '#FFFFFFFF',
          textShadowOffset: {
            width: 1,
            height: 1
          },
          textShadowRadius: 1,
          fontWeight: 'bold'
        }}
      >
        {children}
      </Text>
    </View>
  );
};

export default PulsingText;
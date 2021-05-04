import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import { colors } from '../theme';
import { View } from 'react-native';

const GlobalStyleBase = styled(LinearGradient)`
  height: 100%;
`;

/*
const GlobalStyle: React.FC = ({ children }) => (
  <GlobalStyleBase colors={colors.gradient}>
    {children}
  </GlobalStyleBase>
);
*/

const GlobalStyle: React.FC = ({ children }) => (
  <View 
    style={{ 
      height: '100%', 
      backgroundColor: colors.darkGreen, 
      justifyContent: 'center'
    }}>
    {children}
  </View>
);


export default GlobalStyle;

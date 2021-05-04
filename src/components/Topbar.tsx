import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { colors } from 'src/theme';

const Topbar = ({ title }) => {
  const navigation = useNavigation();
  return (
    <Appbar.Header 
      style={{
        backgroundColor: colors.darkGreen
      }}
    >
      <Appbar.Content 
        title={title.toUpperCase()} 
        titleStyle={{
          fontSize: 13
        }} 
        style={{
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          justifyContent: 'center', 
          alignItems: 'center'
        }}
      />
      <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.white} />
    </Appbar.Header>
  )
};

export default Topbar;
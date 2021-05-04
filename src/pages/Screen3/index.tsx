import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from 'pages/Profile';
import EditProfile from 'pages/EditProfile';
import ChangePassword from 'pages/ChangePassword';
import screenOptions from 'pages/screenOptions';

const { Navigator, Screen } = createStackNavigator();

const Screen3 = () => {
  return (
    <Navigator {...{ screenOptions }}>
      <Screen name="Profile" component={Profile} />
      <Screen name="EditProfile" component={EditProfile} />
      <Screen name="ChangePassword" component={ChangePassword} />
    </Navigator>
  );
};

export default Screen3;
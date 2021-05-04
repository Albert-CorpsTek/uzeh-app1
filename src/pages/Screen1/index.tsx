import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CollectorHome from 'pages/CollectorHome';
import CollectionDetails from 'pages/CollectionDetails';
import GlobalContext from 'src/context';
import { useStateLinkUnmounted } from '@hookstate/core';
import Home from 'pages/Home';
import Request from 'pages/Request';
import screenOptions from 'pages/screenOptions';
import Metrics from 'pages/Metrics';
import ChangePassword from 'pages/ChangePassword';
import Services from 'pages/Services';

const { Navigator, Screen } = createStackNavigator();

const Screen1 = () => {
  const authState = useStateLinkUnmounted(GlobalContext.auth.authStateRef);

  return (
    <Navigator {...{ screenOptions }}>
      {authState.value.user.user_type === 5 ? <Screen name="Home" component={Home} /> : <Screen name="Home" component={CollectorHome} />}
      <Screen name="CollectionDetails" component={CollectionDetails} />
      <Screen name="Metrics" component={Metrics} />
      <Screen name="ChangePassword" component={ChangePassword} />
    </Navigator>
  );
};

export default Screen1;
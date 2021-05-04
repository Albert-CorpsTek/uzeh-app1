import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CollectionDetails from 'pages/CollectionDetails';
import Services from 'pages/Services';
import screenOptions from 'pages/screenOptions';
import CollectionOrdersResponses from 'pages/CollectionOrdersResponses';
import GlobalContext from 'src/context';
import { useStateLinkUnmounted } from '@hookstate/core';
import CollectionOrderResponses from 'pages/CollectionOrderResponses';
import Collector from 'pages/Collector';

const { Navigator, Screen } = createStackNavigator();

const Screen2 = () => {
  const authState = useStateLinkUnmounted(GlobalContext.auth.authStateRef);

  const getInitialRouteName = () => {
    var initialRouteName;
    switch (authState.value.user.user_type) {
      case 4:
        initialRouteName = "CollectionOrdersResponses";
        break;
      case 5:
        initialRouteName = "Services";
        break;
      case 6:
        initialRouteName = "CollectionOrdersResponses";
        break;
    }
    return initialRouteName;
  };

  return (
    <Navigator {...{ screenOptions }} initialRouteName={getInitialRouteName()}>
      <Screen name="Services" component={Services} />
      <Screen name="CollectionOrdersResponses" component={CollectionOrdersResponses} />
      <Screen name="CollectionDetails" component={CollectionDetails} />
      <Screen name="CollectionOrderResponses" component={CollectionOrderResponses} />
      <Screen name="Collector" component={Collector} />
    </Navigator>
  );
};

export default Screen2;
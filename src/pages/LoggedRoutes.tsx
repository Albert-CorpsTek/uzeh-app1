import React, { useState } from 'react';
import Appbar from 'components/Appbar';
import Home from 'pages/Home';
import screenOptions from './screenOptions';
import Profile from './Profile';
import LoggedStackNavigator from './LoggedStackNavigator';
import Budget from './Budget';
import Details from './Details';
import Evaluate from './Evaluate';
import Recover from './Recover';
import Request from './Request';
import Searching from './Searching';
import Services from './Services';
import Metrics from './Metrics';
import Informations from './Informations';
import EditProfile from './EditProfile';
import BidDetails from './BidDetails';
import InOrder from './InOrder';
import Denunciation from './Denunciation';
import VucoVuco from './VucoVuco';
import VVAddEdit from './VVAddEdit';
import VVInfo from './VVInfo';
import VVSearch from './VVSearch';
import Materials from './Materials';
import UserTerms from './UserTerms';
import AcceptOrDeclineNegotiationBudget from './AcceptOrDeclineNegotiationBudget';
import OpenBudgetDetails from './OpenBudgetDetails';
import GlobalContext from 'src/context';
import { useStateLink, useStateLinkUnmounted } from '@hookstate/core';
import ColetorHome from 'pages/ColetorHome';
import RecicladorHome from 'pages/RecicladorHome';
import CollectionDetails from 'pages/CollectionDetails';
import Plans from './Plans';
import Drawer from 'components/Drawer';
import MenuButton from 'components/MenuButton';
import { View, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import CollectionOrderResponses from './CollectionOrderResponses';
import Topbar from 'components/Topbar';
import CollectionOrdersResponses from './CollectionOrdersResponses';
import Collector from 'pages/Collector';
import ChangePassword from 'pages/ChangePassword';
import CollectorHome from './CollectorHome';
import { useRoute } from '@react-navigation/native';
import RecyclerHome from 'pages/RecyclerHome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from 'components/TabBar';

import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import Icon from 'react-native-vector-icons/FontAwesome';

import homeIcon from 'img/menu/home.png';
import recycleIcon from 'img/menu/recycle.png';
import userIcon from 'img/menu/user.png';
import CustomIcon from 'components/CustomIcon';
import { IconButton } from 'react-native-paper';
import Icon from 'components/Icon';

const styles = StyleSheet.create({
  iconContainer: {
    padding: 0,
    backgroundColor: '#FCFC09'
  }
});

//const { Navigator, Screen } = LoggedStackNavigator;
const { Navigator, Screen } = createBottomTabNavigator();

const {
  login: { userTypeRef },
  map: {
    openDrawerRef
  }
} = GlobalContext;

const LoggedRoutes = () => {
  const userType = useStateLink(userTypeRef);
  const authState = useStateLinkUnmounted(GlobalContext.auth.authStateRef);
  const [open, setOpen] = useState(false);
  const openDrawer = useStateLink(openDrawerRef);
  const route = useRoute();

  /*
  return (
    <>
      <Appbar>
        <Navigator 
          {...{ screenOptions }} initialRouteName={route.params.screenPostLogin}  
          tabBar={props => <TabBar {...props} />} 
        >
        <Navigator {...{ screenOptions }} initialRouteName={route.params.screenPostLogin}>
          {authState.value.user.user_type == 4 && (
            <Screen name="Home" component={CollectorHome} />
          )}
          {authState.value.user.user_type == 5 && (
            <Screen name="Home" component={Home} />
          )}
          {authState.value.user.user_type == 6 && (
            <Screen name="Home" component={RecicladorHome} />
          )}
          <Screen name="Profile" component={Profile} />
          <Screen name="EditProfile" component={EditProfile} />
          <Screen name="Budget" component={Budget} />
          <Screen name="Details" component={Details} />
          <Screen name="Evaluate" component={Evaluate} />
          <Screen name="Recover" component={Recover} />
          <Screen name="Request" component={Request} />
          <Screen name="Searching" component={Searching} />
          <Screen name="Services" component={Services} />
          <Screen name="BidDetails" component={BidDetails} />
          <Screen name="InOrder" component={InOrder} />
          <Screen name="Materials" component={Materials} />
          <Screen name="UserTerms" component={UserTerms} />
          <Screen name="Metrics" component={Metrics} />
          <Screen name="Informations" component={Informations} />
          <Screen name="Denunciation" component={Denunciation} />
          <Screen name="VucoVuco" component={VucoVuco} />
          <Screen name="VVAddEdit" component={VVAddEdit} />
          <Screen name="VVInfo" component={VVInfo} />
          <Screen name="VVSearch" component={VVSearch} />
          <Screen
            name="AcceptOrDeclineNegotiationBudget"
            component={AcceptOrDeclineNegotiationBudget}
          />
          <Screen name="OpenBudgetDetails" component={OpenBudgetDetails} />
          <Screen name="CollectionDetails" component={CollectionDetails} />
          <Screen name="Plans" component={Plans} /> 
          <Screen name="CollectionOrderResponses" component={CollectionOrderResponses} />
          <Screen name="CollectionOrdersResponses" component={CollectionOrdersResponses} />
          <Screen name="Collector" component={Collector} />
          <Screen name="ChangePassword" component={ChangePassword} />
        </Navigator>
      </Appbar>
      {open && <TouchableWithoutFeedback 
        onPress={() => setOpen(false)}
      >
        <View 
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
          }} 
        />
      </TouchableWithoutFeedback>}
      <Drawer 
        open={openDrawer.value} 
        onClose={() => openDrawer.set(false)}
      />
    </>
  );
  */

  return (
    <>
      <Navigator 
        initialRouteName={"Screen1"}  
        tabBar={props => <TabBar {...props} />} 
      >
        <Screen 
          name="Screen1" 
          component={Screen1} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon icon={homeIcon} color={color} size={size} />
            ), 
            tabBarLabel: "Início"
          }}
        />
        <Screen 
          name="Screen2" 
          component={Screen2} 
          options={{
            tabBarLabel: authState.value.user?.user_type === 4 ? "Respostas" : "Coletas", 
            tabBarIcon: ({ color, size }) => (
              <Icon icon={recycleIcon} color={color} size={size} />
            ),
          }}
        />
        {/*<Screen 
          name="Screen3" 
          component={Screen3} 
          options={{
            tabBarLabel: "Perfil", 
            tabBarIcon: ({ color, size }) => (
              <Icon icon={userIcon} color={color} size={size} />
            ),
          }}
        />*/}
      </Navigator>
      <Drawer 
        open={openDrawer.value} 
        onClose={() => openDrawer.set(false)}
      />
    </>
  );
};

export default LoggedRoutes;

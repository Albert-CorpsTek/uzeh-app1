import React, { useState, useEffect } from 'react';
import CollectorMap from 'pages/CollectorMap';
import RecyclerHome from 'pages/RecyclerHome';
import SwitchButton from 'components/SwitchButton.js';
import { Appbar, Searchbar } from 'react-native-paper';
import { StyleSheet, useWindowDimensions, PermissionsAndroid } from 'react-native';
import { colors } from 'src/theme';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Header from 'components/Header';
import Geolocation from 'react-native-geolocation-service';
import GlobalContext from 'src/context';
import { useStateLink } from '@hookstate/core';

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white, 
    justifyContent: 'center'
  }
});

const Stack = createStackNavigator();

const {
  recycler: {
    userCoordinatesRef,
  }
} = GlobalContext;

const CollectorHome = () => {
  const [mode, setMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const window = useWindowDimensions();

  const onChangeSearch = query => setSearchQuery(query);

  const navigation = useNavigation();

  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  const userCoordinates = useStateLink(userCoordinatesRef);

  const getLocationPermission = async () => {
    const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (hasPermission) {
      setHasLocationPermission(true);
    }
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setHasLocationPermission(true);
    }
  };

  useEffect(() => {
    getLocationPermission();
  }, []);

  useEffect(() => {
    var watchId = null;
    if (hasLocationPermission) {
      watchId = Geolocation.watchPosition(location => userCoordinates.set(location));
    }

    return () => {
      if (watchId) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [hasLocationPermission]);

  return (
    <>
      <Header />
      <Stack.Navigator
        screenOptions = {{
          headerShown: false
        }}
      >
        <Stack.Screen name="RecyclerHome" component={RecyclerHome}/>
        <Stack.Screen name="CollectorMap" component={CollectorMap}/>
      </Stack.Navigator>
    </>
  );
};

export default CollectorHome;
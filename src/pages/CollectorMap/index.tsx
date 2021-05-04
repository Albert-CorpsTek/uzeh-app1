import React, { useState, useEffect, useRef, createRef } from 'react';
import { PermissionsAndroid, StyleSheet, View, Image, useWindowDimensions, Animated, PanResponder, ScrollView, Dimensions } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import { Text, TouchableRipple, Title } from 'react-native-paper';
import GlobalContext from 'src/context';
import { useStateLink } from '@hookstate/core';
import request from 'util/request';
import { colors } from 'src/theme';
import Carousel from 'react-native-snap-carousel';
import placeholderImg from 'img/default-placeholder.png';
//import BottomSheet from 'reanimated-bottom-sheet';
//import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import dateFormat from 'util/dateFormat';
import { mySQLDateToJsDate } from 'util/formatDateTime';
import Swiper from 'react-native-swiper';
import toCapitalizedCase from 'util/toCapitalizedCase';

const sliderWidth = Dimensions.get('window').width;
const itemWidth = Math.round(sliderWidth * 0.7);
const itemHeight = Math.round(itemWidth / 3);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  map: {
    flex: 2
  },
  carouselWrapper: {
    flex: 1, 
    backgroundColor: colors.white,
  },
  carouselItemContainer: {
    aspectRatio: 1, 
    backgroundColor: colors.darkGray
  },
  carouselContainer: {
    position: 'absolute',
    bottom: '2%'
  },
  categoriesContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap'
  },
  panelHandle: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 4
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  item: {
    flexDirection: 'row',
    backgroundColor: colors.lightOrange,
    height: '100%',
    marginHorizontal: '7%',
    borderRadius: 4
  },
  collectionOrdersContainer: {
    marginLeft: '5%'
  },
  itemRight: {
    flex: 1.3,
    justifyContent: 'center',
    paddingLeft: '4%'
  }
});

const {
  map: {
    userPositionRef,
    collectionOrdersRef,
  },
  auth: {
    authStateRef,
  }
} = GlobalContext;

const CollectorMap = ({ navigation }) => {

  const [userPosition, setUserPosition] = useState(undefined);
  const [collectionOrders, setCollectionOrders] = useState(undefined);

  const window = useWindowDimensions();

  const mapRef = useRef(null);
  const [markerRefs, setMarkerRefs] = useState(undefined);

  const pan = useRef(new Animated.ValueXY()).current;

  const positionAnim = useRef(new Animated.Value(0)).current;

  const sheetRef = React.useRef(null);

  const authState = useStateLink(authStateRef);

  const [selectedCollectionOrderId, setSelectedCollectionOrderId] = useState(undefined);

  const getDy = (y) => {
    if (y > 70 + window.height / 3) {
      return 0;
    }
    return y;
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ]
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

  const fetchCollectionOrders = async () => {
    try {
      const response = await request.authPost('CollectionOrders/getAll', {
        latitude: userPosition.latitude.toString(),
        longitude: userPosition.longitude.toString(),
      });
      if (response.status === true) {
        setCollectionOrders(response.result.collection_orders);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasLocationPermission = async () => {
    const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (hasPermission) {
      return true;
    }
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    }
    return false;
  };

  const getLocationUpdates = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    return Geolocation.watchPosition(
      (position) => setUserPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }), 
      (error) => {
        console.log(error.code, error.message);
      }, 
      {
        enableHighAccuracy: true,
      },
    );
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();
    if (!hasPermission) {
      return;
    }
    Geolocation.getCurrentPosition(
      (position) => {
        setUserPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error.code, error.message);
      }, 
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  const openDrawer = () => {};
  
  const closeDrawer = () => {};

  useEffect(() => {
    getLocation();
    const watchId = getLocationUpdates();
    
    return () => {
      if (typeof watchId !== 'undefined') {
        Geolocation.clearWatch(watchId);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof userPosition !== "undefined") {
      fetchCollectionOrders();
    }
  }, [userPosition]);

  useEffect(() => {
    if (typeof collectionOrders !== 'undefined') {
      setMarkerRefs(collectionOrders.map((i) => createRef()));
    }
  }, [collectionOrders]);

  if (typeof userPosition === "undefined") {
    return <Text>Loading...</Text>;
  };

  return (
    <View style={styles.container}>
      <MapView 
        region={{
          latitude: userPosition.latitude, 
          longitude: userPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }} 
        provider={PROVIDER_GOOGLE} 
        style={styles.map} 
        ref={mapRef}
      >
        <Marker 
          title="Minha posição" 
          coordinate={userPosition}
        />
        {typeof markerRefs !== 'undefined' && collectionOrders.map((i, index) => (
          <Marker 
            title="Coleta" 
            coordinate={{
              latitude: i.latitude, 
              longitude: i.longitude
            }} 
            pinColor={colors.contrast2} 
            key={index} 
            identifier={i.id.toString()} 
            ref={markerRefs[index]}
          >
            <FontAwesomeIcon icon={faMapMarker} size={window.width * 0.1} color={'#319A72'} />
          </Marker>
        ))}
        {authState.value.user?.radius > 0 && <Circle center={userPosition} radius={authState.value.user?.radius} />}
      </MapView>
      {typeof collectionOrders !== 'undefined' && 
        <Swiper 
          showsPagination={false} 
          containerStyle={{
            position: 'absolute',
            bottom: '3%'
          }} 
          style={{
            height: Math.round(window.width / 3)
          }}>
          {collectionOrders.map(collectionOrder => (
            <TouchableRipple 
              onPress={() => {
                navigation.navigate('CollectionDetails', {
                  collectionOrderId: collectionOrder.id,
                });
              }} 
              key={collectionOrder.id}>
              <View style={styles.item}>
                <View 
                  style={{
                    flex: 1
                  }}>
                  <Image 
                    source={collectionOrder.images.length > 0 ? {uri: collectionOrder.images[0].url} : placeholderImg } 
                    style={{
                      width: '100%',
                      height: '100%', 
                      borderBottomLeftRadius: 4,
                      borderTopLeftRadius: 4
                    }}
                  />
                </View>
                <View style={styles.itemRight}>
                  <Text>Tipo: {collectionOrder.type ? "Venda" : "Doação"}</Text>
                  <Text>{"Data da Coleta: " + dateFormat(mySQLDateToJsDate(collectionOrder.date_service_ordes), 'd/m/Y')}</Text>
                  <Text>Turno: {toCapitalizedCase(collectionOrder.period)}</Text>
                  <Text>{collectionOrder.district}</Text>
                </View>
              </View>
            </TouchableRipple>
          ))}
        </Swiper>
      }
    </View>
  );
};

export default CollectorMap;
import React, { useEffect, useState, useRef, useImperativeHandle } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  PermissionsAndroid,
  Dimensions
} from 'react-native';
import GlobalContext from 'src/context';
import { useStateLink, useStateLinkUnmounted } from '@hookstate/core';
import { FCWithLoggedStackNavigator } from 'pages/LoggedStackNavigator';
import { withAppbar } from 'components/Appbar';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import request from 'util/request';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faRecycle,
  faMapMarker,
  faBars,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-native-snap-carousel';
import OCCarousel from 'components/OCCarousel.js';
import Geolocation from 'react-native-geolocation-service';
import storage from 'src/util/storage';
import { showMessage } from 'react-native-flash-message';

import { animated } from 'react-spring';
import styled from 'styled-components/native';
import { colors } from 'src/theme';
import CollapsibleSidebar from '../../components/CollapsibleSidebar';
import Profile from '../../components/Profile';
import notify from 'util/notify';
import addCoordinates from 'util/addCoordinates';
import { IconButton, TouchableRipple, Button } from 'react-native-paper';
import avatarImg from 'img/avatar.png';
import StyledCarousel from 'components/StyledCarousel';
import StyledButton from 'components/StyledButton';
import UserPositionMarker from 'components/UserPositionMarker';
import Topbar from 'components/Topbar';
import MenuButton from 'components/MenuButton';
import statusColor from 'util/statusColor';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  carouselWrapperContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 50,
  },
  container: {
    flex: 1,
    //paddingTop: '10%',
    backgroundColor: '#f0f0f6',
  },
  title: {
    fontSize: 20,
    marginTop: 24,
    paddingHorizontal: 20,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    paddingHorizontal: 20,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    //borderRadius: 10,
    overflow: 'hidden',
    //marginTop: 16,
  },

  menu: {
    flexDirection: 'row',
    paddingVertical: 6,
    marginBottom: 10,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  userPositionContainer: {
    alignItems: 'center'
  },
  markerImageContainer: {
    position: 'absolute',
    width: (windowWidth * 0.2) * 0.75,
    height: (windowWidth * 0.2) * 0.75,
    borderRadius: ((windowWidth * 0.2) * 0.75) / 2,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  markerImage: {
    width: '75%',
    height: '75%',
  },
  activeMarker: {
    color: colors.contrast2
  },
  inactiveMarker: {
    color: colors.contrast
  },
  overlayButton: {
    position: 'absolute',
    left: 20,
    top: 100,
    backgroundColor: colors.contrast4,
    width: windowWidth * 0.2,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    margin: windowWidth * 0.01,
    justifyContent: 'space-between',
  },
  buttonsContainerRight: {
    flexDirection: 'row'
  }
});

const BottomNav = styled(View)`
  height: 70px;
  background-color: ${colors.surface};
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

const AnimatedBottomNav = animated(BottomNav);

const LogoutLinkText = styled(Text)`
  color: ${colors.black};
  font-size: 16px;
`;

const {
  evaluate: { selectedOCRef, fetchOC, loadingOCRef, respondOC, firstOCRef },
  map: {
    selectedClientIdRef,
    openDrawerRef,
  }
} = GlobalContext;

const Home: FCWithLoggedStackNavigator<'Home'> = ({ navigation }) => {
  const authState = useStateLinkUnmounted(GlobalContext.auth.authStateRef);
  const [collectionOrders, setCollectionOrders] = useState([]);
  const [userPositions, setUserPositions] = useState([]);
  const selectedOC = useStateLink(selectedOCRef);
  const mapRef = useRef(null);
  const viewRef = useRef(null);
  const [regionCenterCoordinates, setRegionCenterCoordinates] = useState({
    latitude: -5.8190803,
    longitude: -35.2102248,
  });
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [userCoords, setUserCoords] = useState(null);
  const [hide, setHide] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const OC = useStateLink(firstOCRef);
  const selectedClientId = useStateLink(selectedClientIdRef);
  const openDrawer = useStateLink(openDrawerRef);

  const [refreshing, setRefreshing] = useState(false);

  const fetchCollectionOrders = async () => {
    try {
      const response = await request.authPost('CollectionOrders/getAll', {
        latitude: userCoords.latitude.toString(),
        longitude: userCoords.longitude.toString(),
      });
      if (response.status === true) {
        setCollectionOrders(response.result.collection_orders);
      } else {
        console.log(response.result.message);
      }
    } catch (err) {
      console.log("Deu certo!!!");
      console.log(err);
    }
  };

  const fetchUserPositions = async () => {
    try {
      const response = await request.authPost('Clients/getClients', {
        latitude: userCoords.latitude.toString(),
        longitude: userCoords.longitude.toString(),
      });
      if (response.status === true) {
        setUserPositions(response.result.clients);
      }
    } catch (e) {
      notify(e, 'error');
    }
  };

  const sendPosition = async () => {
    try {
      const response = await request.authPost('UserPositions/insert', {
        latitude: userCoords.latitude.toString(),
        longitude: userCoords.longitude.toString(),
      });
      notify(response.result.message, 'success');
    } catch (e) {
      notify(e, 'error');
    }
  };

  const requestPermission = async permission => {
    try {
      var granted = await PermissionsAndroid.check(permission);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setHasLocationPermission(true);
        return;
      }

      granted = await PermissionsAndroid.request(permission);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setHasLocationPermission(true);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkPermission = async (permission) => {
    try {
      var granted = await PermissionsAndroid.check(permission);
      return granted;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  const isInitialMount = useRef(true);

  useEffect(() => {
    requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);

    var _watchId;
    if (hasLocationPermission) {
      _watchId = Geolocation.watchPosition(
        position => {
          setUserCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          console.log('Não deu certo');
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: true,
        },
      );
    }

    return () => {
      if (typeof _watchId !== 'undefined') {
        Geolocation.clearWatch(_watchId);
      }
    };
  }, [hasLocationPermission]);

  useEffect(() => {
    if (userCoords) {
      fetchCollectionOrders();
      //sendPosition();
      fetchUserPositions();
    }

    return () => {
      selectedOC.set(undefined);
    };
  }, [userCoords]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchCollectionOrders();
      fetchUserPositions();
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  useEffect(() => {
    const interval = setInterval(() => {
      //fetchCollectionOrders();
      //fetchUserPositions();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getRegion = () => {
    const newCoordinate = addCoordinates(userCoords, authState.value.user.radius);

    return {
      latitude: userCoords.latitude,
      longitude: userCoords.longitude,
      latitudeDelta: 2 * Math.abs(newCoordinate.latitude - userCoords.latitude),
      longitudeDelta: 2 * Math.abs(newCoordinate.longitude - userCoords.longitude),
    };
  };

  return (
    <>
      {/*<Topbar title="Home" />*/}
      <View style={styles.container}>
        {/*<Text style={styles.title}>Bem Vindo</Text>
      <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>*/}

        {userCoords && authState.value.user && (<MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={getRegion()}
          ref={mapRef}
          onPanDrag={e => {
            /*
            if(typeof OC.value !== 'undefined') {
              OC.set(undefined);
              setRegionCenterCoordinates(e.nativeEvent.coordinate);
            }
            */
          }}
          customMapStyle={[{
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
          }]}
        >
          <Marker
            coordinate={userCoords}
            title="Minha posição"
            description="Minha posição"
          />
          {collectionOrders.map((collectionOrder, index) => (
              <Marker
                coordinate={{
                  latitude: collectionOrder.latitude,
                  longitude: collectionOrder.longitude,
                }}
                title={collectionOrder.address}
                key={index}
                description={collectionOrder.comments}
                identifier={collectionOrder.id.toString()}
                onPress={e => {
                  selectedClientId.set(undefined);
                  selectedOC.set(collectionOrder.id);
                  OC.set(collectionOrder);
                  mapRef.current.animateCamera({
                    center: {
                      latitude: collectionOrder.latitude,
                      longitude: collectionOrder.longitude,
                    }
                  });
                }}>
                <View style={styles.userPositionContainer}>
                  <FontAwesomeIcon icon={faMapMarker} color={collectionOrder.collection_order_response ? colors.contrast2 : colors.contrast4} size={windowWidth * 0.2} />
                  <View style={styles.markerImageContainer}>
                    <Image
                      source={{ uri: collectionOrder.categories[0].url_icon }}
                      style={styles.markerImage}
                    />
                  </View>
                </View>
              </Marker>
            ))}
          {userPositions.map((userPosition, index) => (
            <Marker
              coordinate={{
                latitude: userPosition.latitude,
                longitude: userPosition.longitude,
              }}
              title={userPosition.nickname}
              key={index}
              identifier={userPosition.id.toString()}
              onPress={e => {
                /*
                selectedOC.set(undefined);
                selectedClientId.set(userPosition.id);
                */
              }}
              tracksViewChanges={false}
            >
              <UserPositionMarker userPosition={userPosition} />
            </Marker>
          ))}
          <Circle center={userCoords} radius={authState.value.user?.radius} />
        </MapView>)}

        {typeof collectionOrders !== 'undefined' && userCoords && (
          <OCCarousel
            collectionOrders={collectionOrders}
            onSnapToItem={slideIndex => {
              mapRef.current.animateCamera({
                center: {
                  latitude: collectionOrders[slideIndex].latitude,
                  longitude: collectionOrders[slideIndex].longitude,
                }
              });
              selectedOC.set(collectionOrders[slideIndex].id);
            }}
            onPress={collectionOrder => {
              navigation.navigate('CollectionDetails', {
                collectionOrderId: collectionOrder.id,
              });
            }}
            accept={(id) => {
              respondOC(id);
              fetchCollectionOrders();
            }}
            dismiss={(id) => { }}
            navigate={navigation.navigate}
            onExit={() => {
              mapRef.current.animateToRegion(getRegion());
            }}
          />
        )}
        {/*<StyledCarousel
          entries={userPositions}
          onSnapToItem={index => {
            mapRef.current.animateCamera({
              center: {
                latitude: userPositions[index].latitude,
                longitude: userPositions[index].longitude,
              }
            });
          }}
        />*/}
        <AnimatedBottomNav
          style={{
            height: hide ? 0 : 70,
            backgroundColor: 'rgba(249, 249, 249, 0.3)',
          }}
        />
        <MenuButton onPress={() => openDrawer.set(true)} />
      </View>
      <IconButton 
        icon="refresh" 
        style={{
          position: 'absolute', 
          backgroundColor: colors.contrast,
          top: '4%',
          right: '4%'
        }} 
        size={windowWidth * 0.1} 
        onPress={() => {
          fetchCollectionOrders();
          fetchUserPositions();
        }} 
        animated={true}
      />
    </>
  );
};

export default withAppbar(Home);

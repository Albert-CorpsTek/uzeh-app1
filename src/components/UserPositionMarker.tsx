import React, {useState, useEffect} from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import avatarImg from 'img/avatar.png';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faMapMarker,
} from '@fortawesome/free-solid-svg-icons';
import {colors} from 'src/theme';
import GlobalContext from 'src/context';
import {useStateLink} from '@hookstate/core';
import request from 'util/request';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  userPositionContainer: {
    alignItems: 'center'
  },
  markerImageContainer: {
    position: 'absolute',
    width: (windowWidth * 0.2) * 0.75,
    height: (windowWidth * 0.2) * 0.75,
    borderRadius: ((windowWidth * 0.2) * 0.75)/2,
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
  }
});

const {
  map: {
    selectedClientIdRef,
  }
} = GlobalContext;

const UserPositionMarker = ({userPosition}) => {
  const selectedClientId = useStateLink(selectedClientIdRef);

  const [perfilPhoto, setPerfilPhoto] = useState(null);

  const fetchPerfilPhoto = async () => {
    const response = await request.authPostImage('Clients/getImageProfileById/' + userPosition.id);
    console.log("FOTO DO COLETOR: " + userPosition.nickname + ' ' + JSON.stringify(response));
    setPerfilPhoto(response);
  };

  useEffect(() => {
    fetchPerfilPhoto();
  }, []);

  return (
    <View style={styles.userPositionContainer}>
      <FontAwesomeIcon icon={faMapMarker} color={selectedClientId.value === userPosition.id ? colors.contrast2 : colors.contrast} size={windowWidth * 0.2} />
      <View style={styles.markerImageContainer}>
        <Image 
          source={perfilPhoto ? { uri: perfilPhoto } : avatarImg} 
          style={styles.markerImage}
        />
      </View>
    </View>
  );
}

export default UserPositionMarker;
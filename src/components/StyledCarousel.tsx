import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import {colors} from 'src/theme';
import GlobalContext from 'src/context';
import {useStateLink} from '@hookstate/core';
import avatarImg from 'img/avatar.png';
import { Title } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;

const renderItem = ({item, index}) => {
  return (
    <View style={styles.itemContainer}>
      <Image 
        source={avatarImg} 
        style={styles.userImage}
      />
      <View style={styles.leftContainer}>
        <Title>{item.name}</Title>
      </View>
    </View>
  );
};

const {
  map: {
    selectedClientIdRef,
  },
  evaluate: {
    selectedOCRef,
  }
} = GlobalContext;

const StyledCarousel = (props) => {
  const {entries, onSnapToItem} = props;
  const selectedClientId = useStateLink(selectedClientIdRef);
  const selectedOC = useStateLink(selectedOCRef);

  if(typeof selectedClientId.value === "undefined" || typeof selectedOC.value !== 'undefined') {
    return null;
  }

  return (
    <Carousel 
      data={entries} 
      renderItem={renderItem} 
      itemWidth={windowWidth * 0.9} 
      sliderWidth={windowWidth} 
      containerCustomStyle={styles.container} 
      firstItem={entries.map(entry => entry.id).indexOf(selectedClientId.value)}
      onSnapToItem={onSnapToItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: '25%'
  },
  itemContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.contrast4,
    flexDirection: 'row'
  },
  userImage: {
    width: '40%',
    aspectRatio: 1
  },
  leftContainer: {
    padding: '10%',
    overflow: 'hidden'
  }
});

export default StyledCarousel;
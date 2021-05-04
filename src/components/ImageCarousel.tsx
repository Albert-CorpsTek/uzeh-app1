import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { colors } from 'src/theme';
import Swiper from 'react-native-swiper';
import chevronLeft from '../../assets/images/chevron-left.png';
import chevronRight from '../../assets/images/chevron-right.png';
import Icon from 'components/Icon';
import placeholderImg from 'img/default-placeholder.png';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const ImageCarousel = ({ images, style }) => {
  
  const renderSwiper = () => {
    var itemArr = [];
    if (images.length > 0) {
      for (var i = 0; i < images.length; i++) {
        let image = images[i];
        itemArr.push(
          <View 
            key={image.url} 
            style={style}>
            <Image 
              source={{ uri: image.url }} 
              style={{
                width: '100%',
                flex: 1,
                resizeMode: 'stretch'
              }}
            />
          </View>
        );
      }
    } else {
      itemArr.push(
        <View 
          key={placeholderImg} 
          style={{
            width: '100%',
            height: '100%'
          }}>
          <Image 
            source={placeholderImg} 
            style={{
              width: '100%',
              flex: 1,
              resizeMode: 'stretch'
            }}
          />
        </View>
      );
    }
    return itemArr;
  };

  return (
    <Swiper 
      showsButtons={true} 
      showsPagination={false} 
      loop={false} 
      nextButton={<Icon icon={chevronRight} color={colors.lightOrange} size={wp('10%')} />} 
      prevButton={<Icon icon={chevronLeft} color={colors.lightOrange} size={wp('10%')} />} 
      buttonWrapperStyle={{
        paddingHorizontal: 0
      }} 
      containerStyle={{
        marginBottom: 0,
        paddingHorizontal: 0
      }}>
      {renderSwiper()}
    </Swiper>
  );
};

export default ImageCarousel;
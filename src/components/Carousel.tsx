import React, { useState } from 'react';
import { Carousel as RNCarousel } from 'react-native-snap-carousel';
import { View, StyleSheet } from 'react-native';
import { colors } from 'src/theme';

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
  },
  carouselContainer: {
    backgroundColor: colors.white,
  },
  categoriesContainer: {
    height: '10%', 
    flexDirection: 'row'
  }
});

const Carousel = (props) => {
  const [currentCollectionOrder, setCollectionOrder] = useState(undefined);
  return (
    <RNCarousel
      data={props.collectionOrders}
      renderItem={({ item, index }) => (
        <TouchableRipple
          onPress={() => {
            navigation.navigate('CollectionDetails', {
              collectionOrderId: item.id,
            });
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: "100%",
              aspectRatio: 1
            }}
            resizeMode="center"
          />
        </TouchableRipple>
      )}
      sliderWidth={props.window.width}
      itemWidth={(props.window.height - 70) / 6}
      onSnapToItem={slideIndex => {
        props.onSnapToItem();
      }}
      enableMomentum={true}
      inactiveSlideScale={1}
      inactiveSlideOpacity={1}
      slideStyle={styles.carouselItemContainer}
      containerCustomStyle={styles.carouselContainer}
    />
  );
};

export default Carousel;
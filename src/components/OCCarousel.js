import React, {useState, useImperativeHandle} from 'react';
import Carousel from 'react-native-snap-carousel';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import GlobalContext from 'src/context';
import { useStateLink } from '@hookstate/core';
import { Button, IconButton, Text, Title } from 'react-native-paper';
import { colors } from 'src/theme';

const {
  evaluate: {
    selectedOCRef,
    fetchOC,
    loadingOCRef,
    respondOC,
    firstOCRef,
  },
  map: {
    selectedClientIdRef,
  }
} = GlobalContext;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = Math.round(sliderWidth * 0.7);
const itemHeight = Math.round(itemWidth * 3 / 4);

const OCCarousel = ({navigate, collectionOrders, onSnapToItem, onExit}, ref) => {
  const OC = useStateLink(firstOCRef);
  const selectedOC = useStateLink(selectedOCRef);
  const selectedClientId = useStateLink(selectedClientIdRef);

  const getIndex = () => {
    for(var i = 0; i < collectionOrders.length; i++) {
      if(OC.value.id == collectionOrders[i].id)
        return i;
    }
    return 0;
  };

  if (typeof selectedOC.value === 'undefined' || typeof selectedClientId.value !== "undefined") {
    return null;
  }
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback 
        onPress={() => {
          selectedOC.set(undefined);
          onExit();
        }}
      >
        <View style={styles.invisibleContainer}></View>
      </TouchableWithoutFeedback>
      <Carousel
        data={collectionOrders}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.itemContainer}>
              <View style={styles.itemTopContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                />
              </View>
              {/*<View style={styles.cardFooter}>
                <Button
                  onPress={() => {
                    navigate('CollectionDetails', {
                      collectionOrderId: item.id,
                    });
                  }}
                  icon="eye"
                  uppercase={false}
                  mode="contained" 
                  color={colors.contrast} 
                  style={{
                    marginBottom: 10
                  }}
                >
                  Detalhes
                </Button>
                {item.collection_order_response.length > 0 ? (
                  <Button
                    onPress={() => {
                      //this.props.dismiss(item.id);
                    }}
                    icon="close"
                    mode="contained" 
                    color={colors.red} 
                    uppercase={false}
                  >
                    Desistir
                  </Button>
                ) : (
                    <Button
                      onPress={() => {
                        //this.props.accept(item.id);
                      }} 
                      mode="contained" 
                      icon="check" 
                      uppercase={false} 
                      color={colors.contrast2}
                    >
                      Eu pego
                    </Button>
                  )
                }
              </View>*/}
              <View style={styles.itemBottomContainer}>
                <View 
                  style={{
                    flexShrink: 1
                  }}
                >
                  <Title>{item.nickname}</Title>
                  <Text>{item.comments}</Text>
                </View>
                <View>
                  <IconButton 
                    icon="arrow-right" 
                    style={{
                      backgroundColor: colors.contrast, 
                      borderRadius: 0,
                    }} 
                    onPress={() => {
                      navigate('CollectionDetails', {
                        collectionOrderId: item.id,
                      });
                    }}
                  />
                </View>
              </View>
            </View>
          );
        }}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth} 
        containerCustomStyle={styles.carouselContainer}
        firstItem={collectionOrders.map(collectionOrder => collectionOrder.id).indexOf(selectedOCRef.value)}
        onSnapToItem={onSnapToItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%'
  },
  container: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0
  },
  invisibleContainer: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0
  },
  carouselContainer: {
    position: 'absolute',
    bottom: 0,
  },
  itemContainer: {
    aspectRatio: 1,
    width: '100%',
    backgroundColor: colors.white,
  },
  itemLabel: {
    color: 'white',
    fontSize: 24
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  cardFooter: {
    flex: 1,
    backgroundColor: 'white',
    padding: '10%',
    overflow: 'hidden'
  },
  itemTopContainer: {
    flex: 10
  },
  itemBottomContainer: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    alignItems: 'center'
  }
});

export default OCCarousel;
import React, { useState, useRef, useEffect } from 'react';
import { Text, Appbar } from 'react-native-paper';
import { TouchableWithoutFeedback, ScrollView, View, StyleSheet, Animated, useWindowDimensions } from 'react-native';
import { colors } from 'src/theme';

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center', 
    paddingHorizontal: 8,
    paddingTop: '1%',
    paddingBottom: '0.5%'
  },
  itemTitle: {
    includeFontPadding: false,
    zIndex: 1,
    textAlignVertical: 'center'
  },
  overlayContainer: {
    color: colors.contrast3
  }
});

const MenuCarousel = ({ items, value, onValueChange }) => {

  const [measurements, setMeasurements] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [xCoordinates, setXCoordinates] = useState([]);

  const leftAnim = useRef(new Animated.Value(0)).current;

  const scrollViewRef = useRef(null);

  const window = useWindowDimensions();

  const itemDivRef = useRef(null);

  const scrollToItem = () => {
    itemDivRef.current.measureLayout();
  };

  useEffect(() => {
    if (measurements.length > 0) {
      Animated.timing(leftAnim, {
        toValue: measurements[currentIndex].x,
        duration: 500
      }).start();
      scrollViewRef.current.scrollTo({ x: measurements[currentIndex].x - Math.round(window.width / 2), y: 0, animated: true });
    }
  }, [currentIndex]);

  return (
    <Appbar.Header 
      style={{
        backgroundColor: colors.darkGreen, 
        paddingHorizontal: 0
      }}
    >
      <ScrollView 
        horizontal={true}           
        style={{
          flex: 1,
          height: '100%'
        }} 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{
          alignItems: 'center'
        }} 
        ref={scrollViewRef}
      >
        {measurements.length == items.length && <Animated.View 
          style={{
            width: measurements[currentIndex].width,
            height: measurements[currentIndex].height, 
            position: 'absolute',
            //left: measurements[currentIndex].x,
            backgroundColor: colors.lightOrange, 
            borderRadius: 3,
            transform: [{ translateX: leftAnim }]
          }}
        ></Animated.View>}
        {items.map((item, i) => (
          <TouchableWithoutFeedback 
            onPress={() =>  { 
              onValueChange(item.value);
              setCurrentIndex(i);
              //scrollViewRef.current.scrollTo({ x: measurements[i].x, y: measurements[i].y, animated: true })
            }} 
            key={i}
          >
            <View 
              style={styles.itemContainer} 
              onLayout={({nativeEvent}) => {
                var copy = measurements.slice();
                copy[i] = nativeEvent.layout;
                setMeasurements(copy);
              }}
            >
              <Text 
                style={styles.itemTitle}
              >
                {item.name}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </Appbar.Header>
  );
};

export default MenuCarousel;
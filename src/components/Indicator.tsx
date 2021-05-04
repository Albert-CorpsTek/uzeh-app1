import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  },
  indicatorContainerStyle: {
    marginTop: 18,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
});

const Indicator = ({
  itemCount,
  currentItem, 
  indicatorContainerStyle = {},
  indicatorActiveColor,
  indicatorInActiveColor,
}) => {
  const indicators = [];

  for (let i = 0; i < itemCount; i++) {
    indicators.push(
      <View 
        style={[
          styles.indicator,
          i == currentItem ? { backgroundColor: indicatorActiveColor } : { backgroundColor: indicatorInActiveColor}
        ]} 
        key={i}
      >
      </View>
    );
  }

  return (
    <View style={[styles.container, indicatorContainerStyle]}>
      {indicators}
    </View>
  );
};

export default Indicator;
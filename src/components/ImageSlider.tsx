import React, { useState } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { date } from 'yup';
import { IconButton } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  },
  image: {
    height: 230, 
    resizeMode: 'contain'
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
  arrowsContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

const ChildItem = ({ 
  item, 
  index,
  imageKey, 
  style, 
}) => {
  return (
    <TouchableOpacity>
      <Image 
        source={{uri : item[imageKey]}} 
        style={[styles.image, style]} 
        resizeMode="stretch"
      />
    </TouchableOpacity>
  );
};

const Indicator = ({
  itemCount,
  currentItem, 
  indicatorContainerStyle,
  indicatorActiveColor,
  indicatorInActiveColor,
}) => {
  return (
    <View style={[styles.container, indicatorContainerStyle]}>
      {renderIndicator(
        itemCount,
        currentItem, 
        indicatorActiveColor, 
        indicatorInActiveColor
      )}
    </View>
  );
};

const renderIndicator = ({
  count,
  currentIndex,
  indicatorActiveColor,
  indicatorInActiveColor,
}) => {
  let indicators = [];
  for (let i = 0; i < count; i++) {
    indicators.push(
      <View 
        style={[
          styles.indicator,
          i == currentIndex ? { backgroundColor: indicatorActiveColor } : { backgroundColor: indicatorInActiveColor}
        ]}
      >
      </View>
    );
  }
  return indicators;
};

class ImageSlider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
    this.flatListRef = React.createRef();
  }

  viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  render() {
    const itemWidth = this.props.width;
    const totalItemWidth = itemWidth;
    return (
      <View style={this.props.containerCustomStyle}>
        <FlatList 
          horizontal={true} 
          data={this.props.data} 
          renderItem={({item, index}) => (
            <>
            <Text>{item[this.props.imageKey]}</Text>
            <Image 
              source={{ uri: item[this.props.imageKey] }} 
              style={{
                width: 70,
                height: 70,
                resizeMode: 'stretch'
              }}
            />
            </>
          )} 
          keyExtractor={(item, index) => index} 
          showsHorizontalScrollIndicator={false} 
          viewabilityConfig={this.viewabilityConfig} 
          contentContainerStyle={this.props.contentContainerStyle} 
          pagingEnabled={true} 
          snapToInterval={totalItemWidth} 
          ref={this.flatListRef}
        />
        {/*<View 
          style={[
            styles.arrowsContainer,
            { top: Math.round(this.props.height / 2 - this.props.width * 0.1 / 2) }
          ]}>
          <IconButton 
            icon="arrow-left" 
            size={this.props.width * 0.1} 
            onPress={() => {
              this.flatListRef.scrollToIndex({
                animated: true,
                index: this.state.index + 1
              });
            }}
          />
          <IconButton 
            icon="arrow-right" 
            size={this.props.width * 0.1}
          />
        </View>
        <Indicator 
          indicatorContainerStyle={styles.indicatorContainerStyle} 
          itemCount={this.props.data.length} 
          currentItem={this.state.index} 
          indicatorActiveColor={this.props.indicatorActiveColor} 
          indicatorInActiveColor={this.props.indicatorInActiveColor}
          />*/}
      </View>
    );
  }

  onViewableItemsChanged = ({viewableItems, changed}) => {
    if (viewableItems.length > 0) {
      this.setState({
        index: viewableItems[0].index
      });
    }
  };
};

export default ImageSlider;
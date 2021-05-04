import React from 'react';
import { FlatList, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { colors } from 'src/theme';

const SelectGrid = ({
  data,
  value,
  onValueChange
}) => {
  return (
    <FlatList 
      data={data} 
      keyExtractor={item => item} 
      renderItem={({ item }) => {
        return (
          <TouchableHighlight 
            style={[
              styles.item,
              { backgroundColor: item.name === value ? colors.lightOrange : colors.lightGreen }
            ]} 
            onPress={() => onValueChange(item.name)}>
            <Image 
              source={item.url_icon} 
              style={styles.image}
            />
          </TouchableHighlight>
        );
      }} 
      numColumns={3}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    flexGrow: 1,
    padding: 20,
    flexBasis: 0
  },
  image: {
    width: 70,
    height: 70
  }
});

export default SelectGrid;
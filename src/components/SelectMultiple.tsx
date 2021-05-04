import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from 'src/theme';
import { Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionContainer: {
    width: '22%',
    alignItems: 'center',
    marginBottom: '3%'
  },
  optionIcon: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: '10%'
  },
  optionLabel: {
    textTransform: 'uppercase',
    textAlign: 'center'
  }
});

const Option = ({ 
  item, 
  index, 
  status,
  onPress 
}) => {
  const dirname = item.url_icon.split('.').slice(0, -1).join('.');
  //const filename = status ? 'laranja.png' : 'verde.png';
  return (
    <TouchableOpacity onPress={onPress} style={styles.optionContainer}>
        <Image 
          source={{ 
            uri: dirname + '/separados.png'
          }} 
          style={[
            styles.optionIcon,
            { backgroundColor: status ? colors.lightOrange : colors.lightGreen }
          ]}
        />
        <Text style={styles.optionLabel}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const SelectMultiple = ({
  items,
  selectedItems,
  onSelectItem
}) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <Option 
          index={index} 
          item={item} 
          status={selectedItems.includes(item.id)} 
          onPress={() => onSelectItem(item)} 
          key={index}
        />
      ))}
    </View>
  );
};

export default SelectMultiple;
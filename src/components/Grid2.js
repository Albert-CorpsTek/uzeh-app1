import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Option3 from 'src/components/Option3.js';
import {GroupControl} from 'pages/Login/style';
import GlobalContext from 'src/context';
import {useStateLink} from '@hookstate/core';

const {
  category: {categoriesRef, fetchCategories},
} = GlobalContext;

const Grid2 = props => {
  const {data, onPress, value} = props;

  const capitalize = s => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <SafeAreaView style={styles.itemsContainer}>
      <GroupControl style={styles.items}>
        {data.map((item, index) => (
          <Option3
            key={String(item.id)}
            urlIcon={String(item.url_icon)}
            value={item.id}
            name={capitalize(item.name)}
            onPress={() => onPress(item.name)}
            isSelected={item.name === value}
          />
        ))}
      </GroupControl>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemsContainer: {
    width: '100%',
    padding: 20,
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 5,
  },
});

export default Grid2;

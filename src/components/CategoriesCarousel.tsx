import React, { useState } from 'react';
import { View } from 'react-native';

const CategoriesCarousel = ({collectionOrders}) => {

  return (
    <View style={collectionOrders[0].categoriesContainer}>
      {item.categories.map((i) => (
        <Image 
          source={{ uri: i.url_icon }} 
          style={{
            height: '100%', 
            aspectRatio: 1
          }} 
          key={i.id}
        />
      ))}
    </View>
  );
};

export default CategoriesCarousel;
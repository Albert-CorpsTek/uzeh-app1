import React, {useEffect} from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Option from "src/components/Option.js";
import { GroupControl } from 'pages/Login/style';
import GlobalContext from 'src/context';
import { useStateLink } from '@hookstate/core';

const {
  category: {
    categoriesRef,
    fetchCategories,
  },
} = GlobalContext;

const Grid = () => {
  const categories = useStateLink(categoriesRef);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <SafeAreaView style={styles.itemsContainer}>
      <GroupControl style={styles.items}>
        {
          categories.value?.slice(1).map((item, index) => (
            <Option
              key={String(item.id)}
              urlIcon={String(item.url_icon)} 
              value={item.id}
              name={item.name}
            />
          ))
        }        
      </GroupControl>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemsContainer: {
    width: "100%",
    padding: 20
  },
  items: {
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: 'space-between',
    padding: 5
    
  }
});

export default Grid;
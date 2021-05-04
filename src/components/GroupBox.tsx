import React, { useDebugValue } from 'react';
import {View, Text, StyleSheet} from 'react-native';

const GroupBox = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {props.children}
      </View>
      <View style={styles.titleContainer}>
        <Text>{props.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    borderWidth: 1,
    flexDirection: 'row'
  },
  titleContainer: {
    position: 'absolute',
    width: '50%',
    top: 0
  }
});

export default GroupBox;
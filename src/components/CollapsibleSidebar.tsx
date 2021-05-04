import React, {useRef, useEffect, useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  Dimensions,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  PanResponder,
} from 'react-native';
import {colors} from 'src/theme';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {IconButton} from 'react-native-paper';
import MenuButton from './MenuButton';

const windowWidth = Dimensions.get('window').width;
const sidebarWidth = windowWidth * 0.8;
const windowHeight = Dimensions.get('window').height;

const CollapsibleSidebar = props => {
  const {unmount, top, bottom, middle} = props;
  const showAnim = useRef(new Animated.Value(0)).current;
  const translationX = useRef(new Animated.Value(0));
  const widthAnim = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.ValueXY()).current;
  const [showSidebar, setShowSidebar] = useState(true);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        listener: (event, gestureState) => {
          if (gestureState.dx > 0) {
            pan.setValue({
              x: 0,
              y: 0,
            });
          }
        },
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
        pan.stopAnimation(value => {
          Animated.timing(pan, {
            toValue: {
              x: 0,
              y: 0,
            },
          }).start();
        });
      },
    }),
  ).current;

  useEffect(() => {
    Animated.timing(showAnim, {
      toValue: sidebarWidth,
      duration: 200,
    }).start();

    return () => {
      Animated.timing(showAnim, {
        toValue: 0,
      }).start();
    };
  }, [showAnim]);

  return (
    <>
      {/*<MenuButton onPress={() => setShowSidebar(true)} />*/}
      {showSidebar && (
        <TouchableWithoutFeedback onPress={unmount}>
          <View style={styles.container} />
        </TouchableWithoutFeedback>
      )}
      <TouchableWithoutFeedback onPress={unmount}>
        <View style={styles.container} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={{
          ...styles.animatedContainer,
          width: Animated.add(showAnim, pan.x),
        }}
        {...panResponder.panHandlers}>
        <View style={styles.topContainer}>{top}</View>
        <View style={styles.middleContainer}>{middle}</View>
        <View style={styles.bottomContainer}>{bottom}</View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  animatedContainer: {
    position: 'absolute',
    height: windowHeight,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
  },
  topContainer: {
    flex: 1.5,
  },
  middleContainer: {
    flex: 3,
    justifyContent: 'flex-start',
  },
  bottomContainer: {
    flex: 1,
  },
});

export default CollapsibleSidebar;

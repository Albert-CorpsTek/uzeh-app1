import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { IconButton } from 'react-native-paper';
import GlobalContext from 'src/context';
import Icon from 'components/Icon';
import { colors } from 'src/theme';
import {useStateLink} from '@hookstate/core';
import userIcon from 'img/menu/user.png';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    paddingVertical: '1%',
    backgroundColor: colors.darkGreen,
    height: '15%', 
    alignItems: 'center'
  },
  routeContainer: {
    alignItems: 'center', 
    width: Math.round(windowWidth / 3)
  },
  routeLabel: {
    textTransform: 'uppercase'
  }
});

const {
  map: {
    openDrawerRef
  }
} = GlobalContext;

const TabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const openDrawer = useStateLink(openDrawerRef);

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        return (
          <TouchableOpacity 
            onPress={() => {
              navigation.navigate(route.name);
            }}
          >
            <View style={styles.routeContainer}>
              {options.tabBarIcon({ color: state.index === index ? colors.lightOrange : colors.black, size: 32 })}
              <Text style={[styles.routeLabel, { color: state.index === index ? colors.lightOrange : colors.black }]}>
                {options.tabBarLabel}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity 
        onPress={() => {
          openDrawer.set(true);
        }}
      >
        <View style={styles.routeContainer}>
          <Icon icon={userIcon} color={colors.black} size={32} />
          <Text style={styles.routeLabel}>
            Perfil
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default TabBar;
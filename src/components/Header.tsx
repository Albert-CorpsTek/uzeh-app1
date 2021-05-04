import React, { useState } from 'react';
import { Appbar, Searchbar, IconButton, RadioButton, Text } from 'react-native-paper';
import SwitchButton from 'components/SwitchButton.js';
import { StyleSheet, useWindowDimensions, Image, View, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from 'src/theme';
import GlobalContext from 'src/context';
import { useStateLink } from '@hookstate/core';
import userCircleIcon from 'img/icons/user-circle.png';
import LogoPreta from 'img/icone-wizard.png';
import { useRoute } from '@react-navigation/native';
import Icon from 'components/Icon';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkGreen, 
    paddingHorizontal: '5%',
    alignItems: 'center'
  },
  radioButtonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  radioButtonContainer: {
    alignItems: 'center',
    width: '48%',
    backgroundColor: colors.lightGreen,
    paddingLeft: '2%',
    aspectRatio: 3.2,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center'
  },
  searchbarWrapper: {
    paddingVertical: '5%',
    flexDirection: 'row'
  },
  headerWrapper: {
    justifyContent: 'space-between',
    paddingVertical: '10%',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  buttonsWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
});

const {
  recycler: {
    searchRef,
    currentScreenRef,
  }
} = GlobalContext;

const Header = () => {
  const search = useStateLink(searchRef);

  const window = useWindowDimensions();

  const onChangeSearch = query => search.set(query);

  const navigation = useNavigation();

  const route = useRoute();

  const currentScreen = useStateLink(currentScreenRef);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Image 
          source={LogoPreta} 
          style={{
            width: '30%', 
            resizeMode: 'contain'
          }}
        />
        <Icon 
          icon={userCircleIcon} 
          color={colors.black} 
          size={Math.round(window.width * 0.1)}
        />
      </View>
      <View style={styles.buttonsWrapper}>
        <View style={styles.radioButtonsContainer}>
          <TouchableWithoutFeedback 
            onPress={() => {
              navigation.navigate("RecyclerHome");
              currentScreen.set("RecyclerHome");
            }}>
            <View 
              style={[
                styles.radioButtonContainer,
                {
                  borderColor: currentScreen.value == 'RecyclerHome' ? colors.lightOrange : colors.transparent,
                  backgroundColor: currentScreen.value == 'RecyclerHome' ? colors.lightGreen : colors.newBlack
                }
              ]}>
              <Text style={{ color: currentScreen.value == 'RecyclerHome' ? colors.lightOrange : colors.white }}>Lista</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback 
            onPress={() => {
              navigation.navigate("CollectorMap");
              currentScreen.set("CollectorMap");
            }}>
            <View 
              style={[
                styles.radioButtonContainer,
                {
                  borderColor: currentScreen.value == 'CollectorMap' ? colors.lightOrange : colors.transparent,
                  backgroundColor: currentScreen.value == 'CollectorMap' ? colors.lightGreen : colors.newBlack
                }
              ]}>
              <Text style={{ color: currentScreen.value == 'CollectorMap' ? colors.lightOrange : colors.white }}>MAPA</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.searchbarWrapper}>
        <Searchbar 
          placeholder="Busca" 
          value={search.value} 
          onChangeText={onChangeSearch} 
          style={{
            backgroundColor: colors.lightGreen, 
            width: '100%', 
            textAlignVertical: 'center', 
            height: 44
          }} 
          iconColor={colors.white} 
          theme={{ colors: { text: colors.white, placeholder: colors.white } }}
        />
      </View>
    </View>
  );
};

export default Header;
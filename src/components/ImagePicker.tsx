import React, { useState } from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker/src';
import { Portal, Dialog, TouchableRipple, Text, Button } from 'react-native-paper';
import {useStateLink} from '@hookstate/core';
import GlobalContext from 'src/context';
import { StyleSheet } from 'react-native';
import { colors } from 'src/theme';

const styles = StyleSheet.create({
  text: {
    color: colors.black
  }
});

const ImagePicker = ({callback2}) => {
  const {
    pickImage: {visibleRef},
  } = GlobalContext;

  const visible = useStateLink(visibleRef);

  const takePicture = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        quality: 0.7,
        maxWidth: 518,
        maxHeight: 518
      }, 
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else {
          callback2(response.uri);
        }
        visible.set(false);
      },
    );
  };

  const selectPicture = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        quality: 0.7,
        maxWidth: 518,
        maxHeight: 518
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else {
          callback2(response.uri);
        }
        visible.set(false);
      },
    );
  };

  return (
    <Portal theme={{colors: {backdrop: 'transparent'}}}>
      <Dialog visible={visible.value} onDismiss={() => visible.set(false)}>
        <Dialog.Title style={styles.text}>Selecione uma foto</Dialog.Title>
        <Dialog.Content>
          <TouchableRipple onPress={takePicture} style={{ marginBottom: '5%' }}>
            <Text style={styles.text}>Tirar uma foto</Text>
          </TouchableRipple>
          <TouchableRipple onPress={selectPicture}>
            <Text style={styles.text}>Escolher uma foto</Text>
          </TouchableRipple>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => visible.set(false)}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ImagePicker;
import {Snackbar as PaperSnackbar, Text} from 'react-native-paper';
import React from 'react';
import {colors} from 'src/theme';
import GlobalContext from 'src/context';
import {useStateLink} from '@hookstate/core';

const Snackbar = () => {
  const {
    notification: {messageRef, visibleRef, isErrorRef},
  } = GlobalContext;

  const message = useStateLink(messageRef);
  const visible = useStateLink(visibleRef);
  const isError = useStateLink(isErrorRef);

  return (
    <PaperSnackbar
      style={{
        backgroundColor: isError.value ? colors.background : colors.green,
      }}
      visible={visible.value}
      onDismiss={() => visible.set(false)}
      action={{
        label: 'Ok',
        onPress: () => visible.set(false),
      }}
      theme={{
        colors: {
          accent: isError.value ? colors.contrast : colors.black,
        },
      }}>
      <Text
        style={{
          color: isError.value ? colors.white : colors.black,
        }}>
        {message.value}
      </Text>
    </PaperSnackbar>
  );
};

export default Snackbar;

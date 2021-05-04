import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#fff',
  },
});

interface InputProps {
  value: string;
  setValue: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ value, setValue }) => (
  <TextInput
    value={value}
    onChangeText={setValue}
    multiline
    numberOfLines={6}
    textAlignVertical="top" 
    mode="outlined"
  />
);

export default Input;

import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default class InputProfile extends React.Component {
  state = {
    text: '',
  };

  render() {
    return (
      <TextInput
        style={styles.textInput}
        value={this.state.text}
        onChangeText={(text) => this.setState({ text })}
      />
    );
  }
}

const styles = StyleSheet.create({

  textInput: {
    width: '100%',
    height: 50,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
});

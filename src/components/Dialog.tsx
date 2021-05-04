
import * as React from 'react';
import { View } from 'react-native';
import {
 Button, Paragraph, Dialog, Portal,
} from 'react-native-paper';
import { StyledButton } from 'pages/Login/style';

interface State {
  visible: boolean;
}

export default class MyComponent extends React.Component<{}, State> {
  state = {
    visible: false,
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;
    return (
      <View>
        <StyledButton onPress={this.showDialog}>Show Dialog</StyledButton>
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={this.hideDialog}
          >
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>This is simple dialog</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this.hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }
}

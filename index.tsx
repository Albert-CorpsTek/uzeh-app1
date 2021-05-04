import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider as PaperProvider } from 'react-native-paper';
import AppLoading from 'src/AppLoading';
import { NavigationContainer } from '@react-navigation/native';
//import OneSignal from 'react-native-onesignal';
import { name as appName } from './app.json';
import { StyledTheme, PaperTheme } from './src/theme';

//OneSignal.init('b4401c11-1d7a-4a99-9ceb-aaacb9df748b');
/*
OneSignal.init('57e8de56-8add-40ce-a681-a7f7051837f3');
OneSignal.addEventListener('received', (notification) => {
  console.log('Notification received: ', notification);
});
OneSignal.addEventListener('ids', (device) => {
  console.log('Device info: ', device);
});
*/

const Main = () => (
  <ThemeProvider theme={StyledTheme}>
    <PaperProvider theme={PaperTheme}>
      <NavigationContainer>
        <AppLoading />
      </NavigationContainer>
    </PaperProvider>
  </ThemeProvider>
);

AppRegistry.registerComponent(appName, () => Main);

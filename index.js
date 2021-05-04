import {AppRegistry} from 'react-native';
import React from 'react';
import {ThemeProvider} from 'styled-components';
import {Provider as PaperProvider} from 'react-native-paper';
import AppLoading from 'src/AppLoading';
import {NavigationContainer} from '@react-navigation/native';
import {name as appName} from './app.json';
import {StyledTheme, PaperTheme} from './src/theme';
import Login from 'src/pages/Login';
import LoggedRoutes from 'src/pages/LoggedRoutes';
import {createStackNavigator} from '@react-navigation/stack';
import SelecionarPerfil from 'src/pages/SelecionarPerfil';
import CadastroColetorGerador from 'src/pages/CadastroColetorGerador';
import CadastroReciclador from 'src/pages/CadastroReciclador';
import FlashMessage from 'react-native-flash-message';
import Recover from 'src/pages/Recover';
import CadastroColetor from 'src/pages/CadastroColetor';
import 'react-native-gesture-handler';
import Snackbar from 'components/Snackbar';
import GeneratorHome from 'pages/GeneratorHome';
import Request from 'pages/Request';

const Stack = createStackNavigator();

const Main = () => (
  <>
    <ThemeProvider theme={StyledTheme}>
      <PaperProvider theme={PaperTheme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="Info"
              options={{ 
                header: () => null, 
                transitionSpec: {
                  open: {
                    animation: 'timing',
                    config: {
                      duration: 0
                    }
                  },
                  close: {
                    animation: 'timing',
                    config: {
                      duration: 0
                    }
                  }
                }
              }}
              component={AppLoading} 
            /> 
            <Stack.Screen
              name="SelecionarPerfil"
              component={SelecionarPerfil}
              options={{
                transitionSpec: {
                  open: {
                    animation: 'timing',
                    config: {
                      duration: 0,
                    },
                  },
                  close: {
                    animation: 'timing',
                    config: {
                      duration: 0,
                    },
                  },
                },
              }}
            />
            <Stack.Screen name="CadastroColetor" component={CadastroColetor} />
            <Stack.Screen
              name="CadastroColetorGerador"
              component={CadastroColetorGerador}
            />
            <Stack.Screen
              name="CadastroReciclador"
              component={CadastroReciclador}
            />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="LoggedRoutes" component={LoggedRoutes} />
            <Stack.Screen name="Recover" component={Recover} />
            <Stack.Screen name="GeneratorHome" component={GeneratorHome} />
            <Stack.Screen name="Request" component={Request} />
          </Stack.Navigator>
        </NavigationContainer>
        <FlashMessage position="top" />
      </PaperProvider>
    </ThemeProvider>
    <Snackbar />
  </>
);

AppRegistry.registerComponent(appName, () => Main);

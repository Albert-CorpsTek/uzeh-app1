import React from 'react';
import Login from './Login';
import Cadastro1 from './Cadastro/Cadastro1';
import Cadastro2 from './Cadastro/Cadastro2';
import Cadastro3 from './Cadastro/Cadastro3';
import SucessoCadastro from './Cadastro/SucessoCadastro';
import AppStackNavigator, { RootAppStackParamList } from './AppStackNavigator';
import LoggedRoutes from './LoggedRoutes';
import screenOptions from './screenOptions';
import Recover from './Recover';
import {createStackNavigator} from '@react-navigation/stack';
import SelecionarPerfil from 'src/pages/SelecionarPerfil';
import CadastroColetorGerador from 'src/pages/CadastroColetorGerador';
import CadastroReciclador from 'src/pages/CadastroReciclador';
import CadastroColetor from 'src/pages/CadastroColetor';
import GeneratorHome from 'pages/GeneratorHome';
import Request from 'pages/Request';
import Info from 'pages/Info';

const { Navigator, Screen } = AppStackNavigator;

interface AppRoutesProps {
  initialRouteName: keyof RootAppStackParamList;
}

const Stack = createStackNavigator();

/*
const AppRoutes: React.FC<AppRoutesProps> = ({ initialRouteName }) => (
  <Navigator {...{ screenOptions, initialRouteName }}>
    <Screen
      name="Login"
      component={Login}
    />
    <Screen
      name="LoggedRoutes"
      component={LoggedRoutes}
    />
    <Screen
      name="Cadastro1"
      component={Cadastro1}
    />
    <Screen
      name="Cadastro2"
      component={Cadastro2}
    />
    <Screen
      name="Cadastro3"
      component={Cadastro3}
    />
    <Screen
      name="SucessoCadastro"
      component={SucessoCadastro}
    />
    <Screen
      name="Recover"
      component={Recover}
    />
  </Navigator>
);
*/
const AppRoutes = ({ initialRouteName }) => (
  <Stack.Navigator  {...{ screenOptions, initialRouteName }}>
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
      component={Info} 
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
);

export default AppRoutes;

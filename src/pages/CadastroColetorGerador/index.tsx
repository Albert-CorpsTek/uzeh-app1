import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cadastro1 from 'pages/CadastroColetorGerador/Cadastro1';
import Cadastro2 from 'pages/CadastroColetorGerador/Cadastro2';
import Cadastro3 from 'pages/CadastroColetorGerador/Cadastro3';
import Cadastro4 from 'pages/CadastroColetorGerador/Cadastro4';
import SucessoCadastro from './SucessoCadastro';

const Stack = createStackNavigator();

const CadastroColetorGerador = () => {
  return (
    <Stack.Navigator
      screenOptions = {{
        headerShown: false
      }}
    >
      <Stack.Screen name="Cadastro1" component={Cadastro1}/>
      <Stack.Screen name="Cadastro2" component={Cadastro2}/>
      <Stack.Screen name="Cadastro3" component={Cadastro3}/>
      <Stack.Screen name="Cadastro4" component={Cadastro4}/>
      <Stack.Screen name="SucessoCadastro" component={SucessoCadastro}/>
    </Stack.Navigator>
  );
}

export default CadastroColetorGerador;
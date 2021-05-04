import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from 'src/theme';
import Button from 'components/Button';
import { FCWithAppStackNavigator } from 'pages/AppStackNavigator';
import GlobalStyle from 'components/GlobalStyle';

const SucessoCadastro: FCWithAppStackNavigator<'SucessoCadastro'> = ({
  navigation: { navigate },
}) => (
    <GlobalStyle>
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            fontFamily: 'Manjari-Bold',
            color: '#ccc'
          }}>
          {'Cadastro realizado\ncom sucesso!\nAguarde até que seu cadastro seja analisado e aprovado pela nossa equipe.'}
        </Text>
        <Button
          onPress={() => navigate('Login')}
          text="CONTINUAR"
          backgroundColor="transparent"
        />
      </View>
    </GlobalStyle>
  );

export default SucessoCadastro;

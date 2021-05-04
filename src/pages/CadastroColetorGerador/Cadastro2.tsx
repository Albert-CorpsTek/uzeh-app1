import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {GroupControl, Input} from 'pages/Login/style';
import PanelSlider from 'components/PanelSlider';
import GlobalContext from 'src/context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Progress from 'components/Progress';
import InputWarning from 'components/InputWarning';
import useWithTouchable from 'src/util/useWithTouchable';
import {TextInputMask} from 'react-native-masked-text';
import {View, Picker, Text} from 'react-native';
import {colors} from 'src/theme';
import cepPromise from 'cep-promise';
import Button from 'components/Button';
import {IconButton} from 'react-native-paper';
import {FCWithAppStackNavigator} from 'pages/AppStackNavigator';
import notify from 'util/notify';
import emailValidator from 'email-validator';
import transformDate from 'util/transformDate';
import request from 'util/request';
import Request from 'src/interfaces/Request';
import GlobalStyle from 'components/GlobalStyle';
import {useStateLink} from '@hookstate/core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

const {cpf: cpfValidator} = require('cpf-cnpj-validator');

const {
  cadastro: {
    genderRef,
    birthdayRef,
    emailRef,
    passwordRef,
    unregisteredUserIdRef,
  },
} = GlobalContext;

const Cadastro2: FCWithAppStackNavigator<'Cadastro2'> = ({
  navigation: {navigate},
}) => {
  const gender = useWithTouchable(genderRef);
  const birthDay = useWithTouchable(birthdayRef);
  const email = useWithTouchable(emailRef);
  const password = useWithTouchable(passwordRef);
  const unregisteredUserId = useStateLink(unregisteredUserIdRef);

  const [loading, setLoading] = useState(false);
  const navegar = useNavigation();

  let hasError = false;

  const checkError = (flag: boolean) => {
    if (flag === true) {
      hasError = true;
    }

    return flag;
  };

  const submit = async () => {
    if (hasError) return;
    setLoading(true);

    try {
      const response = await request.post<Request<unknown, 'message'>>(
        'leads/app/' + unregisteredUserId.value,
        {
          gender: gender.value,
          date_of_birth: transformDate(birthDay.value),
        },
      );

      setLoading(false);
      console.log(response);

      if (response.status === true) {
        navigate('Cadastro3');
      } else {
        notify(response.result.message, 'error');
      }
    } catch (e) {
      console.log(e);
    }
  };

  function voltar() {
    navegar.goBack();
  }

  return (
    <GlobalStyle>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          minHeight: '100%',
        }}
        style={{
          minHeight: '100%',
        }}>
        <TouchableOpacity
          onPress={() => {
            voltar();
          }}>
          <FontAwesomeIcon
            style={{position: 'relative', marginTop: '5%', marginLeft: 20}}
            icon={faChevronLeft}
            color={colors.white}
            size={32}
          />
        </TouchableOpacity>
        <Progress
          step={1}
          stepTitles={[
            'Dados\npessoais 1',
            'Dados\npessoais 2',
            'Endereço',
            'Dados\nde acesso',
          ]}
        />
        <PanelSlider
          style={{
            marginTop: 20,
          }}>
          <GroupControl>
            <Text>Sexo:</Text>
            <Picker
              selectedValue={gender.value}
              onValueChange={(itemValue, itemIndex) => gender.set(itemValue)}>
              <Picker.Item label="Não quero informar" value="" />
              <Picker.Item label="Masculino" value="masculino" />
              <Picker.Item label="Feminino" value="feminino" />
            </Picker>
          </GroupControl>
          <GroupControl>
            <TextInputMask
              type="datetime"
              options={{
                format: 'DD/MM/YYYY',
              }}
              customTextInput={Input}
              customTextInputProps={{
                mode: 'flat',
                label: 'Data de nascimento',
                underlineColor: colors.black,
                allowFontScaling: true,
              }}
              value={birthDay.value}
              onChangeText={text => birthDay.set(text)}
              onBlur={birthDay.onBlur}
              onSubmitEditing={() => {
                checkError(birthDay.value === '');
                submit();
              }}
            />
            <InputWarning
              text="Campo obrigatório"
              valid={checkError(birthDay.value === '')}
              visible={birthDay.blurred}
            />
            <InputWarning
              text="Data em formato inválido, utilize o padrão DD/MM/YYYY"
              valid={checkError(!/\d\d\/\d\d\/\d\d\d\d/.test(birthDay.value))}
              visible={birthDay.blurred}
            />
          </GroupControl>
          <GroupControl>
            <Button
              text="AVANÇAR"
              onPress={submit}
              disabled={hasError}
              fullWidth
              loading={loading}
              backgroundColor={colors.newColor}
            />
          </GroupControl>
        </PanelSlider>
      </KeyboardAwareScrollView>
    </GlobalStyle>
  );
};

export default Cadastro2;

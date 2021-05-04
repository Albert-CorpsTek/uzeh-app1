import React, { useState, useRef } from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { GroupControl, Input } from 'pages/Login/style';
import PanelSlider from 'components/PanelSlider';
import GlobalContext from 'src/context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Progress from 'components/Progress';
import InputWarning from 'components/InputWarning';
import useWithTouchable from 'src/util/useWithTouchable';
import Button from 'components/Button';
import { colors } from 'src/theme';
import { TextInputMask } from 'react-native-masked-text';
import { useStateLink } from '@hookstate/core';
import transformDate from 'util/transformDate';
import request from 'util/request';
import { FCWithAppStackNavigator } from 'pages/AppStackNavigator';
import notify from 'util/notify';
import Request from 'src/interfaces/Request';
import emailValidator from 'email-validator';
import Geocoder from 'react-native-geocoding';
import useToken from 'util/useToken';
import GlobalStyle from 'components/GlobalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import { TouchableRipple, Text } from 'react-native-paper';
import validatePassword from 'util/validatePassword';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableNativeFeedback, View} from 'react-native';

const {
  cadastro: {
    cityRef,
    stateRef,
    genderRef,
    nameRef: nomeRef,
    phoneRef: telefoneRef,
    apelidoRef,
    addressRef,
    emailRef,
    numberRef,
    birthdayRef,
    complementRef,
    passwordRef,
    cpfRef,
    latitudeRef,
    longitudeRef,
    clearForm,
    unregisteredUserIdRef,
    neighborhoodRef,
    confirmPasswordRef, 
    cepRef,
  },
} = GlobalContext;

const Cadastro3: FCWithAppStackNavigator<'Cadastro3'> = ({
  navigation: {
    navigate,
  },
}) => {

  const confirmPasswordInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const address = useStateLink(addressRef);
  const email = useWithTouchable(emailRef);
  const nome = useStateLink(nomeRef);
  const apelido = useStateLink(apelidoRef);
  const telefone = useStateLink(telefoneRef);
  const number = useStateLink(numberRef);
  const birthday = useStateLink(birthdayRef);
  const complement = useStateLink(complementRef);
  const password = useWithTouchable(passwordRef);
  const cpf = useStateLink(cpfRef);
  const gender = useStateLink(genderRef);
  const city = useStateLink(cityRef);
  const state = useStateLink(stateRef);
  const latitude = useStateLink(latitudeRef);
  const longitude = useStateLink(longitudeRef);
  const unregisteredUserId = useStateLink(unregisteredUserIdRef);
  const neighborhood = useStateLink(neighborhoodRef);
  const confirmPassword = useWithTouchable(confirmPasswordRef);
  const cep = useStateLink(cepRef);

  const [loading, setLoading] = useState(false);
  const navegar = useNavigation();

  let hasError = false;

  const [isEyePressed, setIsEyePressed] = useState(false);
  const [isEyeConfirmPasswordPressed, setIsEyeConfirmPasswordPressed] = useState(false);

  const checkError = (flag: boolean) => {
    if (flag === true) {
      hasError = true;
    }

    return flag;
  };

  const token = useToken();

  const submit = async () => {
    const res = validatePassword(password.value);
    if(!res.status) {
      notify(res.error, 'error');
      return;
    }
    if (hasError)
      return;
    interface SubmitRequest {
      result?: {
        message?: string;
        token?: string | false;
        user?: StateUser;
      };
    }
    setLoading(true);

    try {
      const response = await request.post<SubmitRequest>('clients/insert/' + unregisteredUserId.value, {
        name: nome.value,
        numero_cpf: cpf.value,
        //date_of_birth: transformDate(birthday.value),
        email: email.value,
        number_contact: telefone.value,
        address: address.value,
        number: number.value,
        password: password.value,
        user_type: '5',
        nickname: apelido.value,
        /*
        gender: gender.value,
        */
        complement: complement.value,
        latitude: latitude.value.toString(),
        longitude: longitude.value.toString(),
        city: city.value,
        state: state.value,
        district: neighborhood.value, 
        cep: cep.value,
      });

      setLoading(false);
      console.log(response);

      if (response.status === true) {
        /*
        const tokenValue = response?.result?.token;
        const user = response?.result?.user;
        await token.set(tokenValue, user);
        */
        navigate('SucessoCadastro');
        clearForm();
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
        }}
      >
        <TouchableOpacity onPress={() => {
              voltar();
            }}>
         <FontAwesomeIcon
           style={{position: 'relative', marginTop: '5%', marginLeft: 20}}
           icon={faChevronLeft}
           color={colors.white}
           size={32}
           onPress={() => {
             voltar();
           }}
         />
         </TouchableOpacity>
        <Progress step={2} stepTitles={[
          'Dados\npessoais', 
          'Endereço',
          'Dados\nde acesso'
        ]} />
        <PanelSlider
          style={{
            marginTop: 20,
          }}
        >
          <GroupControl>
            <Input
              mode="flat"
              keyboardType="email-address"
              label="Email"
              value={email.value}
              onChangeText={(text) => email.set(text)}
              underlineColor={colors.black}
              allowFontScaling
              onBlur={email.onBlur}
              onSubmitEditing={() => passwordInputRef.current.focus()}
            />
            <InputWarning
              text="Campo obrigatório"
              valid={checkError(email.value === '')}
              visible={email.blurred}
            />
            <InputWarning
              text="Email inválido"
              valid={checkError(!emailValidator.validate(email.value))}
              visible={email.blurred}
            />
          </GroupControl>
          <GroupControl>
            <View>
              <Input
                mode="flat"
                label="Senha"
                secureTextEntry={!isEyePressed}
                value={password.value}
                onChangeText={(text) => password.set(text)}
                underlineColor={colors.black}
                allowFontScaling
                onSubmitEditing={() => confirmPasswordInputRef.current.focus()} 
                onBlur={password.onBlur} 
                ref={passwordInputRef}
              />
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('lightgray', true)}
                onPressIn={() => setIsEyePressed(true)}
                onPressOut={() => setIsEyePressed(false)}
              >
                <View
                  style={{
                    position: 'absolute',
                    right: 15,
                    bottom: 15,
                    padding: 5,
                  }}
                >
                  <Icon
                    style={{
                      fontSize: 20,
                    }}
                    name={isEyePressed ? 'eye-slash' : 'eye'}
                  />
                </View>
              </TouchableNativeFeedback>
            </View>
            <Text>Use 8 ou mais caracteres, com uma combinação de letras e números</Text>
            <InputWarning
              text="Campo obrigatório"
              valid={checkError(password.value === '')}
              visible={password.blurred}
            />
            <InputWarning
              text="Senha inválida"
              valid={!validatePassword(password.value).status}
              visible={password.blurred}
            />
          </GroupControl>
          <GroupControl>
            <View>
              <Input
                mode="flat"
                label="Confirmar senha"
                secureTextEntry={!isEyeConfirmPasswordPressed}
                value={confirmPassword.value}
                onChangeText={(text) => confirmPassword.set(text)}
                underlineColor={colors.black}
                allowFontScaling
                ref={confirmPasswordInputRef}
                onSubmitEditing={() => {
                  checkError(confirmPassword.value !== password.value);
                  submit();
                }} 
                onBlur={confirmPassword.onBlur}
              />
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('lightgray', true)}
                onPressIn={() => setIsEyeConfirmPasswordPressed(true)}
                onPressOut={() => setIsEyeConfirmPasswordPressed(false)}
              >
                <View
                  style={{
                    position: 'absolute',
                    right: 15,
                    bottom: 15,
                    padding: 5,
                  }}
                >
                  <Icon
                    style={{
                      fontSize: 20,
                    }}
                    name={isEyeConfirmPasswordPressed ? 'eye-slash' : 'eye'}
                  />
                </View>
              </TouchableNativeFeedback>
            </View>
            <InputWarning
              text="Campo obrigatório"
              valid={checkError(confirmPassword.value === '')}
              visible={confirmPassword.blurred}
            />
            <InputWarning
              text="As senhas não conferem"
              valid={checkError(confirmPassword.value !== password.value)}
              visible={confirmPassword.blurred}
            />
          </GroupControl>
          <GroupControl>
            <Button
              onPress={submit}
              disabled={hasError}
              text="ENVIAR"
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

export default Cadastro3;

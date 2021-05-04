import React, {useContext, useState, useRef} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {GroupControl, Input} from 'pages/Login/style';
import {View, Alert, StyleSheet, TouchableHighlight, Text} from 'react-native';
import PanelSlider from 'components/PanelSlider';
import GlobalContext from 'src/context';
import {TextInputMask} from 'react-native-masked-text';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Progress from 'components/Progress';
import InputWarning from 'components/InputWarning';
import useWithTouchable from 'src/util/useWithTouchable';
import {colors} from 'src/theme';
import Button from 'components/Button';
import {FCWithAppStackNavigator} from 'pages/AppStackNavigator';
import request from 'util/request';
import Request from 'src/interfaces/Request';
import notify from 'util/notify';
import GlobalStyle from 'components/GlobalStyle';
import {useStateLink} from '@hookstate/core';
const {cpf: cpfValidator, cnpj: cnpjValidator} = require('cpf-cnpj-validator');
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

const {
  cadastro: {
    nameRef: nomeRef,
    phoneRef: telefoneRef,
    apelidoRef,
    cpfRef,
    unregisteredUserIdRef,
    isCompanyRef,
  },
} = GlobalContext;

const Cadastro1: FCWithAppStackNavigator<'Cadastro1'> = ({
  navigation: {navigate},
}) => {
  const apelidoInputRef = useRef(null);
  const telefoneInputRef = useRef(null);
  const cpfInputRef = useRef(null);

  const nome = useWithTouchable(nomeRef);
  const apelido = useWithTouchable(apelidoRef);
  const telefone = useWithTouchable(telefoneRef);
  const cpf = useWithTouchable(cpfRef);
  const unregisteredUserId = useStateLink(unregisteredUserIdRef);
  const isCompany = useStateLink(isCompanyRef);

  const [loading, setLoading] = useState(false);
  const navegar = useNavigation();

  let hasErrors = false;

  const checkError = (flag: boolean) => {
    if (flag === true) {
      hasErrors = true;
    }

    return flag;
  };

  const submit = async () => {
    if (hasErrors) return;
    setLoading(true);

    try {
      const response = await request.post<Request<unknown, 'message'>>(
        'leads/app',
        {
          name: nome.value,
          number_contact: telefone.value,
          user_type: '4',
          nickname: apelido.value,
          numero_cpf: cpf.value,
        },
      );

      setLoading(false);
      console.log(response);

      if (response.status === true) {
        unregisteredUserId.set(response.result.id);
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
    <>
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
            step={0}
            stepTitles={[
              'Dados\npessoais',
              /*
              'Dados\npessoais 2',
              */
              'Endereço',
              'Dados\nde acesso',
              //'Materiais',
            ]}
          />
          <View>
            <PanelSlider
              style={{
                marginTop: 20,
              }}>
              <GroupControl>
                <RadioButton.Group value={isCompany.value.toString()} onValueChange={newValue => isCompany.set(newValue === 'true')}>
                  <View 
                    style={{
                      flexDirection: 'row', 
                      alignItems: 'center'
                    }}
                  >
                    <RadioButton value={new Boolean(false).toString()} />
                    <Text>Pessoa Física</Text>
                  </View>
                  <View 
                    style={{
                      flexDirection: 'row', 
                      alignItems: 'center'
                    }}
                  >
                    <RadioButton value={new Boolean(true).toString()} />
                    <Text>Pessoa Jurídica</Text>
                  </View>
                </RadioButton.Group>
              </GroupControl>
              <GroupControl>
                <Input
                  mode="flat"
                  label={isCompany.value ? "Razão Social" : "Nome Completo"}
                  value={nome.value}
                  onChangeText={text => nome.set(text)}
                  underlineColor={colors.black}
                  allowFontScaling
                  autoCapitalize="words"
                  onBlur={nome.onBlur}
                  onSubmitEditing={() => apelidoInputRef.current.focus()}
                />
                <InputWarning
                  text="Campo obrigatório"
                  valid={checkError(nome.value === '')}
                  visible={nome.blurred}
                />
              </GroupControl>
              <GroupControl>
                <Input
                  mode="flat"
                  label={isCompany.value ? "Nome fantasia" : "Apelido"}
                  value={apelido.value}
                  onChangeText={text => apelido.set(text)}
                  underlineColor={colors.black}
                  allowFontScaling
                  onBlur={apelido.onBlur}
                  ref={apelidoInputRef}
                  onSubmitEditing={() =>
                    telefoneInputRef.current._inputElement.focus()
                  }
                />
                <InputWarning
                  text="Campo obrigatório"
                  valid={checkError(apelido.value === '')}
                  visible={apelido.blurred}
                />
              </GroupControl>
              <GroupControl>
                <TextInputMask
                  type="cel-phone"
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                  }}
                  customTextInput={Input}
                  customTextInputProps={{
                    mode: 'flat',
                    label: 'Telefone',
                    underlineColor: colors.black,
                    allowFontScaling: true,
                  }}
                  value={telefone.value}
                  onChangeText={text => telefone.set(text)}
                  onBlur={telefone.onBlur}
                  ref={telefoneInputRef}
                  onSubmitEditing={() =>
                    cpfInputRef.current._inputElement.focus()
                  }
                />
                <InputWarning
                  text="Campo obrigatório"
                  valid={checkError(telefone.value === '')}
                  visible={telefone.blurred}
                />
              </GroupControl>
              {isCompany.value ? (<GroupControl>
                <TextInputMask
                  type="cnpj"
                  customTextInput={Input}
                  customTextInputProps={{
                    mode: 'flat',
                    label: 'CNPJ',
                    underlineColor: colors.black,
                    allowFontScaling: true,
                  }}
                  value={cpf.value}
                  onChangeText={text => cpf.set(text)}
                  onBlur={cpf.onBlur}
                  ref={cpfInputRef}
                  onSubmitEditing={() => {
                    checkError(!cnpjValidator.isValid(cpf.value));
                    submit();
                  }}
                />
                <InputWarning
                  text="Campo obrigatório"
                  valid={checkError(cpf.value === '')}
                  visible={cpf.blurred}
                />
                <InputWarning
                  text="CNPJ inválido"
                  valid={checkError(!cnpjValidator.isValid(cpf.value))}
                  visible={cpf.blurred}
                />
              </GroupControl>) : (<GroupControl>
                <TextInputMask
                  type="cpf"
                  customTextInput={Input}
                  customTextInputProps={{
                    mode: 'flat',
                    label: 'CPF',
                    underlineColor: colors.black,
                    allowFontScaling: true,
                  }}
                  value={cpf.value}
                  onChangeText={text => cpf.set(text)}
                  onBlur={cpf.onBlur}
                  ref={cpfInputRef}
                  onSubmitEditing={() => {
                    checkError(!cpfValidator.isValid(cpf.value));
                    submit();
                  }}
                />
                <InputWarning
                  text="Campo obrigatório"
                  valid={checkError(cpf.value === '')}
                  visible={cpf.blurred}
                />
                <InputWarning
                  text="CPF inválido"
                  valid={checkError(!cpfValidator.isValid(cpf.value))}
                  visible={cpf.blurred}
                />
              </GroupControl>)}

              <GroupControl>
                <Button
                  onPress={submit}
                  disabled={hasErrors}
                  text="AVANÇAR"
                  fullWidth
                  loading={loading}
                  backgroundColor={colors.newColor}
                />
              </GroupControl>
            </PanelSlider>
          </View>
        </KeyboardAwareScrollView>
      </GlobalStyle>
    </>
  );
};

const styles = StyleSheet.create({});

export default Cadastro1;

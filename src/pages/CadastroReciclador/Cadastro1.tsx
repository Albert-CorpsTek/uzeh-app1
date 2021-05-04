import React, {useState, useRef} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {GroupControl, Input} from 'pages/Login/style';
import {View} from 'react-native';
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
import notify from 'util/notify';
import request from 'util/request';
import Request from 'src/interfaces/Request';
import GlobalStyle from 'components/GlobalStyle';
import {useStateLink} from '@hookstate/core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

const {cnpj: cnpjValidator} = require('cpf-cnpj-validator');

const {
  cadastro: {cnpjRef, nameRef, apelidoRef, unregisteredUserIdRef, phoneRef: telefoneRef},
} = GlobalContext;

const Cadastro1: FCWithAppStackNavigator<'Cadastro1'> = ({
  navigation: {navigate},
}) => {
  const nameInputRef = useRef(null);
  const cnpjInputRef = useRef(null);

  const name = useWithTouchable(nameRef);
  const cnpj = useWithTouchable(cnpjRef);
  const apelido = useWithTouchable(apelidoRef);
  const unregisteredUserId = useStateLink(unregisteredUserIdRef);
  const telefone = useWithTouchable(telefoneRef);

  const [loading, setLoading] = useState(false);
  const navegar = useNavigation();

  const telefoneInputRef = useRef(null);
  const cpfInputRef = useRef(null);

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
          name: name.value,
          user_type: '6',
          nickname: apelido.value,
          numero_cpf: cnpj.value,
        },
      );

      setLoading(false);
      console.log(response);

      if (response.status === true) {
        unregisteredUserId.set(response.result.id);
        navigate('Cadastro2');
      } else {
        notify(response.result.message, 'error');
      }
    } catch (e) {
      console.log(e);
    }
  };

  function voltar() {
    navegar.navigate('SelecionarPerfil');
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
              onPress={() => {
                voltar();
              }}
            />
          </TouchableOpacity>
          <Progress
            step={0}
            stepTitles={[
              'Dados\nempresariais',
              'Endereço',
              'Dados\nde acesso',
              'Materiais que trabalha',
            ]}
          />
          <View>
            <PanelSlider
              style={{
                marginTop: 20,
              }}>
              <GroupControl>
                <Input
                  mode="flat"
                  label="Nome Fantasia"
                  value={apelido.value}
                  onChangeText={text => apelido.set(text)}
                  underlineColor={colors.black}
                  allowFontScaling
                  onBlur={apelido.onBlur}
                  onSubmitEditing={() => telefoneInputRef.current._inputElement.focus()}
                />
                <InputWarning
                  text="Campo obrigatório"
                  valid={checkError(apelido.value === '')}
                  visible={apelido.blurred}
                />
              </GroupControl>
              {/*<GroupControl>
                <Input
                  mode="flat"
                  label="Razão Social"
                  value={name.value}
                  onChangeText={text => name.set(text)}
                  underlineColor={colors.black}
                  allowFontScaling
                  onBlur={name.onBlur}
                  ref={nameInputRef}
                  onSubmitEditing={() =>
                    cnpjInputRef.current._inputElement.focus()
                  }
                />
                <InputWarning
                  text="Campo obrigatório"
                  valid={checkError(name.value === '')}
                  visible={name.blurred}
                />
                </GroupControl>*/}
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
              <GroupControl>
                <TextInputMask
                  type="cnpj"
                  customTextInput={Input}
                  customTextInputProps={{
                    mode: 'flat',
                    label: 'CNPJ',
                    underlineColor: colors.black,
                    allowFontScaling: true,
                  }}
                  value={cnpj.value}
                  onChangeText={text => cnpj.set(text)}
                  onBlur={cnpj.onBlur}
                  ref={cnpjInputRef}
                  onSubmitEditing={() => {
                    checkError(!cnpjValidator.isValid(cnpj.value));
                    submit();
                  }} 
                  ref={cpfInputRef}
                />
                <InputWarning
                  text="Campo obrigatório"
                  valid={checkError(cnpj.value === '')}
                  visible={cnpj.blurred}
                />
                <InputWarning
                  text="CNPJ inválido"
                  valid={checkError(!cnpjValidator.isValid(cnpj.value))}
                  visible={cnpj.blurred}
                />
              </GroupControl>
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

export default Cadastro1;

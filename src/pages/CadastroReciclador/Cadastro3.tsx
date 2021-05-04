import React, {useState, useRef} from 'react';
import {GroupControl, Input} from 'pages/Login/style';
import PanelSlider from 'components/PanelSlider';
import GlobalContext from 'src/context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Progress from 'components/Progress';
import InputWarning from 'components/InputWarning';
import useWithTouchable from 'src/util/useWithTouchable';
import {TextInputMask} from 'react-native-masked-text';
import {colors} from 'src/theme';
import Button from 'components/Button';
import {FCWithAppStackNavigator} from 'pages/AppStackNavigator';
import notify from 'util/notify';
import emailValidator from 'email-validator';
import request from 'util/request';
import Request from 'src/interfaces/Request';
import GlobalStyle from 'components/GlobalStyle';
import {useStateLink} from '@hookstate/core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {
  cadastro: {emailRef, passwordRef, phoneRef, unregisteredUserIdRef},
} = GlobalContext;

const Cadastro2: FCWithAppStackNavigator<'Cadastro2'> = ({
  navigation: {navigate},
}) => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const email = useWithTouchable(emailRef);
  const password = useWithTouchable(passwordRef);
  const phone = useWithTouchable(phoneRef);
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
          email: email.value,
          password: password.value,
          number_contact: phone.value,
        },
      );

      setLoading(false);
      console.log(response);

      if (response.status === true) {
        unregisteredUserId.set(response.result.id);
        navigate('Cadastro4');
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
          step={2}
          stepTitles={[
            'Dados\nempresariais',
            'Endereço',
            'Dados\nde acesso',
            'Materiais que trabalha',
          ]}
        />
        <PanelSlider
          style={{
            marginTop: 20,
          }}>
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
              value={phone.value}
              onChangeText={text => phone.set(text)}
              onBlur={phone.onBlur}
              onSubmitEditing={() => emailInputRef.current.focus()}
            />
            <InputWarning
              text="Campo obrigatório"
              valid={checkError(phone.value === '')}
              visible={phone.blurred}
            />
          </GroupControl>
          <GroupControl>
            <Input
              mode="flat"
              keyboardType="email-address"
              label="Email"
              value={email.value}
              onChangeText={text => email.set(text)}
              underlineColor={colors.black}
              allowFontScaling
              onBlur={email.onBlur}
              ref={emailInputRef}
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
            <Input
              mode="flat"
              label="Senha"
              secureTextEntry={true}
              value={password.value}
              onChangeText={text => password.set(text)}
              underlineColor={colors.black}
              allowFontScaling
              ref={passwordInputRef}
              onSubmitEditing={() => {
                checkError(password.value === '');
                submit();
              }}
            />
            <InputWarning
              text="Campo obrigatório"
              valid={checkError(password.value === '')}
              visible={password.blurred}
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

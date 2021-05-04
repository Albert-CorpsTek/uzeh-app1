import React, {
  useRef, useState, useEffect,
} from 'react';
import PanelSlider from 'components/PanelSlider';
import { useSpring, animated } from 'react-spring';
import * as easings from 'd3-ease';
import { View, Image, TouchableNativeFeedback, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { DIMENSIONS_HEIGHT, DIMENSIONS_WIDTH } from 'components/Screen';
import PanelTitle from 'components/PanelTitle';
import logoPreta from 'img/icone-login.png';
import Button from 'components/Button';
import { colors } from 'src/theme';
import GlobalContext from 'src/context';
import useWithTouchable from 'util/useWithTouchable';
import InputWarning from 'components/InputWarning';
import request from 'util/request';
import useToken from 'util/useToken';
import { StateUser } from 'src/context/auth';
import { FCWithAppStackNavigator } from 'pages/AppStackNavigator';
import GlobalStyle from 'components/GlobalStyle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  TitleWrapper, TitleView, Input, GroupControl, RegisterButton, SenhaButton,
} from './style';
import { useStateLink } from '@hookstate/core';
import { showMessage, hideMessage } from "react-native-flash-message";
import {TextInputMask} from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/FontAwesome5';
const {cpf: cpfValidator, cnpj: cnpjValidator} = require('cpf-cnpj-validator');
import notify from 'util/notify';
import AppButton from 'components/AppButton';
import { TouchableRipple } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '6%'
  },
  input: {
    backgroundColor: colors.lightGreen, 
    borderRadius: 5,
    elevation: 5, 
    paddingLeft: '5%',
    color: colors.white,
  }, 
  label: {
    textTransform: 'uppercase',
    marginBottom: '5%', 
    color: colors.white
  },
  loginButton: {
    paddingVertical: '6%'
  },
  textButton: {
    alignSelf: 'center'
  }
});

const AnimatedTitleWrapper = animated(TitleWrapper);
const AnimatedTitleView = animated(TitleView);
const AnimatedPanelSlider = animated(PanelSlider);

const {
  login: {
    emailRef,
    passwordRef,
    userTypeRef,
    cpfRef,
  },
} = GlobalContext;

const Login: FCWithAppStackNavigator<'Login'> = ({
  route,
  navigation: {
    navigate,
    dangerouslyGetParent,
    goBack
  },
}) => {
  const email = useWithTouchable(emailRef);
  const password = useWithTouchable(passwordRef);
  const cpf = useWithTouchable(cpfRef);
  const token = useToken();
  const userType = useStateLink(userTypeRef);

  const senhaInput = useRef(null);

  let hasError = false;

  const [isEyePressed, setIsEyePressed] = useState(false);

  const checkError = (flag: boolean) => {
    if (flag) {
      hasError = true;
    }

    return flag;
  };

  const [opacity, setOpacity] = useSpring(() => ({ opacity: 0 }));
  const [titleWrapper, setTitleWrapper] = useSpring(() => ({
    height: DIMENSIONS_HEIGHT,
  }));
  const [panelLeft, setPanelLeft] = useSpring(() => ({
    top: DIMENSIONS_HEIGHT,
    left: 0,
  }));
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    interface SubmitRequest {
      result?: {
        token?: string | false;
        user?: StateUser;
      };
    }

    setLoading(true);
    try {
      const response = await request.authPost<SubmitRequest>('users/loginClient', {
        //email: email.value,
        cpf: cpf.value,
        password: password.value,
      });
      console.log(JSON.stringify(response));
      setLoading(false);

      const tokenValue = response?.result?.token;
      const user = response?.result?.user;

      if (tokenValue && user) {
        userTypeRef.set(user.user_type);
        await token.set(tokenValue, user);
        //var routes = dangerouslyGetParent().state.routes;
        navigate('LoggedRoutes', route.params);
      } else {
        notify('Login ou senha incorretos', 'error');
        /*
        showMessage({
          message: 'CPF e/ou senha inválidos',
          type: 'danger',
          autoHide: true,
          icon: "danger",
          duration: 2000,
        });
        */
      }
    } catch(e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const config = {
      duration: 500,
      easing: easings.easeCubicOut,
    };
    setPanelLeft({
      config,
      left: 0,
    });
  }, []);
  // const passwordRef = useRef<typeof TextInput>(null);
  // const focusPassword = () => {
  //   passwordRef.current && passwordRef.current.focus();
  // };
  // const handleKeyPress = () => {
  //   focusPassword();
  // };

  const moveTitleToTop = async () => {
    await new Promise((r) => setTimeout(r, 500));
    setPanelLeft({
      top: 0,
      config: {
        duration: 500,
        easing: easings.easeSinOut,
      },
    });
    setTitleWrapper({
      height: 200,
      config: {
        duration: 500,
        easing: easings.easeSinOut,
      },
    });
  };

  const showTitle = () => {
    setOpacity({
      opacity: 1,
      config: {
        duration: 500,
        easing: easings.easeSinIn,
      },
      onRest: moveTitleToTop,
    });
  };

  useEffect(() => {
    showTitle();
  }, []);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        minHeight: '100%',
      }}
    >
      <GlobalStyle>
        <AnimatedTitleWrapper style={titleWrapper}>
          <AnimatedTitleView style={opacity}>
            <Image
              source={logoPreta}
              style={{
                width: DIMENSIONS_WIDTH * 0.45,
                height: 141,
              }} 
              resizeMode='contain'
            />
          </AnimatedTitleView>
        </AnimatedTitleWrapper>
        {/*<View>
          <AnimatedPanelSlider
            style={panelLeft}
          >*/}
            <View style={styles.container}>
              {/*<GroupControl>
                <PanelTitle>Acesso</PanelTitle>
              </GroupControl>
              <GroupControl>
                <Input
                  mode="flat"
                  label="Email"
                  value={email.value}
                  onChangeText={email.set}
                  underlineColor="black"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  allowFontScaling
                  // onSubmitEditing={handleKeyPress}
                  onBlur={email.onBlur}
                  onSubmitEditing={() => senhaInput.current.focus()}
                  returnKeyType="next"
                />
                <InputWarning
                  text="Email não pode ser vazio"
                  valid={checkError(email.value === '')}
                  visible={email.blurred}
                />
              </GroupControl>*/}
              <GroupControl>
                <Text style={styles.label}>
                  Login
                </Text>
                <TextInput 
                  value={cpf.value} 
                  onChangeText={cpf.set} 
                  style={styles.input} 
                  keyboardType="number-pad" 
                  onBlur={cpf.onBlur} 
                  onSubmitEditing={() => senhaInput.current.focus()} 
                  placeholder="CPF/CNPJ"
                />
                <InputWarning
                  text="CPF/CNPJ não pode ser vazio"
                  valid={checkError(cpf.value === '')}
                  visible={cpf.blurred}
                />
                <InputWarning
                  text="CPF inválido"
                  valid={checkError(!cpfValidator.isValid(cpf.value) && !cnpjValidator.isValid(cpf.value))}
                  visible={cpf.blurred}
                />
              </GroupControl>
              <GroupControl>
                <Text style={styles.label}>
                  Senha
                </Text>
                <View>
                  <TextInput 
                    value={password.value} 
                    onChangeText={password.set} 
                    style={[
                      styles.input,
                      {
                        paddingRight: '20%'
                      }
                    ]} 
                    secureTextEntry={!isEyePressed} 
                    ref={senhaInput} 
                    textContentType="password" 
                    autoCompleteType="password" 
                    onBlur={password.onBlur} 
                    onSubmitEditing={submit} 
                    autoCapitalize='none'
                  />
                  <TouchableOpacity
                    //background={TouchableNativeFeedback.Ripple('lightgray', true)}
                    onPressIn={() => setIsEyePressed(true)}
                    onPressOut={() => setIsEyePressed(false)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      right: '5%',
                      zIndex: 5,
                      elevation: 5,
                      alignItems: 'center',
                      flexDirection: 'row'
                    }} 
                  >
                    <Icon
                      style={{
                        fontSize: 20,
                      }}
                      name={isEyePressed ? 'eye-slash' : 'eye'} 
                      color={colors.white}
                    />                 
                  </TouchableOpacity>
                </View>
                <InputWarning
                  text="Senha não pode ser vazia"
                  valid={checkError(password.value === '')}
                  visible={password.blurred}
                />
              </GroupControl>
              <GroupControl>
                <AppButton
                  onPress={submit}
                  title="ACESSAR"
                  fullWidth
                  disabled={hasError || loading}
                  //disabled={true}
                  loading={loading}
                  backgroundColor={colors.lightOrange} 
                  style={styles.loginButton}
                />
              </GroupControl>
              <GroupControl>
                <TouchableRipple style={styles.textButton}>
                  <Text 
                    style={styles.label} 
                    onPress={() => {
                      navigate('Recover');
                    }}
                  >
                    Esqueci minha senha
                  </Text>
                </TouchableRipple>
              </GroupControl>
              <GroupControl>
                <TouchableRipple style={styles.textButton}>
                  <Text 
                    style={styles.label} 
                    onPress={() => {
                      goBack();
                      /*
                      if (typeof route.params.screenPostLogin === 'undefined')
                        navigate('SelecionarPerfil');
                      else
                        navigate('CadastroColetorGerador');
                      */
                    }}
                  >
                    Fazer cadastro
                  </Text>
                </TouchableRipple>
              </GroupControl>
              {/*<GroupControl>
                <Input
                  mode="flat"
                  label="CPF/CNPJ"
                  value={cpf.value}
                  onChangeText={cpf.set}
                  underlineColor="black"
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  allowFontScaling
                  // onSubmitEditing={handleKeyPress}
                  onBlur={cpf.onBlur}
                  onSubmitEditing={() => senhaInput.current.focus()}
                  returnKeyType="next"
                />
                <InputWarning
                  text="CPF/CNPJ não pode ser vazio"
                  valid={checkError(cpf.value === '')}
                  visible={cpf.blurred}
                />
                <InputWarning
                  text="CPF inválido"
                  valid={checkError(!cpfValidator.isValid(cpf.value) && !cnpjValidator.isValid(cpf.value))}
                  visible={cpf.blurred}
                />
              </GroupControl>
              <GroupControl>
                <Input
                  ref = {senhaInput}
                  mode="flat"
                  label="Senha"
                  value={password.value}
                  onChangeText={password.set}
                  underlineColor="black"
                  allowFontScaling
                  textContentType="password"
                  autoCompleteType="password"
                  secureTextEntry={!isEyePressed}
                  onBlur={password.onBlur}
                  onSubmitEditing={submit}
                />
                <InputWarning
                  text="Senha não pode ser vazia"
                  valid={checkError(password.value === '')}
                  visible={password.blurred}
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
              </GroupControl>
              <GroupControl>
                <Button
                  onPress={submit}
                  text="ENTRAR"
                  fullWidth
                  disabled={hasError || loading}
                  loading={loading}
                  backgroundColor={colors.newColor}
                />
              </GroupControl>
              <GroupControl>
                <SenhaButton
                  onPress={() => {
                    navigate('Recover');
                  }}
                >
                  ESQUECI MINHA SENHA
                </SenhaButton>
              </GroupControl>
              <GroupControl>
                <RegisterButton
                  onPress={() => {
                    if (typeof route.params.screenPostLogin === 'undefined')
                      navigate('SelecionarPerfil');
                    else
                      navigate('CadastroColetorGerador');
                  }}
                >
                  Criar conta
                </RegisterButton>
                </GroupControl>*/}
            </View>
          {/*</AnimatedPanelSlider>
        </View>*/}
      </GlobalStyle>
    </KeyboardAwareScrollView>
  );
};

export default Login;

import React, {
  useState, useEffect,
} from 'react';
import PanelSlider from 'components/PanelSlider';
import { useSpring, animated } from 'react-spring';
import * as easings from 'd3-ease';
import { View, Image } from 'react-native';
import { DIMENSIONS_HEIGHT, DIMENSIONS_WIDTH } from 'components/Screen';
import PanelTitle from 'components/PanelTitle';
import logoPreta from 'img/logo_preta_uzeh.png';
import Button from 'components/Button';
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

const AnimatedTitleWrapper = animated(TitleWrapper);
const AnimatedTitleView = animated(TitleView);
const AnimatedPanelSlider = animated(PanelSlider);

const {
  login: {
    emailRef,
    passwordRef,
  },
  notification: {
    notify,
  },
} = GlobalContext;

const Login: FCWithAppStackNavigator<'Login'> = ({
  navigation: {
    navigate,
  },
}) => {
  const email = useWithTouchable(emailRef);
  const password = useWithTouchable(passwordRef);
  const token = useToken();

  let hasError = false;

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
    const response = await request.authPost<SubmitRequest>('users/loginClient', {
      email: email.value,
      password: password.value,
    });
    setLoading(false);

    const tokenValue = response?.result?.token;
    const user = response?.result?.user;

    if (tokenValue && user) {
      await token.set(tokenValue, user);
      navigate('LoggedRoutes');
    } else {
      notify('Login ou senha incorretos', 'error');
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
        duration: 1000,
        easing: easings.easeSinOut,
      },
    });
    setTitleWrapper({
      height: 200,
      config: {
        duration: 1000,
        easing: easings.easeSinOut,
      },
    });
  };

  const showTitle = () => {
    setOpacity({
      opacity: 1,
      config: {
        duration: 1500,
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
                height: 60,
              }}
            />
          </AnimatedTitleView>
        </AnimatedTitleWrapper>
        <View>
          <AnimatedPanelSlider
            style={panelLeft}
          >
            <View>
              <GroupControl>
                <PanelTitle>Acesso</PanelTitle>
              </GroupControl>
              <GroupControl>
                <Input
                  mode="flat"
                  label="Email"
                  value={email.value}
                  onChangeText={email.set}
                  underlineColor="black"
                  allowFontScaling
                  // onSubmitEditing={handleKeyPress}
                  onBlur={email.onBlur}
                />
                <InputWarning
                  text="Email não pode ser vazio"
                  valid={checkError(email.value === '')}
                  visible={email.blurred}
                />
              </GroupControl>
              <GroupControl>
                <Input
                  mode="flat"
                  label="Senha"
                  value={password.value}
                  onChangeText={password.set}
                  underlineColor="black"
                  allowFontScaling
                  textContentType="password"
                  autoCompleteType="password"
                  secureTextEntry
                  onBlur={password.onBlur}
                />
                <InputWarning
                  text="Senha não pode ser vazia"
                  valid={checkError(password.value === '')}
                  visible={password.blurred}
                />
              </GroupControl>
              <GroupControl>
                <Button
                  onPress={submit}
                  text="ENTRAR"
                  fullWidth
                  disabled={hasError || loading}
                  loading={loading}
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
                  onPress={() => navigate('Cadastro1')}
                >
                  Criar conta
                </RegisterButton>
              </GroupControl>
            </View>
          </AnimatedPanelSlider>
        </View>
      </GlobalStyle>
    </KeyboardAwareScrollView>
  );
};

export default Login;

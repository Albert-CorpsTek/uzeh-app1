import React, {useContext} from 'react';
import {GroupControl, Input} from 'pages/Login/style';
import {View} from 'react-native';
import PanelSlider from 'components/PanelSlider';
import GlobalContext from 'src/context';
import {TextInputMask} from 'react-native-masked-text';
import cpfValidator from 'cpf';
import emailValidator from 'email-validator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Progress from 'components/Progress';
import InputWarning from 'components/InputWarning';
import useWithTouchable from 'src/util/useWithTouchable';
import {colors} from 'src/theme';
import Button from 'components/Button';
import {FCWithAppStackNavigator} from 'pages/AppStackNavigator';

const {
  cadastro: {
    cpfRef,
    emailRef,
    nameRef,
    passwordRef,
    phoneRef,
    rgRef,
    institutionRgRef,
    birthdayRef,
  },
} = GlobalContext;

const Cadastro1: FCWithAppStackNavigator<'Cadastro1'> = ({
  navigation: {navigate},
}) => {
  const name = useWithTouchable(nameRef);
  const cpf = useWithTouchable(cpfRef);
  const email = useWithTouchable(emailRef);
  const password = useWithTouchable(passwordRef);
  // const nickname = useWithTouchable(nicknameRef);
  const phone = useWithTouchable(phoneRef);
  const rg = useWithTouchable(rgRef);
  const institutionRg = useWithTouchable(institutionRgRef);
  const birthDay = useWithTouchable(birthdayRef);

  let hasErrors = false;

  const checkError = (flag: boolean) => {
    if (flag === true) {
      hasErrors = true;
    }

    return flag;
  };

  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          minHeight: '100%',
        }}
        style={{
          minHeight: '100%',
        }}>
        <Progress step={0} />
        <View>
          <PanelSlider
            style={{
              marginTop: 20,
            }}>
            <GroupControl>
              <Input
                mode="flat"
                label="Nome"
                value={name.value}
                onChangeText={text => name.set(text)}
                underlineColor={colors.black}
                allowFontScaling
                onBlur={name.onBlur}
              />
              <InputWarning
                text="Campo obrigatório"
                valid={checkError(name.value === '')}
                visible={name.blurred}
              />
            </GroupControl>
            <GroupControl>
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
            </GroupControl>
            <GroupControl>
              <Input
                mode="flat"
                label="RG"
                value={rg.value}
                onChangeText={text => rg.set(text)}
                underlineColor={colors.black}
                allowFontScaling
                onBlur={rg.onBlur}
              />
              <InputWarning
                text="Campo obrigatório"
                valid={checkError(rg.value === '')}
                visible={rg.blurred}
              />
            </GroupControl>
            <GroupControl>
              <Input
                mode="flat"
                label="Órgão Emissor (RG)"
                value={institutionRg.value}
                onChangeText={text => institutionRg.set(text)}
                underlineColor={colors.black}
                allowFontScaling
                onBlur={institutionRg.onBlur}
              />
              <InputWarning
                text="Campo obrigatório"
                valid={checkError(institutionRg.value === '')}
                visible={institutionRg.blurred}
              />
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
                secureTextEntry
                label="Senha"
                value={password.value}
                onChangeText={text => password.set(text)}
                underlineColor={colors.black}
                allowFontScaling
                onBlur={password.onBlur}
              />
              <InputWarning
                text="Campo obrigatório"
                valid={checkError(password.value === '')}
                visible={password.blurred}
              />
            </GroupControl>
            <GroupControl>
              <Button
                onPress={() => {
                  navigate('Cadastro2');
                }}
                disabled={hasErrors}
                text="AVANÇAR"
                fullWidth
              />
            </GroupControl>
          </PanelSlider>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default Cadastro1;

import React, {useState} from 'react';
import {GroupControl, Input} from 'pages/Login/style';
import PanelSlider from 'components/PanelSlider';
import GlobalContext from 'src/context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Progress from 'components/Progress';
import InputWarning from 'components/InputWarning';
import useWithTouchable from 'src/util/useWithTouchable';
import Button from 'components/Button';
import {colors} from 'src/theme';
import {TextInputMask} from 'react-native-masked-text';
import {useStateLink} from '@hookstate/core';
import transformDate from 'util/transformDate';
import request from 'util/request';
import {FCWithAppStackNavigator} from 'pages/AppStackNavigator';
import notify from 'util/notify';
import Request from 'src/interfaces/Request';

const {
  cadastro: {
    creditCardNumberRef,
    expirationDateRef,
    cardSecurityCodeRef,
    addressRef,
    cepRef,
    cityRef,
    cpfRef,
    emailRef,
    nameRef,
    neighborhoodRef,
    numberRef,
    phoneRef,
    stateRef,
    rgRef,
    birthdayRef,
    institutionRgRef,
    clearForm,
    passwordRef,
  },
} = GlobalContext;

const Cadastro3: FCWithAppStackNavigator<'Cadastro3'> = ({
  navigation: {navigate},
}) => {
  const creditCardNumber = useWithTouchable(creditCardNumberRef);
  const expirationDate = useWithTouchable(expirationDateRef);
  const cardSecurityCode = useWithTouchable(cardSecurityCodeRef);
  const address = useStateLink(addressRef);
  const cep = useStateLink(cepRef);
  const city = useStateLink(cityRef);
  const cpf = useStateLink(cpfRef);
  const email = useStateLink(emailRef);
  const name = useStateLink(nameRef);
  const neighborhood = useStateLink(neighborhoodRef);
  const number = useStateLink(numberRef);
  const phone = useStateLink(phoneRef);
  const state = useStateLink(stateRef);
  const rg = useStateLink(rgRef);
  const birthday = useStateLink(birthdayRef);
  const institutionRg = useStateLink(institutionRgRef);
  const password = useStateLink(passwordRef);

  const [loading, setLoading] = useState(false);

  let hasError = false;

  const checkError = (flag: boolean) => {
    if (flag === true) {
      hasError = true;
    }

    return flag;
  };

  const submit = async () => {
    setLoading(true);

    try {
      const response = await request.post<Request<unknown, 'message'>>(
        'clients/insert',
        {
          name: name.value,
          numero_cpf: cpf.value,
          numero_rg: rg.value,
          institution_rg: institutionRg.value,
          date_of_birth: transformDate(birthday.value),
          email: email.value,
          number_contact: phone.value,
          address: address.value,
          number: number.value,
          district: neighborhood.value,
          city: city.value,
          state: state.value,
          cep: cep.value,
          card_number: creditCardNumber.value.replace(/\s/g, ''),
          card_expiration_month: expirationDate.value.slice(0, 2),
          card_expiration_year: expirationDate.value.slice(3),
          card_code: cardSecurityCode.value,
          password: password.value,
        },
      );

      setLoading(false);

      if (response.status === true) {
        navigate('SucessoCadastro');
        clearForm();
      } else {
        notify(response.result.message, 'error');
      }
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        minHeight: '100%',
      }}
      style={{
        minHeight: '100%',
      }}>
      <Progress step={2} />
      <PanelSlider
        style={{
          marginTop: 20,
        }}>
        <GroupControl>
          <TextInputMask
            type="credit-card"
            customTextInput={Input}
            customTextInputProps={{
              mode: 'flat',
              label: 'Número do cartão de crédito',
              underlineColor: colors.black,
              allowFontScaling: true,
              textContentType: 'creditCardNumber',
            }}
            value={creditCardNumber.value}
            onChangeText={text => creditCardNumber.set(text)}
            onBlur={creditCardNumber.onBlur}
          />
          <InputWarning
            text="Campo obrigatório"
            valid={checkError(creditCardNumber.value === '')}
            visible={creditCardNumber.blurred}
          />
        </GroupControl>
        <GroupControl>
          <TextInputMask
            type="datetime"
            options={{
              format: 'MM/YY',
            }}
            customTextInput={Input}
            customTextInputProps={{
              mode: 'flat',
              label: 'Validade do cartão (MM/YY)',
              underlineColor: colors.black,
              allowFontScaling: true,
            }}
            value={expirationDate.value}
            onChangeText={text => expirationDate.set(text)}
            onBlur={expirationDate.onBlur}
          />
          <InputWarning
            text="Campo obrigatório"
            valid={checkError(expirationDate.value === '')}
            visible={expirationDate.blurred}
          />
          <InputWarning
            text="Validade do cartão em formato inválido, utilize o padrão MM/YY"
            valid={checkError(!/\d\d\/\d\d/.test(expirationDate.value))}
            visible={expirationDate.blurred}
          />
        </GroupControl>
        <GroupControl>
          <Input
            mode="flat"
            keyboardType="number-pad"
            label="Código de segurança"
            value={cardSecurityCode.value}
            onChangeText={text => cardSecurityCode.set(text)}
            underlineColor={colors.black}
            allowFontScaling
            onBlur={cardSecurityCode.onBlur}
          />
          <InputWarning
            text="Campo obrigatório"
            valid={checkError(cardSecurityCode.value === '')}
            visible={cardSecurityCode.blurred}
          />
        </GroupControl>
        <GroupControl>
          <Button
            onPress={submit}
            disabled={hasError}
            text="ENVIAR"
            fullWidth
            loading={loading}
          />
        </GroupControl>
      </PanelSlider>
    </KeyboardAwareScrollView>
  );
};

export default Cadastro3;

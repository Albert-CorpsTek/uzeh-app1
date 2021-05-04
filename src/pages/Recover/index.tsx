import React, { useEffect, useRef } from 'react';
import { Text, RadioButton } from 'react-native-paper';
import { colors } from 'src/theme';
import { View, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import PanelTitle from 'components/PanelTitle';
import { GroupControl, Input } from 'pages/Login/style';
import GlobalContext from 'src/context';
import { useStateLink, useState } from '@hookstate/core';
import { FCWithLoggedStackNavigator } from 'pages/LoggedStackNavigator';
import { StyledButton } from 'pages/Request/style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import InputWarning from 'components/InputWarning';
import useError from 'util/useError';
//import cpfValidator from 'cpf';
import useStateWithTouchable from 'util/useStateWithTouchable';
import emailValidator from 'email-validator';
import useWithTouchable from 'util/useWithTouchable';
import request from 'util/request';
import notify from 'util/notify';
import Topbar from 'components/Topbar';
import AppButton from 'components/AppButton';
//import TextInputMask from 'react-native-text-input-mask';
import { TextInputMask } from 'react-native-masked-text';

const { cpf: cpfValidator, cnpj: cnpjValidator } = require('cpf-cnpj-validator');

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkGreen,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    minHeight: '100%',
  },

  text: {
    justifyContent: 'center',
    textAlign: 'center',
  },

  textback: {
    textAlign: 'center',
    fontSize: 16,
  },
  radioButtonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    backgroundColor: colors.lightGreen,
    paddingLeft: '2%',
    aspectRatio: 3.2,
    borderRadius: 5,
    borderWidth: 1
  },
  label: {
    textTransform: 'uppercase',
    marginBottom: '5%'
  },
  input: { 
    borderRadius: 5,
    elevation: 5, 
    paddingLeft: '5%',
    color: colors.white,
    backgroundColor: colors.lightGreen
  },
  buttonContainer: {
    marginTop: '5%'
  }
});

const {
  recoverpass: {
    cpfRef,
    emailRef,
    clearForm,
  }
} = GlobalContext;

const Recover: FCWithLoggedStackNavigator<'Recover'> = ({
  navigation: {
    navigate,
    addListener,
  },
}) => {
  const cpf = useWithTouchable(cpfRef);
  const email = useWithTouchable(emailRef);
  const type = useState('cpf');
  const { check, hasError } = useError();
  const emailInputRef = useRef(null);

  const submitPasswordChange = async () => {
    try {
      const response = await request.post('users/getNewPasswordClient', {
        cpf: cpf.value,
        email: email.value,
      });
  
      if (response.status) {
        notify(response.result.email_result as string, 'success');
      } else {
        notify(response.result.msg_erro, 'error');
      }
      clearForm();
      navigate("Login");
    } catch(e) {
      console.log(e);
    }
  };

  /*
  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      check(false);
    });

    return unsubscribe;
  }, []);
  */

  return (
    <>
    <Topbar title="Recupere sua conta" />
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
    >
      <View />
      <GroupControl>
        <Text style={styles.text}>
          {`Insira o email vinculado à sua conta, iremos\n iniciar o processo para recuperar sua senha!`}
        </Text>
      </GroupControl>
      <GroupControl>
        <RadioButton.Group onValueChange={newValue => type.set(newValue)} value={type.value}>
          <View style={styles.radioButtonsContainer}>
            <TouchableWithoutFeedback onPress={() => type.set('cpf')}>
              <View 
                style={[
                  styles.radioButtonContainer,
                  {
                    borderColor: type.value == 'cpf' ? colors.lightOrange : colors.transparent,
                    backgroundColor: type.value == 'cpf' ? colors.lightGreen : colors.newBlack
                  }
                ]}>
                <RadioButton 
                  value="cpf" 
                  uncheckedColor={colors.newBlack} 
                  color={colors.lightOrange}
                />
                <Text style={{ color: type.value == 'cpf' ? colors.lightOrange : colors.white }}>CPF</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => type.set('cnpj')}>
              <View 
                style={[
                  styles.radioButtonContainer,
                  {
                    borderColor: type.value == 'cnpj' ? colors.lightOrange : colors.transparent,
                    backgroundColor: type.value == 'cnpj' ? colors.lightGreen : colors.newBlack
                  }
                ]}>
                <RadioButton 
                  value="cnpj" 
                  uncheckedColor={colors.newBlack} 
                  color={colors.lightOrange}
                />
                <Text style={{ color: type.value == 'cnpj' ? colors.lightOrange : colors.white }}>CNPJ</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </RadioButton.Group>
      </GroupControl>
      <GroupControl>
        <Text style={styles.label}>{type.get()}</Text>
        <TextInputMask
          style={styles.input}
          value={cpf.value}
          onChangeText={cpf.set}
          onBlur={cpf.onBlur} 
          //mask={type.value == 'cpf' ? '[000].[000].[000]-[00]' : '[00].[000].[000]/[0000]-[00]'} 
          type={'cpf'} 
          onSubmitEditing={() => emailInputRef.current.focus()}
        />
        <InputWarning
          text="Campo obrigatório"
          valid={check(cpf.value === '')}
          visible={cpf.blurred}
        />
        <InputWarning
          text={type.get().toUpperCase() + ' inválido'}
          valid={type.get() === 'cpf' ? check(!cpfValidator.isValid(cpf.value)) : check(!cnpjValidator.isValid(cpf.value))}
          visible={cpf.blurred}
        />
      </GroupControl>
      <GroupControl>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email.value}
          onChangeText={email.set}
          allowFontScaling
          onBlur={email.onBlur}
          style={styles.input} 
          keyboardType="email-address" 
          ref={emailInputRef}
        />
        <InputWarning
          text="Campo obrigatório"
          valid={check(email.value === '')}
          visible={email.blurred}
        />
        <InputWarning
          text="Email inválido"
          valid={check(!emailValidator.validate(email.value))}
          visible={email.blurred}
        />
      </GroupControl>
      <GroupControl style={styles.buttonContainer}>
        <AppButton 
          title="Enviar Email" 
          fullWidth={true} 
          onPress={submitPasswordChange} 
          backgroundColor={colors.lightOrange} 
          uppercase={true} 
          disabled={hasError.current} 
        />
      </GroupControl>
    </KeyboardAwareScrollView>
    </>
  );
};

export default Recover;

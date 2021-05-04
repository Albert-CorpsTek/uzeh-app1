import React, {useRef, useState} from 'react';
import Container from 'components/Container';
import GlobalContext from 'src/context';
import {Input} from 'pages/Login/style';
import {ScrollView} from 'react-native';
import InputWarning from 'components/InputWarning';
import useWithTouchable from 'util/useWithTouchable';
import Button from 'components/Button';
import request from 'util/request';
import Request from 'src/interfaces/Request';
import notify from 'util/notify';
import {FCWithLoggedStackNavigator} from 'pages/LoggedStackNavigator';
import {colors} from 'src/theme';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Topbar from 'components/Topbar';

const {
  profile: {
    editPassword: {oldPasswordRef, confirmNewPasswordRef, newPasswordRef},
  },
} = GlobalContext;

const EditPassword: FCWithLoggedStackNavigator<'EditPassword'> = ({
  navigation: {navigate},
}) => {
  const oldPassword = useWithTouchable(oldPasswordRef);
  const confirmNewPassword = useWithTouchable(confirmNewPasswordRef);
  const newPassword = useWithTouchable(newPasswordRef);
  const arePasswordsMatching = newPassword.value === confirmNewPassword.value;

  const [loading, setLoading] = useState(false);
  const navegar = useNavigation();

  const submit = async () => {
    interface SubmitRequest{
      result?:{
        token?: string | false;
      };
    }

    setLoading(true);
    const response2 = await request.post<SubmitRequest>('users/loginClient',{
      oldPassword: oldPassword.value,
    });

    const tokenValue = response2?.result?.token;
    console.log(oldPassword);
    setLoading(false);

    const response = await request.authPost<Request<string, 'msg_erro'>>(
      'Clients/newPassword',
      {
        new_password: newPassword.value
      }
    );

    if (response.status === true) {
      notify('Senha atualizada com sucesso!', 'success');
      navegar.goBack();
    } else {
      notify(response.result.msg_erro, 'error');
    }
  }

  Icon.loadFont();
  function navigateBack() {
    navegar.goBack();
  }

  const passInput = useRef(null);
  const newPassInput = useRef(null);

  return (
    <>
      <Topbar title="Alterar senha" />
      <ScrollView
        contentContainerStyle={{
          backgroundColor: 'white',
          minHeight: '100%',
        }}>
        <Container vertical horizontal>
          <Container pb>
            <Input
              autoFocus
              secureTextEntry
              label="Senha Atual"
              value={oldPassword.value}
              onChangeText={text => oldPassword.set(text)}
              returnKeyType="next"
              onSubmitEditing={() => {
                passInput.current.focus();
              }}
            />
            <Input
              ref={passInput}
              secureTextEntry
              label="Nova senha"
              value={newPassword.value}
              onChangeText={text => newPassword.set(text)}
              returnKeyType="next"
              onSubmitEditing={() => {
                newPassInput.current.focus();
              }}
            />
          </Container>
          <Container pb>
            <Input
              ref={newPassInput}
              secureTextEntry
              label="Confirmar nova senha"
              value={confirmNewPassword.value}
              onChangeText={text => confirmNewPassword.set(text)}
              onBlur={confirmNewPassword.onBlur}
            />
            <InputWarning
              text="As senhas não conferem!"
              valid={!arePasswordsMatching}
              visible={confirmNewPassword.blurred}
            />
          </Container>
          <Container pt>
            <Button
              text="ENVIAR"
              fullWidth
              disabled={!arePasswordsMatching || newPassword.value === ''}
              onPress={submit}
              backgroundColor={colors.contrast2}
            />
          </Container>
        </Container>
      </ScrollView>
    </>
  );
};

export default EditPassword;
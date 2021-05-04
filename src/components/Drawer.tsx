import React, {useEffect, useState} from 'react';
import {
  Surface,
  TouchableRipple,
  Text,
  IconButton,
  Avatar,
  ActivityIndicator,
  Button,
  Title
} from 'react-native-paper';
import styled from 'styled-components/native';
import {Theme, colors} from 'src/theme';
import {animated, useSpring} from 'react-spring';
import {View, TouchableWithoutFeedback, Linking, BackHandler} from 'react-native';
import avatarImg from 'img/avatar.png';
import useToken from 'util/useToken';
import GlobalContext from 'src/context';
import {useStateLink, useStateLinkUnmounted} from '@hookstate/core';
import {RootAppStackParamList} from 'pages/AppStackNavigator';
import {ScrollView} from 'react-native-gesture-handler';
import {
  useNavigation,
  useNavigationState,
  useIsFocused,
} from '@react-navigation/native';
import {
  RootLoggedStackParamList,
  FCWithLoggedStackNavigator,
} from 'pages/LoggedStackNavigator';
//import OneSignal from 'react-native-onesignal';
import {DIMENSIONS_WIDTH} from './Screen';

import TableWrapper from 'components/Table/TableWrapper';
import TableRow from 'components/Table/TableRow';
import TableLabel from 'components/Table/TableLabel';
import TableValue from 'components/Table/TableValue';
import NormalText from 'components/NormalText';
import BoldText from 'components/BoldText';
import handleAddress from 'util/handleAddress';
import Container from 'components/Container';
import request from 'util/request';
import pickImage from 'util/pickImage';
import storage from 'util/storage';
import NormalTextInput from 'components/NormalTextInput';
import notify from 'util/notify';
const {cpf: cpfValidator, cnpj: cnpjValidator} = require('cpf-cnpj-validator');
import maskTelephone from 'util/maskTelephone';
import TextInputMask from 'react-native-text-input-mask';
import NormalTextInputMask from 'components/NormalTextInputMask';
import AppButton from 'components/AppButton';
import ImagePicker from 'components/ImagePicker';
import RNGooglePlaces from 'react-native-google-places';

const StyledSurface = styled(Surface)`
  position: absolute;
  width: 80%;
  max-width: 400px;
  min-width: 250px;
  height: 100%;
  padding-bottom: 56px;
  z-index: 1;
  background-color: ${(t: Theme) => t.theme.color.darkGreen};
  elevation: 4;
`;

const StyledText = styled(Text)`
  color: ${(t: Theme) => t.theme.color.black};
  font-size: 18px;
`;
interface StyledTouchableRippleProps {
  selected?: boolean;
}

const StyledTouchableRipple = styled(TouchableRipple).attrs(
  (p: StyledTouchableRippleProps) => p,
)`
  text-align: left;
  padding: 5px 20px;
  background-color: ${p => (p.selected ? 'rgba(0, 0, 0, 0.1)' : 'transparent')};
`;

const Selected = styled(View)`
  position: absolute;
  background-color: ${(p: Theme) => p.theme.color.contrast};
  left: -20px;
  width: 10px;
  height: 46px;
`;

const StyledView = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const StyledIconButton = styled(IconButton)`
  margin: 0;
  margin-bottom: 8px;
  margin-right: 9px;
`;

const Line = styled(View)`
  height: 1px;
  width: 100%;
  background-color: ${(t: Theme) => t.theme.color.contrast};
  opacity: 0.5;
  margin: 0 auto;
`;

const StyledButton = styled(Button)`
  margin-top: 9px;
`;

interface ItemProps {
  label: string;
  path?: keyof RootLoggedStackParamList | 'Login';
  onClick?: Function;
  underline?: boolean;
  topline?: boolean;
  selected?: boolean;
  icon?: string;
  navigate: (
    name: keyof (RootLoggedStackParamList & RootAppStackParamList),
  ) => void;
}

const Item: React.FC<ItemProps> = ({
  label,
  path,
  onClick,
  underline,
  topline,
  selected,
  icon,
  navigate,
}) => (
  <>
    {topline && <Line />}
    <StyledTouchableRipple
      selected={selected}
      onPress={() => {
        path && navigate(path);
        onClick && onClick();
      }}>
      <StyledView>
        {selected && <Selected />}
        {icon && <StyledIconButton icon={icon} color={colors.black} />}
        <StyledText>{label}</StyledText>
      </StyledView>
    </StyledTouchableRipple>
    {underline && <Line />}
  </>
);

Item.defaultProps = {
  underline: false,
  topline: false,
  selected: false,
};

const AnimatedSurface = animated(StyledSurface);

interface DrawerProps {
  open: boolean;
  onClose: Function;
}

const AvatarWrapper = styled(TouchableRipple)`
  display: flex;
  position: relative;
  padding: 20px;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
`;

const AvatarNameWrapper = styled(View)`
  width: ${DIMENSIONS_WIDTH * 0.8 - 110}px;
`;

const AvatarName = styled(Text)`
  font-size: 18px;
  margin-left: 16px;
`;

const AvatarInfo = styled(Text)`
  margin-top: 5px;
  font-size: 14px;
  margin-left: 16px;
  color: ${(t: Theme) => t.theme.color.contrast};
`;

const {
  drawer: {
    perfilPhotoRef,
    fetchPerfilPhoto,
    actualRouteRef,
    fetchUser,
    userRef,
  },
  profile: { 
    profileRef, 
    fetchProfile, 
    loadingProfileRef,
    editProfile
  },
} = GlobalContext;

const Drawer: React.FC<DrawerProps> = ({open, onClose}) => {
  const {unset} = useToken();
  const user = useStateLink(userRef);
  const perfilPhoto = useStateLink(perfilPhotoRef);
  const actualRoute = useStateLink(actualRouteRef);
  const authState = useStateLinkUnmounted(GlobalContext.auth.authStateRef);
  const [style, setStyle] = useSpring(() => ({
    left: 2 * DIMENSIONS_WIDTH,
  }));

  const {navigate} = useNavigation();

  const profile = useStateLink(profileRef);
  const loadingProfile = useStateLink(loadingProfileRef);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingCpf, setIsEditingCpf] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const openSearchModal = () => {
    RNGooglePlaces.openAutocompleteModal(
      {
        country: 'BR',
        useOverlay: true,
      },
      ['addressComponents', 'location'],
    ).then((place) => {
      var addressComponents = place.addressComponents;
      addressComponents.forEach(addressComponent => {
        var newData = {};
        switch (addressComponent.types[0]) {
          case 'postal_code':
            newData.cep = addressComponent.shortName;
            break;
          case 'street_number':
            newData.number = addressComponent.shortName;
            break;
          case 'route':
            newData.address = addressComponent.shortName;
            break;
          case 'sublocality_level_1':
            newData.district = addressComponent.shortName;
            break;
          case 'administrative_area_level_2':
            newData.city = addressComponent.shortName;
            break;
          case 'administrative_area_level_1':
            newData.state = addressComponent.shortName;
            break;
          default:
            break;
        }
        editProfile(newData);
      });
    })
  };

  function maskCPF(){
    return profile.value.cpf
          .replace(/\D/g, '')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})/, '$1-$2')
          .replace(/(-\d{2})\d+?$/, '$1');
  };

  const renderPerfilTable = () => {
    if (loadingProfile.value === true) {
      return <ActivityIndicator />;
    }

    if (profile.value === undefined) {
      return null;
    }

    return (
      <Container pt>
        <TableWrapper>
          <TableRow>
            <TableLabel>
              <BoldText>Nome</BoldText>
            </TableLabel>
            <TableValue>
              {isEditingName ? 
                <NormalTextInput 
                  value={profile.value.name} 
                  onChangeText={text => profile.nested?.name.set(text)} 
                  onEndEditing={() => {
                    setIsEditingName(false);
                    if (profile.value?.name === '') {
                      fetchProfile();
                      notify('Nome não pode ser vazio', 'error');
                    } else {
                      editProfile({ name: profile.value?.name });
                      notify('Nome salvo com sucesso', 'success');
                    }
                  }} 
                  autoFocus={true}
                /> : <NormalText 
                  align="right" 
                  onPress={() => setIsEditingName(true)}>
                  {profile.value.name}
                </NormalText>}
            </TableValue>
          </TableRow>
          <TableRow>
            <TableLabel>
              <BoldText>CPF</BoldText>
            </TableLabel>
            <TableValue>
              {isEditingCpf ? 
                <NormalTextInput 
                  value={maskCPF()} 
                  onChangeText={text => profile.nested?.cpf.set(text)} 
                  onEndEditing={() => {
                    setIsEditingCpf(false);
                    if (profile.value?.cpf === '') {
                      fetchProfile();
                      notify('CPF não pode ser vazio', 'error');
                    } else if (!cpfValidator.isValid(profile.value?.cpf)) {
                      fetchProfile();
                      notify('CPF inválido', 'error');
                    } else {
                      editProfile({ cpf: profile.value?.cpf });
                      notify('CPF salvo com sucesso', 'success');
                    }
                  }} 
                  autoFocus={true}
                /> : <NormalText 
                  align="right" 
                  onPress={() => setIsEditingCpf(true)}>
                  {maskCPF()}
                </NormalText>}
            </TableValue>
          </TableRow>
          <TableRow>
            <TableLabel>
              <BoldText>Endereço</BoldText>
            </TableLabel>
            <TableValue>
              <NormalText 
                align="right" 
                onPress={() => openSearchModal()}>
                {handleAddress({
                  address: profile.value.address,
                  cep: profile.value.cep,
                  city: profile.value.city,
                  district: profile.value.district ?? undefined,
                  number: profile.value.number,
                  state: profile.value.state,
                  complement: profile.value.complement ?? undefined,
                })}
              </NormalText>
            </TableValue>
          </TableRow>
          <TableRow>
            <TableLabel>
              <BoldText>Email</BoldText>
            </TableLabel>
            <TableValue>
              {isEditingEmail ? 
                <NormalTextInput 
                  value={profile.value.email} 
                  onChangeText={text => profile.nested?.email.set(text)} 
                  onEndEditing={() => {
                    setIsEditingEmail(false);
                    if (profile.value?.cpf === '') {
                      fetchProfile();
                      notify('Email não pode ser vazio', 'error');
                    } else {
                      editProfile({ cpf: profile.value?.cpf });
                      notify('Email salvo com sucesso', 'success');
                    }
                  }} 
                  autoFocus={true}
                /> : <NormalText 
                  align="right" 
                  onPress={() => setIsEditingEmail(true)}>
                    {profile.value.email}
                </NormalText>}
            </TableValue>
          </TableRow>
          <TableRow>
            <TableLabel>
              <BoldText>Telefone</BoldText>
            </TableLabel>
            <TableValue>
              {isEditingPhone ? 
                <NormalTextInputMask 
                  value={profile.value.phone} 
                  onChangeText={text => profile.nested?.phone.set(text)} 
                  autoFocus={true} 
                  mask="([00]) [0] [0000]-[0000]" 
                  onSubmitEditing={() => setIsEditingPhone(false)}
                /> : <NormalText 
                  align="right" 
                  onPress={() => setIsEditingPhone(true)}>
                  {maskTelephone(profile.value.phone)}
                </NormalText>}
            </TableValue>
          </TableRow>
        </TableWrapper>
      </Container>
    );
  };

  const backAction = () => {
    onClose();
    return true;
  };

  useEffect(() => {
    fetchPerfilPhoto();
    fetchUser();
    fetchProfile();

    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    if (open) {
      setStyle({
        left: Math.round(DIMENSIONS_WIDTH * 0.2),
      });
    } else {
      setStyle({
        left: 2 * DIMENSIONS_WIDTH,
      });
    }
  }, [open, setStyle]);

  const renderPerfilPhoto = () => {
    /*
    if (perfilPhoto.value === undefined) {
      return <ActivityIndicator />;
    }
    */

    return (
      <Avatar.Image
        source={
          perfilPhoto.value
            ? {
                uri: perfilPhoto.value,
              }
            : avatarImg
        }
        size={70}
      />
    );
  };

  const renderPerfilNames = () => {
    if (!user.value) {
      return <ActivityIndicator />;
    }

    /*
    return (
      <AvatarNameWrapper>
        <AvatarName numberOfLines={2} lineBreakMode="middle">
          {user.value.name}
        </AvatarName>
        <AvatarInfo>{user.value.nick}</AvatarInfo>
      </AvatarNameWrapper>
    );*/
    return (
      <>
        <Text 
          style={{
            marginBottom: '10%',
            textAlign: 'center'
          }}
        >
          {user.value.name}
        </Text>
        <Avatar.Image
          source={
            perfilPhoto.value ? {
              uri: perfilPhoto.value,
            } : avatarImg
          }
          size={70} 
          style={{
            marginBottom: '5%'
          }}
        />
        <Title 
          style={{
            textAlign: 'center'
          }}
        >
          {user.value.name}
        </Title>
        <TouchableRipple
          onPress={() => {
            pickImage(handleAvatarClick);
          }}>
          <Text style={{ color: colors.lightOrange }}>editar foto</Text>
        </TouchableRipple>
      </>
    );
  };

  const renderPerfilName = () => {
    if (!user.value) {
      return <ActivityIndicator />;
    }
    return <Text>{user.value.name}</Text>;
  };

  const handleAvatarClick = async (url: string) => {
    try {
      const response = await request.authUploadImage2('Clients/uploadProfile', [{
        name: 'perfil',
        filename: 'perfil-photo.jpg',
        type: 'image/jpg',
        data: url,
      }]);

      const { status } = await response.info();

      if (status === 200) {
        fetchPerfilPhoto();
      }
    } catch {
    }
  };

  const openTermsOfService = () => {
    Linking.openURL("https://app.uzeh.com.br/uzeh-admin/users/termopriv");
  };

  return (
    <>
    {open && <TouchableWithoutFeedback onPress={onClose}>
      <View 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(52, 52, 52, 0.5)',
        }} 
      />
    </TouchableWithoutFeedback>}
    <AnimatedSurface style={style}>
      <ScrollView style={{ marginHorizontal: '5%' }}>
        <View
          style={{
            paddingVertical: "5%",
            width: '100%',
            alignItems: 'center',
          }}>
          {renderPerfilNames()}
        </View>
        {renderPerfilTable()}
        <AppButton  
          backgroundColor={colors.lightGreen} 
          fullWidth={true} 
          onPress={() => {
            navigate("ChangePassword");
            onClose();
          }} 
          title="Alterar a Senha" 
          style={{ marginTop: '3%' }}
        />
        <AppButton 
          title="Termos de Uso" 
          onPress={openTermsOfService} 
          fullWidth={true} 
          backgroundColor={colors.lightGreen} 
          style={{ marginTop: '3%' }}
        />
        <AppButton 
          title="sair" 
          backgroundColor={colors.lightGreen} 
          onPress={async () => {
            try {
              //await storage.remove('token');
              await unset();
            } catch (err) {
              console.log(err);
            }
            navigate('Login', {
              screenPostLogin: 'Home'
            });
            onClose();
          }} 
          fullWidth={true} 
          style={{ marginTop: '3%' }}
        />
        {/* Coletor */}
        {/*authState.value.user.user_type == 4 && (
          <>
            <View
              style={{
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 20,
                marginLeft: 20,
              }}
            />
            <Item
              icon="account-circle"
              label="Perfil"
              path="Profile"
              onClick={onClose}
              selected={actualRoute.value === 'Profile'}
              navigate={navigate}
            />
            <Item
              icon="recycle"
              label="Materiais"
              path="Materials"
              onClick={onClose}
              selected={actualRoute.value === 'Pedidos'}
              navigate={navigate}
            />
            <Item
              icon="cash-multiple"
              label="Financeiro"
              path="InOrder"
              onClick={onClose}
              selected={actualRoute.value === 'ServicosAprovados'}
              navigate={navigate}
            />
            <Item
              icon="clipboard-check-outline"
              label="Coletas"
              path="InOrder"
              onClick={onClose}
              selected={actualRoute.value === 'ServicosAgendados'}
              navigate={navigate}
            />

            <View
              style={{
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 20,
                marginLeft: 20,
              }}
            />

            <Item
              icon="account-plus"
              label="Planos"
              path="Plans"
              onClick={onClose}
              selected={actualRoute.value === 'ServicosRealizados'}
              navigate={navigate}
            />
            <Item
              icon="account-multiple"
              label="Convidar Amigos"
              path="InOrder"
              onClick={onClose}
              selected={actualRoute.value === 'Recebimentos'}
              navigate={navigate}
            />
            <View
              style={{
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 20,
                marginLeft: 20,
              }}
            />
            <Item
              icon="help-circle-outline"
              label="Ajuda"
              path="InOrder"
              onClick={onClose}
              selected={actualRoute.value === 'Recebimentos'}
              navigate={navigate}
            />
            <Item
              icon="file-document"
              label="Termos de uso"
              path="UserTerms"
              onClick={onClose}
              selected={actualRoute.value === 'Recebimentos'}
              navigate={navigate}
            />
          </>
            )*/}
        {/* Gerador */}
        {/*authState.value.user.user_type == 5 && (
          <>
            <View
              style={{
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 20,
                marginLeft: 20,
              }}
            />
            <Item
              icon="account-circle"
              label="Perfil"
              path="Profile"
              onClick={onClose}
              selected={actualRoute.value === 'Profile'}
              navigate={navigate}
            />
            <Item
              icon="clipboard-check-outline"
              label="Coletas"
              path="InOrder"
              onClick={onClose}
              selected={actualRoute.value === 'ServicosAgendados'}
              navigate={navigate}
            />

            <View
              style={{
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 20,
                marginLeft: 20,
              }}
            />

            <Item
              icon="account-multiple"
              label="Convidar Amigos"
              path="InOrder"
              onClick={onClose}
              selected={actualRoute.value === 'Recebimentos'}
              navigate={navigate}
            />
            <Item
              icon="help-circle-outline"
              label="Ajuda"
              path="InOrder"
              onClick={onClose}
              selected={actualRoute.value === 'Recebimentos'}
              navigate={navigate}
            />
            <Item
              icon="file-document"
              label="Termos de uso"
              path="UserTerms"
              onClick={onClose}
              selected={actualRoute.value === 'Recebimentos'}
              navigate={navigate}
            />
          </>
            )*/}
        {/* Reciclador */}
        {/*authState.value.user.user_type == 6 && (
          <>
            <View
              style={{
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 20,
                marginLeft: 20,
              }}
            />
            <Item
              icon="account-circle"
              label="Perfil"
              path="Profile"
              onClick={onClose}
              selected={actualRoute.value === 'Profile'}
              navigate={navigate}
            />
            <Item
              icon="recycle"
              label="Materiais"
              path="Materials"
              onClick={onClose}
              selected={actualRoute.value === 'Pedidos'}
              navigate={navigate}
            />
            <Item
              icon="cash"
              label="Financeiro"
              path="InOrder"
              onClick={onClose}
              selected={actualRoute.value === 'ServicosAprovados'}
              navigate={navigate}
            />
            <Item
              icon="clipboard-check-outline"
              label="Coletas"
              path="InOrder"
              onClick={onClose}
              selected={actualRoute.value === 'ServicosAgendados'}
              navigate={navigate}
            />
            <View
              style={{
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 20,
                marginLeft: 20,
              }}
            />
            <Item
              icon="account-plus"
              label="Planos"
              path="Plans"
              onClick={onClose}
              selected={actualRoute.value === 'ServicosRealizados'}
              navigate={navigate}
            />
            <Item
              icon="account-multiple"
              label="Convidar Amigos"
              path="InOrder"
              onClick={onClose}
              selected={actualRoute.value === 'Recebimentos'}
              navigate={navigate}
            />

            <View
              style={{
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 20,
                marginLeft: 20,
              }}
            />

            <Item
              icon="help-circle-outline"
              label="Ajuda"
              path="InOrder"
              onClick={onClose}
              selected={actualRoute.value === 'Recebimentos'}
              navigate={navigate}
            />
            <Item
              icon="file-document"
              label="Termos de uso"
              path="UserTerms"
              onClick={onClose}
              selected={actualRoute.value === 'Recebimentos'}
              navigate={navigate}
            />
          </>
            )*/}
      </ScrollView>
    </AnimatedSurface>
    <ImagePicker callback2={handleAvatarClick} />
    </>
  );
};

export const withDrawer: <T extends keyof RootLoggedStackParamList>(
  Component: FCWithLoggedStackNavigator<T>,
) => FCWithLoggedStackNavigator<T> = Component => props => {
  const {routes, index} = useNavigationState(s => s);
  const isFocused = useIsFocused();
  const actualRoute = useStateLink(GlobalContext.drawer.actualRouteRef);
  if (isFocused) {
    actualRoute.set(routes[index].name as any);
  }
  return <Component {...props} />;
};

export default Drawer;

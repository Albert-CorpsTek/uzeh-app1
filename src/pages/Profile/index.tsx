import React, { useEffect } from 'react';
import {
  Text,
  Avatar,
  Button,
  ActivityIndicator,
  TouchableRipple,
} from 'react-native-paper';
import { TouchableOpacity, View, Image } from 'react-native';
import UserProfile from 'img/avatar.png';
import storage from 'util/storage';
import { FCWithLoggedStackNavigator } from 'pages/LoggedStackNavigator';
import { withAppbar } from 'components/Appbar';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import GlobalContext from 'src/context';
import { useStateLink } from '@hookstate/core';
import Container from 'components/Container';
import pickImage from 'util/pickImage';
import { colors } from 'src/theme';
import styles from './style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Topbar from 'components/Topbar';
import request from 'util/request';
import notify from 'util/notify';
import TableWrapper from 'components/Table/TableWrapper';
import TableRow from 'components/Table/TableRow';
import TableLabel from 'components/Table/TableLabel';
import TableValue from 'components/Table/TableValue';
import NormalText from 'components/NormalText';
import BoldText from 'components/BoldText';
import handleAddress from 'util/handleAddress';

const {
  profile: { imageProfileRef, loadingImageProfileRef, fetchImageProfile, profileRef, fetchProfile, loadingProfileRef },
} = GlobalContext;

const Profile: FCWithLoggedStackNavigator<'Profile'> = ({
  navigation: { navigate },
}) => {
  const isFocused = useIsFocused();
  const loadingImageProfile = useStateLink(loadingImageProfileRef);
  const imageProfile = useStateLink(imageProfileRef);
  const profile = useStateLink(profileRef);
  const loadingProfile = useStateLink(loadingProfileRef);
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
        notify('Upload realizado com sucesso!', 'success');
        fetchImageProfile();
      }

      /*
      if(response) {
        notify('Upload realizado com sucesso!', 'success');
        fetchImageProfile();
      }
      */
    } catch {
      notify('Falha ao fazer upload da imagem', 'error');
    }
  };
  const renderPerfilPhoto = () => (
    <Container
      vertical
      style={{
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
      <TouchableRipple
        style={{
          position: 'relative',
        }}
        onPress={() => {
          pickImage(handleAvatarClick);
        }}>
        <>
          <Avatar.Image
            source={
              imageProfile.value
                ? {
                  uri: imageProfile.value,
                }
                : UserProfile
            }
            size={100}
          />
          {/*<Avatar.Image
            source={UserProfile}
            size={100}
          />*/}
          {loadingImageProfile.value && (
            <ActivityIndicator
              color={colors.contrast}
              style={{
                position: 'absolute',
                left: 65,
                top: 65,
                scaleX: 2,
                scaleY: 2,
              }}
            />
          )}
        </>
      </TouchableRipple>
    </Container>
  );

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
              <NormalText align="right">{profile.value.name}</NormalText>
            </TableValue>
          </TableRow>
          <TableRow>
            <TableLabel>
              <BoldText>CPF</BoldText>
            </TableLabel>
            <TableValue>
              <NormalText align="right">{maskCPF()}</NormalText>
            </TableValue>
          </TableRow>
          <TableRow>
            <TableLabel>
              <BoldText>Endereço</BoldText>
            </TableLabel>
            <TableValue>
              <NormalText align="right">
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
              <NormalText align="right">{profile.value.email}</NormalText>
            </TableValue>
          </TableRow>
          <TableRow>
            <TableLabel>
              <BoldText>Telefone</BoldText>
            </TableLabel>
            <TableValue>
              <NormalText align="right" >{profile.value.phone}</NormalText>
            </TableValue>
          </TableRow>
        </TableWrapper>
      </Container>
    );
  };

  useEffect(() => {
    if (isFocused) {
      fetchImageProfile();
      fetchProfile();
    }
  }, [isFocused]);

  return (
    <>
      <Topbar title="Perfil" />
      <ScrollView contentContainerStyle={styles.container}>
        {/*<View>
          <TouchableOpacity onPress={() => navigate('Home')}>
            <FontAwesomeIcon icon={faTimes} size={40} color={colors.black} />
          </TouchableOpacity>
          <Text
            style={{
              paddingLeft: '1%',
              paddingTop: 15,
              fontWeight: 'bold',
              fontSize: 28,
            }}>
            Perfil
        </Text>
        </View>*/}
        <View
          style={{
            width: '100%',
            marginTop: 20,
            marginBottom: 20,
            height: 10,
            backgroundColor: '#e3e5e4',
          }}
        />
        {renderPerfilPhoto()}
        <TouchableOpacity
          style={styles.divText}
          onPress={() => {
            navigate('EditProfile');
          }}>
          <Text>Editar perfil</Text>
        </TouchableOpacity>
        {renderPerfilTable()}
        <View
          style={{
            width: '100%',
            marginTop: 20,
            marginBottom: 20,
            height: 10,
            backgroundColor: '#e3e5e4',
          }}
        />
        <View>
          {/* <View style={{marginBottom: 20}}>
          <Button
            style={styles.btn}
            onPress={() => {
              navigate('EditProfile');
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
              }}>
              EDITAR PERFIL
            </Text>
          </Button>
        </View> */}
          <Button 
            style={styles.btn} 
            onPress={() => navigate("Screen3")}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 14,
              }}>
              ALTERAR SENHA
          </Text>
          </Button>
          <View style={styles.divwhitebtn} />
          <Button
            style={styles.btn}
            onPress={async () => {
              try {
                await storage.remove('token');
              } catch (err) {
                console.log(err);
              }
              navigate('Login', {
                screenPostLogin: 'Home'
              });
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
              }}>
              SAIR
          </Text>
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default withAppbar(Profile);

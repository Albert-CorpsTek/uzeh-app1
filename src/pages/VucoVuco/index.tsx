import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import Container, {ContainerTop} from 'components/Container';
import {colors} from 'src/theme';
import {FCWithLoggedStackNavigator} from 'pages/LoggedStackNavigator';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronLeft,
  faEdit,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';

import imgBanner from 'img/banner_2.png';
import LogoPreta from 'img/logo_branca_uzeh.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  botao: {
    width: '100%',
    height: 60,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 10,
  },
  botaoPerfil: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: '10%',
    paddingRight: '10%',
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#F4F1F0',
  },
  submit: {
    marginRight: 40,
    marginLeft: 40,
    top: '10%',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#529169',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 23,
    marginLeft: '10%',
  },
  textStyle: {
    fontSize: 20,
    fontFamily: 'Manjari-Bold',
    color: 'white',
    textAlign: 'center',
  },
  textStyleF: {
    fontSize: 16,
    paddingLeft: 50,
    paddingRight: 50,
    color: 'white',
    textAlign: 'center',
    padding: 3,
  },

  viewn: {
    marginTop: '10%',
    // marginBottom: '20%',
    height: 'auto',
    justifyContent: 'space-around',
  },
});

const VucoVuco: FCWithLoggedStackNavigator<'VucoVuco'> = ({navigation}) => {
  return (
    <>
      <View style={{flexGrow: 1}}>
        <ScrollView style={styles.scrollView}>
          <ContainerTop>
            <ImageBackground
              source={imgBanner}
              style={{
                width: '100%',
                // height: 160,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Container
                pb
                // padding={30}
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                <Image
                  source={LogoPreta}
                  resizeMode="contain"
                  style={{
                    width: 160,
                    height: 160,
                    marginTop: -40,
                    marginBottom: -50,
                  }}
                />
                {/* <TouchableOpacity
                  onPress={() => navigation.navigate('Home')}
                  style={{
                    position: 'absolute',
                    alignSelf: 'flex-start',
                    marginLeft: '5%',
                    alignContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    color={colors.white}
                    size={40}
                  />
                </TouchableOpacity> */}
                <Text style={styles.textStyleF}>
                  Aqui você pode pesquisar ou adicionar anúncios no VUCO VUCO
                </Text>
              </Container>
            </ImageBackground>
          </ContainerTop>
          <View style={styles.viewn}>
            <View style={styles.botao}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('VVAddEdit');
                }} 
                disabled={true}
              >
                <LinearGradient
                  colors={['#8d2fee', '#4e009d']}
                  start={{x: 0.0, y: 1.0}}
                  end={{x: 1.0, y: 1.0}}
                  style={styles.submit}>
                  <View style={styles.botaoPerfil}>
                    <FontAwesomeIcon icon={faEdit} size={25} color={'white'} />
                    <Text style={styles.submitText}>Adicionar / Editar</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={styles.botao}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('VVSearch');
                }}>
                <LinearGradient
                  colors={['#8d2fee', '#4e009d']}
                  start={{x: 0.0, y: 1.0}}
                  end={{x: 1.0, y: 1.0}}
                  style={styles.submit}>
                  <View style={styles.botaoPerfil}>
                    <FontAwesomeIcon
                      icon={faSearch}
                      size={25}
                      color={'white'}
                    />
                    <Text style={styles.submitText}>Pesquisar</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default VucoVuco;

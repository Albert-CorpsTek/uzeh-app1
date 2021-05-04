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
  faTimes,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import imgBanner from 'img/banner_2.png';
import LogoPreta from 'img/logo_branca_uzeh.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  botao: {
    // height: 60,
    borderRadius: 10,
    // marginBottom: 100,
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  botaoPerfil: {
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingLeft: '10%',
    // paddingRight: '10%',
    alignItems: 'center',
    borderWidth: 1,
    width: 70,
    height: 70,
    borderRadius: 20,
    borderStyle: 'dashed',
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#F4F1F0',
    marginBottom: 40,
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
    paddingLeft: 20,
    paddingRight: 20,
    color: 'white',
    textAlign: 'center',
    padding: 3,
  },

  viewn: {
    marginTop: '10%',
    height: 'auto',
    justifyContent: 'space-around',
  },
  anuncioInfo: {
    // backgroundColor: '#f00',
    maxWidth: '70%',
    marginTop: 10,
  },
  anuncioCard: {
    flexDirection: 'row',
    height: 160,
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#FF0',
  },

  imageInfo: {
    width: '30%',
    height: '95%',
    // backgroundColor: '#0ff',
    margin: '1%',
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  deleteIcon: {
    alignSelf: 'flex-start',
    // marginLeft: 'auto',
    marginRight: '2%',
    marginTop: '2%',
  },
  editIcon: {
    alignSelf: 'flex-start',
    marginRight: '2%',
    marginLeft: 'auto',
    marginTop: '2%',
    marginBottom: 'auto',
  },
});

const VVAddEdit: FCWithLoggedStackNavigator<'VVAddEdit'> = ({navigation}) => {
  return (
    <>
      <View style={{flexGrow: 1}}>
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
                  width: 150,
                  height: 150,
                  marginTop: -30,
                  marginBottom: -50,
                }}
              />
              {/* <TouchableOpacity
                onPress={() => navigation.navigate('VucoVuco')}
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
              <Text style={styles.textStyleF}>Vuco Vuco - Seus Anúncios</Text>
            </Container>
          </ImageBackground>
        </ContainerTop>
        <ScrollView style={styles.scrollView}>
          <View style={styles.botao}>
            <TouchableOpacity onPress={() => navigation.navigate('VVInfo')}>
              <View style={styles.botaoPerfil}>
                <FontAwesomeIcon icon={faPlus} size={25} color={'black'} />
              </View>
            </TouchableOpacity>
          </View>
          {/* Anúncio 1 */}
          <View style={styles.viewn}>
            <View style={styles.anuncioCard}>
              <View style={styles.imageInfo}>
                <Text>Imagem do anúncio</Text>
              </View>
              <View style={styles.anuncioInfo}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  {/* Título do anúncio na tabela */}
                  <Text style={{fontWeight: 'bold'}}>Título do anúncio 1</Text>
                </View>
                {/* Preço do anúncio na tabela */}
                <Text>R$: 9.99</Text>
              </View>
              <TouchableOpacity
                style={styles.editIcon}
                onPress={() => navigation.navigate('VVInfo')}>
                <FontAwesomeIcon icon={faEdit} size={24} color={'black'} />
              </TouchableOpacity>
              <FontAwesomeIcon
                style={styles.deleteIcon}
                icon={faTimes}
                size={24}
                color={'black'}
              />
            </View>
            {/* Anúncio 2 */}
            <View style={styles.anuncioCard}>
              <View style={styles.imageInfo}>
                <Text>Imagem do anúncio</Text>
              </View>
              <View style={styles.anuncioInfo}>
                {/* Título do anúncio na tabela */}
                <Text style={{fontWeight: 'bold'}}>Título do anúncio 2</Text>
                {/* Preço do anúncio na tabela */}
                <Text>R$:19.99</Text>
              </View>
              <FontAwesomeIcon
                style={styles.editIcon}
                icon={faEdit}
                size={24}
                color={'black'}
              />
              <FontAwesomeIcon
                style={styles.deleteIcon}
                icon={faTimes}
                size={24}
                color={'black'}
              />
            </View>
            {/* Anúncio 3 */}
            <View style={styles.anuncioCard}>
              <View style={styles.imageInfo}>
                <Text>Imagem do anúncio</Text>
              </View>
              <View style={styles.anuncioInfo}>
                {/* Título do anúncio na tabela */}
                <Text style={{fontWeight: 'bold'}}>Título do anúncio 3</Text>
                {/* Preço do anúncio na tabela */}
                <Text>R$:29.99</Text>
              </View>
              <FontAwesomeIcon
                style={styles.editIcon}
                icon={faEdit}
                size={24}
                color={'black'}
              />
              <FontAwesomeIcon
                style={styles.deleteIcon}
                icon={faTimes}
                size={24}
                color={'black'}
              />
            </View>
            {/* Anúncio 4 */}
            <View style={styles.anuncioCard}>
              <View style={styles.imageInfo}>
                <Text>Imagem do anúncio</Text>
              </View>
              <View style={styles.anuncioInfo}>
                {/* Título do anúncio na tabela */}
                <Text style={{fontWeight: 'bold'}}>Título do anúncio 4</Text>
                {/* Preço do anúncio na tabela */}
                <Text>R$:39.99</Text>
              </View>
              <FontAwesomeIcon
                style={styles.editIcon}
                icon={faEdit}
                size={24}
                color={'black'}
              />
              <FontAwesomeIcon
                style={styles.deleteIcon}
                icon={faTimes}
                size={24}
                color={'black'}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default VVAddEdit;

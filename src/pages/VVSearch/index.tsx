import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import Container, {ContainerTop} from 'components/Container';
import {colors} from 'src/theme';
import {FCWithLoggedStackNavigator} from 'pages/LoggedStackNavigator';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faEdit,
  faTimes,
  faCheck,
  faCheckSquare,
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
    // width: '100%',
    height: 55,
    borderRadius: 10,
    // marginBottom: 20,
    marginTop: 15,
  },
  botaoPerfil: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: '10%',
    paddingRight: '10%',
    alignItems: 'flex-start',
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#F4F1F0',
  },
  submit: {
    width: 50,
    marginTop: -15,
    marginRight: 10,
    marginLeft: 20,
    marginBottom: 10,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
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
  searchBar: {
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
    width: '100%',
    marginBottom: '1%',
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'center',
    textAlign: 'center',
    // backgroundColor: 'red',
    marginLeft: 20,
    marginRight: 20,
  },
  submenuItem: {
    flexDirection: 'row',
    marginLeft: '5%',
  },
});

let nome = 'faChevronRight';
function activeButton() {
  if (nome === 'faChevronRight') {
    nome = 'faChevronDown';
  } else {
    nome = 'faChevronRight';
  }
}

const VVSearch: FCWithLoggedStackNavigator<'VVSearch'> = ({navigation}) => {
  const [show, setShow] = useState(false);

  const [showAll, setShowAll] = useState(false);
  const [showAuto, setShowAuto] = useState(false);
  const [showImoveis, setShowImoveis] = useState(false);
  const [showEletronics, setShowEletronics] = useState(false);
  const [showModa, setShowModa] = useState(false);
  const [showInfantis, setShowInfantis] = useState(false);
  var contar = 0;

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
                    width: 150,
                    height: 150,
                    marginTop: -30,
                    marginBottom: -50,
                  }}
                />
                {/*  <TouchableOpacity
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
                <Text style={styles.textStyleF}>Vuco Vuco - Pesquisa</Text>
              </Container>
            </ImageBackground>
          </ContainerTop>
          <View style={styles.viewn}>
            <View style={styles.searchField}>
              <View style={{flexDirection: 'column', width: '70%'}}>
                <TextInput placeholder="Pesquisar" style={styles.searchBar} />
                {show ? (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        setShow(!show);
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <FontAwesomeIcon icon={faChevronDown} />
                        <Text>Filtros</Text>
                      </View>
                    </TouchableOpacity>
                    <View>
                      <TouchableOpacity
                        style={styles.submenuItem}
                        onPress={() => {
                          setShowAll(!showAll);
                          setShowAuto(!showAll);
                          setShowEletronics(!showAll);
                          setShowImoveis(!showAll);
                          setShowModa(!showAll);
                          setShowInfantis(!showAll);
                        }}>
                        {showAll ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : (
                          <FontAwesomeIcon icon={faTimes} />
                        )}
                        <Text>Todas as categorias</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.submenuItem}
                        onPress={() => {
                          setShowAuto(!showAuto);
                        }}>
                        {showAll ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : (
                          [
                            showAuto ? (
                              <FontAwesomeIcon icon={faCheck} />
                            ) : (
                              <FontAwesomeIcon icon={faTimes} />
                            ),
                          ]
                        )}
                        <Text>Automóveis</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.submenuItem}
                        onPress={() => {
                          setShowImoveis(!showImoveis);
                        }}>
                        {showAll ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : (
                          [
                            showImoveis ? (
                              <FontAwesomeIcon icon={faCheck} />
                            ) : (
                              <FontAwesomeIcon icon={faTimes} />
                            ),
                          ]
                        )}
                        <Text>Imóveis</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.submenuItem}
                        onPress={() => {
                          setShowEletronics(!showEletronics);
                        }}>
                        {showAll ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : (
                          [
                            showEletronics ? (
                              <FontAwesomeIcon icon={faCheck} />
                            ) : (
                              <FontAwesomeIcon icon={faTimes} />
                            ),
                          ]
                        )}
                        <Text>Eletrônicos</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.submenuItem}
                        onPress={() => {
                          setShowModa(!showModa);
                        }}>
                        {showAll ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : (
                          [
                            showModa ? (
                              <FontAwesomeIcon icon={faCheck} />
                            ) : (
                              <FontAwesomeIcon icon={faTimes} />
                            ),
                          ]
                        )}
                        <Text>Moda e Beleza</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.submenuItem}
                        onPress={() => {
                          setShowInfantis(!showInfantis);
                        }}>
                        {showAll ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : (
                          [
                            showInfantis ? (
                              <FontAwesomeIcon icon={faCheck} />
                            ) : (
                              <FontAwesomeIcon icon={faTimes} />
                            ),
                          ]
                        )}
                        <Text>Artigos infantis</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setShow(!show);
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <FontAwesomeIcon icon={faChevronRight} />
                      <Text>Filtros</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.botao}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  /* onPress={() => {
                  navigation.navigate('Home');
                }} */
                >
                  <LinearGradient
                    colors={['#8d2fee', '#4e009d']}
                    start={{x: 0.0, y: 1.0}}
                    end={{x: 1.0, y: 1.0}}
                    style={styles.submit}>
                    <View style={styles.botaoPerfil}>
                      <FontAwesomeIcon
                        icon={faSearch}
                        size={18}
                        color={'white'}
                      />
                      {/* <Text style={styles.submitText}>Pesquisar</Text> */}
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default VVSearch;

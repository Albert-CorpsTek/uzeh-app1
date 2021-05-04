import React, {useEffect, useState} from 'react';
import {Text, Title, TouchableRipple} from 'react-native-paper';
import CardComponent, {
  StyledCardTitle,
  CardContent,
  CardLeft,
} from 'components/Card';
import Container, {ContainerTop} from 'components/Container';
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  SafeAreaView,
} from 'react-native';
import imgBanner from 'img/banner.png';
import {colors} from 'src/theme';
import GlobalContext from 'src/context';
import LogoPreta from 'img/uZeh-Logo-verde-peq-baixa.png';
import {FCWithLoggedStackNavigator} from 'pages/LoggedStackNavigator';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faPeopleArrows,
  faChartLine,
  faRecycle,
  faTrashAlt,
  faExclamationTriangle,
  faSignOutAlt,
  faMoneyBillWave,
  faQuestion,
  faDollarSign,
  faInfoCircle,
  faUserPlus,
  faArchive,
  faDoorOpen,
} from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';

import {withAppbar} from 'components/Appbar';
import yup from 'yup';
import {GroupControl} from 'pages/Login/style';

import MenuButton from '../../components/MenuButton';
import CollapsibleSidebar from '../../components/CollapsibleSidebar';
import Profile from '../../components/Profile';
import {useStateLink, useStateLinkUnmounted} from '@hookstate/core';
import styled from 'styled-components/native';
import {animated} from 'react-spring';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#F4F1F0',
    height: '100%'
  },
  textStyle: {
    fontSize: 20,
    fontFamily: 'Manjari-Bold',
    color: 'white',
    textAlign: 'center',
  },
  textStyleF: {
    fontSize: 16,
    paddingLeft: 80,
    paddingRight: 80,
    color: 'white',
    textAlign: 'center',
    padding: 3,
  },
  textStyleCard: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
  viewn: {
    height: 'auto',
    justifyContent: 'space-around',
  },
  itemsContainer: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    paddingTop: 20,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  itemsRow: {
    flex: 1,
    width: '90%',
    height: '100%',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  items: {
    width: '100%',
    alignItems: 'center',
  },
  gradient: {
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  gradientItems: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  gradientTexts: {
    color: 'white',
    fontSize: 20,
  },
  iconGradient: {margin: 15},
  menu: {
    flexDirection: 'row',
    paddingVertical: 6,
    marginBottom: 10,
  },
});

const BottomNav = styled(View)`
  height: 70px;
  background-color: ${colors.surface};
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

const AnimatedBottomNav = animated(BottomNav);

const {
  category: {categoriesRef, fetchCategories},
  home: {selectedCategoryRef},
  map: {
    openDrawerRef
  }
} = GlobalContext;

const GeneratorHome: FCWithLoggedStackNavigator<'GeneratorHome'> = ({navigation: {navigate}}) => {
  const authState = useStateLinkUnmounted(GlobalContext.auth.authStateRef);
  const categories = useStateLink(categoriesRef);
  const selectedCategory = useStateLink(selectedCategoryRef);
  const [showSidebar, setShowSidebar] = useState(false);
  const [hide, setHide] = useState(false);
  const openDrawer = useStateLink(openDrawerRef);

  const LogoutLinkText = styled(Text)`
    color: ${colors.black};
    font-size: 16px;
  `;

  useEffect(() => {
    fetchCategories();
  }, []);

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
              <Text style={styles.textStyleF}>
                Contribuindo de forma inteligente na coleta de materiais
                recicláveis!
              </Text>
            </Container>
          </ImageBackground>
        </ContainerTop>
        <View style={styles.viewn}>
          {/*<Container vertical horizontal>
          <CardComponent
            rippleColor={colors.background}
            onPress={() => navigate('Request')}
          >
            <CardContent>
              <Container
                vertical
                horizontal
                style={{
                  backgroundColor: colors.green,
                }}
              >
                <StyledCardTitle style={{ fontFamily: 'Manjari-Bold', color: colors.white }}>SOLICITAR COLETA</StyledCardTitle>
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.white,
                    textAlign: 'center',
                  }}
                >
                  Clique aqui e cadastre os materiais para serem coletados!
                </Text>
              </Container>
            </CardContent>
          </CardComponent>
                </Container>*/}
          <View style={styles.itemsContainer}>
            <View style={styles.itemsRow}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setShowSidebar(false);
                  navigate('Login', {
                    screenPostLogin: 'Request'
                  });
                }}>
                <LinearGradient
                  colors={['#319a72', '#12778f']}
                  start={{x: 0.0, y: 1.0}}
                  end={{x: 1.0, y: 1.0}}
                  style={styles.gradient}>
                  <View style={styles.gradientItems}>
                    <FontAwesomeIcon
                      icon={faRecycle}
                      size={56}
                      color={'white'}
                      style={styles.iconGradient}
                    />
                    <Text style={styles.gradientTexts}>Solicitar Coleta</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setShowSidebar(false);
                  navigate('Login', {
                    screenPostLogin: 'Services'
                  });
                }}>
                <LinearGradient
                  colors={['#319a72', '#12778f']}
                  start={{x: 0.0, y: 1.0}}
                  end={{x: 1.0, y: 1.0}}
                  style={styles.gradient}>
                  <View style={styles.gradientItems}>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      size={56}
                      color={'white'}
                      style={styles.iconGradient}
                    />
                    <Text style={styles.gradientTexts}>Acompanhar Coletas</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setShowSidebar(false);
                  navigate('Login', {
                    screenPostLogin: 'Metrics'
                  });
                }}>
                <LinearGradient
                  colors={['#319a72', '#12778f']}
                  start={{x: 0.0, y: 1.0}}
                  end={{x: 1.0, y: 1.0}}
                  style={styles.gradient}>
                  <View style={styles.gradientItems}>
                    <FontAwesomeIcon
                      icon={faChartLine}
                      size={56}
                      color={'white'}
                      style={styles.iconGradient}
                    />
                    <Text style={styles.gradientTexts}>Suas métricas</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              {/*<TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setShowSidebar(false);
                  navigate('VucoVuco');
                }}>
                <LinearGradient
                  colors={['#8d2fee', '#4e009d']}
                  start={{x: 0.0, y: 1.0}}
                  end={{x: 1.0, y: 1.0}}
                  style={styles.gradient}>
                  <View style={styles.gradientItems}>
                    <FontAwesomeIcon
                      icon={faPeopleArrows}
                      size={56}
                      color={'white'}
                      style={styles.iconGradient}
                    />
                    <Text style={styles.gradientTexts}>Vuco Vuco</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setShowSidebar(false);
                  navigate('Denunciation');
                }}>
                <LinearGradient
                  colors={['#f92e2e', '#ff7272']}
                  start={{x: 0.0, y: 1.0}}
                  end={{x: 1.0, y: 1.0}}
                  style={styles.gradient}>
                  <View style={styles.gradientItems}>
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      size={56}
                      color={'white'}
                      style={styles.iconGradient}
                    />
                    <Text style={styles.gradientTexts}>Fazer Denúncia</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>*/}
            </View>
          </View>
          {/* {categories.value
          ? categories.value.slice(1).map((i) => (
            <Container key={i.id} horizontal pb>
              <CardComponent
                onPress={() => {
                  if (i.id !== 'default') {
                    selectedCategory.set(i.id);
                  }
                }}
              >
                <CardLeft color={colors.contrast}>
                  {i.url_icon ? (
                    <Image
                      source={{ uri: i.url_icon }}
                      style={{
                        width: 60,
                        height: 60,
                        margin: 5,
                      }}
                    />
                  ) : (
                    <IconButton icon={i.url_icon ?? 'check'} color={colors.white} size={50} />
                  )}
                </CardLeft>
                <CardContent>
                  <Container vertical horizontal>
                    <StyledCardTitle>{i.name}</StyledCardTitle>
                    <Text style={styles.textStyleCard}>
                      {i.description_category ?? 'Sem descrição'}
                    </Text>
                  </Container>
                </CardContent>
              </CardComponent>
            </Container>
          )) : (
            <Text>Carregando...</Text>
          )} */}
          {/* <Container horizontal>
          <Picker
            selectedValue={subcategory}
            onValueChange={(v) => setSubcategory(v)}
          >
            {renderSubcategories()}
          </Picker>
        </Container> */}
        </View>
      </ScrollView>

      <AnimatedBottomNav
        style={{
          height: hide ? 0 : 70,
          backgroundColor: 'rgba(249, 249, 249, 0.3)',
        }}
      />
      {/*<MenuButton onPress={() => setShowSidebar(true)} />*/}
      {/*showSidebar && (
        <CollapsibleSidebar
          unmount={() => setShowSidebar(false)}
          top={<Profile />}
          middle={
            //Menu do gerador
            <View
              style={{
                backgroundColor: '#fff',
              }}>
              <TouchableOpacity
                hitSlop={{top: 80, bottom: 80, left: 80, right: 80}}
                onPress={() => {
                  setShowSidebar(false);
                  navigate('Profile');
                }}>
                <SafeAreaView
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 6,
                    marginBottom: 10,
                    marginTop: 10,
                  }}>
                  <SafeAreaView
                    style={{
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <FontAwesomeIcon
                      icon={faUser}
                      color={colors.black}
                      size={20}
                    />
                  </SafeAreaView>
                  <SafeAreaView
                    style={{
                      flex: 3,
                    }}>
                    <LogoutLinkText>Editar Perfil</LogoutLinkText>
                  </SafeAreaView>
                </SafeAreaView>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowSidebar(false);
                  navigate('InOrder');
                }}>
                <View style={styles.menu}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <FontAwesomeIcon
                      icon={faMoneyBillWave}
                      color={colors.black}
                      size={20}
                    />
                  </View>
                  <View
                    style={{
                      flex: 3,
                    }}>
                    <LogoutLinkText>Financeiro</LogoutLinkText>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowSidebar(false);
                  navigate('InOrder');
                }}>
                <View style={styles.menu}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <FontAwesomeIcon
                      icon={faRecycle}
                      color={colors.black}
                      size={20}
                    />
                  </View>
                  <View
                    style={{
                      flex: 3,
                    }}>
                    <LogoutLinkText>Coletas</LogoutLinkText>
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  // paddingBottom: 20,
                  marginBottom: 15,
                  borderBottomColor: '#000',
                  borderBottomWidth: 1,
                  borderBottomStartRadius: 30,
                  borderBottomEndRadius: 40,
                  marginLeft: 30,
                  marginRight: 30,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setShowSidebar(false);
                  navigate('InOrder');
                }}>
                <View style={styles.menu}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      color={colors.black}
                      size={20}
                    />
                  </View>
                  <View
                    style={{
                      flex: 3,
                    }}>
                    <LogoutLinkText>Convidar Amigos</LogoutLinkText>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowSidebar(false);
                  navigate('InOrder');
                }}>
                <View style={styles.menu}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <FontAwesomeIcon
                      icon={faQuestion}
                      color={colors.black}
                      size={20}
                    />
                  </View>
                  <View
                    style={{
                      flex: 3,
                    }}>
                    <LogoutLinkText>Ajuda</LogoutLinkText>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigate('UserTerms');
                }}>
                <View style={styles.menu}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      color={colors.black}
                      size={20}
                    />
                  </View>
                  <View
                    style={{
                      flex: 3,
                    }}>
                    <LogoutLinkText>Termos de uso</LogoutLinkText>
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  // paddingBottom: 20,
                  marginBottom: 15,
                  borderBottomColor: '#000',
                  borderBottomWidth: 1,
                  borderBottomStartRadius: 30,
                  borderBottomEndRadius: 40,
                  marginLeft: 30,
                  marginRight: 30,
                }}
              />
            </View>
          }
        />
      )*/}
      {/*<MenuButton onPress={() => openDrawer.set(true)} />*/}
    </View>
    </>
  );
};

export default withAppbar(GeneratorHome);

import React, {useEffect, useState} from 'react';
import {Text, IconButton} from 'react-native-paper';
import CardComponent, {
  StyledCardTitle,
  CardContent,
  CardLeft,
} from 'components/Card';
import Container, {ContainerTop} from 'components/Container';
import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  View,
  Image,
} from 'react-native';
import imgBanner from 'img/banner.png';
import {colors} from 'src/theme';
import GlobalContext from 'src/context';
import {useStateLink, useStateLinkUnmounted} from '@hookstate/core';
import LogoPreta from 'img/logo_branca_uzeh.png';
import {FCWithLoggedStackNavigator} from 'pages/LoggedStackNavigator';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {withAppbar} from 'components/Appbar';
import yup from 'yup';

import {animated} from 'react-spring';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import styled from 'styled-components/native';
import {
  faSignOutAlt,
  faRecycle,
  faUser,
  faMoneyBillWave,
  faQuestion,
  faDollarSign,
  faInfoCircle,
  faUserPlus,
  faArchive,
  faDoorOpen,
} from '@fortawesome/free-solid-svg-icons';
import Profile from '../../components/Profile';
import MenuButton from '../../components/MenuButton';
import CollapsibleSidebar from 'components/CollapsibleSidebar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#F4F1F0',
  },
  textStyle: {
    fontSize: 20,
    fontFamily: 'Manjari-Bold',
    color: 'white',
    textAlign: 'center',
  },
  textStyleF: {
    fontSize: 18,
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
    justifyContent: 'space-around',
  },
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
} = GlobalContext;

const LogoutLinkText = styled(Text)`
  color: ${colors.black};
  font-size: 16px;
`;

const Home: FCWithLoggedStackNavigator<'Home'> = ({navigation: {navigate}}) => {
  const categories = useStateLink(categoriesRef);
  const selectedCategory = useStateLink(selectedCategoryRef);
  const [hide, setHide] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
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
                  marginTop: -10,
                  marginBottom: -40,
                }}
              />
              <Text style={styles.textStyleF}>
                {/* {' '}
              <Text style={styles.textStyle}>uZeh</Text>
              {' '} */}
                Contribuindo de forma inteligente na coleta de materiais
                recicláveis!
              </Text>
            </Container>
          </ImageBackground>
        </ContainerTop>
        <View style={styles.viewn}>
          <Container vertical horizontal>
            <CardComponent
              rippleColor={colors.background}
              onPress={() => {
                setShowSidebar(false);
                navigate('Request');
              }}>
              <CardContent>
                <TouchableOpacity activeOpacity={0.7}>
                  <Container
                    vertical
                    horizontal
                    style={{
                      backgroundColor: colors.green,
                    }}>
                    <StyledCardTitle
                      style={{fontFamily: 'Manjari-Bold', color: colors.white}}>
                      VER COLETA
                    </StyledCardTitle>
                    <Text
                      style={{
                        fontSize: 16,
                        color: colors.white,
                        textAlign: 'center',
                      }}>
                      Clique aqui e cadastre os materiais para serem coletados!
                    </Text>
                  </Container>
                </TouchableOpacity>
              </CardContent>
            </CardComponent>
            <Text>Olá reciclador</Text>
          </Container>
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
    </View>
  );
};

export default withAppbar(Home);

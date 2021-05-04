import React, {useEffect} from 'react';
import {useStateLink, useStateLinkUnmounted} from '@hookstate/core';
import GlobalContext from 'src/context';
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import Button from 'components/Button';
import CardComponent, {
  StyledCardTitle,
  CardContent,
  CardLeft,
  CardComponentTop,
  StyledCardTitleTop,
  StyledCardContent,
} from 'components/Card';
import Container, {ContainerTop} from 'components/Container';
import {colors} from 'src/theme';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, IconButton, Divider} from 'react-native-paper';

import imgBanner from 'img/banner.png';
import LogoPreta from 'img/logo_branca_uzeh.png';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

const {
  plans: {plansRef, fetchPlans},
} = GlobalContext;

const Plans = ({navigation: {navigate}}) => {
  const authState = useStateLinkUnmounted(GlobalContext.auth.authStateRef);
  const plans = useStateLink(plansRef);

  useEffect(() => {
    fetchPlans(authState.value.user.user_type);
  }, []);

  return (
    <>
      <ContainerTop>
        <ImageBackground
          source={imgBanner}
          style={{
            width: '100%',
            // height: 160,
            justifyContent: 'center',
            alignItems: 'center',
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
            onPress={() => navigate('Home')}
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
            Adquira um plano Profissional e aumente os seus GANHOS
          </Text>
        </ImageBackground>
      </ContainerTop>

      <ScrollView>
        <View style={styles.container}>
          {plans.value.slice(1).map(plan => (
            <View style={styles.item} key={plan.id}>
              <CardComponent onPress={() => {}}>
                <CardContent style={styles.cardBox}>
                  <Container vertical horizontal>
                    <StyledCardTitleTop
                      style={{
                        fontFamily: 'Manjari-Bold',
                        color: colors.green,
                        marginBottom: -5,
                      }}>
                      {plan.title}
                    </StyledCardTitleTop>
                    <Text style={styles.textStyleCard}>{plan.description}</Text>
                    <StyledCardTitle
                      style={{
                        fontFamily: 'Manjari-Bold',
                        color: colors.darkGray,
                      }}>
                      {'Por R$ ' + plan.value + ' /mês'}
                    </StyledCardTitle>
                    <Divider />
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 18,
                        fontFamily: 'Manjari-Bold',
                        color: colors.contrast,
                      }}>
                      Mais detalhes
                    </Text>
                  </Container>
                </CardContent>
              </CardComponent>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1F0',
  },
  item: {
    // backgroundColor: '#f9c2ff',
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 20,
  },
  textStyleF: {
    marginTop: 10,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    width: 300,
    paddingBottom: 10,
  },
  textStyleCard: {
    fontSize: 15,
    color: 'black',
    textAlign: 'justify',
  },
  textStyleCardFooter: {
    textAlign: 'center',
  },
  cardBox: {
    // backgroundColor: '#f00',
    borderRadius: 8,
    height: 200,
  },
});

export default Plans;

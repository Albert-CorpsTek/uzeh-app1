import 'react-native-gesture-handler';

import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
} from 'react-native';

import Swiper from 'react-native-swiper';
import slide1 from '../../../assets/images/img-wizard01.png';
import slide2 from '../../../assets/images/img-wizard02-resized.png';
import coletor from '../../../assets/images/coletor.png';
import gerador from '../../../assets/images/gerador.png';
import reciclador from '../../../assets/images/reciclador.png';
import logo from '../../../assets/images/icone-wizard.png';
import {NavigationContainer} from '@react-navigation/native';
import { colors } from 'src/theme';
import AppButton from 'components/AppButton';
import Indicator from 'components/Indicator';
import { Button } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SkipButton = ({onPress}) => {
  return (
    <View style={styles.pularView}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.pularText}>Pular</Text>
      </TouchableOpacity>
    </View>
  );
};

const AppLoading = ({navigation}) => {
  StatusBar.setHidden(true);

  const swiperRef = useRef(null);

  return (
    <Swiper 
      showsPagination={false} style={styles.wrapper} 
      loop={false} 
      ref={swiperRef}>
      <View style={styles.slide}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />

        
        <Image 
          source={slide1} 
          style={styles.image} 
          resizeMode="contain"
        />
        <Text 
          style={styles.title1} 
          numberOfLines={3}>
          {`Contribuindo de forma\n inteligente na coleta de\n materiais recicláveis.`}
        </Text>
        <Indicator 
          itemCount={2} 
          currentItem={0} 
          indicatorActiveColor={colors.lightOrange} 
          indicatorInActiveColor={colors.white} 
          indicatorContainerStyle={styles.indicatorContainerStyle}
        />
        <View style={styles.buttonsContainer}>
          <Button  
            onPress={() => navigation.navigate('SelecionarPerfil')}  
            color={colors.white} 
            uppercase={false} 
            style={styles.button}
          >
            Pular
          </Button>
          <Button 
            mode="contained" 
            onPress={() => swiperRef.current.scrollBy(1, true)}  
            color={colors.lightOrange} 
            uppercase={false} 
            style={styles.button}
          >
            Próximo
          </Button>
        </View>
      </View>

      <View style={styles.slide}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />

        <Image 
          source={slide2} 
          style={styles.image} 
          resizeMode="contain"
        />
        <Text style={styles.title1}>
          {`Uzeh é uma plataforma inteligente que\n possibilita monetizar seus resíduos de\n forma sustentável.`}
        </Text>
        <Indicator 
          itemCount={2} 
          currentItem={1} 
          indicatorActiveColor={colors.lightOrange} 
          indicatorInActiveColor={colors.white} 
          indicatorContainerStyle={styles.indicatorContainerStyle}
        />
        <View style={styles.buttonsContainer}>
          <Button 
            mode="contained" 
            onPress={() => swiperRef.current.scrollBy(-1, true)}  
            color={colors.lightOrange} 
            uppercase={false} 
            style={styles.button}
          >
            Anterior
          </Button>
          <Button  
            onPress={() => navigation.navigate('SelecionarPerfil')}  
            color={colors.white} 
            uppercase={false} 
            style={styles.button}
          >
            Pular
          </Button>
        </View>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 0
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.darkGreen, 
    //justifyContent: 'center', 
    paddingTop: '15%'
  },
  image1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 50,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '20%',
    paddingRight: '20%',
    // backgroundColor: '#888',
    marginBottom: 20,
  },
  descricaoUsuario: {
    flexDirection: 'column',
    paddingLeft: '5%',
    paddingRight: '20%',
  },
  textoWizard3: {
    //paddingLeft: '5%',
    //paddingRight: '20%',
    alignItems: 'center',
    fontSize: 16,
    textAlign: 'justify',
    marginLeft: 5,
  },
  textoCabecalhoWizard3: {
    fontWeight: 'bold',
    // backgroundColor: '#ccc',
    fontSize: 18,
    textAlign: 'left',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 0,
    marginLeft: 5,
  },
  title1: {
    //paddingHorizontal: 30,
    textAlign: 'center',
    letterSpacing: 1, 
    color: colors.white, 
    marginBottom: '15%',
    fontSize: hp('2%')
  },
  slide3: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  texto: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  prontoContainer: {
    justifyContent: 'flex-end',
    marginBottom: 50,
    alignItems: 'center',
  },
  pronto: {
    backgroundColor: '#68b856',
    borderRadius: 30,
    padding: 10,
    width: 100,
  },
  font: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  pularView: {
    position: 'absolute',
    bottom: '8%',
    right: '10%',
  },
  pularText: {
    fontSize: 20,
    color: '#FFF',
    backgroundColor: '#0275d8',
    width: 100,
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 25,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '65%',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  image: {
    marginBottom: '6%',
    height: '35%'
  },
  indicatorContainerStyle: {
    marginBottom: '15%'
  },
  logo: {
    marginBottom: '15%',
    height: '9%'
  },
  button: {
    
  },
  buttonLabel: {

  }
});

export default AppLoading;

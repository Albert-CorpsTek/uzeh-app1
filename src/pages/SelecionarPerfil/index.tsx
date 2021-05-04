import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  Linking
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faSignInAlt,
  faRecycle,
  faTrailer,
} from '@fortawesome/free-solid-svg-icons';
import logoPreta from 'img/icone-wizard.png';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from 'src/theme';
import { Button, Text } from 'react-native-paper';
import geradorIcon from 'img/user.png';
import catadorIcon from 'img/trailer.png'
import recicladoraIcon from 'img/recycle.png';
import AppButton from 'components/AppButton';

const windowWidth = Dimensions.get('window').width;

const Card = ({
  title,
  content,
  image,
  onPress
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.cardContainer}>
      <Image 
        source={image} 
        style={styles.cardIcon}
      />
      <View style={styles.cardRightView}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardTextContent}>{content}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const SelecionarPerfil = ({navigation}) => {
  StatusBar.setHidden(false);

  const [offset] = useState(new Animated.ValueXY({x: 0, y: 100}));

  useEffect(() => {
    Animated.spring(offset.y, {
      toValue: 0,
      speed: 4,
      bounciness: 15,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={logoPreta} />
      </View>
      <Animated.View
        style={[
          styles.containerPerfil,
          {
            transform: [{translateY: offset.y}],
          },
        ]}>
        <Text style={styles.textoPerfil}>Escolha o seu perfil e se cadastre</Text>

        <Card 
          title="Gerador" 
          image={geradorIcon} 
          content="Venda ou doe os resíduos gerados na sua casa ou na sua empresa." 
          onPress={() => {
            navigation.navigate('WebViewGerador');
            //Linking.openURL("https://app.uzeh.com.br/uzeh-admin/newuser/gerador");
            /*
            navigation.navigate('CadastroColetorGerador', {
              screen: 'Cadastro1',
            });
            */
          }}
        />
        <Card 
          title="Catador" 
          image={catadorIcon} 
          content="Descubra onde tem resíduos na sua região e venda diretamente para o reciclador." 
          onPress={() => {
            navigation.navigate('WebViewReciclador');
            //Linking.openURL("https://app.uzeh.com.br/uzeh-admin/newuser/reciclador");
            /*
            navigation.navigate('CadastroColetor', {
              screen: 'Cadastro1',
            });
            */
          }}
        />
        <Card 
          title="Recicladora" 
          image={recicladoraIcon} 
          content="Descubra onde tem resíduos na sua região e venda diretamente para o reciclador." 
          onPress={() => {
            navigation.navigate('WebViewReciclador');
            //Linking.openURL("https://app.uzeh.com.br/uzeh-admin/newuser/reciclador");
            /*
            navigation.navigate('CadastroColetor', {
              screen: 'Cadastro1',
            });
            */
          }}
        />
        {/*<Button 
          mode="contained" 
          onPress={() => {
            navigation.navigate('Login', {
              screenPostLogin: 'Home'
            });
          }}  
          color={colors.newBlack}
          disabled={false} 
          uppercase={false} 
          style={{ alignSelf: 'stretch' }}
        >
          Já Tenho Cadastro
        </Button>*/}
        <AppButton 
          title="Já Tenho Cadastro" 
          onPress={() => {
            navigation.navigate('Login', {
              screenPostLogin: 'Home'
            });
          }} 
          backgroundColor={colors.newBlack} 
          fullWidth={true}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.darkGreen,
    flex: 1,
  },
  containerPerfil: {
    //justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    flex: 3,
  },
  textoPerfil: {
    marginBottom: '10%'
  },
  botao: {
    width: '100%',
    height: 60,
    borderRadius: 10,
    marginBottom: 20,
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
  botaoPerfil: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 30,
    alignItems: 'center',
  },
  loginButton: {
    flexDirection: 'row',
    marginTop: 10,
    top: '5%',
    bottom: '5%',
  },
  loginText: {
    fontWeight: '700',
    fontSize: 18,
  },
  logo: {
    justifyContent: 'center',
    flex: 1
  },
  cardContainer: {
    flexDirection: 'row', 
    width: '100%',
    aspectRatio: 3.5, 
    backgroundColor: colors.lightGreen, 
    alignItems: 'center', 
    elevation: 5,
    marginBottom: 15,
    borderRadius: 4
  },
  cardIcon: {
    width: '20%',
    aspectRatio: 1,
    marginLeft: '4%',
    marginRight: '3%'
  },
  cardRightView: {
    width: '68%'
  },
  cardTitle: {

  },
  cardTextContent: {
    fontSize: 10
  }
});

export default SelecionarPerfil;

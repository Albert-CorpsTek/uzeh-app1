import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Container from 'components/Container';
import {FCWithLoggedStackNavigator} from 'pages/LoggedStackNavigator';
import {useNavigation} from '@react-navigation/native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {colors} from 'src/theme';

import Uzeh404 from '../../../assets/images/not_found.jpeg';

const InOrder: FCWithLoggedStackNavigator<'InOrder'> = ({
  navigation: {navigate},
}) => {
  const navegar = useNavigation();

  function navigateBack() {
    navegar.goBack();
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#F4F1F0',
    },
    image: {
      width: 277,
      height: 277,
      alignSelf: 'center',
      marginTop: '40%',
      marginBottom: 25,
    },
    text: {
      alignContent: 'center',
      textAlign: 'center',
      fontSize: 14,
    },
  });
  return (
    <Container style={styles.container}>
      <TouchableOpacity
        onPress={() => navigate('Home')}
        style={{
          position: 'absolute',
          alignSelf: 'flex-start',
          marginLeft: '4%',
          marginTop: '8%',
          alignContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <FontAwesomeIcon icon={faChevronLeft} color={colors.black} size={40} />
      </TouchableOpacity>
      <Image source={Uzeh404} style={styles.image} />
      <Text style={styles.text}>Ops :(</Text>
      <Text style={styles.text}>
        Assim como um mundo melhor, essa tela do Uzeh
      </Text>
      <Text style={styles.text}>ainda está em construção.</Text>
      <Text style={styles.text}>Em breve a função que você procura</Text>
      <Text style={styles.text}>estará disponível.</Text>
      <Text style={styles.text}>Obrigado pela compreensão. :)</Text>
    </Container>
  );
};
export default InOrder;

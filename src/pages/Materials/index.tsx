import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions
} from 'react-native';
import GlobalContext from 'src/context';
import {useStateLink} from '@hookstate/core';

import {GroupControl, Input} from 'pages/Login/style';
import Container, {ContainerTop} from 'components/Container';
import {FCWithLoggedStackNavigator} from 'pages/LoggedStackNavigator';
import {colors} from 'src/theme';
import Option2 from 'src/components/Option2.js';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

import imgBanner from 'img/banner.png';
import LogoPreta from 'img/logo_branca_uzeh.png';
import LinearGradient from 'react-native-linear-gradient';

import request from 'util/request';
import {TextInputMask} from 'react-native-masked-text';
import { Button, DataTable, TextInput, Text } from 'react-native-paper';
import NumericInput from 'react-native-numeric-input';
import Topbar from 'components/Topbar';

const windowWidth = Dimensions.get('window').width;

const {
  cadastro: {categoryIdsRef},
  category: {categoriesRef, fetchCategories},
} = GlobalContext;

function Categorie({urlIcon}) {
  return (
    <Option2 urlIcon={'https://brunoananias.s3.amazonaws.com/papel.png'} />
  );
}

const Materials: FCWithLoggedStackNavigator<'Materials'> = ({
  navigation: {navigate},
}) => {
  const categoryIds = useStateLink(categoryIdsRef);
  const categories = useStateLink(categoriesRef);
  const [usersCategories, setUsersCategories] = useState([]);

  const fetchUsersCategories = async () => {
    try {
      const response = await request.authGet(
        'UsersCategories/getCategoriesUser',
      );

      setUsersCategories(response.result);
    } catch (e) {
      console.log(e);
    }
  };

  const setPrice = (newPrice, i) => {
    const arr = usersCategories.slice();
    arr[i].Price = newPrice;
    setUsersCategories(arr);
  };

  const setStock = (newStock, i) => {
    const arr = usersCategories.slice();
    arr[i].stock = newStock.toString();
    setUsersCategories(arr);
  };

  const submit = async () => {
    try {
      const response = await request.authPost('UsersCategories/updatePrices', {
        users_categories: JSON.stringify(usersCategories),
      });

      console.log(response.result);
      navigate('Home');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUsersCategories();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#F4F1F0',
    },
    top: {
      // backgroundColor: '#F00',
      height: 'auto',
    },
    middle: {
      flex: 1,
      width: '100%',
      // backgroundColor: '#FA9',
      alignContent: 'center',
    },

    containerButton: {
      width: '80%',
      borderRadius: 10,
      alignSelf: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      // backgroundColor: '#F00',
      top: 0,
    },
    items: {
      fontSize: 48,
    },

    textStyleF: {
      fontSize: 16,
      paddingLeft: 20,
      paddingRight: 20,
      color: 'white',
      textAlign: 'center',
      padding: 3,
    },
    usersCategoriesItem: {
      flexDirection: 'row',
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      justifyContent: 'space-around',
    },
    usersCategoriesItemIcon: {
      width: windowWidth * 0.15,
      aspectRatio: 1,
      justifyContent: 'center',
    },
    userCategoriesPrice: {
      width: '70%',
      marginRight: 15,
    },
    userCategoriesTitle: {
      alignItems: 'center',
    },
    submitText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 23,
      alignSelf: 'center',
    },
    botaoPerfil: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      // paddingLeft: 30,
      // alignItems: 'center',
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
      marginBottom: 20,
    },
    categoryContainer: {
      height: '100%',
      alignItems: 'center', 
      width: windowWidth * 0.225
    },
    categoryName: {
      flex: 1
    },
    userCategoryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center', 
      marginBottom: '3%'
    },
    userCategoryPriceAndStockContainer: {
      
    }
  });
  return (
    <>
    <Topbar title="Materiais" />
    <ScrollView style={styles.container}>
      <ContainerTop style={styles.top}>
        <ImageBackground
          source={imgBanner}
          style={{
            width: '100%',
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Container
            pb
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
              Materiais
            </Text>
          </Container>
        </ImageBackground>
      </ContainerTop>
      <View 
        style={{
          margin: '3%'
        }}
      >
        <View 
          style={{
            flexDirection: 'row'
          }}
        >
          <Text>Material</Text>
          <Text>Preço:</Text>
          <Text>Estoque (kg):</Text>
        </View>
        {usersCategories.map((item, index) => (
          <View key={item.id} style={styles.userCategoryContainer}>
            <View style={styles.categoryContainer}>
              <Image
                style={styles.usersCategoriesItemIcon}
                source={{
                  uri: item.url_icon
                }}
              />
              <Text style={styles.categoryName}>
                {item.name}
              </Text>
            </View>
            <View 
              style={{
                width: '25%'
              }}
            >
              {/*<Text>Preço:</Text>*/}
              <TextInput 
                render={props =>
                  <TextInputMask 
                    {...props} 
                    type={'money'} 
                    value={item.Price} 
                    onChangeText={text => setPrice(text, index)}
                  />
                } 
                mode="outlined" 
              />
            </View>
            <View 
              style={{
                width: '25%'
              }}
            >
              {/*<Text>Estoque (kg):</Text>*/}
              <TextInput 
                mode="outlined" 
                value={item.stock} 
                keyboardType="numeric" 
                onChangeText={text => setStock(text, index)} 
                style={{
                  textAlign: 'center'
                }}
              />
            </View>
          </View>
        ))}
        <View>
          <Button 
            color={colors.green} 
            mode="contained" 
            style={{
              paddingVertical: '2%'
            }} 
            onPress={submit}
          >
            Salvar
          </Button>
        </View>
      </View>
    </ScrollView>
    </>
  );
};
export default Materials;

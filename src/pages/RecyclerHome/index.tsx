import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Image, useWindowDimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import GlobalContext from 'src/context';
import { useStateLink } from '@hookstate/core';
import { Text, Button } from 'react-native-paper';
import { colors } from 'src/theme';
import placeholderImg from 'img/default-placeholder.png';
import dateFormat from 'util/dateFormat';
import { mySQLDateToJsDate } from 'util/formatDateTime';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import toCapitalizedCase from 'util/toCapitalizedCase';
import ImageSlider from 'components/ImageSlider';
import Swiper from 'react-native-swiper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import request from 'util/request';
import chevronLeft from '../../../assets/images/chevron-left.png';
import chevronRight from '../../../assets/images/chevron-right.png';
import Icon from 'components/Icon';
import OneSignal from 'react-native-onesignal';

const styles = StyleSheet.create({
  collectionOrdersContainer: {
    paddingVertical: '3%', 
    backgroundColor: colors.darkGreen
  },
  collectionOrderContainer: {
    flexDirection: 'row', 
    width: '90%', 
    marginBottom: '2%', 
    backgroundColor: colors.lightGreen, 
    borderRadius: 5, 
    alignSelf: 'center',
    height: 100,
    alignItems: 'stretch'
  },
  collectionOrderLeftContainer: {
    flex: 1, 
    borderRadius: 5,
    height: 100,
  },
  collectionOrderRightContainer: {
    flex: 1.2,
    paddingLeft: '4%',
    justifyContent: 'center',
    height: 100
  },
  collectionOrderCategoriesContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap'
  },
  header: {
    backgroundColor: colors.white, 
    justifyContent: 'center'
  },
  selectedCollectionOrderContainer: {
    width: '90%',
    backgroundColor: colors.lightOrange,
    aspectRatio: 1,
    alignSelf: 'center',
    marginBottom: 7,
    borderRadius: 5
  },
  selectedCollectionOrderIconButton: {
    width: '100%',
    alignItems: 'center'
  },
  selectedCollectionOrderContentContainer: {
    flexGrow: 1,
  },
  selectedCollectionOrderContentTop: {
    flex: 1,
    paddingHorizontal: '1%',
    paddingTop: '1%'
  },
  selectedCollectionOrderContentBottom: {
    flex: 1,
    paddingLeft: '3%',
    paddingTop: '2%'
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  dataContainer: {
    marginBottom: '4%'
  },
  text: {
    fontSize: hp('1.6%')
  },
  typeIndicator: {
    backgroundColor: colors.lightOrange,
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingHorizontal: '5%',
    alignItems: 'center',
    paddingVertical: '1%',
    justifyContent: 'center'
  },
  buttonText: {
    backgroundColor: colors.contrast3
  }
});

const {
  auth: { authStateRef},
  recycler: {
    collectionOrdersRef,
    loadingCollectionOrdersRef,
    //fetchCollectionOrders,
    searchRef,
  }
} = GlobalContext;

const CollectionOrder = ({ collectionOrder }) => {
  const [selected, setSelected] = useState(false);
  const authState = useStateLink(authStateRef);

  useEffect(() => {
    let oneSignalConfig = {
      'plain': `${authState.value.user?.plan_id}`, 
      'uf': `${authState.value.user?.state}`,
      'userType': `${authState.value.user?.user_type}`,
    }

    const categories = authState.value.user?.onesignal;
    const oneSignal = Object.assign(oneSignalConfig, JSON.parse(categories));

    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId("7d76b309-beda-4bb2-9221-05cb675b81d0");
    OneSignal.setExternalUserId(`${authState.value.user?.client_id}`)
    OneSignal.sendTags(oneSignal);
  }, []);

  const renderSwiper = (images, collectionOrderId) => {
    var itemArr = [];
    if (images.length > 0) {
      for (var i = 0; i < images.length; i++) {
        let image = images[i];
        itemArr.push(
          <View 
            key={collectionOrderId + '.' + image.id} 
            style={{
              width: '100%',
              height: '100%'
            }}>
            <Image 
              source={{ uri: image.url }} 
              style={{
                width: '100%',
                flex: 1,
                resizeMode: 'stretch'
              }}
            />
          </View>
        );
      }
    } else {
      itemArr.push(
        <View 
          key={collectionOrderId + '.0'} 
          style={{
            width: '100%',
            height: '100%'
          }}>
          <Image 
            source={placeholderImg} 
            style={{
              width: '100%',
              flex: 1,
              resizeMode: 'stretch'
            }}
          />
        </View>
      );
    }
    return itemArr;
  };

  if (selected) {
    return (
      <View 
        style={styles.selectedCollectionOrderContainer} 
        key={collectionOrder.id}>
        <View style={styles.selectedCollectionOrderContentContainer}>
          <View style={styles.selectedCollectionOrderContentTop}>
            <Swiper 
              showsButtons={true} 
              showsPagination={false} 
              loop={false} 
              nextButton={<Icon icon={chevronRight} color={colors.lightOrange} size={wp('10%')} />} 
              prevButton={<Icon icon={chevronLeft} color={colors.lightOrange} size={wp('10%')} />} 
              buttonWrapperStyle={{
                paddingHorizontal: 0
              }}>
              {renderSwiper(collectionOrder.images, collectionOrder.id)}
            </Swiper>
          </View>
          <View style={styles.selectedCollectionOrderContentBottom}>
            <View style={styles.dataContainer}>
              <Text style={styles.text}>Data da Coleta: {dateFormat(mySQLDateToJsDate(collectionOrder.date_service_ordes), 'd/m/Y')}</Text>
              <Text style={styles.text}>Turno: {toCapitalizedCase(collectionOrder.period)}</Text>
              <Text style={styles.text}>Bairro: {collectionOrder.district}</Text>
              <Text style={styles.text}>Materiais: {collectionOrder.categories.map(category => category.name).join(", ")}</Text>
              <Text style={styles.text}>Obs.: {collectionOrder.comments}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <Button 
                mode="contained" 
                color={colors.contrast2} 
                icon="check" 
                compact={true}>
                Eu pego
              </Button>
              <Button 
                mode="contained" 
                color={colors.contrast4} 
                icon="close" 
                compact={true}>
                Não quero
              </Button>
            </View>
          </View>
        </View>
        <TouchableWithoutFeedback  
          onPress={() => setSelected(false)} 
          style={{ alignSelf:'flex-end' }}>
          <View style={styles.selectedCollectionOrderIconButton}>
            <MaterialCommunityIcons 
              name="chevron-up" 
              color={colors.white} 
              size={wp('10%')}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  } else {
    return (
      <TouchableWithoutFeedback 
        onPress={() => {
          setSelected(true);
        }} 
        key={collectionOrder.id}>
        <View style={styles.collectionOrderContainer}>
          <View style={styles.collectionOrderLeftContainer}>
            <Image 
              source={collectionOrder.images.length > 0 ? {uri: collectionOrder.images[0].url} : placeholderImg } 
              style={{
                width: '100%',
                height: '100%', 
                borderTopLeftRadius: 5, 
                borderBottomLeftRadius: 5,
                resizeMode: 'stretch'
              }}
            />
            {collectionOrder.type === 1 && 
              <View style={styles.typeIndicator}>
                <Text>VENDA</Text>
              </View>
            }
          </View>
          <View style={styles.collectionOrderRightContainer}>
            <Text>{"Data da Coleta \n" + dateFormat(mySQLDateToJsDate(collectionOrder.date_service_ordes), 'd/m/Y')}</Text>
            <Text>{"Turno: " + collectionOrder.period}</Text>
            <Text>{collectionOrder.district}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const RecyclerHome = ({ navigation }) => {
  //const collectionOrders = useStateLink(collectionOrdersRef);
  const search = useStateLink(searchRef);
  const [mode, setMode] = useState(false);

  const window = useWindowDimensions();

  const onChangeSearch = query => setSearchQuery(query);

  const [selectedCollectionOrderId, setSelectedCollectionOrderId] = useState(-1);
  const [collectionOrders, setCollectionOrders] = useState(undefined);

  const fetchCollectionOrders = async () => {
    const response = await request.authGet('CollectionOrders/getAll');
    setCollectionOrders(response.result.collection_orders);
  };

  useEffect(() => {
    fetchCollectionOrders();
  }, []);

  function removerAcentos(newStringComAcento) {
    var string = newStringComAcento;
    var mapaAcentosHex 	= {
      a : /[\xE0-\xE6]/g,
      e : /[\xE8-\xEB]/g,
      i : /[\xEC-\xEF]/g,
      o : /[\xF2-\xF6]/g,
      u : /[\xF9-\xFC]/g,
      c : /\xE7/g,
      n : /\xF1/g
    };
  
    for ( var letra in mapaAcentosHex ) {
      var expressaoRegular = mapaAcentosHex[letra];
      string = string.replace( expressaoRegular, letra );
    }
  
    return string;
  }

  return (
    <ScrollView style={styles.collectionOrdersContainer}>
      {typeof collectionOrders !== 'undefined' && collectionOrders.filter((item) => {
        if (!search.value)
          return true;
        for (var j = 0; j < item.categories.length; j++) {
          var names = item.categories[j].name.split("/");
          for (var i = 0; i < names.length; i++) {
            if (removerAcentos(names[i].toLowerCase()).startsWith(removerAcentos(search.value.toLocaleLowerCase()))) {
              return true;
            }
          }
        }
        return false;
      }).map((collectionOrder, i) => (
        <CollectionOrder collectionOrder={collectionOrder} />
      ))}
    </ScrollView>
  );
};

export default RecyclerHome;
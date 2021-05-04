import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
import request from 'util/request';
import { FCWithLoggedStackNavigator } from 'pages/LoggedStackNavigator';
import Carousel from 'react-native-snap-carousel';
import GlobalContext from 'src/context';
import { useStateLink, useStateLinkUnmounted } from '@hookstate/core';
import { Text, Title, Button, Avatar, IconButton } from 'react-native-paper';
import { colors } from 'src/theme';
import avatarImg from 'img/avatar.png';
import whatsapp from 'util/whatsapp';
import notify from 'util/notify';
import Container from 'components/Container';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Topbar from 'components/Topbar';
import ImageCarousel from 'components/ImageCarousel';
import CollectorCard from 'components/CollectorCard';
import placeholderImg from 'img/default-placeholder.png';
import ImageSlider from 'components/ImageSlider';

const sliderWidth = Dimensions.get('window').width;
const itemWidth = Math.round(sliderWidth * 0.7);
const itemHeight = Math.round((itemWidth * 3) / 4);

const {
  evaluate: {
    OCRef,
    fetchOC,
    selectedOCRef,
    respondOC,
    loadingCompletionRef,
    loadingQuitRef,
  },
} = GlobalContext;

const CollectionDetails: FCWithLoggedStackNavigator<'CollectionDetails'> = ({
  route,
  navigation,
}) => {
  const { collectionOrderId } = route.params;
  //const OC = useStateLink(OCRef);
  const selectedOC = useStateLink(selectedOCRef);
  const [, setState] = useState();
  const authState = useStateLinkUnmounted(GlobalContext.auth.authStateRef);
  const [loadingCompletion, setLoadingCompletion] = useState(false);
  const [loadingQuit, setLoadingQuit] = useState(false);
  const [loadingRespond, setLoadingRespond] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [OC, setOC] = useState(undefined);

  const deleteCollectionOrdersResponse = async () => {
    setLoadingQuit(true);
    try {
      const response = await request.authGet("CollectionOrders/quit/" + OC.id);
  
      if(response.status === true) {
        notify(response.result.message, 'success');
        setLoadingQuit(false);
        navigation.navigate("Home");
      } else {
        notify(response.result.message, 'error');
      }
    } catch(e) {
      notify(e, 'error');
    }
  };

  const respondCollectionOrder = async () => {
    setLoadingRespond(true);
    try {
      const response = await request.authPost("CollectionOrdersResponses/create", {
        collection_order_id: OC.id
      });
      setLoadingRespond(false);
      //navigation.navigate("CollectionOrdersResponses");
      fetchCollectionOrder();
    } catch(e) {
      notify(e, 'error');
    }
  };

  const cancelCollectionOrder = async () => {
    setLoadingCancel(true);
    try {
      const response = await request.authGet("CollectionOrders/cancelCollectionOrder/" + OC.id);
      if(response.status === true) {
        notify(response.result.message, 'success');
        setLoadingCancel(false);
        navigation.navigate("Services");
      } else {
        notify(response.result.message, 'error');
      }
    } catch(e) {
      notify(e, 'error');
    }
  };

  const handleUpdate = () => {
    setState({});
  };

  const fetchCollectionOrder = async () => {
    try {
      const response = await request.authPost('CollectionOrders/getDetailOc', {
        oc_id: collectionOrderId
      });
      if (response.status === true) {
        console.log(JSON.stringify(response.result.images));
        setOC(response.result);
      } else {
        notify(response.result.message, 'error');
      }
    } catch (e) {
      notify(e, 'error');
    }
  };

  useEffect(() => {
    //fetchOC(collectionOrderId);
    fetchCollectionOrder();

    const unsubscribe = navigation.addListener('Focus', () => {
      //fetchOC(collectionOrderId);
      fetchCollectionOrder();
    });

    return unsubscribe;
  }, []);

  const completeCollectionOrder = async () => {
    setLoadingCompletion(true);
    try {
      const response = await request.authGet("CollectionOrders/markAsCollected/" + OC.id);
      setLoadingCompletion(false);
      navigation.navigate("Services");
      notify(response.result, 'success');
    } catch (e) {
      console.log(e);
      notify(e, 'error');
    }
  };

  if (typeof OC === "undefined" || OC.id !== collectionOrderId) {
    return <Text>Carregando...</Text>
  }

  return (
    <>
      <Topbar title="Pedido de coleta" />
      <ScrollView style={styles.container}>
        {/*<ImageCarousel images={OC.images.length > 0 ? OC.images : [placeholderImg]} />*/}
        <ImageSlider 
          data={OC.images} 
          imageKey="url" 
          width={sliderWidth} 
          contentContainerStyle={styles.imageSliderContentContainer} 
          indicatorContainerStyle={{position:'absolute', bottom: 20}} 
          indicatorActiveColor={'#8e44ad'} 
          indicatorInActiveColor={'#ffffff'}
        />
        <View style={styles.centeredContainer}>
          <View style={[styles.row]}>
            <Title>Materiais</Title>
            {/*<View style={styles.categoriesContainer}>
              {OC.categories.map(category => (
                <View
                  key={category.id}
                  style={styles.categoryContainer}
                >
                  <Image
                    source={{
                      uri: category.url_icon
                    }}
                    style={styles.categoryIcon}
                  />
                  <Text>{category.name}</Text>
                </View>
              ))}
                  </View>*/}
            <FlatList 
              data={OC.categories} 
              renderItem={({item, index}) => (
                <View
                  style={styles.categoryContainer}
                >
                  <Image
                    source={{
                      uri: item.url_icon
                    }}
                    style={styles.categoryIcon}
                  />
                  <Text>{item.name}</Text>
                </View>
              )} 
              horizontal={true} 
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={styles.row}>
            <Title style={styles.title}>Informações</Title>
            <View 
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <View>
                <Text>Tipo:</Text>
                <Text>Período:</Text>
                <Text>Quantidade (sacos):</Text>
              </View>
              <View>
                <Text>{OC.type ? "Venda" : "Doação"}</Text>
                <Text>{OC.period}</Text>
                <Text>{OC.quantity_garbage_bags}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.row]}>
            <Title style={styles.title}>Endereço</Title>
            <Text>{OC.address + ', ' + OC.number}</Text>
            <Text>{OC.district}</Text>
            <Text>{OC.city + ' - ' + OC.state}</Text>
          </View>
          <View style={[styles.row]}>
            <Title style={styles.title}>Descrição</Title>
            <Text>{OC.comments}</Text>
          </View>
          {authState.value.user.user_type == 4 && (<View style={styles.buttonsContainer}>
            {OC.collection_orders_response ? (
              <Button
                onPress={() => {
                  deleteCollectionOrdersResponse();
                }}
                mode="contained"
                icon="close-outline"
                color={colors.contrast4}
                compact={true}
                style={styles.button}
                labelStyle={styles.buttonLabel} 
                loading={loadingQuit}
              >
                Desistir
              </Button>
            ) : (
                <Button
                  onPress={() => {
                    respondCollectionOrder();
                  }}
                  mode="contained"
                  icon="check-bold"
                  color={colors.contrast}
                  compact={true}
                  style={styles.button}
                  labelStyle={styles.buttonLabel} 
                  loading={loadingRespond}
                >
                  Eu pego
                </Button>
              )}
          </View>)}
          {authState.value.user.user_type == 5 && OC.status === 'pendente' && (
            <>
              <Button
                onPress={() => {
                  cancelCollectionOrder();
                }}
                mode="contained"
                icon="close"
                color={colors.contrast4}
                compact={true}
                style={styles.button}
                labelStyle={styles.buttonLabel} 
                loading={loadingCancel}
              >
                Cancelar
              </Button>
              <Button onPress={() => navigation.navigate("CollectionOrderResponses", {collection_orders_responses: OC.collection_orders_responses})}>
                Ver {OC.collection_orders_responses.length} respostas
              </Button>
            </>
          )}
          {authState.value.user.user_type == 5 && OC.status === 'agendada' && (
            <>
              <CollectorCard 
                collector={OC.accepted_collection_order_response} 
                style={{
                  width: '100%',
                  marginBottom: 10
                }} 
              />
              <Button
                color={colors.contrast2}
                mode="contained"
                icon="check-circle"
                onPress={completeCollectionOrder}
                loading={loadingCompletion.value}
              >
                Finalizar
            </Button>
            </>
          )}
          <View style={{ height: 100 }}></View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: itemWidth,
    height: itemHeight,
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  centeredContainer: {
    flex: 1, 
    margin: '3%'
  },
  row: {
    marginBottom: 30
  },
  carouselContainer: {

  },
  itemContainer: {
    width: itemWidth,
    height: itemHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue',
  },
  itemLabel: {
    color: 'white',
    fontSize: 24,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  categoryIcon: {
    width: 70,
    height: 70,
    marginVertical: 10,
    marginLeft: 3,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5
  },
  categoryContainer: {
    alignItems: 'center',
    width: Math.round(sliderWidth / 5), 
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  button: {
    width: '100%',
  },
  categoryName: {
    width: 75
  },
  buttonLabel: {
    color: colors.white
  },
  collectionOrderResponseContainer: {
    flexDirection: 'row'
  },
  headerContainer: {
    flexDirection: 'row'
  },
  title: {
    marginBottom: 10
  },
  imageSliderContentContainer: {
    backgroundColor: colors.lightGray
  }
});

export default CollectionDetails;

import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {
  TouchableHighlight, ScrollView, StyleSheet, View, TouchableWithoutFeedback, Image, Dimensions, Alert
} from 'react-native';
import {
  TouchableRipple, IconButton, Button, Text, ActivityIndicator,
} from 'react-native-paper';
import CardComponent, { CardLeft, CardContentList } from 'components/Card';
import Container from 'components/Container';
import { colors } from 'src/theme';
import GlobalContext from 'src/context';
import { useStateLink } from '@hookstate/core';
import { formatDate, convertFormatedToNormal } from 'util/formatDate';
import { RootLoggedStackParamList } from 'pages/LoggedStackNavigator';
import request from 'util/request';
import dateFormat from 'util/dateFormat';
import { mySQLDateToJsDate } from 'util/formatDateTime';
import { TouchableOpacity } from 'react-native-gesture-handler';
import maskTelephone from 'util/maskTelephone';
import ImageSlider from 'components/ImageSlider';
import CardSlider from 'components/CardSlider';
import placeholderImg from 'img/default-placeholder.png';
import {whatsapp, checkWhatsapp} from 'util/whatsapp';
import styled from 'styled-components/native';
import notify from 'util/notify';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    marginHorizontal: 0,
  },
  btn: {
    backgroundColor: colors.surface,
    padding: 3,
    alignSelf: 'flex-end',
  },
  divwhite: {
    backgroundColor: '#F4F1F0',
    width: '100%',
    height: 1,
    padding: 10,
  },
  limitContainer: {
    alignItems: 'flex-start',
    backgroundColor: '#F4F1F0',
    alignSelf: 'flex-start',
  },
  sti: {
    backgroundColor: '#F4F1F0',
    padding: 20,
  },
  div: {
    backgroundColor: '#C0C0C0',
    width: '80%',
    height: 1,
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    padding: 6,
  },
  textStyleSub: {
    fontSize: 15,
    fontFamily: 'Manjari-Bold',
    color: 'black',
    padding: 6,
  },
  textStyleInfo: {
    fontSize: 15,
    color: 'black',
    padding: 5,
  },
  nview: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectionOrderContainer: {
    flexDirection: 'row', 
    width: '98%', 
    marginBottom: '2%', 
    backgroundColor: colors.lightGreen, 
    borderRadius: 5, 
    alignSelf: 'center'
  },
  collectionOrderLeftContainer: {
    flex: 1, 
    aspectRatio: 1, 
    borderRadius: 5
  },
  collectionOrderRightContainer: {
    flex: 2,
    marginLeft: '5%',
    paddingTop: '4%',
  },
  collectionOrderImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  collectionOrderCategoriesContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap'
  },
  collectionOrderResponseLink: {
    color: colors.lightOrange,
    textTransform: 'uppercase'
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  collectionOrderDetailsContainer: {
    marginBottom: '2%',
    backgroundColor: colors.lightGreen,
    borderRadius: 5,
    //width: '98%',
    //aspectRatio: 0.9
  },
  collectionOrderDetailsBottom: {
    paddingHorizontal: '5%',
    //flex: 5,
    justifyContent: 'space-between',
    paddingBottom: '1%',
    paddingTop: '5%'
  },
  collectionOrderDetailsTop: {
    //flex: 4
    width: '98%',
    aspectRatio: 2
  },
  styledIconButtons: {
    flexDirection: 'row',
    marginTop: '4%'
  },
  collectionOrderDetailsButton: {
    marginBottom: '2%'
  },
  collectionOrderDetailsButtons: {
    marginBottom: '5%'
  }
});

const {
  services: {
    fetch,
    scheduledRef,
    loadingScheduledRef,
  },
  evaluate: {
    selectedOCRef,
    fetchOC,
    loadingOCRef,
    OCRef,
    //cancelCollectionOrder,
    //cancelCollectionOrderResponse,
  },
} = GlobalContext;

interface ScheduledProps {
  navigate: (routeName: keyof RootLoggedStackParamList) => void;
  callback: (value: number) => void;
}

const windowWidth = Dimensions.get('window').width;

const StyledIconButton = styled(IconButton)`
  border-radius: 4px;
  background-color: ${props => props.icon === "whatsapp" ? colors.contrast2 : colors.contrast4};
  margin-left: 0px;
`;

enum STATES {
  AGENDADO,
  REALIZADO,
  PENDENTE,
  AGENDADA,
  FINALIZADA,
  CANCELADA,
}

const Scheduled: React.FC<ScheduledProps> = ({ navigate, callback }) => {
  //const scheduled = useStateLink(scheduledRef);
  const loading = useStateLink(loadingScheduledRef);
  const selectedOC = useStateLink(selectedOCRef);
  const loadingOC = useStateLink(loadingOCRef);
  const OC = useStateLink(OCRef);
  const [page, setPage] = useState(1);
  const [collectionOrderId, setCollectionOrderId] = useState(-1);
  const [hasWhatsAppInstalled, setHasWhatsAppInstalled] = useState(false);
  const [scheduled, setScheduled] = useState(undefined);

  const fetch = async () => {
    const response = await request.authPost(
      'CollectionOrders/listOsScheduledClient', 
      {
        status: 'agendada'
      }
    );
    if (response.status === true) {
      setScheduled(response.result);
    }
  };

  const cancelCollectionOrder = async (collectionOrderId) => {
    const response = await request.authGet('CollectionOrders/cancelCollectionOrder/' + collectionOrderId);
    if (response.status === true) {
      fetch();
      notify(response.result.message, 'success');
    } else {
      notify(response.result.message, 'error');
    }
  };

  const cancelCollectionOrderResponse = async (collectionOrderResponseId) => {
    const response =  await request.authGet('CollectionOrdersResponses/dismiss/' + collectionOrderResponseId);
    if (response.status === true) {
      fetch();
      notify(response.result, 'success');
    } else {
      notify(response.result, 'error');
    }
  };

  useEffect(() => {
    fetch();
    checkWhatsapp(setHasWhatsAppInstalled);
  }, []);

  useEffect(() => {
    //setCollectionOrderId(-1);
  }, [scheduled]);

  /*
  if (loading.value || scheduled.value === undefined) {
    return (
      <Container horizontal vertical padding={30}>
        <ActivityIndicator />
      </Container>
    );
  }
  */

  const Details = ({ collectionOrder }) => (
    <View style={styles.collectionOrderDetailsContainer}>
      <CardSlider 
        covers={collectionOrder.images}
      />
      <View style={styles.collectionOrderDetailsBottom}>
        <View 
          style={{
            marginBottom: '5%'
          }}>
          <Text>Nome: {collectionOrder.collection_order_response.user.name}</Text>
          <Text>Telefone: {maskTelephone(collectionOrder.collection_order_response.user.person.number_contact)}</Text>
          {/*<View style={styles.styledIconButtons}>
            <StyledIconButton  
              icon="whatsapp"  
              onPress={() => whatsapp("Olá coletor", collectionOrder.collection_order_response.user.person.number_contact)} 
              disabled={!hasWhatsAppInstalled}
            />
            <StyledIconButton  
              icon="close"  
              onPress={() => cancelCollectionOrderResponse(collectionOrder.collection_order_response.id, () => fetch('scheduled'))} 
            />
          </View>*/}
        </View>
        <View 
          style={{
            marginBottom: '10%'
          }}>
          {collectionOrder.type && collectionOrder.collection_order_response.user.users_categories.map(user_category => (
            <Text key={`${collectionOrder.id}.${user_category.id}`}>{user_category.category.name} (R$ {user_category.Price}/kg)</Text>
          ))}
        </View>
        <View style={styles.collectionOrderDetailsButtons}>
          <Button 
            mode="contained" 
            icon="whatsapp" 
            color={colors.contrast2} 
            compact={true} 
            onPress={() => whatsapp("Olá, aceitei sua coleta pelo Uzeh.", collectionOrder.collection_order_response.user.person.number_contact)} 
            style={styles.collectionOrderDetailsButton} 
            disabled={!hasWhatsAppInstalled}
          >
            Falar com o Coletor
          </Button>
          <Button 
            mode="contained" 
            icon="account-switch" 
            color={colors.lightOrange} 
            compact={true} 
            //onPress={() => cancelCollectionOrderResponse(collectionOrder.collection_order_response.id, () => fetch('scheduled'))}
            style={styles.collectionOrderDetailsButton} 
            onPress={() => {
              Alert.alert(
                "Mudar coletor",
                "Deseja mudar o coletor?",
                [
                  {
                    text: "Sim",
                    onPress: () => cancelCollectionOrderResponse(collectionOrder.collection_order_response.id)
                  },
                  {
                    text: "Não",
                    style: "cancel"
                  }
                ],
                { cancelable: true }
              );
            }}
          >
            Mudar o Coletor
          </Button>                    
          <Button 
            mode="contained" 
            icon="close" 
            color={colors.contrast4} 
            compact={true} 
            //onPress={() => cancelCollectionOrder(collectionOrder.id, () => fetch('scheduled'))} 
            onPress={() => {
              Alert.alert(
                "Cancelar coleta",
                "Deseja cancelar esta coleta?",
                [
                  {
                    text: "Sim",
                    onPress: () => cancelCollectionOrder(collectionOrder.id)
                  },
                  {
                    text: "Não",
                    style: "cancel"
                  }
                ],
                { cancelable: true }
              );
            }}
          >
            Cancelar Coleta
          </Button>
        </View>
        <IconButton 
          icon="chevron-up" 
          onPress={() => setCollectionOrderId(-1)} 
          style={{
            width: '100%'
          }}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.scrollView}>
      {scheduled !== undefined && scheduled.map((collectionOrder, i) => {
        return collectionOrder.id === collectionOrderId ? (
          <Details collectionOrder={collectionOrder} key={collectionOrder.id} />
        ) : (
          <View 
            style={styles.collectionOrderContainer} 
            key={collectionOrder.id}
          >
            <View style={styles.collectionOrderLeftContainer}>
              <Image 
                source={collectionOrder.images.length > 0 ? {uri: collectionOrder.images[0].url} : placeholderImg } 
                style={styles.collectionOrderImage} 
                defaultSource={placeholderImg}
              />
            </View>
            <View style={styles.collectionOrderRightContainer}>
              <View>
                <Text>{"Data da Coleta: " + dateFormat(mySQLDateToJsDate(collectionOrder.date_service_ordes), 'd/m/Y')}</Text>
                <Text>{"Tipo: " + (collectionOrder.type ? "Venda" : "Doação")}</Text>
                <Text>{"Turno: " + collectionOrder.period}</Text>
              </View>
              <TouchableOpacity onPress={() => setCollectionOrderId(collectionOrder.id)}>
                <Text style={styles.collectionOrderResponseLink}>+Detalhes</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Scheduled;

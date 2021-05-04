import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {
  TouchableHighlight, ScrollView, StyleSheet, View, Image, TouchableWithoutFeedback, TouchableOpacity, useWindowDimensions, Alert
} from 'react-native';
import {
  TouchableRipple, IconButton, Text, Portal, Modal, Title
} from 'react-native-paper';
import CardComponent, { CardLeft, CardContentList } from 'components/Card';
import Container from 'components/Container';
import { colors } from 'src/theme';
import GlobalContext from 'src/context';
import { useStateLink } from '@hookstate/core';
import { formatDate, convertFormatedToNormal } from 'util/formatDate';
import { RootLoggedStackParamList } from 'pages/LoggedStackNavigator';
import request from 'util/request';
import placeholderImg from 'img/default-placeholder.png';
import dateFormat from 'util/dateFormat';
import { mySQLDateToJsDate } from 'util/formatDateTime';
import ImageSlider from 'components/ImageSlider';
import styled from 'styled-components/native';
import CardSlider from 'components/CardSlider';
import notify from 'util/notify';
import ImageCarousel from 'components/ImageCarousel';

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
  collectionOrderResponsesLink: {
    color: colors.lightOrange
  },
  styledIconButtons: {
    flexDirection: 'row',
    marginTop: '5%'
  },
  collectionOrderDetailsContainer: {
    width: '98%',
    backgroundColor: colors.lightGreen,
    marginBottom: '2%',
    alignSelf: 'center',
    aspectRatio: 1
  },
  collectionOrderResponsesContainer: {
    padding: '5%',
    flex: 1
  },
  collectorName: {
    marginTop: '5%'
  },
  modalText: {
    color: colors.newBlack,
    marginBottom: '2%'
  },
  modalContainerStyle: {
    backgroundColor: colors.white,
    width: '90%',
    height: '60%',
    alignSelf: 'center',
    padding: '5%',
    justifyContent: 'flex-start'
  },
  modalTitle: {
    marginBottom: '5%',
    color: colors.newBlack
  },
  cancelIconButtonContainer: {
    position: 'absolute',
    right: 0
  },
  collectionOrderDetailsContent: {
    flexGrow: 1
  }
});

interface StyledIconButtonProps {
  backgroundColor: string;
}

const StyledIconButton = styled(IconButton)<StyledIconButtonProps>`
  border-radius: 4px;
  background-color: ${props => props.backgroundColor};
  margin-left: 0px;
`;

const {
  services: {
    fetch,
    pendingRef,
    loadingPendingRef,
  },
  evaluate: {
    selectedOCRef,
    fetchOC,
    loadingOCRef,
    OCRef,
    //acceptCollectionOrderResponse,
    //cancelCollectionOrderResponse
  },
} = GlobalContext;

interface PendingProps {
  navigate: (routeName: keyof RootLoggedStackParamList) => void;
  callback: (value: number) => void;
}

enum STATES {
  AGENDADO,
  REALIZADO,
  PENDENTE,
  AGENDADA,
  FINALIZADA,
  CANCELADA,
}

const Pending: React.FC<PendingProps> = ({ navigate, callback }) => {
  //const pending = useStateLink(pendingRef);
  const loading = useStateLink(loadingPendingRef);
  const selectedOC = useStateLink(selectedOCRef);
  const loadingOC = useStateLink(loadingOCRef);
  const OC = useStateLink(OCRef);
  const [page, setPage] = useState(1);
  const [collectionOrderId, setCollectionOrderId] = useState(-1);
  const window = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCollectionOrderResponse, setModalCollectionOrderResponse] = useState(null);
  const [pending, setPending] = useState(undefined);

  const fetch = async () => {
    const response = await request.authPost(
      'CollectionOrders/listOsScheduledClient', 
      {
        status: 'pendente'
      }
    );
    if (response.status === true) {
      setPending(response.result);
    }
  };

  const acceptCollectionOrderResponse = async (collectionOrderResponseId) => {
    const response = await request.authGet('CollectionOrdersResponses/accept/' + collectionOrderResponseId);
    if (response.status === true) {
      fetch();
      notify(response.result, 'success');
    } else {
      notify(response.result, 'error');
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

  const cancelCollectionOrder = async (collectionOrderId) => {
    const response = await request.authGet('CollectionOrders/cancelCollectionOrder/' + collectionOrderId);
    if (response.status === true) {
      fetch();
      notify(response.result.message, 'success');
    } else {
      notify(response.result.message, 'error');
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  /*
  if (loading.value || pending.value === undefined) {
    return (
      <Container horizontal vertical padding={30}>
        <ActivityIndicator />
      </Container>
    );
  }
  */

  const Details = ({ collectionOrder }) => (
    <View style={styles.collectionOrderDetailsContainer}>
      <View style={styles.collectionOrderDetailsContainer}>
        <ImageCarousel 
          images={collectionOrder.images} 
          style={{
            width: '100%',
            flex: 1
          }}
        />
        <View style={styles.collectionOrderResponsesContainer}>
          {collectionOrder.collection_orders_responses.map((i) => (
            <View key={`${collectionOrder.id}.${i.id}`}>
              <Text style={styles.collectorName}>{i.user.name}</Text>
              <View style={styles.styledIconButtons}>
                <StyledIconButton 
                  icon="check" 
                  onPress={() => acceptCollectionOrderResponse(i.id)} 
                  backgroundColor={colors.contrast2}
                />
                <StyledIconButton 
                  icon="close" 
                  onPress={() => {
                    Alert.alert(
                      "Rejeitar proposta",
                      "Deseja rejeitar esta proposta?",
                      [
                        {
                          text: "Sim",
                          onPress: () => cancelCollectionOrderResponse(i.id)
                        },
                        {
                          text: "Não",
                          style: "cancel"
                        }
                      ],
                      { cancelable: true }
                    );
                  }} 
                  backgroundColor={colors.contrast4}
                />
                {collectionOrder.type && <StyledIconButton 
                  icon="eye" 
                  backgroundColor={colors.lightOrange} 
                  onPress={() => {
                    setModalCollectionOrderResponse(i);
                    setModalVisible(true);
                  }}
                />}
              </View>
            </View>
          ))}
        </View>
      </View>
      <IconButton 
        icon="chevron-up" 
        onPress={() => setCollectionOrderId(-1)} 
        style={{
          width: '100%'
        }}
      />
    </View>
  );

  return (
    <>
    <View style={styles.scrollView}>
      {pending !== undefined && pending.map((collectionOrder, i) => {
        return collectionOrderId === collectionOrder.id ? (
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
              <TouchableRipple 
                onPress={() => setCollectionOrderId(collectionOrder.id)} 
                disabled={collectionOrder.collection_orders_responses.length == 0}>
                <Text style={styles.collectionOrderResponsesLink}>{collectionOrder.collection_orders_responses.length} INTERESSADOS</Text>
              </TouchableRipple>
            </View>
            <View style={styles.cancelIconButtonContainer}>
              <IconButton 
                icon="close" 
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
              />
            </View>
          </View>
        );
      })}
    </View>
    <Portal>
      {modalCollectionOrderResponse && <Modal 
        visible={modalVisible} 
        onDismiss={() => setModalVisible(false)} 
        contentContainerStyle={styles.modalContainerStyle} 
        theme={{
          colors: {
            backdrop: 'rgba(52, 52, 52, 0.8)',
          },
        }}>
        <Title style={styles.modalTitle}>{modalCollectionOrderResponse.user.name}</Title>
        {modalCollectionOrderResponse.user.users_categories.map(user_category => (
          <Text 
            key={`${modalCollectionOrderResponse.id}.${user_category.id}`} 
            style={styles.modalText}>
            {user_category.name} (R$ {user_category.Price.toFixed(2)}/kg)
          </Text>
        ))}
      </Modal>}
    </Portal>
    </>
  );
};

export default Pending;

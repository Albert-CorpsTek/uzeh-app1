import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableHighlight, StyleSheet, Image } from 'react-native';
import request from 'util/request';
import notify from 'util/notify';
import { colors } from 'src/theme';
import placeholderImg from 'img/default-placeholder.png';
import Topbar from 'components/Topbar';
import { Title, Badge } from 'react-native-paper';
import { formatDate } from 'util/formatDate';
import MenuCarousel from 'components/MenuCarousel';
import dateFormat from 'util/dateFormat';
import { mySQLDateToJsDate } from 'util/formatDateTime';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '3%'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  statusContainer: {
    alignItems: 'center',
    alignSelf: 'baseline',
    paddingHorizontal: '10%'
  },
  textStyleSub: {
    fontSize: 15,
    fontFamily: 'Manjari-Bold',
    color: 'black',
  },
  collectionOrderContainer: {
    flexDirection: 'row', 
    width: '98%', 
    marginBottom: '2%', 
    backgroundColor: colors.white, 
    borderRadius: 5, 
    alignSelf: 'center', 
    padding: '3%'
  },
  collectionOrderLeftContainer: {
    flex: 1, 
    aspectRatio: 1, 
    borderRadius: 5
  },
  collectionOrderRightContainer: {
    flex: 2,
    marginLeft: '3%'
  },
  collectionOrderImage: {
    width: '100%',
    height: '100%', 
    borderRadius: 5
  },
  collectionOrderCategoriesContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap'
  },
  status: {
    paddingLeft: '5%', 
    marginTop: '10%',
    paddingVertical: '2%'
  },
  collectionOrdersContainer: {
    paddingVertical: '3%', 
    backgroundColor: colors.darkGray
  },
});

const CollectionOrderCard = ({ collectionOrdersResponse, onPress }) => {

  const renderSwitch = (param) => {
    switch(param) {
      case 'pendente':
        return colors.contrast3;
      case 'aceita':
        return colors.contrast2;
      case 'negada':
        return colors.contrast4;
      case 'agendada':
        return colors.contrast;
      case 'coletada':
        return colors.orange;
      case 'finalizada':
        return colors.contrast2;
      case 'cancelada':
        return colors.contrast4;
    }
  };

  return (
    <TouchableHighlight
      onPress={onPress}
    >
      <View style={styles.collectionOrderContainer}>
        <View style={styles.collectionOrderLeftContainer}>
          <Image
            source={collectionOrdersResponse.collection_order.collection_orders_images.length > 0 ? {
              uri: collectionOrdersResponse.collection_order.collection_orders_images[0].url
            } : placeholderImg}
            style={styles.image}
          />
        </View>
        <View style={styles.collectionOrderRightContainer}>
          <View 
            style={{
              marginBottom: '10%'
            }}
          >
            <Title>Dados da coleta</Title>
            <Text style={styles.textStyleSub}>{formatDate(collectionOrdersResponse.collection_order.created, 'FULL')}</Text>
            <View style={[styles.statusContainer, {backgroundColor: renderSwitch(collectionOrdersResponse.collection_order.status)}]}>
              <Text>{collectionOrdersResponse.collection_order.status}</Text>
            </View>
          </View>
          <View>
            <Title>Dados da resposta</Title>
            <Text style={styles.textStyleSub}>{formatDate(collectionOrdersResponse.created, 'FULL')}</Text>
            <View style={[styles.statusContainer, {backgroundColor: renderSwitch(collectionOrdersResponse.status)}]}>
              <Text>{collectionOrdersResponse.status}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

enum STATES {
  TODAS,
  AGUARDANDO_GERADOR,
  EM_ANDAMENTO,
  FINALIZADAS,
  REJEITADAS,
}

const CollectionOrdersResponses = ({ navigation: { navigate } }) => {
  const [collectionOrdersResponses, setCollectionOrdersResponses] = useState([]);
  const [state, setState] = useState<STATES>(STATES.TODAS);

  const fetchCollectionOrdersResponses = async () => {
    try {
      console.log("Pegando OC responses.");
      const response = await request.authGet('CollectionOrdersResponses/getAll');
      if (response.status === true) {
        console.log(JSON.stringify(response.result));
        setCollectionOrdersResponses(response.result.collection_orders_responses);
      } else {
        notify(response.result.message, 'error');
      }
    } catch (e) {
      notify(e, 'error');
    }
  };

  const statusDescription = (status) => {
    switch(status) {
      case 'pendente':
        return <Text style={[styles.status, { backgroundColor: colors.contrast3 }]}>Aguardando OK do Gerador</Text>;
      case 'aceita':
        return <Text style={[styles.status, { backgroundColor: colors.orange }]}>Em andamento</Text>;
      case 'negada':
        return <Text style={[styles.status, { backgroundColor: colors.contrast4 }]}>Rejeitada</Text>;
      case 'recebido':
        return <Text style={[styles.status, { backgroundColor: colors.contrast2 }]}>Finalizada</Text>;
    }
  };

  useEffect(() => {
    fetchCollectionOrdersResponses();
  }, []);

  return (
    <>
      <Topbar title="Minhas respostas" />
      <MenuCarousel 
        items={[
          {
            name: 'TODAS',
            value: STATES.TODAS
          },
          {
            name: 'AGUARDANDO GERADOR',
            value: STATES.AGUARDANDO_GERADOR
          },
          {
            name: 'EM ANDAMENTO',
            value: STATES.EM_ANDAMENTO
          },
          {
            name: 'FINALIZADAS',
            value: STATES.FINALIZADAS
          },
          {
            name: 'REJEITADAS',
            value: STATES.REJEITADAS
          }
        ]} 
        value={state} 
        onValueChange={val => setState(val)}
      />
      <ScrollView style={styles.collectionOrdersContainer}>
        {collectionOrdersResponses.filter(collectionOrdersResponse => {
          switch(state) {
            case STATES.AGUARDANDO_GERADOR:
              return collectionOrdersResponse.status === 'pendente';
            case STATES.EM_ANDAMENTO:
              return collectionOrdersResponse.status === 'aceita';
            case STATES.REJEITADAS:
              return collectionOrdersResponse.status === 'negada';
            case STATES.FINALIZADAS:
              return collectionOrdersResponse.status === 'recebido';
            default:
              return true;
          }
        }).map((collectionOrdersResponse, i) => (
          <TouchableHighlight 
            onPress={() => {
              navigate('CollectionDetails', {
                collectionOrderId: collectionOrdersResponse.collection_order.id,
              });
            }} 
            key={i}
          >
            <View style={styles.collectionOrderContainer}>
              <View style={styles.collectionOrderLeftContainer}>
                <Image 
                  source={collectionOrdersResponse.collection_order.images.length > 0 ? {uri: collectionOrdersResponse.collection_order.images[0].url} : placeholderImg } 
                  style={styles.collectionOrderImage}
                />
              </View>
              <View style={styles.collectionOrderRightContainer}>
                <Text>{"Data da Coleta: " + dateFormat(mySQLDateToJsDate(collectionOrdersResponse.collection_order.date_service_ordes), 'd/m/Y') + "\nTurno: " + collectionOrdersResponse.collection_order.period}</Text>
                <Text>{`${collectionOrdersResponse.collection_order.district}/${collectionOrdersResponse.collection_order.city}-${collectionOrdersResponse.collection_order.state}`}</Text>
                {statusDescription(collectionOrdersResponse.status)}
              </View>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
    </>
  );
};

export default CollectionOrdersResponses;
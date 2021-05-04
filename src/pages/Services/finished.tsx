import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet, View, Image, TouchableOpacity
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
import dateFormat from 'util/dateFormat';
import { mySQLDateToJsDate } from 'util/formatDateTime';
import placeholderImg from 'img/default-placeholder.png';

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
    color: colors.lightOrange,
    textTransform: 'uppercase'
  },
});

const {
  services: {
    fetch,
    collectedRef,
    loadingCollectedRef,
  },
} = GlobalContext;

interface ScheduledProps {
  navigate: (routeName: keyof RootLoggedStackParamList) => void;
}

const Finished: React.FC<ScheduledProps> = ({ navigate }) => {
  const canceled = useStateLink(collectedRef);
  const loading = useStateLink(loadingCollectedRef);
  const [collectionOrderId, setCollectionOrderId] = useState(-1);

  useEffect(() => {
    fetch('collected');
  }, []);

  return (
    <View style={styles.scrollView}>
      {canceled.value !== undefined && canceled.value.map((collectionOrder, i) => (
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
              <Text style={styles.collectionOrderResponsesLink}>{collectionOrder.collection_order_response.user.name}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Finished;

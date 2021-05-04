import React, {useState} from 'react';
import GlobalContext from 'src/context';
import { useStateLink } from '@hookstate/core';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import avatarImg from 'img/avatar.png';
import { Avatar, Button, IconButton, Title, TouchableRipple } from 'react-native-paper';
import { colors } from 'src/theme';
import request from 'src/util/request';
import notify from 'util/notify';
import Topbar from 'components/Topbar';

const {
  evaluate: {
    OCRef,
  },
} = GlobalContext;

const CollectionOrderResponses = ({
  navigation: { navigate },
  route
}) => {
  const {collection_orders_responses} = route.params;
  const OC = useStateLink(OCRef);

  const [loadingAccept, setLoadingAccept] = useState(false);

  const acceptCollectionOrderResponse = async (collectionOrderResponse) => {
    setLoadingAccept(true);
    try {
      const response = await request.authGet('CollectionOrdersResponses/accept/' + collectionOrderResponse.id);
      setLoadingAccept(false);
      if(response.status === true) {
        notify(response.result, 'success');
        navigate("CollectionDetails", {
          collectionOrderId: collectionOrderResponse.collection_order_id
        });
      } else {
        notify(response.result, 'error');
      }
    } catch(e) {
      notify(e, 'error');
    }
  };

  return (
    <>
      <Topbar title="Respostas ao pedido de coleta" />
      <View style={styles.collectionOrderResponsesContainer}>
        <ScrollView>
          {collection_orders_responses.map(collectionOrderResponse => (
            <View
              key={collectionOrderResponse.id}
              style={styles.collectionOrderResponseContainer}
            >
              <View style={styles.avatarContainer}>
                <Avatar.Image source={collectionOrderResponse.client.image ? collectionOrderResponse.client.image : avatarImg} style={styles.avatarImage} />
              </View>
              <View style={styles.infoContainer}>
                <TouchableRipple onPress={() => navigate("Collector", { collectionOrderResponse: collectionOrderResponse })}>
                  <View style={styles.topContainer}>
                    <Title style={styles.collectorName}>{collectionOrderResponse.user.name}</Title>
                    <IconButton 
                      icon="arrow-right" 
                      color={colors.contrast2} 
                    />
                  </View>
                </TouchableRipple>
                <View style={styles.categoriesContainer}>
                  {collectionOrderResponse.user.categories.map(category => (
                    <Image 
                      source={{
                        uri: category.url_icon
                      }} 
                      style={styles.categoryIcon} 
                      key={category.id}
                    />
                  ))}
                </View>
                <View style={styles.buttonsContainer}>
                  <Button 
                    mode="contained" 
                    color={colors.contrast} 
                    style={{marginRight: '3%'}} 
                    onPress={() => acceptCollectionOrderResponse(collectionOrderResponse)} 
                    loading={loadingAccept}
                  >
                    Aceitar
                  </Button>
                  <Button mode="contained" color={colors.contrast4}>
                    Rejeitar
                  </Button>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  collectionOrderResponsesContainer: {
    width: '100%',
    padding: 20,
  },
  collectionOrderResponseContainer: {
    backgroundColor: colors.white,
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row'
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  avatarContainer: {
    marginBottom: 10,
    flex: 1,
    alignItems: 'center'
  },
  infoContainer: {
    flex: 3
  },
  button: {
    marginRight: 10
  },
  avatarImage: {
    marginRight: 10
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: '3%',
    flexWrap: 'wrap'
  },
  categoryIcon: {
    width: 35,
    height: 35,
    marginRight: 3
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginBottom: '3%',
  },
  collectorName: {
    color: colors.contrast2, 
    textAlignVertical: 'center'
  }
});

export default CollectionOrderResponses;
import React, {useState} from 'react';
import {ScrollView, View, StyleSheet, Image, Dimensions} from 'react-native';
import {Avatar, Button, Title} from 'react-native-paper';
import avatarImg from 'img/avatar.png';
import Topbar from 'components/Topbar';
import {colors} from 'src/theme';
import request from 'util/request';
import notify from 'util/notify';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: '3%'
  },
  collectorContainer: {
    alignItems: 'center',
    backgroundColor: colors.darkGray,
    marginBottom: '3%'
  },
  categoriesContainer: {
    alignItems: 'center',
    paddingBottom: '10%', 
    backgroundColor: colors.textOnSurface
  },
  categoriesIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  categoryIcon: {
    width: 35,
    height: 35,
    marginRight: 3
  },
  acceptButton: {
    width: '100%'
  },
  title: {
    marginBottom: '5%'
  },
  imageProfileContainer: {
    backgroundColor: colors.darkGray,
    width: '100%',
    alignItems: 'center', 
    paddingVertical: '10%'
  }
});

const Collector = ({navigation: { navigate }, route}) => {
  const { collectionOrderResponse } = route.params;

  const [loadingAccept, setLoadingAccept] = useState(false);

  const acceptCollectionOrderResponse = async () => {
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
      <Topbar title="Coletor" />
      <ScrollView style={styles.container}>
        <View style={styles.collectorContainer}>
          <View style={styles.imageProfileContainer}>
            <Avatar.Image 
              source={collectionOrderResponse.client.image ? collectionOrderResponse.client.image : avatarImg} 
              size={windowWidth * 0.2}
            />
          </View>
          <Title>{collectionOrderResponse.user.name}</Title>
        </View>
        <View style={styles.categoriesContainer}>
          <Title style={styles.title}>Trabalha reciclando</Title>
          <View style={styles.categoriesIconsContainer}>
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
        </View>
        <Button 
          mode="contained"
          icon="check"
          color={colors.contrast2}
          style={styles.acceptButton}
          onPress={() => {}}
        >
          Aceitar
        </Button>
      </ScrollView>
    </>
  )
};

export default Collector;
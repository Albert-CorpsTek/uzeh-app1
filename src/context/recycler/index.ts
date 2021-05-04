import { createStateLink } from '@hookstate/core';
import request from 'util/request';

const userCoordinatesRef = createStateLink(undefined);

const collectionOrdersRef = createStateLink(undefined);
const loadingCollectionOrdersRef = createStateLink(false);
const fetchCollectionOrders = async () => {
  const userCoordinates = userCoordinatesRef.access();
  //if (typeof userCoordinates === 'undefined') {
    const loading = loadingCollectionOrdersRef.access();
    loading.set(true);
    const response = await request.authPost('CollectionOrders/getAll', {
      'latitude': userCoordinates.latitude,
      'longitude': userCoordinates.longitude
    });
    console.log("MINHAS COLETAS =>" + JSON.stringify(response));
    loading.set(false);
    collectionOrdersRef.access().set(response.result.collection_orders);
  //}
};

const searchRef = createStateLink('');
const currentScreenRef = createStateLink('RecyclerHome');

export default {
  collectionOrdersRef,
  loadingCollectionOrdersRef,
  fetchCollectionOrders,
  searchRef,
  userCoordinatesRef,
  currentScreenRef,
};
import {createStateLink} from '@hookstate/core';
import request from 'util/request';

const selectedClientIdRef = createStateLink(undefined);
const openDrawerRef = createStateLink(false);

const userPositionRef = createStateLink(undefined);
const collectionOrdersRef = createStateLink(undefined);

const fetchCollectionOrders = async () => {
  const userPosition = userPositionRef.access();
  try {
    const response = await request.authPost('CollectionOrders/getAll', {
      latitude: userPosition.latitude.toString(),
      longitude: userPosition.longitude.toString(),
    });
    if (response.status === true) {
      collectionOrdersRef.access().set(response.result.collection_orders);
    }
  } catch (err) {
  }
};

export default {
  selectedClientIdRef,
  openDrawerRef,
  userPositionRef, 
  collectionOrdersRef,
  fetchCollectionOrders,
};
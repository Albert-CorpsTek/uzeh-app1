import {createStateLink, useStateLinkUnmounted} from '@hookstate/core';
import request from 'util/request';
import Request from 'src/interfaces/Request';

interface OC {
  id: number;
  quantity_garbage_bags: number;
  date_service_ordes: string;
  address: string;
  number: string;
  complement: string;
  comments: string;
  status: string;
  district: string;
  city: string;
  state: string;
  created: string;
  period: string;
}

const scheduledRef = createStateLink(undefined);
const collectedRef = createStateLink(undefined);
const canceledRef = createStateLink(undefined);
const pendingRef = createStateLink(undefined);
const loadingScheduledRef = createStateLink(true);
const loadingCollectedRef = createStateLink(true);
const loadingCanceledRef = createStateLink(true);
const loadingPendingRef = createStateLink(true);

const fetch = async (type: 'scheduled' | 'collected' | 'canceled' | 'pending') => {
  const loadingScheduled = loadingScheduledRef.access();
  const loadingCollected = loadingCollectedRef.access();
  const loadingCanceled = loadingCanceledRef.access();
  const loadingPending = loadingPendingRef.access();
  if (type === 'scheduled') {
    loadingScheduled.set(true);
    const response = await request.authPost<Request<OC[]>>(
      'CollectionOrders/listOsScheduledClient', 
      {
        status: 'agendada'
      }
    );
    loadingScheduled.set(false);
    response.status === true && scheduledRef.access().set(response.result);
    console.log("Ta funcionando...");
  } else if (type === 'collected') {
    loadingCollected.set(true);
    const response = await request.authPost<Request<OC[]>>(
      'CollectionOrders/listOsScheduledClient', 
      {
        status: 'coletada'
      }
    );
    loadingCollected.set(false);
    response.status === true && collectedRef.access().set(response.result);
  } else if (type == 'canceled') {
    loadingCanceled.set(true);
    const response = await request.authPost<Request<OC[]>>(
      'CollectionOrders/listOsScheduledClient', 
      {
        status: 'cancelada'
      }
    );
    loadingCanceled.set(false);
    response.status === true && canceledRef.access().set(response.result);
  } else if (type == 'pending') {
    loadingPending.set(true);
    const response = await request.authPost(
      'CollectionOrders/listOsScheduledClient', 
      {
        status: 'pendente'
      }
    );
    loadingPending.set(false);
    response.status === true && pendingRef.access().set(response.result);
    console.log("Ta funcionando...");
  }
};

export default {
  scheduledRef,
  collectedRef,
  canceledRef,
  pendingRef,
  fetch,
  loadingScheduledRef,
  loadingCollectedRef,
  loadingCanceledRef,
  loadingPendingRef,
};

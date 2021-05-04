import { createStateLink } from '@hookstate/core';
import OS from 'src/interfaces/OS';
import request from 'util/request';
import notify from 'util/notify';

type Request<T> = {
  status: true;
  result: T;
} | {
  status: false;
  result: {
    message: string;
  };
};

const loadingOSRef = createStateLink(false);
const loadingOCRef = createStateLink(false);
const OSRef = createStateLink<OS | undefined>(undefined);
const OCRef = createStateLink(undefined);
const selectedOSRef = createStateLink<number | undefined>(undefined);
const selectedOCRef = createStateLink<number | undefined>(undefined);
const loadingEvaluationRef = createStateLink(false);
const loadingCompletionRef = createStateLink(false);
const firstOCRef = createStateLink(undefined);
const fetchOS = async () => {
  const selectedOS = selectedOSRef.access();
  const loadingOS = loadingOSRef.access();
  if (!selectedOS.value) {
    return;
  }
  loadingOS.set(true);
  const response = await request.authPost<Request<OS>>('serviceOrders/getDetailOs', {
    os_id: selectedOS.value.toString(),
  });
  loadingOS.set(false);
  if (response.status === true) {
    OSRef.access().set(response.result);
  } else {
    notify(response.result.message, 'error');
  }
};

const fetchOC = async (id) => {
  const selectedOC = selectedOCRef.access();
  const loadingOC = loadingOCRef.access();
  /*
  if (!selectedOC.value) {
    console.log("Fudeu!");
    return;
  }
  */
  loadingOC.set(true);
  try {
    const response = await request.authPost('CollectionOrders/getDetailOc', {
      oc_id: id//selectedOC.value.toString(),
    });
  
    if (response.status === true) {
      OCRef.access().set(response.result);
    } else {
      notify(response.result.message, 'error');
    }
    loadingOC.set(false);
  } catch (e) {
    console.log(e);
  }
};

const evaluate = async (stars: string) => {
  const selectedOS = selectedOSRef.access();
  const loadingEvaluation = loadingEvaluationRef.access();
  if (!selectedOS.value) {
    return;
  }
  loadingEvaluation.set(true);
  const response = await request.authPost<Request<any>>('Providers/insertRating', {
    os_id: selectedOS.value.toString(),
    stars,
  });
  loadingEvaluation.set(false);
  if (response.status === true) {
    notify('Fornecedor avaliado com sucesso!', 'success');
  } else {
    notify(response.result.message, 'error');
  }
};

const respondOC = async (id) => {
  const selectedOC = selectedOCRef.access();
  try {
    const res = await request.authPost("CollectionOrdersResponses/create", {
      collection_order_id: id
    });

    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

const loadingQuitRef = createStateLink(false);
const deleteCollectionOrdersResponse = async () => {
  const OC = OCRef.access();
  const loadingQuit = loadingQuitRef.access();
  loadingQuit.set(true);
  try {
    const response = await request.authGet("CollectionOrders/quit/" + OC.value.id);

    if(response.status === true) {
      notify(response.result.message, 'success');
    } else {
      notify(response.result.message, 'error');
    }
    loadingQuit.set(false);
  } catch(e) {
    notify(e, 'error');
  }
};

const completeCollectionOrder = async () => {
  const OC = OCRef.access();
  const loadingCompletion = loadingCompletionRef.access();
  loadingCompletion.set(true);
  try {
    const response = await request.authGet("CollectionOrders/complete/" + OC.value.id);
    loadingCompletion.set(false);
    notify(response.result, 'success');
  } catch(e) {
    notify(e, 'error');
  }
};

const acceptCollectionOrderResponse = async (collectionOrderResponseId, onSuccess) => {
  const response = await request.authGet('CollectionOrdersResponses/accept/' + collectionOrderResponseId);
  if (response.status === true) {
    if (onSuccess) {
      onSuccess();
    }
    notify(response.result, 'success');
  } else {
    notify(response.result, 'error');
  }
};

const cancelCollectionOrderResponse = async (collectionOrderResponseId, onSuccess) => {
  const response =  await request.authGet('CollectionOrdersResponses/dismiss/' + collectionOrderResponseId);
  if (response.status === true) {
    if (onSuccess) {
      onSuccess();
    }
    notify(response.result, 'success');
  } else {
    notify(response.result, 'error');
  }
};

const cancelCollectionOrder = async (collectionOrderId, onSuccess) => {
  const response = await request.authGet('CollectionOrders/cancelCollectionOrder/' + collectionOrderId);
  if (response.status === false) {
    if (onSuccess) {
      onSuccess();
    }
    notify(response.result.message, 'success');
  } else {
    notify(response.result.message, 'error');
  }
};

export default {
  loadingOSRef,
  loadingOCRef,
  OSRef,
  OCRef,
  fetchOS,
  fetchOC,
  selectedOSRef,
  selectedOCRef,
  evaluate,
  respondOC,
  deleteCollectionOrdersResponse,
  completeCollectionOrder,
  loadingCompletionRef, 
  firstOCRef,
  loadingQuitRef,
  acceptCollectionOrderResponse,
  cancelCollectionOrderResponse,
  cancelCollectionOrder,
};

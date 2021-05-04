import { createStateLink } from '@hookstate/core';
import OS from 'src/interfaces/OS';
import Request from 'src/interfaces/Request';
import request from 'util/request';
import Budget from 'src/interfaces/Budget';

const selectedNegotiationBudgetRef = createStateLink<number | undefined>(undefined);
const negotiationBudgetRef = createStateLink<OS | undefined>(undefined);
const loadingNegotiationBudgetRef = createStateLink(true);
const loadingNegotiationBudgetListRef = createStateLink(true);
const negotiationBudgetListRef = createStateLink<any[] | undefined>(undefined);

const fetchNegotiationBudget = async () => {
  const selectedNegotiationBudget = selectedNegotiationBudgetRef.access();
  const loadingNegotiationBudget = loadingNegotiationBudgetRef.access();
  if (!selectedNegotiationBudget.value) {
    return;
  }


  loadingNegotiationBudget.set(true);
  const response = await request.authPost<Request<OS>>('ServiceOrders/getDetailOs', {
    os_id: selectedNegotiationBudget.value.toString(),
  });
  loadingNegotiationBudget.set(false);
  response.status === true && negotiationBudgetRef.access().set(response.result);
};

const acceptNegotiationBudget = async () => {
  const selectedNegotiationBudget = selectedNegotiationBudgetRef.access();

  if (!selectedNegotiationBudget.value) {
    return null;
  }

  interface Request {
    result: string;
    status: boolean;
  }

  const response = await request.authPost<Request>('Budgets/endTrading', {
    os_id: selectedNegotiationBudget.value.toString(),
  });

  return response;
};

const declineNegotiationBudget = async () => {
  const selectedNegotiationBudget = selectedNegotiationBudgetRef.access();

  if (!selectedNegotiationBudget.value) {
    return null;
  }

  interface Request {
    result: string;
    status: boolean;
  }

  const response = await request.authPost<Request>('ServiceOrders/cancelOs', {
    os_id: selectedNegotiationBudget.value.toString(),
  });

  return response;
};

const fetchNegotiationBudgetList = async () => {
  const loading = loadingNegotiationBudgetListRef.access();
  loading.set(true);
  const response = await request.authPost<Request<Budget[]>>('ServiceOrders/getOsInNegociation');
  negotiationBudgetListRef.access().set(response.result ?? []);
  loading.set(false);
};

const pageNegotiationBudgetRef = createStateLink(0);

export default {
  selectedNegotiationBudgetRef,
  negotiationBudgetRef,
  loadingNegotiationBudgetRef,
  fetchNegotiationBudget,
  acceptNegotiationBudget,
  declineNegotiationBudget,
  loadingNegotiationBudgetListRef,
  negotiationBudgetListRef,
  fetchNegotiationBudgetList,
  pageNegotiationBudgetRef,
};

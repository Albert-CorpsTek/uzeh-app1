import { createStateLink } from '@hookstate/core';
import Request from 'src/interfaces/Request';
import request from 'util/request';
import Budget from 'src/interfaces/Budget';
import OS from 'src/interfaces/OS';

const loadingOpenBudgetListRef = createStateLink(true);
const openBudgetListRef = createStateLink<any[] | undefined>(undefined);
const fetchOpenBudgetList = async () => {
  const loading = loadingOpenBudgetListRef.access();
  loading.set(true);
  const response = await request.authPost<Request<Budget[]>>('ServiceOrders/listMyOsPayOpen');
  response.status === true && openBudgetListRef.access().set(response.result ?? []);
  loading.set(false);
};
const pageOpenBudgetRef = createStateLink(0);
const selectedOpenBudgetRef = createStateLink<number | undefined>(undefined);

const openBudgetRef = createStateLink<OS | undefined>(undefined);
const loadingOpenBudgetRef = createStateLink(true);

const fetchOpenBudget = async () => {
  const selectedOpenBudget = selectedOpenBudgetRef.access();
  if (!selectedOpenBudget.value) {
    return;
  }
  const loading = loadingOpenBudgetRef.access();
  loading.set(true);
  const response = await request.authPost<Request<OS>>('ServiceOrders/getDetailOS', {
    os_id: selectedOpenBudget.value.toString(),
  });
  if (response.status === true) {
    openBudgetRef.access().set(response.result);
  }
  loading.set(false);
};

const payBudget = () => {
  const selectedOpenBudget = selectedOpenBudgetRef.access();
  if (!selectedOpenBudget.value) {
    return null;
  }
  return request.authPost<Request<string>>('ServiceOrders/payOs', {
    os_id: selectedOpenBudget.value.toString(),
  });
};

export default {
  loadingOpenBudgetListRef,
  openBudgetListRef,
  fetchOpenBudgetList,
  pageOpenBudgetRef,
  selectedOpenBudgetRef,
  fetchOpenBudget,
  loadingOpenBudgetRef,
  openBudgetRef,
  payBudget,
};

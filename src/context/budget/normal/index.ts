import { createStateLink } from '@hookstate/core';
import request from 'util/request';
import Budget from 'src/interfaces/Budget';
import Request from 'src/interfaces/Request';

const selectedNormalBudgetRef = createStateLink<number | undefined>(undefined);
const normalBudgetListRef = createStateLink<Budget[] | undefined>(undefined);

const loadingNormalBudgetListRef = createStateLink(true);

const fetchNormalBudgetList = async () => {
  const loading = loadingNormalBudgetListRef.access();
  loading.set(true);
  const response = await request.authPost<Request<Budget[]>>('ServiceOrders/listOsSearchBudgets');
  response.status === true && normalBudgetListRef.access().set(response.result ?? []);
  loading.set(false);
};

const pageNormalBudgetRef = createStateLink(0);

export default {
  pageNormalBudgetRef,
  selectedNormalBudgetRef,
  normalBudgetListRef,
  loadingNormalBudgetListRef,
  fetchNormalBudgetList,
};

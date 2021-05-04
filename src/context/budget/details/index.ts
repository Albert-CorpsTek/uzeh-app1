import { createStateLink } from '@hookstate/core';
import Details from 'src/interfaces/Details';
import request from 'util/request';
import GlobalContext from 'src/context';
import Request from 'src/interfaces/Request';

const detailsRef = createStateLink<Details[] | undefined>(undefined);
const loadingDetailsRef = createStateLink(true);

const fetchDetails = async () => {
  const {
    budget: { normal: { selectedNormalBudgetRef } },
  } = GlobalContext;
  const loading = loadingDetailsRef.access();
  const selectedBudget = selectedNormalBudgetRef.access().value;
  if (!selectedBudget) {
    return;
  }

  loading.set(true);
  const response = await request.authPost<Request<Details[]>>('Budgets/listBudgetOs', {
    os_id: selectedBudget.toString(),
  });

  if (response.status === true) {
    detailsRef.access().set(response.result);
  }

  loading.set(false);
};

export default {
  detailsRef,
  loadingDetailsRef,
  fetchDetails,
};

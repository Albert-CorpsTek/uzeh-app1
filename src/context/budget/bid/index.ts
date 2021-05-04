import { createStateLink, useStateLinkUnmounted } from '@hookstate/core';
import request from 'util/request';
import OS from 'src/interfaces/OS';
import notify from 'util/notify';

type BID = {
  id: number;
  value: number;
};

const selectedBidRef = createStateLink<BID | undefined>(undefined);
const loadingAcceptRef = createStateLink(false);
const loadingFetchRef = createStateLink(false);
const bidRef = createStateLink<OS | undefined>(undefined);

const fetchBid = async () => {
  const selectedBid = useStateLinkUnmounted(selectedBidRef);
  const loading = useStateLinkUnmounted(loadingFetchRef);
  const bid = useStateLinkUnmounted(bidRef);
  if (!selectedBid.value) {
    return;
  }
  loading.set(true);
  const response = await request.authPost<{result: OS; status: boolean}>('serviceOrders/getDetailOs', {
    os_id: selectedBid.value.id.toString(),
  });
  bid.set(response.result);
  loading.set(false);
};

const acceptBid = async () => {
  const selectedBid = useStateLinkUnmounted(selectedBidRef);
  const loading = useStateLinkUnmounted(loadingAcceptRef);
  if (!selectedBid.value) {
    return;
  }
  loading.set(true);
  const response = await request.authPost<{status: boolean; result: { message: string }}>('Budgets/winningBid', {
    budget_id: selectedBid.value.id.toString(),
  });
  loading.set(false);

  if (response.status === true) {
    notify('Lance aceito com sucesso!', 'success');
  } else {
    notify(response.result.message, 'error');
  }
};

export default {
  selectedBidRef,
  bidRef,
  acceptBid,
  fetchBid,
  loadingAcceptRef,
  loadingFetchRef,
};

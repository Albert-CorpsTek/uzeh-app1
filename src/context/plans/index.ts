import request from 'util/request';
import { createStateLink } from '@hookstate/core';

const plansRef = createStateLink([]);

const fetchPlans = async (userType) => {
  const plans = plansRef.access();
  const response = await request.authGet("Plans/get/" + userType);

  if(response.status === true) {
    plans.set(response.result);
    console.log("Resposta: " + (typeof response.result))
  }
};

export default {
  plansRef,
  fetchPlans
};
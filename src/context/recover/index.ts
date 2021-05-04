import { createStateLink } from '@hookstate/core';
import request from 'util/request';
import Request from 'src/interfaces/Request';
import notify from 'util/notify';

const initialState = {
  cpf: '',
  email: '',
};

const state = createStateLink(initialState);

const submitPasswordChange = async () => {
  const {
    cpf,
    email,
  } = state.access().value;
  const response = await request.post<Request<unknown, 'msg_erro'>>('users/getNewPasswordClient', {
    cpf,
    email,
  });

  if (response.status) {
    notify(response.result as string, 'success');
  } else {
    notify(response.result.msg_erro, 'error');
  }
};

const clear = () => state.access().set(initialState);

export default {
  cpfRef: state.wrap((s) => s.value.cpf),
  emailRef: state.wrap((s) => s.value.email),
  setCpf: (cpf: string) => state.set((prev) => ({
    ...prev,
    cpf,
  })),
  setEmail: (email: string) => state.set((prev) => ({
    ...prev,
    email,
  })),
  submitPasswordChange,
  clear,
};

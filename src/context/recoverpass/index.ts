import {
  createStateLink,
  useStateLinkUnmounted,
  useStateLink,
} from '@hookstate/core';

const cpfRef = createStateLink('');
const emailRef = createStateLink('');

const clearForm = () => {
  useStateLinkUnmounted(cpfRef).set('');
  useStateLinkUnmounted(emailRef).set('');
};

export default {
  cpfRef,
  emailRef,
  clearForm,
};
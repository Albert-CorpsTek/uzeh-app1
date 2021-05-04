import { createStateLink } from '@hookstate/core';

const emailRef = createStateLink('');
const passwordRef = createStateLink('');
const userTypeRef = createStateLink('');
const cpfRef = createStateLink('');

export default {
  emailRef,
  passwordRef,
  userTypeRef,
  cpfRef,
};

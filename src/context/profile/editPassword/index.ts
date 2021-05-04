import {createStateLink} from '@hookstate/core';

const oldPasswordRef = createStateLink('');
const newPasswordRef = createStateLink('');
const confirmNewPasswordRef = createStateLink('');

export default {
  oldPasswordRef,
  newPasswordRef,
  confirmNewPasswordRef,
};

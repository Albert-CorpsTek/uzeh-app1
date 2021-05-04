import { createStateLink } from '@hookstate/core';

const visibleRef = createStateLink(false);
const messageRef = createStateLink('');
const isErrorRef = createStateLink(false);

export default {
  visibleRef,
  messageRef,
  isErrorRef,
};

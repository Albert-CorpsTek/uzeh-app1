import { createStateLink } from '@hookstate/core';

const visibleRef = createStateLink(false);

export default {
  visibleRef,
};
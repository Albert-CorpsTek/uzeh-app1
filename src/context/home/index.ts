import { createStateLink } from '@hookstate/core';

export const selectedCategoryRef = createStateLink<number | undefined>(undefined);

export default {
  selectedCategoryRef,
};

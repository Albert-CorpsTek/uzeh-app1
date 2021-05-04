import { createStateLink, useStateLinkUnmounted } from '@hookstate/core';

export type CATEGORY_OPTIONS = 'medical' | 'construction' | 'shopping'

export type Categories = {
  [P in CATEGORY_OPTIONS]: {
    label: string;
    icon: string;
    children: {
      [s: string]: {
        label: string;
      };
    };
  }
}

export const categories: Categories = {
  medical: {
    label: 'Medicina',
    icon: 'hospital',
    children: {
      a: {
        label: 'Atendimento em domicílio',
      },
      b: {
        label: 'Farmácias',
      },
    },
  },
  construction: {
    label: 'Construção',
    icon: 'home-variant',
    children: {
      a: {
        label: 'Pedreiros',
      },
      b: {
        label: 'Arquitetos',
      },
      c: {
        label: 'Lojas',
      },
    },
  },
  shopping: {
    label: 'Shopping',
    icon: 'cart',
    children: {
      a: {
        label: 'Roupas',
      },
      b: {
        label: 'Saltos',
      },
      c: {
        label: 'Bolsas',
      },
    },
  },
};

const selectedCategoryRef = createStateLink<CATEGORY_OPTIONS>('medical');
const selectedCategory = useStateLinkUnmounted(selectedCategoryRef);
const selectedSubcategoryRef = createStateLink(
  Object.keys(categories[selectedCategory.value].children)[0],
);

export default {
  selectedCategoryRef,
  selectedSubcategoryRef,
};

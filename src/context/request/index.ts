import {
  createStateLink,
  useStateLinkUnmounted,
  useStateLink,
} from '@hookstate/core';

const selectedCategoryRef = createStateLink<number | 'default'>(
  'default',
);
const selectedSubcategoryRef = createStateLink<
  number | 'default'
>('default');
const valueRef = createStateLink('');
const photosRef = createStateLink<string[]>([]);
const loadingRef = createStateLink(false);

const dataColetaRef = createStateLink(new Date());
const usarEnderecoDiferenteRef = createStateLink(false);
const comentarioRef = createStateLink('');
const qtdSacosLixoRef = createStateLink('');
const addressRef = createStateLink('');
const numberRef = createStateLink('');
const complementRef = createStateLink('');
const neighborhoodRef = createStateLink('');
const periodoColetaRef = createStateLink('manhã');
const cityRef = createStateLink('');
const stateRef = createStateLink('');
const latitudeRef = createStateLink(0);
const longitudeRef = createStateLink(0);
const tipoColetaRef = createStateLink('0');

const getCollectionOrder = async (id) => {
  
};

export default {
  selectedCategoryRef,
  selectedSubcategoryRef,
  valueRef,
  photosRef,
  loadingRef,
  dataColetaRef,
  usarEnderecoDiferenteRef,
  comentarioRef,
  qtdSacosLixoRef,
  addressRef,
  numberRef,
  complementRef,
  neighborhoodRef,
  periodoColetaRef,
  cityRef,
  stateRef,
  latitudeRef,
  longitudeRef,
  tipoColetaRef,
};
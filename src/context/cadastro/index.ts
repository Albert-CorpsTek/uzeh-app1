import {
  createStateLink,
  useStateLinkUnmounted,
  useStateLink,
} from '@hookstate/core';

const selectedCategoryRef = createStateLink('default');
const selectedSubcategoryRef = createStateLink<string | undefined>(undefined);

const nameRef = createStateLink('');
const lastNameRef = createStateLink('');
const apelidoRef = createStateLink('');
const cpfRef = createStateLink('');
const cnpjRef = createStateLink('');
const rgRef = createStateLink('');
const institutionRgRef = createStateLink('');
const birthdayRef = createStateLink('');
const phoneRef = createStateLink('');
const emailRef = createStateLink('');
const categoryRef = createStateLink(0);
const categoryVucovucoRef = createStateLink(0);
const subCategoryRef = createStateLink(0);
const cepRef = createStateLink('');
const addressRef = createStateLink('');
const numberRef = createStateLink('');
const complementRef = createStateLink('');
const neighborhoodRef = createStateLink('');
const cityRef = createStateLink('');
const stateRef = createStateLink('');
const passwordRef = createStateLink('');
const creditCardNumberRef = createStateLink('');
const expirationDateRef = createStateLink('');
const cardSecurityCodeRef = createStateLink('');
const firstNameRef = createStateLink('');
const genderRef = createStateLink('');
const categoryIdsRef = createStateLink([]);
const categoryIdsVucovucoRef = createStateLink([]);
const latitudeRef = createStateLink(0);
const longitudeRef = createStateLink(0);
const unregisteredUserIdRef = createStateLink(0);
const isCompanyRef = createStateLink(true);
const confirmPasswordRef = createStateLink('');

const clearForm = () => {
  useStateLinkUnmounted(nameRef).set('');
  useStateLinkUnmounted(lastNameRef).set('');
  useStateLinkUnmounted(apelidoRef).set('');
  useStateLinkUnmounted(cpfRef).set('');
  useStateLinkUnmounted(cnpjRef).set('');
  useStateLinkUnmounted(rgRef).set('');
  useStateLinkUnmounted(institutionRgRef).set('');
  useStateLinkUnmounted(birthdayRef).set('');
  useStateLinkUnmounted(phoneRef).set('');
  useStateLinkUnmounted(emailRef).set('');
  useStateLinkUnmounted(categoryRef).set(0);
  useStateLinkUnmounted(categoryVucovucoRef).set(0);
  useStateLinkUnmounted(subCategoryRef).set(0);
  useStateLinkUnmounted(cepRef).set('');
  useStateLinkUnmounted(addressRef).set('');
  useStateLinkUnmounted(numberRef).set('');
  useStateLinkUnmounted(complementRef).set('');
  useStateLinkUnmounted(neighborhoodRef).set('');
  useStateLinkUnmounted(cityRef).set('');
  useStateLinkUnmounted(stateRef).set('');
  useStateLinkUnmounted(passwordRef).set('');
  useStateLinkUnmounted(creditCardNumberRef).set('');
  useStateLinkUnmounted(expirationDateRef).set('');
  useStateLinkUnmounted(cardSecurityCodeRef).set('');
  useStateLinkUnmounted(genderRef).set('');
  useStateLinkUnmounted(categoryIdsRef).set([]);
  useStateLinkUnmounted(categoryIdsVucovucoRef).set([]);
  useStateLinkUnmounted(longitudeRef).set(0);
  useStateLinkUnmounted(latitudeRef).set(0);
  useStateLinkUnmounted(unregisteredUserIdRef).set(0);
  useStateLinkUnmounted(isCompanyRef).set(true);
  useStateLinkUnmounted(confirmPasswordRef).set('');
};

export default {
  categoryIdsRef,
  categoryIdsVucovucoRef,
  genderRef,
  nameRef,
  lastNameRef,
  apelidoRef,
  // nicknameRef,
  cpfRef,
  cnpjRef,
  rgRef,
  institutionRgRef,
  phoneRef,
  emailRef,
  passwordRef,
  categoryRef,
  categoryVucovucoRef,
  subCategoryRef,
  cepRef,
  addressRef,
  numberRef,
  complementRef,
  neighborhoodRef,
  cityRef,
  stateRef,
  creditCardNumberRef,
  expirationDateRef,
  cardSecurityCodeRef,
  selectedCategoryRef,
  selectedSubcategoryRef,
  birthdayRef,
  latitudeRef,
  longitudeRef,
  unregisteredUserIdRef,
  clearForm,
  isCompanyRef,
  confirmPasswordRef,
};

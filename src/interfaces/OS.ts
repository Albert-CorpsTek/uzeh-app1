export default interface OS {
  category: string;
  category_id: number;
  created: string;
  date_service_ordes: string;
  description: string;
  id: number;
  subcategory: string;
  subcategory_id: number;
  value_final: number;
  client: {
    name: string;
    person: {
      address: string;
      cep: string;
      city: string;
      district: string;
      number: string;
      state: string;
    };
  };
}

export const handleOSValue = (value: number | null) => {
  if (value) {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  }

  return 'Sem valor';
};

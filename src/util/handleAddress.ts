const handleAddress = ({
  address = '',
  cep = '',
  city = '',
  district,
  number = '',
  state = '',
  complement,
}: {
  address?: string;
  cep?: string;
  city?: string;
  district?: string;
  number?: string;
  state?: string;
  complement?: string;
}) => `${address}, ${number}${district ? `, ${district}` : ''}${complement ? `, ${complement}` : ''}, ${city}/${state} - ${cep}`;

export default handleAddress;

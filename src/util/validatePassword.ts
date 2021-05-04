const validatePassword = (password: string) => {
  if (password.length < 8) {
    return {
      status: false, 
      error: 'A senha deve ter mais de 8 caracteres'
    };
  }

  const number = RegExp("[0-9]+");
  const letter = /[a-zA-Z]/;
  if(!number.test(password) || !letter.test(password)) {
    return {
      status: false, 
      error: 'A senha deve conter letras e números'
    };
  }
  return {
    status: true, 
    error: ''
  };
};

export default validatePassword;
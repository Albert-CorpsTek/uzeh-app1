const insert = (main_string: string, ins_string: string, pos: number) => {
  return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
};

const maskTelephone = (telephone: string) => {
  return telephone.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

export default maskTelephone;
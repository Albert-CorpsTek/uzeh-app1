const toCapitalizedCase = function (str: string): string {
  return  str[0].toUpperCase() + str.slice(1);
};

export default toCapitalizedCase;
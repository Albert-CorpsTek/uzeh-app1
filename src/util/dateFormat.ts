const dateFormat = (date, format) => {
  var d, m, y;
  y = date.getFullYear();
  m = date.getMonth() + 1;
  d = date.getDate();

  function pad(n) {
    return n < 10 ? '0' + n : n;
  };

  format = format.replace("d", pad(d));
  format = format.replace("m", pad(m));
  format = format.replace("Y", y);

  return format;
};

export default dateFormat;
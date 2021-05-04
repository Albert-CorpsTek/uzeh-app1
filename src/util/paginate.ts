const paginate = <T>(
  array: T[],
  page: number,
  size = 10,
): T[] => array.slice(
  page * size,
  page * size + size,
);

export default paginate;

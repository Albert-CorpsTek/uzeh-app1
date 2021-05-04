import { useRef } from 'react';

export default () => {
  const hasError = useRef<boolean>(false);
  hasError.current = false;

  const check = (flag: boolean) => {
    if (flag) {
      hasError.current = flag;
    }

    return flag;
  };

  return {
    hasError,
    check,
  };
};

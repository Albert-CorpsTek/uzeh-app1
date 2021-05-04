import { useState } from 'react';

const useStateWithTouchable = <T>(value: T, setValue: (value: T) => void) => {
  const [touched, setTouched] = useState(false);
  const [blurred, setBlurred] = useState(false);

  const onBlur = () => setBlurred(true);

  const set = (v: T) => {
    if (touched === false) {
      setTouched(true);
    }
    if (blurred === true) {
      setBlurred(false);
    }
    setValue(v);
  };

  return {
    value,
    set,
    touched,
    blurred,
    onBlur,
  };
};

export default useStateWithTouchable;

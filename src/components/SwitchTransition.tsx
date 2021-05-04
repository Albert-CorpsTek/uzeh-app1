import React, { useContext } from 'react';
import { RRProps, RR } from 'src/App';
import TransitionRight from './TransitionRight';
import TransitionLeft from './TransitionLeft';

interface Props {
  children: (childrenProps: {
    makeTransition: Function;
    testFunc: (name: string, RRProps: RRProps) => boolean;
  }) => [JSX.Element, JSX.Element];
}

const SwitchTransition: React.FC<Props> = ({ children }) => {
  const { transition } = useContext(RR);
  const testFunc = (name: string, { prev, current }: RRProps) => (
    prev ? prev === name : current === name
  );

  return transition === 'left' ? (
    <TransitionLeft onFinish={() => undefined}>
      {({ makeTransition }) => children({
        makeTransition,
        testFunc,
      })}
    </TransitionLeft>
  ) : (
    <TransitionRight onFinish={() => undefined}>
      {({ makeTransition }) => children({
        makeTransition,
        testFunc,
      })}
    </TransitionRight>
  );
};

export default SwitchTransition;

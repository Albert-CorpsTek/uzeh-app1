import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import { animated, useSpring } from 'react-spring';
import { DIMENSIONS_WIDTH, DIMENSIONS_HEIGHT } from './Screen';

interface TransitionProps {
  makeTransition: Function;
}

interface TransitionRightProps {
  children: ({ makeTransition }: TransitionProps) => [JSX.Element, JSX.Element];
  auto?: boolean;
  onFinish: Function;
}

export enum TRANSITION_STATE {
  INITIAL,
  TRANSITION
}

const WrapperView = styled(View)`
  flex-direction: row;
`;

const StyledView = styled(View)`
  width: ${DIMENSIONS_WIDTH}px;
`;

const AnimatedView = animated(StyledView);

const TransitionRight: React.FC<TransitionRightProps> = ({
  children,
  auto,
  onFinish,
}) => {
  const initialTransition = {
    left: 0,
  };

  const [transition, setTransition] = useSpring(() => (initialTransition));

  const makeTransition = (r: Function) => setTransition({
    from: {
      left: 0,
    },
    left: -DIMENSIONS_WIDTH,
    reset: true,
    onStart: () => {
      r();
    },
  });

  const [LeftElement, RightElement] = children({
    makeTransition,
  });

  return (
    <WrapperView>
      <AnimatedView style={transition as any}>
        {LeftElement}
      </AnimatedView>
      <AnimatedView style={transition as any}>
        {RightElement}
      </AnimatedView>
    </WrapperView>
  );
};

TransitionRight.defaultProps = {
  auto: false,
};

export default TransitionRight;

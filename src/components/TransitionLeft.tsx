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

const TransitionLeft: React.FC<TransitionRightProps> = ({
  children,
  auto,
  onFinish,
}) => {
  const initialTransition = {
    left: -DIMENSIONS_WIDTH,
  };

  const [transition, setTransition] = useSpring(() => (initialTransition));

  const makeTransition = (r: Function) => setTransition({
    from: {
      left: -DIMENSIONS_WIDTH,
    },
    left: 0,
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
        {RightElement}
      </AnimatedView>
      <AnimatedView style={transition as any}>
        {LeftElement}
      </AnimatedView>
    </WrapperView>
  );
};

TransitionLeft.defaultProps = {
  auto: false,
};

export default TransitionLeft;

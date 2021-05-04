import React, { useEffect, useContext, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Text } from 'react-native-paper';
import { DIMENSIONS_HEIGHT } from 'components/Screen';
import { colors } from 'src/theme';
import { FCWithLoggedStackNavigator } from 'pages/LoggedStackNavigator';
import { TitleView } from './style';

const AnimatedView = animated(TitleView);

const Searching: FCWithLoggedStackNavigator<'Searching'> = ({
  navigation: {
    navigate,
  },
}) => {
  const [props, set] = useSpring(() => ({
    opacity: 0,
    width: '100%',
    height: DIMENSIONS_HEIGHT - 70,
    justifyContent: 'center',
    alignItems: 'center',
  }));
  const [text, setText] = useState('Buscando\nprofissionais...');

  useEffect(() => {
    set({
      opacity: 1,
      config: {
        duration: 1000,
      },
    });
    const finalize = () => {
      setText('Profissionais\nencontrados!');
      set({
        opacity: 1,
        config: {
          duration: 250,
        },
      });
      setTimeout(() => {
        navigate('Budget');
      }, 500);
    };
    const timeout = setTimeout(() => {
      set({
        opacity: 0,
        onRest: () => finalize(),
        config: {
          duration: 250,
        },
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatedView style={props}>
      <Text
        style={{
          fontSize: 24,
          fontFamily: 'Manjari-Bold',
          color: colors.black,
          textAlign: 'center',
        }}
        numberOfLines={2}
      >
        {text}
      </Text>
    </AnimatedView>
  );
};

export default Searching;

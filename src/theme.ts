import {DefaultTheme, configureFonts} from 'react-native-paper';

export const colors = {
  background: '#40423A',
  surface: '#31332B',
  orange: '#FF5947',
  contrast: '#006EB0',
  contrast2: '#01913E',
  contrast3: '#FCFC09',
  contrast4: '#FF0200',
  white: '#FFFAF7',
  black: '#000000',
  textOnSurface: '#FFFFFF',
  green: '#83A84A',
  gray: '#F4F1F0',
  darkGray: '#9B9B9B',
  disabledOrange: '#E08379',
  gradient: ['#319A72', '#12778F'],
  newColor: '#007C8F',
  red: '#FF0000',
  lightGray: '#C8C8C8',
  darkGreen: '#23322b',
  lightGreen: '#293d33',
  lightOrange: '#ee5e05',
  transparent: 'rgba(52, 52, 52, 0.0)',
  newBlack: '#0b1713',
  superLightGreen: '#2a4135',
  superDarkGreen: '#18392e',
  disabled: '#24352d',
  textDisabled: '#f7f3f0'
};

export const StyledTheme = {
  color: {
    ...colors,
  },
};

export interface Theme {
  theme: typeof StyledTheme;
}

export const PaperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.black,
    text: colors.white,
    placeholder: colors.black,
    backdrop: colors.black,
    background: colors.lightGreen,
  },
  fonts: configureFonts({
    default: {
      regular: {
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
      },
      thin: {
        fontFamily: 'Roboto-Thin',
        fontWeight: '100',
      },
      medium: {
        fontFamily: 'Roboto-Bold',
        fontWeight: '700',
      },
      light: {
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
      },
    },
  }),
};

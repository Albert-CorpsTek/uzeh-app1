import { TransitionPresets } from '@react-navigation/stack';
import { colors } from 'src/theme';

const screenOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  cardStyle: {
    backgroundColor: colors.background,
  },
  headerShown: false,
};

export default screenOptions;

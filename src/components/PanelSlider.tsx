import styled from 'styled-components/native';
import { Surface } from 'react-native-paper';
import { Theme } from 'src/theme';
import { Dimensions, View } from 'react-native';
import { DIMENSIONS_WIDTH, DIMENSIONS_HEIGHT } from './Screen';

const PanelSlider = styled(Surface)`
  flex-direction: column;
  margin-left: ${DIMENSIONS_WIDTH * 0.05}px;
  margin-right: ${DIMENSIONS_WIDTH * 0.05}px;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  elevation: 3;
  position: relative;
  padding: 16px;
  padding-top: 20px;
  width: ${DIMENSIONS_WIDTH * 0.9}px;
  height: 100%;
  background-color: ${(t: Theme) => t.theme.color.white};
`;

export default PanelSlider;

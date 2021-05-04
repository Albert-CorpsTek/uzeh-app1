import { Picker, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Theme } from 'src/theme';

// eslint-disable-next-line import/prefer-default-export
export const StyledPicker = styled(Picker)`
  flex-grow: 1;
  background-color: rgba(0, 0, 0, 0);
  color: ${(t: Theme) => t.theme.color.black};
  elevation: 0;
`;

import { Text, TouchableRipple } from 'react-native-paper';
import { Theme } from 'src/theme';
import styled from 'styled-components';

export const StyledUser = styled(Text)`
  color: ${(t: Theme) => t.theme.color.black};
  font-weight: bold;
  font-size: 16px;
`;

export const StyledUserCorrect = styled(Text)`
  color: ${(t: Theme) => t.theme.color.white};
  font-weight: bold;
  font-size: 10px;
  margin-left: 10px;
`;

export const StyledDescription = styled(Text)`
  color: ${(t: Theme) => t.theme.color.black};
  font-size: 14px;
  margin-bottom: 6px;
`;

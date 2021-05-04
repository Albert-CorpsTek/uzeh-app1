import styled from 'styled-components/native';
import { Text } from 'react-native-paper';

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

interface BoxProps {
  checked: boolean;
  checkedColor: string;
  uncheckedColor: string;
}

export const Box = styled.TouchableOpacity<BoxProps>`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: ${({checked, checkedColor, uncheckedColor}) => checked ? checkedColor : uncheckedColor};
  justify-content: center;
  align-items: center;
`;

export const Label = styled(Text)`
  margin-left: 8px;
  text-transform: uppercase;
`;
import { View } from 'react-native';
import {
 Text, TextInput,
} from 'react-native-paper';
import { Theme } from 'src/theme';
import styled from 'styled-components/native';

export const TitleWrapper = styled(View)`
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 40px;
  width: 100%;
`;

export const SignUpWrapper = styled(View)`
  position: absolute;
  height: 60px;
`;

export const TitleView = styled(View)`
`;

interface InputProps {
  width?: string;
}

export const Input = styled(TextInput)<InputProps>`
  width: ${({ width }) => width ?? '100%'};
  height: 60px;
  background-color: rgba(0, 0, 0, 0);
  color: ${(t: Theme) => t.theme.color.textOnSurface};
`;

export const GroupControl = styled(View)`
  padding: 10px;
  width: 100%;
`;

export const RegisterButton = styled(Text)`
  font-size: 20px;
  text-align: center;
`;

export const SenhaButton = styled(Text)`
  font-size: 12px;
  text-align: center;
`;

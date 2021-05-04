import { View } from 'react-native';
import {
 Text, TextInput, Button,
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

export const Input = styled(TextInput)`
  width: 100%;
  height: 60px;
  background-color: rgba(0, 0, 0, 0);
  color: ${(t: Theme) => t.theme.color.textOnSurface};
  font-size: 40px;
`;

export const GroupControl = styled(View)`
  padding: 10px;
  width: 100%;
`;

interface StyledButtonProps {
  marginTop?: number;
  marginBottom?: number;
}

// botao entrar - login
export const StyledButton = styled(Button)<StyledButtonProps>`
  background-color: ${(t: Theme) => t.theme.color.surface};
  border-radius: 4px;
  height: 45px;
  justify-content: center;
  align-items: center;
  margin-top: ${(p) => p.marginTop || 10}px;
  margin-bottom: ${(p) => p.marginBottom || 10}px;
`;

export const StyledButtonP = styled(Button).attrs((p: StyledButtonProps) => p)`
  background-color: ${(t: Theme) => t.theme.color.surface};
  border-radius: 4px;
  height: 45px;
  justify-content: center;
  align-items: center;
  margin-top: ${(p) => p.marginTop || 10}px;
  margin-bottom: ${(p) => p.marginBottom || 10}px;
`;

export const RegisterButton = styled(Text)`
  font-size: 20px;
  text-align: center;
  text-decoration: underline;
`;
export const SenhaButton = styled(Text)`
  font-size: 12px;
  text-align: center;
`;

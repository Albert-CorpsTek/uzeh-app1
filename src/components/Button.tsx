import React from 'react';
import styled from 'styled-components/native';
import {
 Text, ActivityIndicator, TouchableRipple,
} from 'react-native-paper';
import { colors } from 'src/theme';
import { View } from 'react-native';

interface ButtonWrapperProps {
  disabled?: boolean;
  fullWidth?: boolean;
  backgroundColor?: string;
}

const ButtonWrapper = styled(TouchableRipple)<ButtonWrapperProps>`
  border-radius: 4px;
  background-color: ${({ disabled }) => (true ? 'red' : colors.orange)};
  justify-content: center;
  align-items: center;
  align-self: ${({ fullWidth }) => (fullWidth ? 'stretch' : 'center')};
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

interface ButtonContentProps {
  marginTop?: number;
  marginBottom?: number;
  disabled?: boolean;
  hasText?: string;
}

const ButtonContent = styled(View)<ButtonContentProps>`
  padding: ${(p) => (p.hasText ? '20px 30px' : '0')};
`;

interface Props {
  text?: string;
  onPress?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  activityIndicatorColor?: string;
  backgroundColor?: string;
}

const StyledActivityIndicator = styled(ActivityIndicator)`
  padding: 12px;
`;

const Button: React.FC<Props> = ({
 text,
 onPress,
 disabled,
 children,
 loading,
 fullWidth,
 activityIndicatorColor = colors.white,
 backgroundColor = disabled ? colors.disabledOrange : colors.orange,
}) => {
  const renderContent = () => (text ? (
    <Text
      style={{
        fontSize: 14,
        color: colors.white,
      }}
    >
      {text}
    </Text>
  ) : children);

  return (
    <ButtonWrapper
      onPress={onPress}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      backgroundColor={backgroundColor}
    >
      <ButtonContent
        hasText={text}
      >
        {loading ? (
          <StyledActivityIndicator color={activityIndicatorColor} />
        ) : renderContent()}
      </ButtonContent>
    </ButtonWrapper>
  );
};

export default Button;

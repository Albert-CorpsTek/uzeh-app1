import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Wrapper, Box, Label} from './styles';

interface CheckBoxProps {
  label: string;
  value?: boolean;
  onChange?: (newValue: boolean) => void;
  checkedColor?: string;
  uncheckedColor?: string;
  icon?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  value = false,
  onChange,
  checkedColor = '#FF9800',
  uncheckedColor = '#BDBDBD',
  icon = "check"
}) => {
  const handleChange = () => {
    if (onChange) {
      onChange(!value);
    }
  };
  return (
    <Wrapper>
      <Box 
        checked={value} 
        checkedColor={checkedColor} 
        uncheckedColor={uncheckedColor}
        onPress={handleChange}>
        {value ? <Icon size={20} name={icon} color={uncheckedColor} /> : null}
      </Box>
      <Label>{label}</Label>
    </Wrapper>
  );
};

export default CheckBox;
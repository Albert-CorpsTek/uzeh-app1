import styled from 'styled-components/native';
import {Theme, colors} from 'src/theme';
import TextInputMask from 'react-native-text-input-mask';

export default styled(TextInputMask)`
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 4px;
  background-color: ${props => props.editable ? colors.lightGreen : colors.disabled};
  color: ${props => props.editable ? colors.white : colors.textDisabled};
  elevation: ${props => props.editable ? "5px" : "0px" };
`;
import styled from 'styled-components/native';
import {Theme, colors} from 'src/theme';

export default styled.TextInput`
  border-radius: 4px;
  padding-left: 3%;
  padding-top: 3%;
  padding-bottom: 3%;
  background-color: ${props => colors.lightGreen};
  color: ${props => props.editable ? colors.white : colors.textDisabled};
  elevation: ${props => props.editable ? "5px" : "0px" };
  opacity: ${props => props.editable ? 1.0 : 0.2};
`;
import styled from 'styled-components/native';
import {Theme} from 'src/theme';
import TextInputMask from 'react-native-text-input-mask';

export default styled(TextInputMask)`
  color: ${(t: Theme) => t.theme.color.lightOrange};
  font-family: 'Roboto-Regular';
  padding: 0;
  flex-basis: 0;
`;
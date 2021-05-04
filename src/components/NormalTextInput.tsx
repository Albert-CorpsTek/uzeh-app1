import styled from 'styled-components/native';
import {Theme} from 'src/theme';

export default styled.TextInput`
  color: ${(t: Theme) => t.theme.color.lightOrange};
  font-family: 'Roboto-Regular';
  padding: 0;
  flex-basis: 0;
`;
import styled from 'styled-components/native';
import {Theme} from 'src/theme';

export default styled.Text`
  font-family: 'Roboto-Regular';
  color: ${(t: Theme) => t.theme.color.white};
`;

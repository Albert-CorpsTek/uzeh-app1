import styled from 'styled-components/native';
import {Theme} from 'src/theme';

interface NormalTextProps {
  align?: 'left' | 'center' | 'right';
}

export default styled.Text<NormalTextProps>`
  font-family: 'Roboto-Regular';
  text-align: ${({ align = 'left' }) => align};
  color: ${(t: Theme) => t.theme.color.lightOrange};
`;

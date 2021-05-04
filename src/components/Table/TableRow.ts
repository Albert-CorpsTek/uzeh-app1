import styled from 'styled-components/native';
import {Theme} from 'src/theme';

interface RowProps {
  disableBottomLine: boolean;
}

export default styled.View.attrs((p: RowProps) => p)`
  flex-direction: row;
  flex-grow: 1;
  padding: 10px;
  border-bottom-width: ${(p) => (p.disableBottomLine ? 0 : 1)}px;
  border-color: rgba(0, 0, 0, 0.1);
  background-color: ${(t: Theme) => t.theme.color.lightGreen};
  margin-bottom: 10px;
  border-radius: 5px;
`;

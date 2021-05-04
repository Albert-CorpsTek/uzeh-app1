import styled from 'styled-components/native';
import { Text } from 'react-native-paper';
import React from 'react';

const TableLabelWrapper = styled.View`
  flex-grow: 1;
  flex-shrink: 0;
  padding-right: 24px;
`;

const TableLabel: React.FC<
  React.Props<typeof TableLabelWrapper>
> = ({ children }) => (
  <TableLabelWrapper>
    {children}
  </TableLabelWrapper>
);

export default TableLabel;

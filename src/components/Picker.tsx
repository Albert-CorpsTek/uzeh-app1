import React from 'react';
import { Button, IconButton, Text } from 'react-native-paper';
import { View } from 'react-native';
import styled from 'styled-components';

const StyledText = styled(Text)`
  font-size: 16;
`;

const StyledView = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PickerComponent: React.FC = ({ children }) => (
  <>
    <StyledView>
      {children}
      <View>
        <IconButton icon="arrow-drop-down" />
      </View>
    </StyledView>
  </>
);

export default PickerComponent;

import styled from 'styled-components/native';
import { Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { Theme } from 'src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  limitContainer: {
    alignItems: 'flex-start',
    width: '84%',
    backgroundColor: '#F4F1F0',
    alignSelf: 'flex-start',
  },
  sti: {
    width: '60%',
    backgroundColor: '#F4F1F0',
    padding: 20,
  },
  containerMax: {
    backgroundColor: '#F4F1F0',
    width: '90%',
    alignItems: 'flex-start',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  div: {
    borderBottomColor: '#C0C0C0',
    borderBottomWidth: 1,
    width: '80%',
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    padding: 6,
  },
  textStyleSub: {
    fontSize: 17,
    color: 'black',
    padding: 5,
  },
  textStyleInfo: {
    fontSize: 15,
    color: 'black',
    padding: 5,
  },
  nview: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const StyledTitle = styled(Text)`
  font-size: 35px;
  text-align: center;
`;

export const TitleView = styled(View)`
  width: 100%;
`;

export const BText = styled(Text).attrs((p) => ({ ...p }))`
  font-weight: bold;
  font-size: 16px;
  color: ${(t: Theme) => t.theme.color.background};
`;

export const NText = styled(Text)`
  font-size: 16px;
  color: ${(t: Theme) => t.theme.color.background};
`;

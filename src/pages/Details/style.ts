import styled from 'styled-components/native';
import { Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { colors } from 'src/theme';

export const BText = styled(Text).attrs((p) => ({ ...p }))`
  font-weight: bold;
  font-size: 16px;
  color: ${colors.background};
`;

export const NText = styled(Text)`
  font-size: 16px;
  color: ${colors.background};
  text-align: right;
`;

export const Wrapper = styled(View)`
  flex-grow: 1;
  width: 100%;
`;

interface RowProps {
  disableBottomLine: boolean;
}

export const Row = styled(View).attrs((p: RowProps) => p)`
  flex-direction: row;
  flex-grow: 1;
  padding: 10px;
  border-bottom-width: ${(p) => (p.disableBottomLine ? 0 : 1)}px;
  border-color: rgba(0, 0, 0, 0.1);
`;

export const Label = styled(View)`
  flex-grow: 1;
  flex-shrink: 0;
  padding-right: 24px;
`;

export const Value = styled(View)`
  flex-grow: 1;
  flex-shrink: 1;
`;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingTop: 15,
    flexGrow: 1,
    backgroundColor: '#F4F1F0',
    marginHorizontal: 0,
  },
  containerMax: {
    backgroundColor: '#F4F1F0',
    width: '90%',
    alignItems: 'flex-start',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  limitContainer: {
    alignItems: 'flex-start',
    width: '100%',
    backgroundColor: '#F4F1F0',
    alignSelf: 'flex-start',
  },
  divwhite: {
    backgroundColor: '#F4F1F0',
    width: '100%',
    height: 1,
    padding: 10,
  },
  btn: {
    backgroundColor: '#31332B',
    padding: 3,
    alignSelf: 'center',
  },
  btn2: {
    backgroundColor: '#31332B',
    padding: 3,
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    padding: 6,
    alignSelf: 'center',
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
  color: {
    backgroundColor: '#DCDCDC',
    alignSelf: 'center',
  },
});

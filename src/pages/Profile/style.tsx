import {StyleSheet} from 'react-native';
import {colors} from 'src/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F1F0',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: 30,
    minHeight: '100%',
  },
  containerAvatar: {
    alignItems: 'center',
  },
  div: {
    backgroundColor: 'black',
    width: '100%',
    height: 1,
  },
  divText: {
    alignItems: 'flex-end',
  },
  divwhitebtn: {
    backgroundColor: '#F4F1F0',
    width: '100%',
    height: 1,
    padding: 10,
  },
  divwhite: {
    backgroundColor: '#F4F1F0',
    width: '100%',
    height: 1,
    padding: 20,
  },
  text: {
    justifyContent: 'flex-start',
    textAlign: 'left',
    fontSize: 20,
    padding: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
  },
  btn: {
    backgroundColor: colors.newColor,
    padding: 3,
  },
  statusContainer: {
    borderBottomWidth: 5, 
    justifyContent: 'center', 
    marginHorizontal: 8
  }
});

export default styles;

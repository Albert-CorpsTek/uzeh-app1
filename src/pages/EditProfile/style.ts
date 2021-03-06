import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1F0',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: 50,
  },
  scrollView: {
    backgroundColor: '#F4F1F0',
    marginHorizontal: 0,
  },
  containerAvatar: {
    alignItems: 'center',
  },
  containerName: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
    padding: 3,
    backgroundColor: '#31332B',
  },
});

export default styles;

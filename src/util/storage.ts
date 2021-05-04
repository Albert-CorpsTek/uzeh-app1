import { StateUser } from 'src/context/auth';
import AsyncStorage from '@react-native-community/async-storage';

interface Storage {
  token?: string;
  user?: StateUser;
}

const setToken = async (token: string) => AsyncStorage.setItem('token', token);

const setUser = async (user: StateUser) => {
  try {
    const stringifiedUser = JSON.stringify(user);
    if (stringifiedUser) {
      await AsyncStorage.setItem('user', stringifiedUser);
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};

const remove = (key: keyof Storage) => AsyncStorage.removeItem(key);

const getToken = async () => AsyncStorage.getItem('token');

const getUser = async () => {
  try {
    const parsed = JSON.parse(await AsyncStorage.getItem('user') ?? 'null') as StateUser;
    return parsed as StateUser;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default {
  setToken,
  setUser,
  remove,
  getToken,
  getUser,
};

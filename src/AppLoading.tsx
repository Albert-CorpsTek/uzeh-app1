import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import { useStateLink } from '@hookstate/core';
import App from './App';
import storage from './util/storage';
import GlobalContext from './context';

const {
  auth: {
    authStateRef,
  },
} = GlobalContext;

const AppLoading = () => {
  const [state, setState] = useState<'LoggedRoutes' | 'Info' | 'loading'>('loading');
  const authState = useStateLink(authStateRef);

  useEffect(() => {
    (async () => {
      const [token, user] = await Promise.all([
        await storage.getToken(),
        await storage.getUser(),
      ]);
      if (token && user) {
        authState.set({
          token,
          user,
        });
        setState('LoggedRoutes');
      } else {
        setState('Info');
      }
    })();
  }, []);

  if (state !== 'loading') {
    return <App initialRouteName={state} />;
  }

  return <Text>Carregando...</Text>;
};

export default AppLoading;

import React from 'react';
import Snackbar from 'components/Snackbar';
import { RootAppStackParamList } from 'pages/AppStackNavigator';
import AppRoutes from 'pages/AppRoutes';

interface AppProps {
  initialRouteName: keyof RootAppStackParamList;
}

const App: React.FC<AppProps> = ({ initialRouteName }) => (
  <>
    <AppRoutes initialRouteName={initialRouteName} />
    <Snackbar />
  </>
);

export default App;

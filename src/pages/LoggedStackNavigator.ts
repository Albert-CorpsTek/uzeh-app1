import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {CompositeNavigationProp} from '@react-navigation/native';
import {RootAppStackParamList} from './AppStackNavigator';

type RootLoggedStackParamListUndefinedRoutes =
  | 'Home'
  | 'Budget'
  | 'Services'
  | 'Profile'
  | 'Appbar'
  | 'Evaluate'
  | 'Request'
  | 'Searching'
  | 'Recover'
  | 'Details'
  | 'EditProfile'
  | 'BidDetails'
  | 'AcceptOrDeclineNegotiationBudget'
  | 'OpenBudgetDetails'
  | 'InOrder'
  | 'Materials'
  | 'UserTerms'
  | 'Metrics'
  | 'Informations'
  | 'Denunciation'
  | 'VucoVuco'
  | 'VVAddEdit'
  | 'VVInfo'
  | 'VVSearch'
  | 'Solicitar';

export type RootLoggedStackParamList = {
  [s in RootLoggedStackParamListUndefinedRoutes]: undefined
};

export type FCWithLoggedStackNavigator<
  T extends keyof RootLoggedStackParamList
> = React.FC<{
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootLoggedStackParamList, T>,
    StackNavigationProp<RootAppStackParamList>
  >;
}>;

const LoggedStackNavigator = createStackNavigator<RootLoggedStackParamList>();

export default LoggedStackNavigator;

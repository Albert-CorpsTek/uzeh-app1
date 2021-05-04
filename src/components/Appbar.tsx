import React, {memo, useEffect, useState} from 'react';
import {Text, IconButton, TouchableRipple, Avatar} from 'react-native-paper';
import styled from 'styled-components/native';
import {colors} from 'src/theme';
import {View, Keyboard, StyleSheet} from 'react-native';
import {animated} from 'react-spring';
import GlobalContext from 'src/context';
import {
  useNavigation,
  useNavigationState,
  useIsFocused,
} from '@react-navigation/native';
import {useStateLink, useStateLinkUnmounted} from '@hookstate/core';
import {
  RootLoggedStackParamList,
  FCWithLoggedStackNavigator,
} from 'pages/LoggedStackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import UserProfile from 'img/avatar.png';
import PulsingText from 'src/components/PulsingText';
import CollapsibleSidebar from 'src/components/CollapsibleSidebar';
import Container, {Containerp} from 'src/components/Container';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSignOutAlt,
  faRecycle,
  faUser,
  faMoneyBillWave,
  faQuestion,
  faDollarSign,
  faInfoCircle,
  faUserPlus,
  faArchive,
  faDoorOpen,
} from '@fortawesome/free-solid-svg-icons';
import Profile from './Profile';
import MenuButton from './MenuButton';
import auth from 'src/context/auth';

const BottomNav = styled(View)`
  height: 70px;
  background-color: ${colors.surface};
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

const styles = StyleSheet.create({
  wrapper: {},
  menu: {
    flexDirection: 'row',
    paddingVertical: 6,
    marginBottom: 10,
  },
});

const AnimatedBottomNav = animated(BottomNav);

interface StyledIconWrapper {
  active: boolean;
}

const IconWrapper = styled(View).attrs((p: StyledIconWrapper) => p)`
  flex-grow: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-top-width: 5px;
  border-color: ${p => (p.active ? '#319a72' : 'transparent')};
  background-color: ${p =>
    p.active ? 'rgba(150, 150, 150, 0.3)' : 'transparent'};
`;

const StyledText = styled(Text)`
  color: ${colors.white};
  top: 17px;
  width: 100%;
  text-align: center;
`;

const LogoutLinkText = styled(Text)`
  color: ${colors.black};
  font-size: 16px;
`;

interface StyledIconButtonProps {
  active: boolean;
}

const StyledIconButton = styled(IconButton).attrs(
  (p: StyledIconButtonProps) => {
    const {active} = p;
    return {
      ...p,
      color: active ? '#319a72' : colors.black,
    };
  },
)`
  position: absolute;
  top: -5px;
`;

const {
  appbar: {scrollRef, actualRouteRef},
} = GlobalContext;

interface AppbarProps {
  children: React.ReactNode;
}

const Appbar: React.FC<AppbarProps> = ({children}) => {
  const [hide, setHide] = useState(false);
  const {navigate} = useNavigation<
    StackNavigationProp<RootLoggedStackParamList, 'Appbar'>
  >();
  const actualRoute = useStateLink(actualRouteRef);
  const [showSidebar, setShowSidebar] = useState(false);
  const authState = useStateLinkUnmounted(GlobalContext.auth.authStateRef);

  const toggle = () => {
    setHide(p => !p);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', toggle);

    Keyboard.addListener('keyboardDidHide', toggle);
  }, []);

  return (
    <View
      style={{
        flexGrow: 1,
      }}
    >
      {children}
      <AnimatedBottomNav
        style={{
          height: hide ? 0 : 70,
          backgroundColor: 'rgba(249, 249, 249, 0.3)',
        }}>
        <TouchableRipple
          style={{
            flexGrow: 1,
          }}
          onPress={() => {
            navigate('Home');
          }}>
          <IconWrapper active={actualRoute.value === 'Home'}>
            <StyledIconButton
              active={actualRoute.value === 'Home'}
              icon="home"
              size={26}
            />
            <StyledText
              style={{
                margin: 'auto',
                color: colors.black,
                elevation: 20,
              }}>
              Início
            </StyledText>
          </IconWrapper>
        </TouchableRipple>
        {authState.value.user?.user_type === 4 && <TouchableRipple
          style={{
            flexGrow: 1,
          }}
          onPress={() => {
            setShowSidebar(false);
            navigate('CollectionOrdersResponses');
          }}>
          <IconWrapper active={actualRoute.value === 'CollectionOrdersResponses'}>
            <StyledIconButton
              active={actualRoute.value === 'CollectionOrdersResponses'}
              icon="recycle"
              size={26}
            />
            <StyledText
              style={{
                margin: 'auto',
                color: colors.black,
                elevation: 20,
              }}>
              Respostas
            </StyledText>
          </IconWrapper>
        </TouchableRipple>}
        {authState.value.user?.user_type === 5 && <TouchableRipple
          style={{
            flexGrow: 1,
          }}
          onPress={() => {
            setShowSidebar(false);
            navigate('Services');
          }}>
          <IconWrapper active={actualRoute.value === 'Services'}>
            <StyledIconButton
              active={actualRoute.value === 'Services'}
              icon="recycle"
              size={26}
            />
            <StyledText
              style={{
                margin: 'auto',
                color: colors.black,
                elevation: 20,
              }}>
              Coletas
            </StyledText>
          </IconWrapper>
        </TouchableRipple>}
        <TouchableRipple
          style={{
            flexGrow: 1,
          }}
          onPress={() => {
            navigate('Profile');
          }}
        >
          <IconWrapper active={actualRoute.value === 'Profile'}>
            <StyledIconButton active={actualRoute.value === 'Profile'} icon="account-circle" size={30} />
            <StyledText
              style={{
                margin: 'auto',
                color: colors.black,
                elevation: 20,
              }}
            >
              Perfil
            </StyledText>
          </IconWrapper>
        </TouchableRipple>
      </AnimatedBottomNav>
    </View>
  );
};

export const withAppbar: <T extends keyof RootLoggedStackParamList>(
  Component: FCWithLoggedStackNavigator<T>,
) => FCWithLoggedStackNavigator<T> = Component => props => {
  const {routes, index} = useNavigationState(s => s);
  const isFocused = useIsFocused();
  const actualRoute = useStateLink(GlobalContext.appbar.actualRouteRef);
  if (isFocused) {
    actualRoute.set(routes[index].name as any);
  }
  return <Component {...props} />;
};

export default memo(Appbar);

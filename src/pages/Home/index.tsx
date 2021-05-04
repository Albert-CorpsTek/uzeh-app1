import React, {useEffect, useState} from 'react';
import {Text, IconButton} from 'react-native-paper';
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  SafeAreaView,
  useWindowDimensions
} from 'react-native';
import imgBanner from 'img/banner.png';
import {colors} from 'src/theme';
import GlobalContext from 'src/context';
import LogoPreta from 'img/icone-wizard.png';
import {FCWithLoggedStackNavigator} from 'pages/LoggedStackNavigator';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faPeopleArrows,
  faChartLine,
  faRecycle,
  faTrashAlt,
  faExclamationTriangle,
  faSignOutAlt,
  faMoneyBillWave,
  faQuestion,
  faDollarSign,
  faInfoCircle,
  faUserPlus,
  faArchive,
  faDoorOpen,
} from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';

import {withAppbar} from 'components/Appbar';
import yup from 'yup';
import {GroupControl} from 'pages/Login/style';

import MenuButton from '../../components/MenuButton';
import Profile from '../../components/Profile';
import {useStateLink, useStateLinkUnmounted} from '@hookstate/core';
import styled from 'styled-components/native';
import {animated} from 'react-spring';
import userCircleIcon from 'img/icons/user-circle.png';
import recycleIcon from 'img/icons/recycle.png'
import Icon from 'components/Icon';
import chartLineIcon from 'img/icons/chart-line.png';
import eyeIcon from 'img/icons/eye.png';
import Drawer from 'components/Drawer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: colors.darkGreen,
    height: '100%'
  },
  textStyle: {
    fontSize: 20,
    fontFamily: 'Manjari-Bold',
    color: 'white',
    textAlign: 'center',
  },
  textStyleF: {
    fontSize: 16,
    paddingLeft: 80,
    paddingRight: 80,
    color: 'white',
    textAlign: 'center',
    padding: 3,
  },
  textStyleCard: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
  viewn: {
    height: 'auto',
    justifyContent: 'center',
    flexGrow: 1
  },
  itemsContainer: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    paddingTop: 20,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  itemsRow: {
    flex: 1,
    height: '100%',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  items: {
    width: '100%',
    alignItems: 'center',
  },
  gradient: {
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  gradientItems: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: '100%',
    aspectRatio: 3.2,
    elevation: 5,
    marginBottom: 30,
    borderRadius: 4
  },
  gradientTexts: {
    color: 'white',
    fontSize: 20,
    backgroundColor: colors.lightGreen, 
    height: '100%',
    textAlignVertical: 'center',
    flexGrow: 1,
    paddingLeft: '10%',
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4
  },
  iconGradient: {
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.superLightGreen,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4
  },
  menu: {
    flexDirection: 'row',
    paddingVertical: 6,
    marginBottom: 10,
  },
  containerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
    //height: '25%',
    alignSelf: 'center'
  },
  topbarContainer: {
    flexDirection: 'row',
    backgroundColor: colors.darkGreen,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    height: '20%'
  }
});

const BottomNav = styled(View)`
  height: 70px;
  background-color: ${colors.surface};
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

const AnimatedBottomNav = animated(BottomNav);

const {
  category: {categoriesRef, fetchCategories},
  home: {selectedCategoryRef},
  map: {
    openDrawerRef
  }
} = GlobalContext;

const Home: FCWithLoggedStackNavigator<'Home'> = ({navigation: {navigate}}) => {
  const authState = useStateLinkUnmounted(GlobalContext.auth.authStateRef);
  const categories = useStateLink(categoriesRef);
  const selectedCategory = useStateLink(selectedCategoryRef);
  const [showSidebar, setShowSidebar] = useState(false);
  const [hide, setHide] = useState(false);
  const openDrawer = useStateLink(openDrawerRef);
  const window = useWindowDimensions();

  const LogoutLinkText = styled(Text)`
    color: ${colors.black};
    font-size: 16px;
  `;

  const Topbar = () => (
    <View style={styles.topbarContainer}>
      <Image
        source={LogoPreta}
        resizeMode="contain"
        style={{
          width: '30%',
          height: '30%',
          resizeMode: 'contain'
        }}
      />
      <TouchableOpacity onPress={() => openDrawer.set(true)}>
        <Icon icon={userCircleIcon} color={colors.black} size={48} />
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
    <View style={{flexGrow: 1}}>
      <Topbar />
      <ScrollView style={styles.scrollView}>
        <View style={styles.viewn}>
          <View style={styles.itemsContainer}>
            <View style={styles.itemsRow}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setShowSidebar(false);
                  navigate('Request');
                }} 
                style={styles.gradientItems}>
                <View style={styles.iconGradient}>
                  <Icon size="80%" icon={recycleIcon} color={colors.lightOrange} />
                </View>
                <Text style={styles.gradientTexts}>Solicitar Coleta</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setShowSidebar(false);
                  navigate('Screen2');
                }} 
                style={styles.gradientItems}>
                <View style={styles.iconGradient}>
                  <Icon size="80%" icon={eyeIcon} />
                </View>
                <Text style={styles.gradientTexts}>{`Acompanhar \nColetas`}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setShowSidebar(false);
                  navigate('Metrics');
                }} 
                disabled={true} 
                style={styles.gradientItems}>
                <View style={styles.iconGradient}>
                  <Icon size="80%" style={styles.iconGradient} icon={chartLineIcon} />
                </View>
                <Text style={styles.gradientTexts}>Minhas métricas</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <AnimatedBottomNav
        style={{
          height: hide ? 0 : 70,
          backgroundColor: 'rgba(249, 249, 249, 0.3)',
        }}
      />
    </View>
    </>
  );
};

export default Home;

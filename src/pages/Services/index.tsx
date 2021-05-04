import React, { useState, useContext } from 'react';
import { TouchableOpacity, View, TouchableWithoutFeedback, ScrollView, FlatList } from 'react-native';
import Container from 'components/Container';
import { Text, Title, IconButton, Appbar } from 'react-native-paper';
import { colors } from 'src/theme';
import Scheduled from 'pages/Services/scheduled';
import { FCWithLoggedStackNavigator } from 'pages/LoggedStackNavigator';
import { withAppbar } from 'components/Appbar';
//import { ScrollView } from 'react-native-gesture-handler';
import { MiniCard, Background } from './style';
import Finished from './finished';
import Canceled from 'pages/Services/canceled';
import Pending from './pending';
import Topbar from 'components/Topbar';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from 'pages/Profile/style';
//import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import MenuCarousel from 'components/MenuCarousel';

enum STATES {
  AGENDADO,
  REALIZADO,
  PENDENTE,
  AGENDADA,
  FINALIZADA,
  CANCELADA,
}

const Services: FCWithLoggedStackNavigator<'Services'> = ({
  navigation: { navigate },
}) => {
  const [state, setState] = useState<STATES>(STATES.PENDENTE);

  return (
    <>
      {/*<Topbar title="Acompanhamento de Coletas" />*/}
      <Appbar.Header 
        style={{
          backgroundColor: colors.darkGreen,
          justifyContent: 'center',
          alignItems: 'flex-end'
        }}>
        <Text>ACOMPANHAMENTO DE COLETAS</Text>
      </Appbar.Header>
      <MenuCarousel 
        items={[
          {
            name: "PENDENTES",
            value: STATES.PENDENTE
          },
          {
            name: "PROGRAMADAS",
            value: STATES.AGENDADO
          },
          {
            name: "COLETADAS",
            value: STATES.FINALIZADA
          },
          {
            name: "CANCELADAS",
            value: STATES.CANCELADA
          },
        ]} 
        value={state} 
        onValueChange={setState}
      />
      <ScrollView
        contentContainerStyle={{
          minHeight: '100%',
          backgroundColor: colors.darkGreen
        }}
      >
        <Background horizontal vertical style={{flexShrink: 1}}>
          {state === STATES.PENDENTE && <Pending navigate={navigate} callback={setState} />}
          {state === STATES.AGENDADO && <Scheduled navigate={navigate} callback={setState} />}
          {state === STATES.FINALIZADA && <Finished navigate={navigate} />}
          {state === STATES.CANCELADA && <Canceled navigate={navigate} />}
        </Background>
      </ScrollView>
    </>
  );
};

export default withAppbar(Services);

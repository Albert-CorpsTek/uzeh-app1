import React, {useState, useContext} from 'react';
import Container from 'components/Container';
import {Text, Title, IconButton} from 'react-native-paper';
import {colors} from 'src/theme';
import Scheduled from 'pages/Metrics/scheduled';
import {FCWithLoggedStackNavigator} from 'pages/LoggedStackNavigator';
import {withAppbar} from 'components/Appbar';
import {ScrollView} from 'react-native-gesture-handler';
import {MiniCard, Background} from './style';
import Finished from './finished';
import Canceled from 'pages/Metrics/canceled';

import {TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

enum STATES {
  AGENDADO,
  REALIZADO,
  PENDENTE,
  AGENDADA,
  FINALIZADA,
  CANCELADA,
}

const Metrics: FCWithLoggedStackNavigator<'Metrics'> = ({
  navigation: {navigate},
}) => {
  const [state, setState] = useState<STATES>(STATES.AGENDADO);

  return (
    <ScrollView
      contentContainerStyle={{
        minHeight: '100%',
      }}>
      <Background horizontal vertical>
        <Container pb>
          <TouchableOpacity
            onPress={() => navigate('Home')}
            style={{
              position: 'absolute',
              alignSelf: 'flex-start',
              marginLeft: '4%',
              marginTop: '8%',
              alignContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              color={colors.black}
              size={40}
            />
          </TouchableOpacity>
          <Container
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'center',
              marginTop: '6%',
              marginBottom: 20,
            }}>
            <Title style={{alignSelf: 'center'}}>Suas Métricas</Title>
          </Container>
        </Container>
        <Container
          style={{
            backgroundColor: colors.gray,
            flexDirection: 'row',
          }}>
          <Container
            pl
            pr
            pt
            style={{
              flexGrow: 1,
            }}>
            <MiniCard
              onPress={() => {
                setState(STATES.AGENDADO);
              }}>
              <Container>
                <Container
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <IconButton
                    style={{
                      top: -6,
                    }}
                    icon="alarm-check"
                    color={
                      state === STATES.AGENDADO
                        ? colors.contrast3
                        : colors.white
                    }
                    size={40}
                  />
                </Container>
                <Container>
                  <Text
                    style={{
                      top: -12,
                      color: colors.white,
                    }}>
                    Pendentes
                  </Text>
                </Container>
              </Container>
            </MiniCard>
          </Container>
          <Container
            pr
            pt
            style={{
              flexGrow: 1,
            }}>
            <MiniCard
              onPress={() => {
                setState(STATES.FINALIZADA);
              }}>
              <Container>
                <Container
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <IconButton
                    style={{
                      top: -6,
                    }}
                    icon="check"
                    color={
                      state === STATES.FINALIZADA
                        ? colors.contrast2
                        : colors.white
                    }
                    size={40}
                  />
                </Container>
                <Container>
                  <Text
                    style={{
                      top: -12,
                      color: colors.white,
                    }}>
                    Finalizadas
                  </Text>
                </Container>
              </Container>
            </MiniCard>
          </Container>
          <Container
            pr
            pt
            style={{
              flexGrow: 1,
            }}>
            <MiniCard
              onPress={() => {
                setState(STATES.CANCELADA);
              }}>
              <Container>
                <Container
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <IconButton
                    style={{
                      top: -6,
                    }}
                    icon="close"
                    color={
                      state === STATES.CANCELADA
                        ? colors.contrast4
                        : colors.white
                    }
                    size={40}
                  />
                </Container>
                <Container>
                  <Text
                    style={{
                      top: -12,
                      color: colors.white,
                    }}>
                    Canceladas
                  </Text>
                </Container>
              </Container>
            </MiniCard>
          </Container>
        </Container>
        {state === STATES.AGENDADO && <Scheduled navigate={navigate} />}
        {state === STATES.FINALIZADA && <Finished navigate={navigate} />}
        {state === STATES.CANCELADA && <Canceled navigate={navigate} />}
      </Background>
    </ScrollView>
  );
};

export default withAppbar(Metrics);

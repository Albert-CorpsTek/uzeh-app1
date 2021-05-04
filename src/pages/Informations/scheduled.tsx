import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {TouchableHighlight, ScrollView, StyleSheet, View} from 'react-native';
import {
  TouchableRipple,
  IconButton,
  Button,
  Text,
  ActivityIndicator,
} from 'react-native-paper';
import CardComponent, {CardLeft, CardContentList} from 'components/Card';
import Container from 'components/Container';
import {colors} from 'src/theme';
import GlobalContext from 'src/context';
import {useStateLink} from '@hookstate/core';
import {formatDate, convertFormatedToNormal} from 'util/formatDate';
import {RootLoggedStackParamList} from 'pages/LoggedStackNavigator';
import request from 'util/request';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#F4F1F0',
    marginHorizontal: 0,
  },
  btn: {
    backgroundColor: colors.surface,
    padding: 3,
    alignSelf: 'flex-end',
  },
  divwhite: {
    backgroundColor: '#F4F1F0',
    width: '100%',
    height: 1,
    padding: 10,
  },
  limitContainer: {
    alignItems: 'flex-start',
    backgroundColor: '#F4F1F0',
    alignSelf: 'flex-start',
  },
  sti: {
    backgroundColor: '#F4F1F0',
    padding: 20,
  },
  div: {
    backgroundColor: '#C0C0C0',
    width: '80%',
    height: 1,
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    padding: 6,
  },
  textStyleSub: {
    fontSize: 15,
    fontFamily: 'Manjari-Bold',
    color: 'black',
    padding: 6,
  },
  textStyleInfo: {
    fontSize: 15,
    color: 'black',
    padding: 5,
  },
  nview: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const {
  informations: {fetch, scheduledRef, loadingScheduledRef},
  evaluate: {selectedOCRef, fetchOC, loadingOCRef, OCRef},
} = GlobalContext;

interface ScheduledProps {
  navigate: (routeName: keyof RootLoggedStackParamList) => void;
}

const Scheduled: React.FC<ScheduledProps> = ({navigate}) => {
  const scheduled = useStateLink(scheduledRef);
  const loading = useStateLink(loadingScheduledRef);
  const selectedOC = useStateLink(selectedOCRef);
  const loadingOC = useStateLink(loadingOCRef);
  const OC = useStateLink(OCRef);
  const [page, setPage] = useState(1);

  useLayoutEffect(() => {
    fetch('scheduled');
  }, []);

  if (loading.value || scheduled.value === undefined) {
    return (
      <Container horizontal vertical padding={30}>
        <ActivityIndicator />
      </Container>
    );
  }

  const cancel = async collectionOrderId => {
    const response = await request.authGet(
      'CollectionOrders/cancelCollectionOrder/' + collectionOrderId,
    );
    fetch('scheduled');
  };

  return (
    <View style={styles.scrollView}>
      {scheduled.value.map(i => (
        <Container key={i.id} horizontal vertical>
          <CardComponent>
            <CardLeft>
              <IconButton icon="alarm-check" color={colors.white} size={50} />
            </CardLeft>
            <CardContentList>
              {/*
              <Text style={styles.textStyle}>{i.category}</Text>
              <View style={styles.div} />
              */}
              <Text style={styles.textStyleSub}>{i.comments}</Text>
              <Text style={styles.textStyleSub}>
                {formatDate(convertFormatedToNormal(i.created), 'FULL')}
              </Text>
              <Container
                pt
                padding={8}
                pb
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableHighlight
                  onPress={() => {
                    selectedOC.set(i.id);
                    fetchOC();
                    while (!loadingOC) {}
                    navigate('CollectionDetails', {
                      collectionOrder: OC.value,
                    });
                  }}
                  style={{
                    flexGrow: 1,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 18,
                      fontFamily: 'Manjari-Bold',
                      color: colors.contrast,
                    }}>
                    Detalhes
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => cancel(i.id)}
                  style={{
                    flexGrow: 1,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 18,
                      fontFamily: 'Manjari-Bold',
                      color: colors.contrast,
                    }}>
                    Cancelar
                  </Text>
                </TouchableHighlight>
              </Container>
            </CardContentList>
          </CardComponent>
        </Container>
      ))}
    </View>
  );
};

export default Scheduled;

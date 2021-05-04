import { Text, ActivityIndicator } from 'react-native-paper';
import Container from 'components/Container';
import React from 'react';
import GlobalContext from 'src/context';
import { useStateLink } from '@hookstate/core';
import {
  Wrapper, Row, Label, BText, Value,
} from 'pages/Details/style';
import { View } from 'react-native';
import { NText } from 'pages/Budget/style';
import TableWrapper from 'components/Table/TableWrapper';
import TableRow from 'components/Table/TableRow';
import TableLabel from 'components/Table/TableLabel';
import BoldText from 'components/BoldText';
import TableValue from 'components/Table/TableValue';
import NormalText from 'components/NormalText';
import { formatDate } from 'util/formatDate';
import OS from 'src/interfaces/OS';
import ValueOptions from 'components/ValueOptions';
import GlobalStyle from 'components/GlobalStyle';
import { ScrollView } from 'react-native-gesture-handler';
import Button from 'components/Button';
import { FCWithLoggedStackNavigator } from 'pages/LoggedStackNavigator';

const {
  budget: {
    bid: {
      loadingAcceptRef,
      loadingFetchRef,
      acceptBid,
      bidRef,
      selectedBidRef,
    },
  },
} = GlobalContext;

const BidDetails: FCWithLoggedStackNavigator<'BidDetails'> = ({
  navigation: {
    navigate,
  },
}) => {
  const loadingAccept = useStateLink(loadingAcceptRef);
  const loadingFetch = useStateLink(loadingFetchRef);
  const bid = useStateLink(bidRef);
  const selectedBid = useStateLink(selectedBidRef);

  if (loadingFetch.value === true || bid.value === undefined || selectedBid.value === undefined) {
    return (
      <ActivityIndicator />
    );
  }

  const handleAddress = ({
    address, cep, city, district, number, state,
  }: OS['client']['person']) => `${address}, ${number}, ${district}, ${city}/${state} - ${cep}`;

  return (
    <GlobalStyle>
      <ScrollView>
        <Container horizontal vertical>
          <Container
            style={{
              backgroundColor: 'white',
            }}
            horizontal
            vertical
          >
            <BoldText style={{
              fontSize: 20,
            }}
            >
              Detalhes do lance #
              {bid.value.id}
            </BoldText>
            <TableWrapper>
              <TableRow>
                <TableLabel>
                  <BoldText>Data</BoldText>
                </TableLabel>
                <TableValue>
                  <NormalText>{formatDate(bid.value.date_service_ordes, 'DATE')}</NormalText>
                </TableValue>
              </TableRow>
              <TableRow>
                <TableLabel>
                  <BoldText>Horário</BoldText>
                </TableLabel>
                <TableValue>
                  <NormalText>{formatDate(bid.value.date_service_ordes, 'HOUR')}</NormalText>
                </TableValue>
              </TableRow>
              <TableRow>
                <TableLabel>
                  <BoldText>Serviço</BoldText>
                </TableLabel>
                <TableValue>
                  <NormalText>{bid.value.description}</NormalText>
                </TableValue>
              </TableRow>
              <TableRow>
                <TableLabel>
                  <BoldText>Endereço</BoldText>
                </TableLabel>
                <Value>
                  <NormalText numberOfLines={3} style={{ textAlign: 'right' }}>
                    {handleAddress(bid.value.client.person)}
                  </NormalText>
                </Value>
              </TableRow>
              <TableRow>
                <TableLabel>
                  <BoldText>Valor</BoldText>
                </TableLabel>
                <TableValue>
                  <ValueOptions pots={[1, 2, 3]} value={selectedBid.value?.value} />
                </TableValue>
              </TableRow>
            </TableWrapper>
            <Container pt>
              <Button
                text="Aceitar lance"
                fullWidth
                onPress={async () => {
                  await acceptBid();
                  navigate('Home');
                }}
                loading={loadingAccept.value}
              />
            </Container>
          </Container>
        </Container>
      </ScrollView>
    </GlobalStyle>
  );
};

export default BidDetails;

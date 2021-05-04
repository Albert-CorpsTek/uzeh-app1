import React, { useEffect, useState } from 'react';
import GlobalContext from 'src/context';
import { useStateLink } from '@hookstate/core';
import { FCWithLoggedStackNavigator } from 'pages/LoggedStackNavigator';
import Container from 'components/Container';
import { ScrollView } from 'react-native-gesture-handler';
import GlobalStyle from 'components/GlobalStyle';
import NormalText from 'components/NormalText';
import TableWrapper from 'components/Table/TableWrapper';
import TableRow from 'components/Table/TableRow';
import TableLabel from 'components/Table/TableLabel';
import TableValue from 'components/Table/TableValue';
import BoldText from 'components/BoldText';
import { ActivityIndicator } from 'react-native-paper';
import { formatDate } from 'util/formatDate';
import OS from 'src/interfaces/OS';
import Button from 'components/Button';
import notify from 'util/notify';

const {
  budget: {
    negotiation: {
      acceptNegotiationBudget,
      declineNegotiationBudget,
      fetchNegotiationBudget,
      loadingNegotiationBudgetRef,
      negotiationBudgetRef,
      selectedNegotiationBudgetRef,
      fetchNegotiationBudgetList,
    },
  },
} = GlobalContext;

const AcceptOrDeclineNegotiationBudget: FCWithLoggedStackNavigator<'AcceptOrDeclineNegotiationBudget'> = ({
  navigation: {
    navigate,
  },
}) => {
  const selectedNegotiationBudget = useStateLink(selectedNegotiationBudgetRef);
  const negotiationBudget = useStateLink(negotiationBudgetRef);
  const loadingNegotiationBudget = useStateLink(loadingNegotiationBudgetRef);
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingDecline, setLoadingDecline] = useState(false);

  useEffect(() => {
    fetchNegotiationBudget();
  }, [selectedNegotiationBudget.value]);

  const handleAddress = ({
    address, cep, city, district, number, state,
  }: OS['client']['person']) => `${address}, ${number}, ${district}, ${city}/${state} - ${cep}`;

  const accept = async () => {
    setLoadingAccept(true);
    const response = await acceptNegotiationBudget();
    setLoadingAccept(false);
    if (response) {
      if (response.status === true) {
        notify(response.result, 'success');
      }
    } else {
      notify('Falha ao aceitar o lance. Favor, tente novamente mais tarde.', 'error');
    }

    fetchNegotiationBudgetList();
    navigate('Budget');
  };

  const decline = async () => {
    setLoadingDecline(true);
    const response = await declineNegotiationBudget();
    setLoadingDecline(false);
    if (response) {
      if (response.status === true) {
        notify(response.result, 'success');
      }
    } else {
      notify('Falha ao aceitar o lance. Favor, tente novamente mais tarde.', 'error');
    }

    fetchNegotiationBudgetList();
    navigate('Budget');
  };

  const renderContent = () => {
    if (loadingNegotiationBudget.value === true || !negotiationBudget.value) {
      return (
        <ActivityIndicator />
      );
    }

    return (
      <>
        <TableWrapper>
          <TableRow>
            <TableLabel>
              <BoldText>Data</BoldText>
            </TableLabel>
            <TableValue>
              <NormalText align="right">{formatDate(negotiationBudget.value.date_service_ordes, 'DATE')}</NormalText>
            </TableValue>
          </TableRow>
          <TableRow>
            <TableLabel>
              <BoldText>Horário</BoldText>
            </TableLabel>
            <TableValue>
              <NormalText align="right">{formatDate(negotiationBudget.value.date_service_ordes, 'HOUR')}</NormalText>
            </TableValue>
          </TableRow>
          <TableRow>
            <TableLabel>
              <BoldText>Serviço</BoldText>
            </TableLabel>
            <TableValue>
              <NormalText align="right">{negotiationBudget.value.description}</NormalText>
            </TableValue>
          </TableRow>
          <TableRow>
            <TableLabel>
              <BoldText>Endereço</BoldText>
            </TableLabel>
            <TableValue>
              <NormalText align="right">
                {handleAddress(negotiationBudget.value.client.person)}
              </NormalText>
            </TableValue>
          </TableRow>
          <TableRow>
            <TableLabel>
              <BoldText style={{ fontSize: 20 }}>Valor</BoldText>
            </TableLabel>
            <TableValue>
              <BoldText style={{ textAlign: 'right', fontSize: 20 }}>
                {`R$ ${negotiationBudget.value.value_final.toFixed(2).replace('.', ',')}`}
              </BoldText>
            </TableValue>
          </TableRow>
        </TableWrapper>
        <Container pt>
          <Button
            text="ACEITAR"
            fullWidth
            onPress={accept}
            loading={loadingAccept}
          />
        </Container>
        <Container pt>
          <Button
            text="RECUSAR"
            fullWidth
            onPress={decline}
            loading={loadingDecline}
          />
        </Container>
      </>
    );
  };

  return (
    <GlobalStyle>
      <ScrollView>
        <Container horizontal vertical>
          <Container
            style={{
              backgroundColor: 'white',
              borderRadius: 5,
            }}
            horizontal
            vertical
          >
            {renderContent()}
          </Container>
        </Container>
      </ScrollView>
    </GlobalStyle>
  );
};

export default AcceptOrDeclineNegotiationBudget;

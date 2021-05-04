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
import OS, { handleOSValue } from 'src/interfaces/OS';
import Button from 'components/Button';
import notify from 'util/notify';

const {
  budget: {
    open: {
      selectedOpenBudgetRef,
      fetchOpenBudget,
      loadingOpenBudgetRef,
      openBudgetRef,
      payBudget,
      fetchOpenBudgetList,
    },
  },
} = GlobalContext;

const OpenBudgetDetails: FCWithLoggedStackNavigator<'OpenBudgetDetails'> = ({
  navigation: {
    navigate,
  },
}) => {
  const selectedOpenBudget = useStateLink(selectedOpenBudgetRef);
  const openBudget = useStateLink(openBudgetRef);
  const loadingOpenBudget = useStateLink(loadingOpenBudgetRef);
  const [loadingPay, setLoadingPay] = useState(false);

  useEffect(() => {
    fetchOpenBudget();
  }, [selectedOpenBudget.value]);

  const handleAddress = ({
    address, cep, city, district, number, state,
  }: OS['client']['person']) => `${address}, ${number}, ${district}, ${city}/${state} - ${cep}`;

  const pay = async () => {
    setLoadingPay(true);
    const response = await payBudget();
    setLoadingPay(false);
    if (response) {
      if (response.status === true) {
        notify(response.result, 'success');
      }
    } else {
      notify('Falha ao pagar o lance. Favor, tente novamente mais tarde.', 'error');
    }

    fetchOpenBudgetList();
    navigate('Budget');
  };

  const renderContent = () => {
    if (loadingOpenBudget.value === true || !openBudget.value) {
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
              <NormalText align="right">{formatDate(openBudget.value.date_service_ordes, 'DATE')}</NormalText>
            </TableValue>
          </TableRow>
          <TableRow>
            <TableLabel>
              <BoldText>Horário</BoldText>
            </TableLabel>
            <TableValue>
              <NormalText align="right">{formatDate(openBudget.value.date_service_ordes, 'HOUR')}</NormalText>
            </TableValue>
          </TableRow>
          <TableRow>
            <TableLabel>
              <BoldText>Serviço</BoldText>
            </TableLabel>
            <TableValue>
              <NormalText align="right">{openBudget.value.description}</NormalText>
            </TableValue>
          </TableRow>
          <TableRow>
            <TableLabel>
              <BoldText>Endereço</BoldText>
            </TableLabel>
            <TableValue>
              <NormalText align="right">
                {handleAddress(openBudget.value.client.person)}
              </NormalText>
            </TableValue>
          </TableRow>
          <TableRow>
            <TableLabel>
              <BoldText style={{ fontSize: 20 }}>Valor</BoldText>
            </TableLabel>
            <TableValue>
              <BoldText style={{ textAlign: 'right', fontSize: 20 }}>
                {handleOSValue(openBudget.value.value_final)}
              </BoldText>
            </TableValue>
          </TableRow>
        </TableWrapper>
        <Container pt>
          <Button
            text="PAGAR"
            fullWidth
            onPress={pay}
            loading={loadingPay}
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

export default OpenBudgetDetails;

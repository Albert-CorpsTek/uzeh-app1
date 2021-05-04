import React, { useEffect } from 'react';
import { View } from 'react-native';
import CardComponent, { CardLeft, CardContent } from 'components/Card';
import {
  Text, IconButton, ActivityIndicator,
} from 'react-native-paper';
import Container from 'components/Container';
import GlobalContext from 'src/context';
import { useStateLink } from '@hookstate/core';
import { convertFormatedToNormal, formatDate } from 'util/formatDate';
import { colors } from 'src/theme';
import paginate from 'util/paginate';
import Paginator from 'components/Paginator';
import { FCWithLoggedStackNavigator } from 'pages/LoggedStackNavigator';
import { withAppbar } from 'components/Appbar';
import { ScrollView } from 'react-native-gesture-handler';
import BoldText from 'components/BoldText';
import GlobalStyle from 'components/GlobalStyle';
import NormalText from 'components/NormalText';
import { styles } from './style';

const {
  budget: {
    normal: {
      fetchNormalBudgetList,
      loadingNormalBudgetListRef,
      normalBudgetListRef,
      selectedNormalBudgetRef,
      pageNormalBudgetRef,
    },
    negotiation: {
      selectedNegotiationBudgetRef,
      negotiationBudgetListRef,
      pageNegotiationBudgetRef,
      loadingNegotiationBudgetListRef,
      fetchNegotiationBudgetList,
    },
    open: {
      pageOpenBudgetRef,
      loadingOpenBudgetListRef,
      openBudgetListRef,
      fetchOpenBudgetList,
      selectedOpenBudgetRef,
    },
  },
} = GlobalContext;

const Budget: FCWithLoggedStackNavigator<'Budget'> = ({
  navigation: {
    navigate,
  },
}) => {
  const normalBudgetList = useStateLink(normalBudgetListRef);
  const selectedNormalBudget = useStateLink(selectedNormalBudgetRef);
  const loadingNormalBudgetList = useStateLink(loadingNormalBudgetListRef);
  const negotiationBudgetList = useStateLink(negotiationBudgetListRef);
  const pageOpenBudget = useStateLink(pageOpenBudgetRef);
  const pageNegotiationBudget = useStateLink(pageNegotiationBudgetRef);
  const pageNormalBudget = useStateLink(pageNormalBudgetRef);
  const selectedNegotiationBudget = useStateLink(selectedNegotiationBudgetRef);
  const loadingOpenBudgetList = useStateLink(loadingOpenBudgetListRef);
  const loadingNegotiationBudgetList = useStateLink(loadingNegotiationBudgetListRef);
  const openBudgetList = useStateLink(openBudgetListRef);
  const selectedOpenBudget = useStateLink(selectedOpenBudgetRef);

  useEffect(() => {
    fetchOpenBudgetList();
    fetchNegotiationBudgetList();
    fetchNormalBudgetList();
  }, []);

  const paginatedOpenBudgets = openBudgetList.value && paginate(
    openBudgetList.value,
    pageOpenBudget.value,
    5,
  );

  const paginatedNegotiationBudgets = negotiationBudgetList.value && paginate(
    negotiationBudgetList.value,
    pageNegotiationBudget.value,
    5,
  );

  const paginatedNormalBudgets = normalBudgetList.value && paginate(
    normalBudgetList.value,
    pageNormalBudget.value,
    5,
  );

  const renderOpenBudgets = () => {
    if (
      !paginatedOpenBudgets
      || paginatedOpenBudgets.length === 0
      || loadingOpenBudgetList.value === true
    ) {
      return null;
    }

    const renderCardContent = (
      paginatedOpenBudgets.map((i: any) => (
        <Container key={i.os_id} pb>
          <CardComponent
            onPress={() => {
              selectedOpenBudget.set(i.os_id);
              navigate('OpenBudgetDetails');
            }}
          >
            <CardLeft>
              <IconButton icon="currency-usd" color="#FFFAF7" size={45} />
            </CardLeft>
            <CardContent>
              <Container horizontal vertical>
                <BoldText style={{ fontSize: 20 }}>{i.category}</BoldText>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#C0C0C0',
                  }}
                />
                <Container pb />
                <Text style={styles.textStyleSub}>
                  {`Criado em ${formatDate(convertFormatedToNormal(i.created), 'FULL')}`}
                </Text>
                <Text style={styles.textStyleSub}>{i.description}</Text>
                <Text
                  style={{
                    color: colors.orange,
                    fontFamily: 'Manjari-Bold',
                  }}
                >
                  CLIQUE PARA MAIS INFORMAÇÕES
                </Text>
              </Container>
            </CardContent>
          </CardComponent>
        </Container>
      ))
    );

    return (
      <>
        <Container vertical>
          <BoldText style={{ fontSize: 20 }}>Ordens de serviço em aberto</BoldText>
        </Container>
        {renderCardContent}
        <Paginator
          actualPage={pageOpenBudget.value}
          numberOfItems={openBudgetList.value?.length ?? 0}
          sizeOfEachPage={5}
          onPageChange={(clickedPage) => pageOpenBudget.set(clickedPage)}
        />
      </>
    );
  };

  const renderNegotiationBudgets = () => {
    if (
      loadingNegotiationBudgetList.value === true
      || !paginatedNegotiationBudgets
      || paginatedNegotiationBudgets.length === 0
    ) {
      return null;
    }

    const renderCardContent = (
      paginatedNegotiationBudgets.map((i: any) => (
        <Container key={i.os_id} pb>
          <CardComponent
            onPress={() => {
              selectedNegotiationBudget.set(i.os_id);
              navigate('AcceptOrDeclineNegotiationBudget');
            }}
          >
            <CardLeft>
              <IconButton icon="currency-usd" color="#FFFAF7" size={45} />
            </CardLeft>
            <CardContent>
              <Container horizontal vertical>
                <BoldText style={{ fontSize: 20 }}>{i.category}</BoldText>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#C0C0C0',
                  }}
                />
                <Container pb />
                <Text style={styles.textStyleSub}>
                  {`Criado em ${formatDate(convertFormatedToNormal(i.created), 'FULL')}`}
                </Text>
                <Text style={styles.textStyleSub}>{i.description}</Text>
                <Text
                  style={{
                    color: colors.orange,
                    fontFamily: 'Manjari-Bold',
                  }}
                >
                  CLIQUE PARA MAIS INFORMAÇÕES
                </Text>
              </Container>
            </CardContent>
          </CardComponent>
        </Container>
      ))
    );

    return (
      <>
        <Container vertical>
          <BoldText style={{ fontSize: 20 }}>Ordens de serviço em negociação</BoldText>
        </Container>
        {renderCardContent}
        <Paginator
          actualPage={pageNegotiationBudget.value}
          numberOfItems={negotiationBudgetList.value?.length ?? 0}
          sizeOfEachPage={5}
          onPageChange={(clickedPage) => pageNegotiationBudget.set(clickedPage)}
        />
      </>
    );
  };

  const renderNormalBudgets = () => {
    if (!paginatedNormalBudgets) {
      return null;
    }

    if (paginatedNormalBudgets.length === 0) {
      return (
        <Container pb>
          <NormalText>Não há financeiro.</NormalText>
        </Container>
      );
    }

    return (
      paginatedNormalBudgets.map((i) => (
        <Container key={i.os_id} pb>
          <CardComponent
            onPress={() => {
              selectedNormalBudget.set(i.os_id);
              navigate('Details');
            }}
          >
            <CardLeft>
              <IconButton icon="currency-usd" color="#FFFAF7" size={45} />
            </CardLeft>
            <CardContent>
              <Container horizontal vertical>
                <BoldText style={{ fontSize: 20 }}>{i.category}</BoldText>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#C0C0C0',
                  }}
                />
                <Container pb />
                <Text style={styles.textStyleSub}>
                  {`Criado em ${formatDate(convertFormatedToNormal(i.created), 'FULL')}`}
                </Text>
                <Text style={styles.textStyleSub}>{i.description}</Text>
                <Text
                  style={{
                    color: colors.orange,
                    fontFamily: 'Manjari-Bold',
                  }}
                >
                  CLIQUE PARA MAIS INFORMAÇÕES
                </Text>
              </Container>
            </CardContent>
          </CardComponent>
        </Container>
      ))
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        minHeight: '100%',
      }}
    >
      <GlobalStyle>
        <Container
          vertical
          horizontal
        >
          <Container
            horizontal
            style={{
              backgroundColor: colors.gray,
              borderRadius: 5,
            }}
          >
            {renderOpenBudgets()}
          </Container>
        </Container>
        <Container
          vertical
          horizontal
        >
          <Container
            horizontal
            style={{
              backgroundColor: colors.gray,
              borderRadius: 5,
            }}
          >
            {renderNegotiationBudgets()}
          </Container>
        </Container>
        <Container
          vertical
          horizontal
        >
          <Container
            horizontal
            style={{
              backgroundColor: colors.gray,
              borderRadius: 5,
            }}
          >
            {loadingNormalBudgetList.value === true ? (
              <ActivityIndicator />
            ) : (
                <>
                  <Container vertical>
                    <BoldText style={{ fontSize: 20 }}>Financeiro</BoldText>
                  </Container>
                  {renderNormalBudgets()}
                  <Paginator
                    actualPage={pageNormalBudget.value}
                    numberOfItems={normalBudgetList.value?.length ?? 0}
                    sizeOfEachPage={5}
                    onPageChange={(clickedPage) => pageNormalBudget.set(clickedPage)}
                  />
                </>
              )}
          </Container>
        </Container>
      </GlobalStyle>
    </ScrollView>
  );
};

export default withAppbar(Budget);

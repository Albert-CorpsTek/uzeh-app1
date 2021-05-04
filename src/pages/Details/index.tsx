import {
  View, Text,
} from 'react-native';
import React, {
  useEffect,
} from 'react';
import CardComponent, { CardContent, CardLeft } from 'components/Card';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import Container from 'components/Container';
import GlobalContext from 'src/context';
import { useStateLink } from '@hookstate/core';
import { formatDate, convertFormatedToNormal } from 'util/formatDate';
import { colors } from 'src/theme';
import Button from 'components/Button';
import StarRating from 'react-native-star-rating';
import { FCWithLoggedStackNavigator } from 'pages/LoggedStackNavigator';
import NormalText from 'components/NormalText';
import {
  styles,
} from './style';

// const j = [{
//   id: 15,
//   provider: 'Gabriel Rocha',
//   stars: 4.6,
//   date_suggestion: '15/02/2020 15:20',
//   value: 346.21,
// }];

const {
  budget: {
    details: {
      detailsRef,
      fetchDetails,
      loadingDetailsRef,
    },
    normal: {
      selectedNormalBudgetRef,
    },
    bid: {
      selectedBidRef,
      fetchBid,
    },
  },
} = GlobalContext;

const Details: FCWithLoggedStackNavigator<'Details'> = ({
  navigation: {
    navigate,
  },
}) => {
  const details = useStateLink(detailsRef);
  const selectedBid = useStateLink(selectedBidRef);
  const loadingDetails = useStateLink(loadingDetailsRef);
  const selectedBudget = useStateLink(selectedNormalBudgetRef);

  useEffect(() => {
    fetchDetails();
  }, [selectedBudget.value]);

  const handleClick = (id: number, value: number) => {
    selectedBid.set({
      id,
      value,
    });
    fetchBid();
    navigate('BidDetails');
  };

  const renderDetails = () => {
    if (loadingDetails.value === true || !details.value) {
      return <ActivityIndicator />;
    }

    return details.value.length > 0
      ? details.value.map((i) => (
        <Container key={i.id} pb>
          <CardComponent
            onPress={() => handleClick(i.id, i.value)}
          >
            <CardLeft>
              <IconButton icon="currency-usd" color="#FFFAF7" size={50} />
            </CardLeft>
            <CardContent>
              <Container horizontal pb pt>
                <Text style={styles.textStyle}>
                  {i.provider}
                </Text>
                <View
                  style={{
                      borderBottomWidth: 1,
                      borderColor: '#C0C0C0',
                    }}
                />
                <Container pb />
                <StarRating
                  rating={i.stars}
                />
                <Text style={styles.textStyleSub}>
                  {'Criado em '}
                  <Text style={{ fontFamily: 'Manjari-Bold' }}>{formatDate(convertFormatedToNormal(i.date_suggestion), 'FULL')}</Text>
                </Text>
                <Text style={styles.textStyleSub}>
                  Valor: R$
                  {' '}
                  {`${i.value.toFixed(2).replace(/\./, ',')}`}
                </Text>
              </Container>
            </CardContent>
          </CardComponent>
        </Container>
  )) : (
    <Container vertical horizontal>
      <Container pb>
        <NormalText>Nenhum orçamento encontrado para a ordem de serviço selecionada.</NormalText>
      </Container>
      <Button
        text="VOLTAR"
        fullWidth
        onPress={() => {
          navigate('Budget');
        }}
      />
    </Container>
  );
};

  return (
    <Container
      vertical
      horizontal
      style={{
        backgroundColor: colors.gray,
        height: '100%',
        justifyContent: 'flex-start',
      }}
    >
      <View>
        {renderDetails()}
      </View>
    </Container>
  );
};

export default Details;

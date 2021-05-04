import React, { useState, useEffect } from 'react';
import Container from 'components/Container';
import StarRating from 'react-native-star-rating';
import { colors } from 'src/theme';
import { Text, ActivityIndicator } from 'react-native-paper';
import {
 Wrapper, Row, Label, Value, styles,
} from 'pages/Details/style';
import { BText, NText } from 'pages/Budget/style';
import { View } from 'react-native';
import { FCWithLoggedStackNavigator } from 'pages/LoggedStackNavigator';
import { ScrollView } from 'react-native-gesture-handler';
import Button from 'components/Button';
import GlobalContext from 'src/context';
import { useStateLink } from '@hookstate/core';
import { formatDate } from 'util/formatDate';
import OSType from 'src/interfaces/OS';
import { useIsFocused } from '@react-navigation/native';

const {
  evaluate: {
    OSRef,
    fetchOS,
    loadingOSRef,
    evaluate,
  },
} = GlobalContext;

const Evaluate: FCWithLoggedStackNavigator<'Evaluate'> = ({
  navigation: {
    navigate,
  },
}) => {
  const [starCount, setStarCount] = useState(0);
  const OS = useStateLink(OSRef);
  const loadingOS = useStateLink(loadingOSRef);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchOS();
    }
  }, [isFocused]);

  const handleAddress = ({
    address, cep, city, district, number, state,
  }: OSType['client']['person']) => `${address}, ${number}, ${district}, ${city}/${state} - ${cep}`;

  if (loadingOS.value === true || OS.value === undefined) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView>
      <Container
        horizontal
        vertical
        style={{
          backgroundColor: colors.gray,
          width: '100%',
          height: '100%',
        }}
      >
        <Container pb>
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'Manjari-Bold',
            }}
          >
            Avaliar profissional
          </Text>
        </Container>
        <Container
          pb
          style={{
            width: '100%',
          }}
        >
          <Wrapper>
            <Row>
              <Label><BText>Nome</BText></Label>
              <View><NText>{OS.value.client.name}</NText></View>
            </Row>
            <Row>
              <Label><BText>Horário de término</BText></Label>
              <View><NText>{formatDate(OS.value.date_service_ordes, 'FULL')}</NText></View>
            </Row>
            <Row>
              <Label><BText>Serviço</BText></Label>
              <Value>
                <NText numberOfLines={3} style={{ textAlign: 'right' }}>
                  {OS.value.description}
                </NText>
              </Value>
            </Row>
            <Row>
              <Label><BText>Endereço</BText></Label>
              <Value>
                <NText numberOfLines={3} style={{ textAlign: 'right' }}>
                  {handleAddress(OS.value.client.person)}
                </NText>
              </Value>
            </Row>
          </Wrapper>
        </Container>
        <Container horizontal pt padding={32}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={starCount}
            selectedStar={(rating) => setStarCount(rating)}
            fullStarColor={colors.contrast}
            halfStarEnabled
          />
        </Container>
        <Container vertical horizontal>
          <View style={styles.divwhite} />
          <Button
            text="AVALIAR"
            onPress={async () => {
              await evaluate(starCount.toString());
              navigate('Home');
            }}
            fullWidth
          />
        </Container>
      </Container>
    </ScrollView>
  );
};

export default Evaluate;

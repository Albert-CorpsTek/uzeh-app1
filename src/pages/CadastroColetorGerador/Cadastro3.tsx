import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {GroupControl, Input} from 'pages/Login/style';
import PanelSlider from 'components/PanelSlider';
import GlobalContext from 'src/context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Progress from 'components/Progress';
import useWithTouchable from 'src/util/useWithTouchable';
import Button from 'components/Button';
import {colors} from 'src/theme';
import request from 'util/request';
import {FCWithAppStackNavigator} from 'pages/AppStackNavigator';
import notify from 'util/notify';
import Request from 'src/interfaces/Request';
import GlobalStyle from 'components/GlobalStyle';
import AddressForm from 'src/components/AddressForm';
import {useStateLink} from '@hookstate/core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';

//YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

const {
  cadastro: {
    addressRef,
    numberRef,
    complementRef,
    cityRef,
    stateRef,
    clearForm,
    latitudeRef,
    longitudeRef,
    unregisteredUserIdRef,
    neighborhoodRef,
    cepRef,
  },
} = GlobalContext;

const Cadastro3: FCWithAppStackNavigator<'Cadastro3'> = ({
  navigation: {navigate},
}) => {
  const address = useWithTouchable(addressRef);
  const number = useWithTouchable(numberRef);
  const complement = useWithTouchable(complementRef);
  const city = useWithTouchable(cityRef);
  const state = useWithTouchable(stateRef);
  const latitude = useWithTouchable(latitudeRef);
  const longitude = useWithTouchable(longitudeRef);
  const unregisteredUserId = useStateLink(unregisteredUserIdRef);
  const neighborhood = useWithTouchable(neighborhoodRef);
  const cep = useWithTouchable(cepRef);

  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(true);
  const navegar = useNavigation();

  const [completed, setCompleted] = useState(false);

  let hasError = false;

  const checkError = (flag: boolean) => {
    if (flag === true) {
      hasError = true;
    }

    return flag;
  };

  const submit = async () => {
    setLoading(true);

    try {
      const response = await request.post<Request<unknown, 'message'>>(
        'leads/app/' + unregisteredUserId.value,
        {
          address: address.value,
          number: number.value,
          complement: complement.value,
          city: city.value,
          state: state.value,
          latitude: latitude.value.toString(),
          longitude: longitude.value.toString(), 
          cep: cep.value,
        },
      );

      setLoading(false);
      console.log(response);

      if (response.status === true) {
        navigate('Cadastro4');
      } else {
        notify(response.result.message, 'error');
      }
    } catch (e) {
      console.log(e);
    }
  };

  function voltar() {
    navegar.goBack();
  }

  return (
    <GlobalStyle>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          minHeight: '100%',
        }}
        style={{
          minHeight: '100%',
        }}>
        <TouchableOpacity
          onPress={() => {
            voltar();
          }}>
          <FontAwesomeIcon
            style={{position: 'relative', marginTop: '5%', marginLeft: 20}}
            icon={faChevronLeft}
            color={colors.white}
            size={32}
          />
        </TouchableOpacity>
        <Progress
          step={1}
          stepTitles={[
            'Dados\npessoais 1',
            'Endereço',
            'Dados\nde acesso',
          ]}
        />
        <PanelSlider
          style={{
            marginTop: 20,
          }}>
          <AddressForm
            address={address.value}
            number={number.value}
            complement={complement.value}
            city={city.value}
            state={state.value}
            neighborhood={neighborhood.value} 
            completed={completed} 
            cep={cep.value}
            setAddress={address.set}
            setNumber={number.set}
            setComplement={complement.set}
            setCity={city.set}
            setState={state.set}
            setLatitude={latitude.set}
            setLongitude={longitude.set}
            setNeighborhood={neighborhood.set} 
            setCompleted={setCompleted} 
            setCep={cep.set}
          />
          <GroupControl>
            <Button
              onPress={submit}
              disabled={!completed}
              text="AVANÇAR"
              fullWidth
              loading={loading}
              backgroundColor={colors.newColor}
            />
          </GroupControl>
        </PanelSlider>
      </KeyboardAwareScrollView>
    </GlobalStyle>
  );
};

export default Cadastro3;

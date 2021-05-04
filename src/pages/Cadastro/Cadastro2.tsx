import React, {useState} from 'react';
import {GroupControl, Input} from 'pages/Login/style';
import PanelSlider from 'components/PanelSlider';
import GlobalContext from 'src/context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Progress from 'components/Progress';
import InputWarning from 'components/InputWarning';
import useWithTouchable from 'src/util/useWithTouchable';
import {TextInputMask} from 'react-native-masked-text';
import {View} from 'react-native';
import {colors} from 'src/theme';
import cepPromise from 'cep-promise';
import Button from 'components/Button';
import {IconButton} from 'react-native-paper';
import {FCWithAppStackNavigator} from 'pages/AppStackNavigator';
import notify from 'util/notify';

const {
  cadastro: {
    cepRef,
    addressRef,
    numberRef,
    complementRef,
    neighborhoodRef,
    cityRef,
    stateRef,
  },
} = GlobalContext;

const Cadastro2: FCWithAppStackNavigator<'Cadastro2'> = ({
  navigation: {navigate},
}) => {
  const [cepLoading, setCepLoading] = useState(false);

  const cep = useWithTouchable(cepRef);
  const address = useWithTouchable(addressRef);
  const number = useWithTouchable(numberRef);
  const complement = useWithTouchable(complementRef);
  const neighborhood = useWithTouchable(neighborhoodRef);
  const city = useWithTouchable(cityRef);
  const state = useWithTouchable(stateRef);

  const loadCep = async () => {
    setCepLoading(true);
    try {
      const {
        city: searchCity,
        state: searchState,
        street: searchStreet,
        neighborhood: searchNeighborhood,
      } = await cepPromise(cep.value);

      city.set(searchCity);
      state.set(searchState);
      address.set(searchStreet);
      neighborhood.set(searchNeighborhood);
    } catch (e) {
      notify(
        'A pesquisa retornou um erro, verifique se o CEP está correto.',
        'error',
      );
    } finally {
      setCepLoading(false);
    }
  };

  let hasError = false;

  const checkError = (flag: boolean) => {
    if (flag === true) {
      hasError = true;
    }

    return flag;
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        minHeight: '100%',
      }}
      style={{
        minHeight: '100%',
      }}>
      <Progress step={1} />
      <PanelSlider
        style={{
          marginTop: 20,
        }}>
        <GroupControl
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flexGrow: 1}}>
            <TextInputMask
              type="zip-code"
              customTextInput={Input}
              customTextInputProps={{
                mode: 'flat',
                label: 'CEP',
                underlineColor: colors.black,
                allowFontScaling: true,
              }}
              value={cep.value}
              onChangeText={text => cep.set(text)}
              onBlur={cep.onBlur}
            />
            <InputWarning
              text="Campo obrigatório"
              valid={checkError(cep.value === '')}
              visible={cep.blurred}
            />
            <InputWarning
              text="Formato CEP inválido"
              valid={checkError(!/\d\d\d\d\d-\d\d\d/.test(cep.value))}
              visible={cep.blurred}
            />
          </View>
          <View>
            <Button onPress={loadCep} loading={cepLoading}>
              <IconButton icon="map-search" color={colors.white} />
            </Button>
          </View>
        </GroupControl>
        <GroupControl>
          <Input
            mode="flat"
            label="Endereço"
            value={address.value}
            onChangeText={text => address.set(text)}
            underlineColor={colors.black}
            allowFontScaling
            onBlur={address.onBlur}
          />
          <InputWarning
            text="Campo obrigatório"
            valid={checkError(address.value === '')}
            visible={address.blurred}
          />
        </GroupControl>
        <GroupControl>
          <Input
            mode="flat"
            label="Número"
            value={number.value}
            onChangeText={text => number.set(text)}
            underlineColor={colors.black}
            allowFontScaling
            onBlur={number.onBlur}
          />
          <InputWarning
            text="Campo obrigatório"
            valid={checkError(number.value === '')}
            visible={number.blurred}
          />
        </GroupControl>
        <GroupControl>
          <Input
            mode="flat"
            label="Complemento"
            value={complement.value}
            onChangeText={text => complement.set(text)}
            underlineColor={colors.black}
            allowFontScaling
          />
        </GroupControl>
        <GroupControl>
          <Input
            mode="flat"
            label="Bairro"
            value={neighborhood.value}
            onChangeText={text => neighborhood.set(text)}
            underlineColor={colors.black}
            allowFontScaling
            onBlur={neighborhood.onBlur}
          />
          <InputWarning
            text="Campo obrigatório"
            valid={checkError(neighborhood.value === '')}
            visible={neighborhood.blurred}
          />
        </GroupControl>
        <GroupControl>
          <Input
            mode="flat"
            label="Cidade"
            value={city.value}
            onChangeText={text => city.set(text)}
            underlineColor={colors.black}
            allowFontScaling
            onBlur={city.onBlur}
          />
          <InputWarning
            text="Campo obrigatório"
            valid={checkError(city.value === '')}
            visible={city.blurred}
          />
        </GroupControl>
        <GroupControl>
          <Input
            mode="flat"
            label="Estado"
            value={state.value}
            onChangeText={text => state.set(text)}
            underlineColor={colors.black}
            allowFontScaling
            onBlur={state.onBlur}
          />
          <InputWarning
            text="Campo obrigatório"
            valid={checkError(state.value === '')}
            visible={state.blurred}
          />
        </GroupControl>
        <GroupControl>
          <Button
            text="AVANÇAR"
            onPress={() => navigate('Cadastro3')}
            disabled={hasError}
            fullWidth
          />
        </GroupControl>
      </PanelSlider>
    </KeyboardAwareScrollView>
  );
};

export default Cadastro2;

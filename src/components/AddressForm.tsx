import React, { useState, useEffect } from 'react';
import { GroupControl, Input } from 'pages/Login/style';
import InputWarning from 'components/InputWarning';
import { StyleSheet, View, TextInput } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import isPositiveInteger from 'src/util/isPositiveInteger';
import { colors } from 'src/theme';
import { ActivityIndicator } from 'react-native-paper';
import Container from 'components/Container';
import Button from 'components/Button';
import Geocoder from 'react-native-geocoding';
import notify from 'util/notify';
import { Text } from 'react-native-paper';
import CustomTextInput from 'components/CustomTextInput';
import Select from 'components/Select.tsx';
import listOfStates from 'util/listOfStates';

const AddressForm = props => {
  const {
    address,
    number,
    complement,
    city,
    state,
    neighborhood,
    completed,
    cep,
    setAddress,
    setNumber,
    setComplement,
    setCity,
    setState,
    setLatitude,
    setLongitude,
    setNeighborhood,
    setCompleted,
    setCep,
  } = props;
  const [searchDone, setSearchDone] = useState(false);
  const [addressBlurred, setAddressBlurred] = useState(false);
  const [numberBlurred, setNumberBlurred] = useState(false);
  const [cityBlurred, setCityBlurred] = useState(false);
  const [stateBlurred, setStateBlurred] = useState(false);
  const [neighborhoodBlurred, setNeighborhoodBlurred] = useState(false);
  const [cepBlurred, setCepBlurred] = useState(false);

  const [addressIsEmpty, setAddressIsEmpty] = useState(true);
  const [numberIsEmpty, setNumberIsEmpty] = useState(true);
  const [complementIsEmpty, setComplementIsEmpty] = useState(true);
  const [cityIsEmpty, setCityIsEmpty] = useState(true);
  const [stateIsEmpty, setStateIsEmpty] = useState(true);
  const [neighborhoodIsEmpty, setNeighborhoodIsEmpty] = useState(true);
  const [cepIsEmpty, setCepIsEmpty] = useState(true);

  const [loading, setLoading] = useState(false);

  let hasError = false;

  const checkError = (flag: boolean) => {
    if (flag === true) {
      hasError = true;
    }

    return flag;
  };

  const clear = () => {
    setAddress('');
    setNumber('');
    setComplement('');
    setNeighborhood('');
    setCity('');
    setState('');
    setCep('');

    setAddressIsEmpty(true);
    setNumberIsEmpty(true);
    setComplementIsEmpty(true);
    setNeighborhoodIsEmpty(true);
    setCityIsEmpty(true);
    setStateIsEmpty(true);
    setCepIsEmpty(true);
  };

  const openSearchModal = () => {
    setLoading(true);
    RNGooglePlaces.openAutocompleteModal(
      {
        country: 'BR',
        useOverlay: true,
      },
      ['addressComponents', 'location'],
    )
      .then(place => {
        clear();
        var addressComponents = place.addressComponents;
        addressComponents.forEach(addressComponent => {
          switch (addressComponent.types[0]) {
            case 'postal_code':
              setCep(addressComponent.shortName);
              setCepIsEmpty(false);
              break;
            case 'street_number':
              setNumber(addressComponent.shortName);
              setNumberIsEmpty(false);
              break;
            case 'route':
              setAddress(addressComponent.shortName);
              setAddressIsEmpty(false);
              break;
            case 'sublocality_level_1':
              setNeighborhood(addressComponent.shortName);
              setNeighborhoodIsEmpty(false);
              break;
            case 'administrative_area_level_2':
              setCity(addressComponent.shortName);
              setCityIsEmpty(false);
              break;
            case 'administrative_area_level_1':
              setState(addressComponent.shortName);
              setStateIsEmpty(false);
              break;
            default:
              break;
          }
        });

        var location = place.location;
        setLongitude(location.longitude);
        setLatitude(location.latitude);

        setCepBlurred(true);
        setAddressBlurred(true);
        setNumberBlurred(true);
        setNeighborhoodBlurred(true);
        setCityBlurred(true);
        setStateBlurred(true);

        setSearchDone(true);

        setLoading(false);
      })
      .catch(error => {
        console.log(error.message);
        setLoading(false);
      });
  };

  const getCurrentAddress = async () => {
    try {
      const response = await RNGooglePlaces.getCurrentPlace();
      notify(JSON.stringify(response), 'success');
    } catch(e) {
      notify(e, 'error');
    }
  };

  /*
  useEffect(() => {
    setLoading(false);
  }, [searchDone]);
  */

  useEffect(() => setCompleted(cep !== '' && address !== '' && number !== '' && neighborhood !== '' && city !== '' && state !== ''), [
    address,
    number,
    neighborhood,
    city,
    state, 
    cep
  ]);

  const updateLocation = async () => {
    if (number == '' || address == '' || neighborhood == '' || city == '' || state == '')
      return;
    Geocoder.init('AIzaSyCDsc9pmM4xfjWcIyNokhgbrd5SYQDiz7o');
    try {
      const geocoderResponse = await Geocoder.from(
        number + ' ' + address + ', ' + neighborhood + ', ' + city + ', ' + state,
      );
      var location = geocoderResponse.results[0].geometry.location;
      setLatitude(location.lat);
      setLongitude(location.lng);
      console.log("Location = " + JSON.stringify(location));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <View>
        <Button
          onPress={openSearchModal}
          disabled={false}
          text="BUSCAR NO GOOGLE"
          loading={false}
          backgroundColor={colors.newBlack}
        />
        {/*<RNPButton 
          icon="crosshairs-gps" 
          mode="contained" 
          onPress={getCurrentAddress}
        >
          gps
        </RNPButton>*/}
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.control}>
            <Text style={styles.label}>CEP</Text>
            <CustomTextInput 
              value={cep}
              onChangeText={text => setCep(text)} 
              onBlur={() => setCepBlurred(true)} 
              onEndEditing={updateLocation} 
              //disabled={!searchDone || !cepIsEmpty} 
              editable={searchDone && cepIsEmpty}
            />
            {/*<Input
              mode="flat"
              label="CEP"
              value={cep}
              onChangeText={text => setCep(text)}
              underlineColor={colors.black}
              allowFontScaling
              onBlur={() => setCepBlurred(true)}
              onEndEditing={updateLocation} 
              disabled={!searchDone || !cepIsEmpty}
            />*/}
            <InputWarning
              text="Campo obrigatório"
              valid={checkError(cep === '')}
              visible={cepBlurred}
            />
          </View>
          <View style={styles.control}>
            <Text style={styles.label}>Endereço</Text>
            <CustomTextInput 
              value={address} 
              onChangeText={text => setAddress(text)} 
              onBlur={() => setAddressBlurred(true)} 
              onEndEditing={updateLocation} 
              editable={searchDone && addressIsEmpty}
            />
            {/*<Input
              mode="outlined"
              label="Endereço"
              value={address}
              onChangeText={text => setAddress(text)}
              underlineColor={colors.black}
              allowFontScaling
              onBlur={() => setAddressBlurred(true)}
              onEndEditing={updateLocation} 
              disabled={!searchDone || !addressIsEmpty}
            />*/}
            <InputWarning
              text="Campo obrigatório"
              valid={checkError(address === '')}
              visible={addressBlurred}
            />
          </View>
          <View style={styles.control}>
            <Text style={styles.label}>Número</Text>
            <CustomTextInput 
              value={number} 
              onChangeText={text => setNumber(text)} 
              onBlur={() => setNumberBlurred(true)} 
              onEndEditing={updateLocation} 
              editable={searchDone && numberIsEmpty} 
              keyboardType="numeric"
            />
            {/*<Input
              mode="flat"
              label="Número"
              value={number}
              onChangeText={text => setNumber(text)}
              underlineColor={colors.black}
              allowFontScaling
              onBlur={() => setNumberBlurred(true)}
              autoCompleteType="cc-number"
              keyboardType="numeric"
              onEndEditing={updateLocation} 
              disabled={!searchDone || !numberIsEmpty}
            />*/}
            <InputWarning
              text="Campo obrigatório"
              valid={checkError(number === '')}
              visible={numberBlurred}
            />
          </View>
          <View style={styles.control}>
            <Text style={styles.label}>Complemento</Text>
            <CustomTextInput 
              value={complement} 
              onChangeText={text => setComplement(text)} 
              editable={searchDone && complementIsEmpty}
            />
            {/*<Input
              mode="flat"
              label="Complemento"
              value={complement}
              onChangeText={text => setComplement(text)}
              underlineColor={colors.black}
              allowFontScaling
              disabled={!searchDone || !complementIsEmpty}
            />*/}
          </View>
          <View style={styles.control}>
            <Text style={styles.label}>Bairro</Text>
            <CustomTextInput 
              value={neighborhood} 
              onChangeText={text => setNeighborhood(text)} 
              onBlur={() => setNeighborhoodBlurred(true)} 
              onEndEditing={updateLocation} 
              editable={searchDone && neighborhoodIsEmpty}
            />
            {/*<Input
              mode="flat"
              label="Bairro"
              value={neighborhood}
              onChangeText={(text) => setNeighborhood(text)}
              underlineColor={colors.black}
              allowFontScaling
              onBlur={() => setNeighborhoodBlurred(true)}
              onEndEditing={updateLocation} 
              disabled={!searchDone || !neighborhoodIsEmpty}
            />*/}
            <InputWarning
              text="Campo obrigatório"
              valid={checkError(neighborhood === '')}
              visible={neighborhoodBlurred}
            />
          </View>
          <View style={styles.control}>
            <Text style={styles.label}>Cidade</Text>
            <CustomTextInput 
              value={city} 
              onChangeText={text => setCity(text)} 
              onBlur={() => setCityBlurred(true)} 
              onEndEditing={updateLocation} 
              editable={searchDone && cityIsEmpty}
            />
            {/*<Input
              mode="flat"
              label="Cidade"
              value={city}
              onChangeText={text => setCity(text)}
              underlineColor={colors.black}
              allowFontScaling
              onBlur={() => setCityBlurred(true)}
              onEndEditing={updateLocation} 
              disabled={!searchDone || !cityIsEmpty}
            />*/}
            <InputWarning
              text="Campo obrigatório"
              valid={checkError(city === '')}
              visible={cityBlurred}
            />
          </View>
          <View style={styles.control}>
            <Text style={styles.label}>Estado</Text>
            {/*<CustomTextInput 
              value={state} 
              onChangeText={text => setState(text)} 
              onBlur={() => setStateBlurred(true)} 
              onEndEditing={updateLocation} 
              editable={searchDone && stateIsEmpty}
            />*/}
            <Select
              items={[
                {
                  key: 'default',
                  label: 'Selecionar...',
                },
                ...listOfStates.map((i) => ({key: i, label: i})),
              ]}
              value={state}
              onChange={(key) => {
                setState(key);
                setStateBlurred(true);
              }} 
              editable={searchDone && stateIsEmpty}
            />
            {/*<Input
              mode="flat"
              label="Estado"
              value={state}
              onChangeText={text => setState(text)}
              underlineColor={colors.black}
              allowFontScaling
              onBlur={() => setStateBlurred(true)}
              onEndEditing={updateLocation} 
              disabled={!searchDone || !stateIsEmpty}
            />*/}
            <InputWarning
              text="Campo obrigatório"
              valid={checkError(state === '')}
              visible={stateBlurred}
            />
          </View>
        </>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  searchbutton: {
    backgroundColor: '#ff3333',
  },
  label: {
    marginBottom: "5%",
    textTransform: 'uppercase'
  },
  control: {
    marginTop: '5%'
  },
  input: {

  }
});

export default AddressForm;

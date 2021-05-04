import React, { useState, useEffect } from 'react';
import { GroupControl, Input } from 'pages/Login/style';
import PanelSlider from 'components/PanelSlider';
import GlobalContext from 'src/context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Progress from 'components/Progress';
import InputWarning from 'components/InputWarning';
import useWithTouchable from 'src/util/useWithTouchable';
import Button from 'components/Button';
import { colors } from 'src/theme';
import { TextInputMask } from 'react-native-masked-text';
import { useStateLink } from '@hookstate/core';
import transformDate from 'util/transformDate';
import request from 'util/request';
import { FCWithAppStackNavigator } from 'pages/AppStackNavigator';
import notify from 'util/notify';
import Request from 'src/interfaces/Request';
import { Text, View, SafeAreaView, FlatList, CheckBox, StyleSheet, TouchableOpacity } from 'react-native';
import Option from "src/components/Option.js";
import GlobalStyle from 'components/GlobalStyle';
import Geocoder from 'react-native-geocoding';
import Select from 'src/components/Select.js';
import useToken from 'util/useToken';
import { StateUser } from 'src/context/auth';
import { Title, TouchableRipple } from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

const {
  cadastro: {
    addressRef,
    cnpjRef,
    emailRef,
    nameRef,
    numberRef,
    phoneRef,
    clearForm,
    apelidoRef,
    complementRef,
    categoryIdsRef,
    passwordRef,
    cityRef,
    stateRef,
    latitudeRef,
    longitudeRef,
    unregisteredUserIdRef,
  },
  category: {
    categoriesRef,
    fetchCategories,
  },
} = GlobalContext;

function Categorie({ urlIcon }) {
  return (
    <Option urlIcon={'https://brunoananias.s3.amazonaws.com/papel.png'} />
  );
}

const Cadastro3: FCWithAppStackNavigator<'Cadastro3'> = ({
  navigation: {
    navigate,
  },
}) => {

  const address = useStateLink(addressRef);
  const cnpj = useStateLink(cnpjRef);
  const email = useStateLink(emailRef);
  const name = useStateLink(nameRef);
  const number = useStateLink(numberRef);
  const phone = useStateLink(phoneRef);
  const apelido = useStateLink(apelidoRef);
  const complement = useStateLink(complementRef);
  const categoryIds = useStateLink(categoryIdsRef);
  const password = useStateLink(passwordRef);
  const city = useStateLink(cityRef);
  const state = useStateLink(stateRef);
  const latitude = useStateLink(latitudeRef);
  const longitude = useStateLink(longitudeRef);
  const unregisteredUserId = useStateLink(unregisteredUserIdRef);

  const [loading, setLoading] = useState(false);
  const navegar = useNavigation();

  let hasError = false;

  const checkError = (flag: boolean) => {
    if (flag === true) {
      hasError = true;
    }

    return flag;
  };

  const token = useToken();

  const submit = async () => {
    interface SubmitRequest {
      result?: {
        message?: string;
        token?: string | false;
        user?: StateUser;
      };
    }
    setLoading(true);

    try {
      const a = [];
      const response = await request.post<Request<unknown, 'message'>>('clients/insert/' + unregisteredUserId.value, {
        name: name.value,
        numero_cpf: cnpj.value,
        email: email.value,
        number_contact: phone.value,
        address: address.value,
        number: number.value,
        password: password.value,
        user_type: '6',
        nickname: apelido.value,
        categorie_ids: JSON.stringify(categoryIds.value),
        complement: complement.value,
        date_of_birth: "0000-00-00",
        latitude: latitude.value.toString(),
        longitude: longitude.value.toString(),
        city: city.value,
        state: state.value,
      });

      setLoading(false);

      if (response.status === true) {
        const tokenValue = response?.result?.token;
        const user = response?.result?.user;
        await token.set(tokenValue, user);
        navigate('LoggedRoutes');
        clearForm();
      } else {
        notify(response.result.message, 'error');
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const addCategoryId = () => { };

  const categories = useStateLink(categoriesRef);

  useEffect(() => {
    fetchCategories();
  }, []);

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
        }}
      >
        <TouchableOpacity onPress={() => {
              voltar();
            }}>
       <FontAwesomeIcon
           style={{position: 'relative', marginTop: '5%', marginLeft: 20}}
           icon={faChevronLeft}
           color={colors.white}
           size={32}
         />
         </TouchableOpacity>
        <Progress step={3} stepTitles={[
          'Dados\nempresariais',
          'Endereço',
          'Dados\nde acesso',
          'Materiais que trabalha',
        ]} />
        <PanelSlider
          style={{
            marginTop: 20,
          }}
        >
          <GroupControl>
            <Text 
              style={{
                textAlign: 'center'
              }}
            >
              Selecione os materiais que você trabalha
            </Text>
          </GroupControl>
          {(typeof categories.value !== 'undefined') && (<Select 
            options={categories.value.slice(1)} 
            selected={categoryIds.value} 
            onPress={(itemId) => {
              if(categoryIds.value.includes(itemId))
                categoryIds.set(categoryIds.value.filter(currentValue => itemId !== currentValue))
              else
                categoryIds.set(categoryIds.value.concat([itemId]));
            }}
          />)}
          <GroupControl>
            <Button
              onPress={submit}
              disabled={hasError}
              text="ENVIAR"
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

const styles = StyleSheet.create({
  itemsContainer: {
    width: "100%",
    padding: 20
  },
  items: {
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: 'space-between',
    padding: 5

  }
});

export default Cadastro3;

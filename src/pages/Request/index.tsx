import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableNativeFeedback,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  TextInput
} from 'react-native';
//import CheckBox from '@react-native-community/checkbox';
//import TextInput from 'components/Input';
import { Text, TextInput as RNPTextInput, TouchableRipple, RadioButton, Checkbox } from 'react-native-paper';
import Container from 'components/Container';
import Categories from 'components/Categories';
import request from 'util/request';
import { colors } from 'src/theme';
import { FCWithLoggedStackNavigator } from 'pages/LoggedStackNavigator';
import pickImage from 'util/pickImage';
import Button from 'components/Button';
import notify from 'util/notify';
import Collapsible from 'react-native-collapsible';
import { Input } from 'pages/Login/style';
import GlobalContext from 'src/context';
import { useStateLink } from '@hookstate/core';
import transformDate from 'util/transformDate';
import Grid2 from 'src/components/Grid2.js';
import dateFormat from 'util/dateFormat';
import DateTimePicker from '@react-native-community/datetimepicker';
import Select from 'src/components/Select.js';
import Geocoder from 'react-native-geocoding';
import AddressForm from 'src/components/AddressForm';
import { faCalendar, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { GroupControl } from 'pages/Login/style';
import { TextInput as DateInput } from 'react-native-paper';
import Topbar from 'components/Topbar';
import imagePlusIcon from 'img/icons/image-plus.png';
import Icon from 'components/Icon';
import SelectMultiple from 'components/SelectMultiple';
import moonIcon from 'img/icons/moon.png';
import sunIcon from 'img/icons/sun.png';
import sunsetIcon from 'img/icons/sunset.png';
import SelectGrid from 'components/SelectGrid';
import TextInputMask from 'react-native-text-input-mask';
import AppButton from 'components/AppButton';
import CustomTextInput from 'components/CustomTextInput';
import CustomTextInputMask from 'components/CustomTextInputMask';
import styled from 'styled-components/native';
import ToggleButton from 'components/ToggleButton';
import BouncyCheckbox from "react-native-bouncy-checkbox";
//import CheckBox from 'react-native-check-box';
import CheckBox from 'components/CheckBox';
import ImagePicker from 'components/ImagePicker';

const {
  cadastro: {
    categoryIdsRef,
  },
  category: {
    categoriesRef,
    fetchCategories,
  },
} = GlobalContext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: colors.darkGreen,
    marginHorizontal: 0,
    paddingHorizontal: '5%'
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  nview: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: 'center'
  },
  dataColetaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataColetaSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  dataColetaImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    marginBottom: '5%'
  },
  label: {
    textTransform: 'uppercase',
    marginBottom: "4%"
  },
  checkBoxLabel: {
    textTransform: 'uppercase',
    marginLeft: '3%'
  },
  photosContainer: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 5,
    flexWrap: 'wrap'
  },
  photo: {
    width: "50%",
    height: 100
  },
  addPhotoBtn: {
    flexDirection: 'row',
    width: '50%',
    height: 100,
    backgroundColor: colors.lightOrange,
    alignItems: 'center',
    justifyContent: 'center'
  },
  radioButtonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    backgroundColor: colors.lightGreen,
    paddingLeft: '2%',
    aspectRatio: 3.2,
    borderRadius: 5,
    borderWidth: 1
  },
  periodSelectionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  control: {
    marginTop: 20
  },
  checkBox: {
    borderRadius: 4,
    borderWidth: 0
  },
  buttonContainer: {
    marginBottom: 20
  },
  collapsibleContainer: {
    
  }
});

interface PhotosProps {
  photos: string[][];
  addPhoto: (uri: string) => void;
  removeImage: (index: number) => void;
}

const transformToPhotoArray = (array: string[]) => {
  const result: (string | 'new-photo')[][] = [];
  for (let i = 0; i < array.length; i += 2) {
    result.push(array.slice(i, i + 2));
  }
  if (result.length === 0) {
    return [['new-photo']];
  }
  if (result.slice(-1)[0].length === 1) {
    return [...result.slice(0, -1), [...result.slice(-1)[0], 'new-photo']];
  }
  return [...result, ['new-photo']];
};

const Photos: React.FC<PhotosProps> = ({ photos, addPhoto, removeImage }) => (
  <View style={styles.control}>
    <View
      style={{
        flexDirection: 'column',
      }}>
      {photos.map((i, indexI) => (
        <View
          key={indexI}
          style={{
            width: '100%',
            flexDirection: 'row',
            marginLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
          }}>
          {i.map((j, indexJ) =>
            j === 'new-photo' ? (
              <View
                key={indexJ}
                style={{
                  width: '60%',
                  paddingRight: 10,
                  paddingBottom: 10,
                }}>
                <TouchableRipple
                  style={{
                    width: '100%',
                    height: 100,
                    borderRadius: 5,
                    backgroundColor: colors.lightOrange
                  }}
                  onPress={() => {
                    pickImage(addPhoto);
                  }}>
                  <View 
                    style={{ 
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: '100%'
                    }}>
                    <Icon
                      icon={imagePlusIcon}
                      style={{
                        /*
                        width: '100%',
                        height: '100%',
                        marginLeft: 0,
                        marginTop: -11,
                        */
                      }}
                      size={40}
                      color={colors.black}
                    />
                    <Text
                      style={{
                        //width: '100%',
                        //textAlign: 'center',
                        fontSize: 15,
                        //position: 'absolute',
                        //top: 60,
                        textTransform: 'uppercase'
                      }}>
                      Adicionar foto
                    </Text>
                  </View>
                </TouchableRipple>
              </View>
            ) : (
                <View
                  key={indexJ}
                  style={{
                    width: '40%',
                    overflow: 'hidden',
                  }}>
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('#FFF')}
                    onPress={() => {
                      Alert.alert(
                        `Deseja remover a imagem ${indexJ + 1}`,
                        'Hehehe',
                        [
                          {
                            text: 'Remover',
                            onPress: () => {
                              removeImage(indexJ);
                            },
                            style: 'cancel',
                          },
                          {
                            text: 'Cancelar',
                          },
                        ],
                      );
                    }}
                    useForeground
                    style={{
                      width: '100%',
                      height: '100%',
                    }}>
                    <View>
                      <Image
                        key={indexJ}
                        source={{
                          uri: j,
                        }}
                        style={{
                          width: '100%',
                          height: 100,
                          borderRadius: 5,
                        }}
                      />
                    </View>
                  </TouchableNativeFeedback>
                </View>
              ),
          )}
        </View>
      ))}
    </View>
  </View>
);

const Photos2 = ({
  photos,
  addPhoto,
  removeImage
}) => (
  <View style={styles.photosContainer}>
    {photos.map((photo, i) => (
      <TouchableNativeFeedback 
        onPress={() => {
          Alert.alert(
            "Remover a imagem",
            `Deseja remover a imagem ${i + 1}`,
            [
              {
                text: 'Remover',
                onPress: () => {
                  removeImage(i);
                },
                style: 'cancel',
              },
              {
                text: 'Cancelar',
              },
            ],
          );
        }} 
        key={i}>
        <Image 
          source={{
            uri: photo
          }} 
          style={[
            styles.photo,
            {
              borderBottomLeftRadius: i == photos.length - 1 && (i % 2 == 0) ? 5 : 0,
              borderTopLeftRadius: i == 0 ? 5 : 0,
              borderBottomRightRadius: i == photos.length - 1 && (i % 2 != 0) ? 5 : 0,
              borderTopRightRadius: i == 1 ? 5 : 0,
            }
          ]}
        />
      </TouchableNativeFeedback>
    ))}
    <TouchableRipple
      onPress={() => {
        pickImage(addPhoto);
      }} 
      style={[
        styles.addPhotoBtn,
        {
          borderBottomLeftRadius: photos.length % 2 == 0 ? 5 : 0,
          borderTopLeftRadius: photos.length == 0 ? 5 : 0,
          borderBottomRightRadius: 5,
          borderTopRightRadius: photos.length <= 1 ? 5 : 0,
          opacity: photos.length == 5 ? 0.2 : undefined
        }
      ]} 
      disabled={photos.length == 5}>
      <>
        <Icon
          icon={imagePlusIcon} 
          size={40} 
          color={colors.black}
        />
        <Text
          style={{
            fontSize: 15,
            textTransform: 'uppercase',
            color: colors.newBlack
          }}>
            Adicionar foto
        </Text>
      </>
    </TouchableRipple>
  </View>
);

/*
const StyledToggleButton = styled(ToggleButton)`
  background-color: ${props => props.status == 'checked' ? colors.lightOrange : colors.lightGreen};
  justify-content: center;
  align-items: center;
`;
*/

const incrementDate = (date, yearIncrement = 0, dayIncrement = 0) => {
  date.setFullYear(date.getFullYear() + yearIncrement);
  date.setDate(date.getDate() + dayIncrement);
  return date;
};

const Request: FCWithLoggedStackNavigator<'Request'> = ({
  navigation: { navigate },
}) => {
  const [selectedCategory, setSelectedCategory] = useState<number | 'default'>(
    'default',
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<
    number | 'default'
  >('default');
  const [value, setValue] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [dataColeta, setDataColeta] = useState(incrementDate(new Date(), 0, 3));
  //const [dataColeta, setDataColeta] = useState('');
  const [usarEnderecoDiferente, setUsarEnderecoDiferente] = useState(false);
  const [comentario, setComentario] = useState('');
  const [qtdSacosLixo, setQtdSacosLixo] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [cpf, setCpf] = useState('');
  //const categoryIds = useStateLink(categoryIdsRef);
  const [periodoColeta, setPeriodoColeta] = useState('manhã');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [tipoColeta, setTipoColeta] = useState('0');

  const [completed, setCompleted] = useState(false);
  const [cep, setCep] = useState('');

  const window = useWindowDimensions();

  const dataColetaInputRef = useRef(null);

  const submit = async () => {

    type BodyFormData = Extract<
      Exclude<Parameters<typeof request.authPostGeneric>['1'], undefined>[0],
      { filename?: string }
    >;
    const photoObject: Array<BodyFormData> = [];

    photos.forEach(async (i, index) => {
      photoObject.push({
        name: 'file'.concat((index + 1).toString()),
        filename: 'image.jpg',
        type: 'image/jpg',
        data: i,
      });
    });

    /*
    if(usarEnderecoDiferente) {
      Geocoder.init('AIzaSyCDsc9pmM4xfjWcIyNokhgbrd5SYQDiz7o');
      try {
        const geocoderResponse = await Geocoder.from(number + " " + address + ", " + city + ", " + state);
        var location = geocoderResponse.results[0].geometry.location;
        setLatitude(location.lat);
        setLongitude(location.lng);
      } catch(e) {
        console.log(e);
      }
    }
    */

    setLoading(true);
    try {
      /*
      const response = await request.authPost('CollectionOrders/newOC', {
        quantity_garbage_bags: qtdSacosLixo,
        datetime_collection_ordes: dateFormat(dataColeta, "Y-m-d"),
        address: address,
        number: number,
        complement: complement,
        comments: comentario,
        period: periodoColeta,
        use_person_address: usarEnderecoDiferente ? "" : usarEnderecoDiferente.toString(),
        city: city,
        state: state,
        district: neighborhood,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        type: tipoColeta,
      });
      */
      const response = await request.authPostGeneric2('CollectionOrders/insert', [
        {
          name: 'quantity_garbage_bags',
          data: qtdSacosLixo,
        },
        {
          name: 'datetime_collection_ordes',
          data: dateFormat(dataColeta, "Y-m-d"),
        },
        {
          name: 'address',
          data: address,
        },
        {
          name: 'number',
          data: number,
        },
        {
          name: 'complement',
          data: complement,
        },
        {
          name: 'comments',
          data: comentario,
        },
        {
          name: 'categorie_ids',
          data: JSON.stringify(categoryIds),
        },
        {
          name: 'period',
          data: periodoColeta,
        },
        {
          name: 'use_person_address',
          data: usarEnderecoDiferente ? "" : usarEnderecoDiferente.toString(),
        },
        {
          name: 'city',
          data: city,
        },
        {
          name: 'state',
          data: state,
        },
        {
          name: 'district',
          data: neighborhood,
        },
        {
          name: 'latitude',
          data: latitude.toString(),
        },
        {
          name: 'longitude',
          data: longitude.toString(),
        },
        {
          name: 'type',
          data: tipoColeta,
        },
        {
          name: 'number_of_files',
          data: photoObject.length.toString(),
        },
        ...photoObject,
      ]);
      setLoading(false);

      /*
      if (response.status === true) {
        console.log('Solicitação de serviço criada com sucesso!');
        console.log("GG1=>" + JSON.stringify(response.json()));
      } else {
        notify(
          'Falha na criação da ordem de serviço, favor tentar novamente mais tarde.',
          'error',
        );
        console.log("Resultado: " + response.result.resultado)
      }
      */
      setLoading(false);

      navigate('LoggedRoutes', { screen: 'Screen2' });
      notify('Solicitação realizada com sucesso', 'success');
    } catch(e) {
      console.log(e);
    }
  };

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dataColeta;
    setShow(false);
    setDataColeta(currentDate);
    dataColetaInputRef.current.blur();
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const categories = useStateLink(categoriesRef);
  const [categoryIds, setCategoryIds] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Topbar title="Solicitar Coleta" />
      <ScrollView style={styles.scrollView}>
        {/*<Container pb />*/}
        {/*<Container horizontal pt>
          <Photos
            photos={transformToPhotoArray(photos)}
            addPhoto={uri => setPhotos([...photos, uri])}
            removeImage={index => {
              setPhotos(p => [...p.slice(0, index), ...p.slice(index + 1)]);
            }}
          />
        </Container>*/}

        <View style={styles.control}>
          <Photos2 
            photos={photos} 
            addPhoto={uri => setPhotos([...photos, uri])} 
            removeImage={index => {
              setPhotos(p => [...p.slice(0, index), ...p.slice(index + 1)]);
            }}
          />
        </View>

        <View style={styles.control}>
          <RadioButton.Group onValueChange={newValue => setTipoColeta(newValue)} value={tipoColeta}>
            <View style={styles.radioButtonsContainer}>
              <TouchableWithoutFeedback onPress={() => setTipoColeta('0')}>
                <View 
                  style={[
                    styles.radioButtonContainer,
                    {
                      borderColor: tipoColeta == '0' ? colors.lightOrange : colors.transparent,
                      backgroundColor: tipoColeta == '0' ? colors.lightGreen : colors.newBlack
                    }
                  ]}>
                  <RadioButton 
                    value="0" 
                    uncheckedColor={colors.newBlack} 
                    color={colors.lightOrange}
                  />
                  <Text style={{ color: tipoColeta == '0' ? colors.lightOrange : colors.white }}>Doar</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setTipoColeta('1')}>
                <View 
                  style={[
                    styles.radioButtonContainer,
                    {
                      borderColor: tipoColeta == '1' ? colors.lightOrange : colors.transparent,
                      backgroundColor: tipoColeta == '1' ? colors.lightGreen : colors.newBlack
                    }
                  ]}>
                  <RadioButton 
                    value="1" 
                    uncheckedColor={colors.newBlack} 
                    color={colors.lightOrange}
                  />
                  <Text style={{ color: tipoColeta == '1' ? colors.lightOrange : colors.white }}>Vender</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </RadioButton.Group>
        </View>

        {/*<Select
          options={categories.value?.slice(1)}
          selected={categoryIds}
          onPress={(itemId) => {
            if (categoryIds.includes(itemId))
              setCategoryIds(categoryIds.filter(currentValue => itemId !== currentValue))
            else
              setCategoryIds(categoryIds.concat([itemId]));
          }}
        />*/}

        <View style={styles.control}>
          <SelectMultiple 
            items={categories.value?.slice(1)} 
            selectedItems={categoryIds} 
            onSelectItem={item => {
              if (categoryIds.includes(item.id))
                setCategoryIds(categoryIds.filter(currentValue => item.id !== currentValue));
              else
                setCategoryIds(categoryIds.concat([item.id]));
            }}
          />
        </View>

        <View style={styles.control}>
          <Text style={styles.label}>Quantidade aproximada (sacos)</Text>
          <CustomTextInput 
            value={qtdSacosLixo} 
            onChangeText={text => setQtdSacosLixo(text)} 
            editable={true} 
            keyboardType="numeric"
          />
          {/*<RNPTextInput 
            mode="outlined" 
            value={qtdSacosLixo} 
            onChangeText={text => setQtdSacosLixo(text)}
          />*/}
        </View>
        <View style={styles.control}>
          <Text style={styles.label}>Data da coleta</Text>
          <CustomTextInput 
            value={dateFormat(dataColeta, "d/m/Y")}   
            editable={true} 
            keyboardType="numeric" 
            onFocus={() => {
              setShow(true);
            }} 
            showSoftInputOnFocus={false} 
            ref={dataColetaInputRef}
          />          
          {show && (
            <DateTimePicker 
              value={dataColeta} 
              onChange={onChange} 
              minimumDate={incrementDate(new Date(), 0, 3)} 
              maximumDate={incrementDate(new Date(), 1, 0)} 
              locale="pt-br"
            />
          )}
          {/*<RNPTextInput 
            mode="outlined" 
            render={props => 
              <TextInputMask 
                {...props} 
                mask="[00]/[00]/[0000]"
              />
            } 
            value={dataColeta} 
            onChangeText={text => setDataColeta(text)} 
          />*/}
        </View>
        <View style={styles.control}>
          <Text style={styles.label}>Horário da coleta</Text>
          <View style={styles.periodSelectionButtons}>
            <ToggleButton 
              value="manhã" 
              status={periodoColeta === 'manhã' ? 'checked' : 'unchecked'} 
              onPress={val => setPeriodoColeta(val)} 
              icon={sunIcon} 
              color={colors.newBlack} 
              size={Math.round(window.width * 0.23)}
            />
            <ToggleButton 
              value="tarde" 
              status={periodoColeta === 'tarde' ? 'checked' : 'unchecked'} 
              onPress={val => setPeriodoColeta(val)} 
              icon={sunsetIcon} 
              color={colors.newBlack} 
              size={Math.round(window.width * 0.23)}
            />
            <ToggleButton 
              value="noite" 
              status={periodoColeta === 'noite' ? 'checked' : 'unchecked'} 
              onPress={val => setPeriodoColeta(val)} 
              icon={moonIcon} 
              color={colors.newBlack} 
              size={Math.round(window.width * 0.23)}
            />
          </View>
        </View>
        <View style={styles.control}>
          <View style={styles.checkboxContainer}>
            {/*<BouncyCheckbox 
              onPress={(isChecked: boolean) => setUsarEnderecoDiferente(isChecked)} 
              fillColor={colors.lightOrange} 
              unfillColor={colors.lightGreen} 
              iconStyle={styles.checkBox} 
              style={{ 
                backgroundColor: colors.contrast3,
                paddingRight: 0
              }} 
              disableText={true}
            />*/}
            <CheckBox 
              onChange={value => setUsarEnderecoDiferente(value)} 
              checkedColor={colors.lightOrange} 
              uncheckedColor={colors.lightGreen} 
              label="Usar endereço diferente do cadastrado" 
              value={usarEnderecoDiferente} 
            />
            {/*<Text style={styles.checkBoxLabel}>Usar endereço diferente do cadastrado</Text>*/}
          </View>
        </View>
        {/*<Collapsible 
          collapsed={!usarEnderecoDiferente} 
          style={[styles.control, styles.collapsibleContainer]} 
        >*/}
        {usarEnderecoDiferente && <View style={styles.control}>
          <AddressForm
            address={address}
            setAddress={setAddress}
            number={number}
            setNumber={setNumber}
            complement={complement}
            setComplement={setComplement}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            neighborhood={neighborhood}
            setNeighborhood={setNeighborhood} 
            completed={completed} 
            setCompleted={setCompleted} 
            cpf={cpf} 
            setCpf={setCpf} 
            cep={cep} 
            setCep={setCep}
          />
        </View>}
        {/*</Collapsible>*/}
        <View style={styles.control}>
          <Text style={styles.label}>Observações</Text>
          <TextInput
            value={comentario}
            onChangeText={text => setComentario(text)} 
            multiline={true}
            numberOfLines={6} 
            editable={true} 
            style={{
              backgroundColor: colors.lightGreen,
              textAlignVertical: 'top',
              color: colors.white,
              paddingLeft: '5%'
            }}
          />
        </View>
        <View style={[styles.control, styles.buttonContainer]}>
          <AppButton
            onPress={submit}
            title="ENVIAR SOLICITAÇÃO"
            fullWidth
            loading={loading}
            backgroundColor={colors.newBlack} 
            style={{
              elevation: 0
            }} 
            disabled={photos.length == 0}
          />
        </View>
      </ScrollView>
      <ImagePicker callback2={uri => setPhotos([...photos, uri])} />
    </>
  );
};

export default Request;

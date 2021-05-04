import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableNativeFeedback,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Input} from 'pages/Denunciation/style';
import TextInput from 'components/Input';
import {Text, IconButton, TouchableRipple} from 'react-native-paper';
import Container, {ContainerTop} from 'components/Container';
import request from 'util/request';
import {colors} from 'src/theme';
import {FCWithLoggedStackNavigator} from 'pages/LoggedStackNavigator';
import pickImage from 'util/pickImage';
import Button from 'components/Button';
import notify from 'util/notify';
import {useStateLink} from '@hookstate/core';
import dateFormat from 'util/dateFormat';

import Geolocation from 'react-native-geolocation-service';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import AddressForm from 'src/components/AddressForm';

import imgBanner from 'img/banner_.png';
import LogoPreta from 'img/logo_branca_uzeh.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#F4F1F0',
    marginHorizontal: 0,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  textStyleF: {
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'white',
    textAlign: 'center',
    padding: 3,
  },
  nview: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  radioButtonGroupContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff0000',
    justifyContent: 'center',
    width: '30%',
    borderRadius: 30,
    padding: 10,
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
    borderRadius: 8,
  },
  dataColetaImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
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

const Photos: React.FC<PhotosProps> = ({photos, addPhoto, removeImage}) => (
  <Container horizontal>
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
                  width: '50%',
                  paddingRight: 10,
                  paddingBottom: 10,
                }}>
                <TouchableRipple
                  style={{
                    width: '100%',
                    height: 100,
                    borderRadius: 5,
                    borderColor: colors.black,
                    borderWidth: 1,
                  }}
                  onPress={() => {
                    pickImage(addPhoto);
                  }}>
                  <View>
                    <IconButton
                      icon="image-plus"
                      style={{
                        width: '100%',
                        height: '100%',
                        marginLeft: 0,
                        marginTop: -11,
                      }}
                      size={30}
                      color={colors.black}
                    />
                    <Text
                      style={{
                        width: '100%',
                        textAlign: 'center',
                        fontSize: 15,
                        position: 'absolute',
                        top: 60,
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
                  width: '50%',
                  overflow: 'hidden',
                  paddingRight: 10,
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
  </Container>
);

const Denunciation: FCWithLoggedStackNavigator<'Denunciation'> = ({
  navigation: {navigate},
}) => {
  const [selectedCategory, setSelectedCategory] = useState<number | 'default'>(
    'default',
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<
    number | 'default'
  >('default');
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [dataColeta, setDataColeta] = useState(new Date());
  const [usarEnderecoDiferente, setUsarEnderecoDiferente] = useState(false);
  const [comentario, setComentario] = useState('');
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  //const categoryIds = useStateLink(categoryIdsRef);
  const [periodoColeta, setPeriodoColeta] = useState('manhã');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [tipoColeta, setTipoColeta] = useState('0');

  const submit = async () => {
    type BodyFormData = Extract<
      Exclude<Parameters<typeof request.authPostGeneric>['1'], undefined>[0],
      {filename?: string}
    >;
    const photoObject: Array<BodyFormData> = [];

    photos.forEach(async i => {
      photoObject.push({
        name: 'file[]',
        filename: 'image.jpg',
        type: 'image/jpg',
        data: i,
      });
    });

    setLoading(true);
    const response = await request.authPostGeneric('CollectionOrders/insert', [
      {
        name: 'quantity_garbage_bags',
        data: title,
      },
      {
        name: 'datetime_collection_ordes',
        data: dateFormat(dataColeta, 'Y-m-d'),
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
        name: 'period',
        data: periodoColeta,
      },
      {
        name: 'use_person_address',
        data: usarEnderecoDiferente ? '' : usarEnderecoDiferente.toString(),
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
      ...photoObject,
    ]);
    setLoading(false);

    if (response && response.info().status === 200) {
      notify('Solicitação de serviço criada com sucesso!', 'success');
    } else {
      notify(
        'Falha na criação da ordem de serviço, favor tentar novamente mais tarde.',
        'error',
      );
    }

    navigate('Services');
  };

  return (
    <>
      <ContainerTop>
        <ImageBackground
          source={imgBanner}
          style={{
            width: '100%',
            // height: 160,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Container
            pb
            // padding={30}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}>
            <Image
              source={LogoPreta}
              resizeMode="contain"
              style={{
                width: 150,
                height: 150,
                marginTop: -30,
                marginBottom: -50,
              }}
            />
            <TouchableOpacity
              onPress={() => navigate('Home')}
              style={{
                position: 'absolute',
                alignSelf: 'flex-start',
                marginLeft: '5%',
                alignContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                color={colors.white}
                size={40}
              />
            </TouchableOpacity>
            <Text style={styles.textStyleF}>Denúncias</Text>
          </Container>
        </ImageBackground>
      </ContainerTop>
      <ScrollView style={styles.scrollView}>
        <Container pb />
        <Container horizontal pt>
          <Container style={{flexDirection: 'row'}}>
            <View>
              <Text
                style={{
                  marginBottom: 7,
                  marginRight: 10,
                  fontSize: 20,
                  fontFamily: 'Manjari-Bold',
                  width: '85%',
                  // backgroundColor: '#f00'
                }}>
                Selecione as fotos para anexar à denúncia:
              </Text>
            </View>
          </Container>
          <Photos
            photos={transformToPhotoArray(photos)}
            addPhoto={uri => setPhotos([...photos, uri])}
            removeImage={index => {
              setPhotos(p => [...p.slice(0, index), ...p.slice(index + 1)]);
            }}
          />
        </Container>

        <Container>
          <Input
            placeholder="Título"
            style={{
              // backgroundColor: '#fff',
              marginHorizontal: '3%',
              borderRadius: 8,
            }}
            type="none"
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </Container>

        {/* <Container horizontal vertical>
        <Button
          onPress={() => {}}
          text="Adicionar Localização"
          fullWidth
          loading={loading}
          backgroundColor={colors.newColor}
        />
      </Container> */}

        <Container horizontal pt>
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
          />
        </Container>
        <Container horizontal vertical>
          <Text>Incluir comentário</Text>
          <TextInput value={comentario} setValue={setComentario} />
        </Container>
        <Container horizontal vertical>
          <Button
            onPress={submit}
            text="FAZER DENÚNCIA"
            fullWidth
            loading={loading}
            backgroundColor={colors.red}
          />
        </Container>
      </ScrollView>
    </>
  );
};

export default Denunciation;

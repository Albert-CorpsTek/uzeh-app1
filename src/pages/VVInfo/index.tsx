import React, {useEffect, useRef, useState} from 'react';
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
import {TextInputMask} from 'react-native-masked-text';
import {GroupControl, Input} from 'pages/VVInfo/style';
import TextInput from 'components/Input';
import {Text, IconButton, TouchableRipple, Checkbox} from 'react-native-paper';
import Container, {ContainerTop} from 'components/Container';
import request from 'util/request';
import {colors} from 'src/theme';
import {FCWithLoggedStackNavigator} from 'pages/LoggedStackNavigator';
import pickImage from 'util/pickImage';
import Button from 'components/Button';
import {useStateLink} from '@hookstate/core';
import Grid3 from 'src/components/Grid3.js';

import imgBanner from 'img/banner_2.png';
import LogoPreta from 'img/logo_branca_uzeh.png';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

import GlobalContext from 'src/context';

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
    fontFamily: 'Manjari-bold',
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
    paddingBottom: -5,
  },
  categoriesContainer: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    // backgroundColor: 'red',
  },
  loadCategories: {
    flexDirection: 'row',
  },
  loadItemIcon: {
    width: 75,
    height: 75,
    justifyContent: 'center',
  },
  loadCategoriesItem: {
    flexDirection: 'column',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loadCategoriesImage: {
    alignItems: 'center',
  },
});

const {
  cadastro: {categoryIdsVucovucoRef},
  categoryVucovuco: {categoriesVucovucoRef, fetchCategoriesVucovuco},
} = GlobalContext;
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

const VVInfo: FCWithLoggedStackNavigator<'VVInfo'> = ({
  navigation: {navigate},
}) => {
  const [value, setValue] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [comentario, setComentario] = useState('');
  const [title, setTitle] = useState('');

  const [categoriesVV, setCategoriesVV] = useState([]);
  const [categories, setCategories] = useState('outros');
  const categoryIdsVucovuco = useStateLink(categoryIdsVucovucoRef);

  useEffect(() => {
    loadingCategories();
  }, []);

  const priceRef = useRef(null);

  const submit = async () => {
    /* type BodyFormData = Extract<
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
    const response = await request.authPostGeneric('', []);
    setLoading(false); */
  };

  const loadingCategories = async () => {
    try {
      const response = await request.get('categoriesvucovuco/getAll');
      setCategoriesVV(response.result);
    } catch (e) {
      console.log(e);
    }
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
              onPress={() => navigate('VVAddEdit')}
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
            <Text style={styles.textStyleF}>
              Vuco Vuco - Cadastro/Edição de Anúncios
            </Text>
          </Container>
        </ImageBackground>
      </ContainerTop>
      <ScrollView style={styles.scrollView}>
        <Container pb />
        <Container horizontal pt>
          <View>
            <Text
              style={{
                marginBottom: 7,
                marginRight: 10,
                fontSize: 20,
                fontFamily: 'Manjari-Bold',
                width: '90%',
                // backgroundColor: '#f00'
              }}>
              Selecione as fotos para o anúncio:
            </Text>
          </View>
          <Photos
            photos={transformToPhotoArray(photos)}
            addPhoto={uri => setPhotos([...photos, uri])}
            removeImage={index => {
              setPhotos(p => [...p.slice(0, index), ...p.slice(index + 1)]);
            }}
          />
        </Container>

        <GroupControl>
          <Input
            placeholder="Título"
            style={{
              // backgroundColor: '#fff',
              marginHorizontal: '3%',
              borderRadius: 8,
            }}
            value={title}
            onChangeText={text => setTitle(text)}
            returnKeyLabel="next"
            onSubmitEditing={() => priceRef.current._inputElement.focus()}
          />
        </GroupControl>
        <GroupControl>
          <TextInputMask
            ref={priceRef}
            placeholder="Preço"
            keyboardType="decimal-pad"
            type={'money'}
            customTextInput={Input}
            style={{
              // backgroundColor: '#7ff',
              marginHorizontal: '3%',
              borderRadius: 8,
            }}
            value={value}
            onChangeText={price => setValue(price)}
            onSubmitEditing={() => {}}
          />
        </GroupControl>
        <Container horizontal vertical>
          <Text>Descrição:</Text>
          <TextInput value={comentario} setValue={setComentario} />
        </Container>

        <Container style={styles.categoriesContainer}>
          {/* Categoria 1 */}
          <Container
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              alignContent: 'flex-start',
            }}>
            <Text>Selecione as Categorias:</Text>
            {/* Código das categorias do Vuco Vuco */}
            <Grid3
              data={categoriesVV}
              value={categories}
              onPress={setCategories}
            />
          </Container>
        </Container>

        <Container horizontal vertical>
          <Button
            onPress={submit}
            text="SALVAR ANÚNCIO"
            fullWidth
            loading={loading}
            backgroundColor={'#8d2fee'}
          />
        </Container>
      </ScrollView>
    </>
  );
};

export default VVInfo;

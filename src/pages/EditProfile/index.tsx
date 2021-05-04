import React, {useState, useEffect} from 'react';
import { Avatar, Button, Text, ActivityIndicator, TextInput } from 'react-native-paper';
import { TouchableOpacity, View, ScrollView } from 'react-native';
//import TextInput from 'components/InputProfile';
import UserProfile from 'img/avatar.png';
import { FCWithLoggedStackNavigator } from 'pages/LoggedStackNavigator';
import GlobalContext from 'src/context';
import { useStateLink } from '@hookstate/core';
import pickImage from 'util/pickImage';
import Container from 'components/Container';
import { colors } from 'src/theme';
import styles from './style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import request from 'util/request';
import notify from 'util/notify';
import {TextInputMask} from 'react-native-masked-text';
import emailValidator from 'email-validator';
import InputWarning from 'components/InputWarning';
import Topbar from 'components/Topbar';
import AddressPicker from 'components/AddressPicker';
import Geocoder from 'react-native-geocoding';

type Request<T> = {
  status: true;
  result: T;
} | {
  status: false;
  result: {
    message: string;
  };
};

const {
  profile: {
    imageProfileRef,
    uploadImage,
    fetchImageProfile,
    loadingImageProfileRef,
  },
  auth: {
    authStateRef
  }
} = GlobalContext;

const EditProfile: FCWithLoggedStackNavigator<'EditProfile'> = ({
  navigation: { navigate },
}) => {
  const authState = useStateLink(authStateRef);

  interface Person {
    name: string;
    number_contact: string;
    address: string;
    email: string;
    number: String;
    district: String;
    complement: String;
    city: string;
    state: string;
    cep: string;
  }

  const [person, setPerson] = useState<Person | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await request.authGet<Request<Person>>("Clients/getClientProfile");
      if(response.status === true) {
        setPerson(response.result);
      } else {
        notify(response.result.message, 'error');
      }
    } catch(e) {
      notify(e, 'error');
    }
  };

  const submit = async () => {
    setLoading(true);
    try {
      const response = await request.authPost("Clients/updateClient", person);
      setLoading(false);
      if(response.status === true) {
        const person = response.result.person;
        authState.nested.user.nested?.name.set(person.name);
        authState.nested.user.nested?.number_contact.set(person.number_contact);
        authState.nested.user.nested?.address.set(person.address);
        authState.nested.user.nested?.email.set(person.email);
        authState.nested.user.nested?.cep.set(person.cep);
        authState.nested.user.nested?.latitude.set(person.latitude);
        authState.nested.user.nested?.longitude.set(person.longitude);
        navigate('Profile');
      } else {
        notify(response.result.msg_erro, 'error');
      }
    } catch(e) {
      notify(e, 'error');
      console.log("Que merda é essa!");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  /*
  if (person === undefined) {
    return null;
  }
  */

  return (
    <>
    <Topbar title="Editar perfil" />
    <ScrollView style={styles.scrollView}>
      {person !== undefined && <View style={styles.container}>
        <View style={styles.containerName}>
          <Text style={styles.text}>Nome</Text>
        </View>
        <TextInput 
          value={person.name} 
          onChangeText={text => {
            const copy = Object.assign({}, person);
            copy.name = text;
            setPerson(copy);
          }}
        />
        <View style={styles.containerName}>
          <Text style={styles.text}>Email</Text>
        </View>
        <TextInput 
          value={person.email} 
          onChangeText={text => {
            const copy = Object.assign({}, person);
            copy.email = text;
            setPerson(copy);
          }}
        />
        <View style={styles.containerName}>
          <Text style={styles.text}>Telefone</Text>
        </View>
        <TextInput 
          value={person.number_contact} 
          onChangeText={text => {
            const copy = Object.assign({}, person);
            copy.number_contact = text;
            setPerson(copy);
          }} 
          render={props => 
            <TextInputMask 
              {...props}
              type={'cel-phone'}
            />
          }
        />
        <View style={styles.containerName}>
          <Text style={styles.text}>CEP</Text>
        </View>
        <TextInput 
          value={person.cep} 
          onChangeText={text => {
            const copy = Object.assign({}, person);
            copy.cep = text;
            setPerson(copy);
          }}
        />
        <View style={styles.containerName}>
          <Text style={styles.text}>Endereço</Text>
        </View>
        <TextInput 
          value={person.address} 
          onChangeText={text => {
            const copy = Object.assign({}, person);
            copy.address = text;
            setPerson(copy);
          }}
        />
        <View style={styles.containerName}>
          <Text style={styles.text}>Número</Text>
        </View>
        <TextInput 
          value={person.number} 
          onChangeText={text => {
            const copy = Object.assign({}, person);
            copy.number = text;
            setPerson(copy);
          }}
        />
        <View style={styles.containerName}>
          <Text style={styles.text}>Bairro</Text>
        </View>
        <TextInput 
          value={person.district} 
          onChangeText={text => {
            const copy = Object.assign({}, person);
            copy.district = text;
            setPerson(copy);
          }}
        />
        <View style={styles.containerName}>
          <Text style={styles.text}>Complemento</Text>
        </View>
        <TextInput 
          value={person.complement} 
          onChangeText={text => {
            const copy = Object.assign({}, person);
            copy.complement = text;
            setPerson(copy);
          }}
        />
        <View style={styles.containerName}>
          <Text style={styles.text}>Cidade</Text>
        </View>
        <TextInput 
          value={person.city} 
          onChangeText={text => {
            const copy = Object.assign({}, person);
            copy.city = text;
            setPerson(copy);
          }}
        />
        <View style={styles.containerName}>
          <Text style={styles.text}>Estado</Text>
        </View>
        <TextInput 
          value={person.state} 
          onChangeText={text => {
            const copy = Object.assign({}, person);
            copy.state = text;
            setPerson(copy);
          }}
        />
        {/*<AddressPicker 
          style={{
            width: '100%',
            height: '25%'
          }}
        />*/}
        <View>
          <View style={styles.divwhitebtn} />
          <Button 
           style={styles.btn} 
           onPress={submit} 
           loading={loading}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 14,
              }}>
              SALVAR
          </Text>
          </Button>
        </View>
        <View style={styles.divwhite} />
      </View>}
    </ScrollView>
    </>
  );
};

export default EditProfile;

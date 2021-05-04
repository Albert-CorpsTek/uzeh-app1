import MapView, { Marker, LatLng } from 'react-native-maps';
import React, { useState } from 'react';
import { View, StyleSheet, YellowBox } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const styles = StyleSheet.create({
  map: {
    width: '100%',
    flex: 3
  },
  addressView: {
    flex: 1
  }
});

class AddressPicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: undefined,
      selectedAddress: undefined
    };
    this.getAddress = this.getAddress.bind(this);
    Geocoder.init('AIzaSyCDsc9pmM4xfjWcIyNokhgbrd5SYQDiz7o');
  }

  getAddress(coordinate) {
    Geocoder.from({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude
    })
    .then(json => {
      const result = json.results[0];
      this.setState({
        selectedAddress: {
          number: result.address_components[0].short_name,
          address: result.address_components[1].short_name,
          district: result.address_components[2].short_name,
          city: result.address_components[3].short_name,
          state: result.address_components[4].short_name,
          cep: result.address_components[6].short_name,
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng
        }
      });
    })
    .catch(error => console.warn(error));
  };

  render() {
    return (
      <View style={this.props.style}>
        <GooglePlacesAutocomplete 
          placeholder="Buscar" 
          onPress={(data, details = null) => {
            console.log(data, details);
          }}
          query={{
            key: 'AIzaSyCDsc9pmM4xfjWcIyNokhgbrd5SYQDiz7o',
            language: 'en',
          }}
        />
        <MapView 
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }} 
          style={styles.map} 
          onPress={e => {
            this.setState({selectedLocation: e.nativeEvent.coordinate});
            this.getAddress(e.nativeEvent.coordinate);
          }}
        >
          {typeof this.state.selectedAddress !== 'undefined' && <Marker 
            coordinate={{
              latitude: this.state.selectedAddress.latitude,
              longitude: this.state.selectedAddress.longitude
            }}
          />}
        </MapView>
        <View>
          <Text>Address</Text>
        </View>
      </View>
    );
  }
};

export default AddressPicker;
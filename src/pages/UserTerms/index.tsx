import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Container from 'components/Container';
import {FCWithLoggedStackNavigator} from 'pages/LoggedStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {colors} from 'src/theme';

const UserTerms: FCWithLoggedStackNavigator<'UserTerms'> = ({
  navigation: {navigate},
}) => {
  const navegar = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#F4F1F0',
    },
    title: {
      marginLeft: '10%',
      paddingTop: 30,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      width: '90%',
    },
    text: {
      alignContent: 'center',
      textAlign: 'justify',
      fontSize: 16,
      paddingTop: 50,
      paddingLeft: 30,
      paddingRight: 30,
    },
    top: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      paddingTop: 30,
      width: '90%',
      margin: 10,
    },
  });
  return (
    <Container style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>TERMOS DE USO</Text>
        <TouchableOpacity>
          <FontAwesomeIcon
            style={{marginRight: 15}}
            icon={faChevronLeft}
            color={colors.black}
            size={40}
            onPress={() => navigate('Home')}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{flexGrow: 1}}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          sollicitudin arcu sit amet consequat aliquet. Phasellus quis arcu
          nisl. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. Fusce commodo ante a aliquet
          gravida. Maecenas ut dui tempor, tincidunt ipsum nec, rhoncus risus.
          Aenean rhoncus elit non massa mattis, a imperdiet lorem euismod. Ut in
          efficitur diam. Etiam ut bibendum erat. Vivamus cursus elit sed lorem
          blandit, ut congue lacus bibendum. Sed ut malesuada turpis, vel
          vehicula neque. Nulla rhoncus tempus sodales. Nam ullamcorper, nisl
          eget porttitor molestie, mauris libero pretium lectus, et rhoncus ante
          justo.
        </Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          sollicitudin arcu sit amet consequat aliquet. Phasellus quis arcu
          nisl. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. Fusce commodo ante a aliquet
          gravida. Maecenas ut dui tempor, tincidunt ipsum nec, rhoncus risus.
          Aenean rhoncus elit non massa mattis, a imperdiet lorem euismod. Ut in
          efficitur diam. Etiam ut bibendum erat. Vivamus cursus elit sed lorem
          blandit, ut congue lacus bibendum. Sed ut malesuada turpis, vel
          vehicula neque. Nulla rhoncus tempus sodales. Nam ullamcorper, nisl
          eget porttitor molestie, mauris libero pretium lectus, et rhoncus ante
          justo.
        </Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          sollicitudin arcu sit amet consequat aliquet. Phasellus quis arcu
          nisl. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. Fusce commodo ante a aliquet
          gravida. Maecenas ut dui tempor, tincidunt ipsum nec, rhoncus risus.
          Aenean rhoncus elit non massa mattis, a imperdiet lorem euismod. Ut in
          efficitur diam. Etiam ut bibendum erat. Vivamus cursus elit sed lorem
          blandit, ut congue lacus bibendum. Sed ut malesuada turpis, vel
          vehicula neque. Nulla rhoncus tempus sodales. Nam ullamcorper, nisl
          eget porttitor molestie, mauris libero pretium lectus, et rhoncus ante
          justo.
        </Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          sollicitudin arcu sit amet consequat aliquet. Phasellus quis arcu
          nisl. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. Fusce commodo ante a aliquet
          gravida. Maecenas ut dui tempor, tincidunt ipsum nec, rhoncus risus.
          Aenean rhoncus elit non massa mattis, a imperdiet lorem euismod. Ut in
          efficitur diam. Etiam ut bibendum erat. Vivamus cursus elit sed lorem
          blandit, ut congue lacus bibendum. Sed ut malesuada turpis, vel
          vehicula neque. Nulla rhoncus tempus sodales. Nam ullamcorper, nisl
          eget porttitor molestie, mauris libero pretium lectus, et rhoncus ante
          justo.
        </Text>
      </ScrollView>
    </Container>
  );
};
export default UserTerms;

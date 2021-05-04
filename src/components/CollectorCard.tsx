import React, {useState} from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import avatarImg from 'img/avatar.png';
import {Avatar, Title, Button} from 'react-native-paper';
import notify from 'util/notify';
import {colors} from 'src/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.darkGray,
    paddingVertical: '5%'
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center'
  },
  infoContainer: {
    flex: 3
  }
});

const CollectorCard = ({collector, style}) => {

  const [sendingWhatsApp, setSendingWhatsApp] = useState(false);

  const sendWhatsApp = () => {
    setSendingWhatsApp(true);
    Linking.canOpenURL("whatsapp://send?text=Fazendo um teste no uzeh.").then(supported => {
      setSendingWhatsApp(false);
      if(supported) {
        return Linking.openURL(`whatsapp://send?text=Fazendo um teste no uzeh.&phone=${collector.number_contact}`);
      } else {
        notify("Este dispositivo não possui o WhatsApp instalado", 'error');
      }
    });
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.avatarContainer}>
        <Avatar.Image source={collector.image ? collector.image : avatarImg} />
      </View>
      <View style={styles.infoContainer}>
        <Title>{collector.name}</Title>
        <Button
          icon={require('../../assets/images/whatsapp-brands.png')}
          color={colors.contrast2}
          mode="contained"
          compact={true}
          uppercase={false}
          onPress={sendWhatsApp} 
          loading={sendingWhatsApp}
          style={{
            alignSelf: 'baseline'
          }}
        >
          WhatsApp
        </Button>
      </View>
    </View>
  );
};

export default CollectorCard;
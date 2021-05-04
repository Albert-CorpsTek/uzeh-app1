import { Linking } from 'react-native';

export const whatsapp = (text, phone) => {
  Linking.openURL(`whatsapp://send?text=${text}&phone=55${phone}`);
};

export const checkWhatsapp = async (callback) => {
  Linking.canOpenURL("whatsapp://send?text=oi").then(supported => callback(supported));
};
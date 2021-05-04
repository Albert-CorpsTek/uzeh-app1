import { PermissionsAndroid } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import GlobalContext from 'src/context';

const pickImage = async (callback: (uri: string) => void) => {
  await PermissionsAndroid.requestMultiple(['android.permission.CAMERA', 'android.permission.WRITE_EXTERNAL_STORAGE']);
  /*
  ImagePicker.showImagePicker({
    allowsEditing: true,
    cameraType: 'front',
    cancelButtonTitle: 'Cancelar',
    chooseFromLibraryButtonTitle: 'Escolher da galeria',
    takePhotoButtonTitle: 'Tirar uma foto',
    title: 'Selecione uma foto',
    quality: 0.7,
    maxWidth: 518,
    maxHeight: 518
  }, (response) => {
    if (response.didCancel) {
      // console.log('User cancelled image picker');
    } else if (response.error) {
      // console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      // console.log('User tapped custom button: ', response.customButton);
    } else {
      callback(response.uri);
    }
  });
  */
  const {
    pickImage: {
      visibleRef,
    },
  } = GlobalContext;

  const visible = visibleRef.access();
  visible.set(true);
};

export default pickImage;

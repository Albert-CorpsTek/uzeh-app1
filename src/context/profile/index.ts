import request from 'util/request';
import { createStateLink } from '@hookstate/core';
import FormData from 'form-data';
import Profile from 'src/interfaces/Profile';
import editPassword from './editPassword';

interface Request<T> {
  status: boolean;
  result: T;
}

const loadingImageProfileRef = createStateLink(false);
const imageProfileRef = createStateLink<string | undefined>(undefined);
const body = new FormData();
body.append('perfil', {

});
const uploadImage = async (uri: string) => {
  await request.authUploadImage2('Clients/uploadProfile', [{
    name: 'perfil',
    filename: 'perfil-photo.jpg',
    type: 'image/jpg',
    data: uri,
  }]);
};
const loadingProfileRef = createStateLink(true);
const profileRef = createStateLink<Profile | undefined>(undefined);
const fetchProfile = async () => {
  const loading = loadingProfileRef.access();
  loading.set(true);
  const response = await request.authPost<Request<Profile>>(
    'People/getPerfilClient',
  );
  loading.set(false);
  profileRef.access().set(response.result);
};

const fetchImageProfile = async () => {
  loadingImageProfileRef.access().set(true);
  const response = await request.authGeneric2('Clients/getImageProfile');
  if (response.info().status === 200) {
    imageProfileRef.access().set(`file://${response.path()}`);
  }
  loadingImageProfileRef.access().set(false);
};

const editProfile = async (newData) => {
  const response = await request.authPost('Clients/updateClient', newData);
  if (response.status === true) {
    fetchProfile();
  }
};

export default {
  fetchProfile,
  fetchImageProfile,
  imageProfileRef,
  loadingImageProfileRef,
  uploadImage,
  profileRef,
  loadingProfileRef,
  editPassword,
  editProfile,
};

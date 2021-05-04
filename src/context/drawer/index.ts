import {createStateLink} from '@hookstate/core';
import request from 'util/request';
import {RootLoggedStackParamList} from 'pages/LoggedStackNavigator';
import {Perfil} from 'interfaces/Perfil';
import {Request} from 'interfaces/Request';

const userRef = createStateLink<undefined | Perfil>(undefined);
const perfilPhotoRef = createStateLink<undefined | null | string>(undefined);
const actualRouteRef = createStateLink<
  keyof RootLoggedStackParamList | undefined
>(undefined);

const fetchPerfilPhoto = async () => {
  const response = await request.authGeneric2('Clients/getImageProfile');
  if (response.info().status === 200) {
    perfilPhotoRef.access().set(`file://${response.path()}`);
  }
};
const fetchUser = async () => {
  const response = await request.authPost<Request<Perfil>>(
    'People/getPerfilClient',
  );
  if (response.status === true) {
    userRef.access().set(response.result);
  }
};

export default {
  fetchUser,
  userRef,
  perfilPhotoRef,
  fetchPerfilPhoto,
  actualRouteRef,
};

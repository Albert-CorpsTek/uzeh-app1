/* eslint-disable no-console */
import FormData from 'form-data';
import urljoin from 'url-join';
import GlobalContext from 'src/context'
import { useStateLinkUnmounted } from '@hookstate/core';
import RNFetchBlob from 'rn-fetch-blob';

const API_URL = 'http://192.168.0.217/uzeh-api';

const getAuthorizationHeader = () => {
  const authState = useStateLinkUnmounted(GlobalContext.auth.authStateRef);
  const headers = authState.value.token !== undefined ? {
    Authorization: `Bearer ${authState.value.token}`,
  } : undefined;

  return { headers };
};

const get = async<T>(path: string): Promise<T> => {
  const url = urljoin(API_URL, path);
  const method = 'GET';
  const request = await fetch(url, {
    method,
  });

  const response = await request.json();

  console.log(response);

  return response;
};

const authGet = async <T>(path: string): Promise<T> => {
  const url = urljoin(API_URL, path);
  const method = 'GET';
  const { headers } = getAuthorizationHeader();
  const request = await fetch(url, {
    method,
    headers,
  });

  const response = await request.json();

  console.log(response);

  return response;
};

interface BodyType<T> {
  [s: string]: T;
}

type BodyFormData = BodyType<string | {
  uri: string;
  type: string;
  name: string;
}>;

type BodyUploadImage = {
  data: string;
  type?: string;
  name: string;
  filename?: string;
};

type BodyString = BodyType<string>;

const post = async <T>(path: string, formData?: BodyFormData): Promise<T> => {
  
  const body = new FormData();
  if (formData) {
    Object.keys(formData).forEach((i) => {
      body.append(i, formData[i]);
    });
  }
  const url = urljoin(API_URL, path);
  
  const method = 'POST';
  const request = await fetch(url, {
    method,
    body: formData && body,
  });
  console.log(request);
  const response = await request.json();

  console.log(response);

  return response;
};

const authPost = async <T>(path: string, formData?: BodyFormData): Promise<T> => {
  const body = new FormData();
  if (formData) {
    Object.keys(formData).forEach((i) => {
      body.append(i, formData[i]);
    });
  }
  const url = urljoin(API_URL, path);
  const method = 'POST';

  const { headers } = getAuthorizationHeader();
  const request = await fetch(url, {
    method,
    body: formData && body,
    headers,
  });

  console.log(`req ${path}`, formData, request);

  const response = await request.json();

  console.log(`resp ${path}`, response);

  return response;
};

const authPostGeneric = async (
  path: string,
  formData: Array<{name: string; data: string} | BodyUploadImage>,
) => {
  const { headers } = getAuthorizationHeader();
  const method = 'POST';
  const url = urljoin(API_URL, path);
  const newFormData = formData.map((i) => {
    if ('filename' in i) {
      const { data, ...rest } = i;
      return {
        ...rest,
        data: RNFetchBlob.wrap(data),
      };
    }
    return i;
  });
  const response = await RNFetchBlob.config({
    fileCache: true,
  }).fetch(method, url, headers, newFormData);
  return response;
};

const authPostImage = async (path: string, formData?: BodyString) => {
  const { headers } = getAuthorizationHeader();
  const method = 'POST';
  const url = urljoin(API_URL, path);
  const body = [] as { name: string; data: string }[];
  if (formData) {
    Object.keys(formData).forEach((i) => {
      body.push({ name: i, data: formData[i] });
    });
  }
  const response = await RNFetchBlob.config({
    fileCache: true,
  }).fetch(method, url, headers, body);
  const { status } = response.info();
  if (status === 200) {
    return `file://${response.path()}`;
  }

  return null;
};

const authUploadImage = async (path: string, body: BodyUploadImage[]) => {
  const { headers } = getAuthorizationHeader();
  const method = 'POST';
  const url = urljoin(API_URL, path);
  const response = await RNFetchBlob.config({
    fileCache: true,
  }).fetch(method, url, headers, body.map((i) => ({
    ...i,
    data: RNFetchBlob.wrap(i.data),
  })));
  const { status } = response.info();
  if (status === 200) {
    return true;
  }

  return false;
};

const authGeneric = async (path: string, body?: FormData) => {
  const url = urljoin(API_URL, path);
  const method = 'POST';

  const { headers } = getAuthorizationHeader();
  const request = await RNFetchBlob.config({
    fileCache: true,
  }).fetch(method, url, headers, body);

  return request;
};

export default {
  get,
  authGet,
  post,
  authPost,
  authPostImage,
  authUploadImage,
  authPostGeneric,
  authGeneric,
};

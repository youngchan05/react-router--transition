import axios from 'axios';
import { apiList } from './apiList';
import { SERVER_URL } from './Constants';

import { getItem } from '../common/StorageUtils';

const RestApi = [];
apiList.forEach((item) => {
  RestApi[item.api_name] = {};
  RestApi[item.api_name].url = SERVER_URL + item.api;
  RestApi[item.api_name].method = item.method;
});


const processResponse = (res) => {
  try {
    // 통신 오류 서버내에서 데이터 오류
    if (res.status !== 200) {
      console.log('통신 에러', res);
      const obj = {
        status: res.status,
        results: res.statusText,
      };
      return obj;
    }
    const { data } = res;
    return data;
  } catch (error) {
    console.log('processResponse');
    return processErrorData(error);
  }
};

const processErrorData = (err) => {
  console.error('processErrorData 서버가 불안정합니다.', err);
  const obj = {
    status: -10000,
    results: err,
  };
  return obj;
};

export const Get = async (url, config = {}) => {
  try {
    const res = await axios.get(url, config);
    return processResponse(res);
  } catch (error) {
    return processErrorData(error);
  }
};

export const Post = async (url, config, data = {}) => {
  try {
    const res = await axios.post(url, data, config);

    return processResponse(res);
  } catch (error) {
    return processErrorData(error);
  }
};

export const Put = async (url, config, data = {}) => {
  try {
    const res = await axios.put(url, data, config);

    return processResponse(res);
  } catch (error) {
    return processErrorData(error);
  }
};

export const Delete = async (url, config, data = {}) => {
  try {
    const res = await axios.delete(url, config);
    return processResponse(res);
  } catch (error) {
    return processErrorData(error);
  }
};

export const getDataByApiName = async (apiName, config = {}) => {
  let res;
  // const RestApi = getItem('RestList');
  console.log(RestApi ,'RestApi')
  const userData = getItem('admin');
  if (userData
    && apiName !== 'adm_login_admin'
  ) {
    config.headers = {
      id: userData.id,
      token: userData.token,
    };
  }
  const api = RestApi ? RestApi[`${apiName}`] : undefined;
  if (api === undefined) return 'api명이 잘못되었거나 없는 api';
  if (api === 'none_data') return 'api명이 잘못되었거나 없는 api';
  if (api.method === 'GET') res = await Get(api.url, config);
  else if (api.method === 'POST') res = await Post(api.url, config);
  else if (api.method === 'PUT') res = await Put(api.url, config);
  else if (api.method === 'DELETE') res = await Delete(api.url, config);
  if (res.status === 200) return res;
  return res;
};

export const getDataByUrl = async (url, config = {}, method = 'GET') => {
  let res;
  const userData = getItem('admin');
  if (userData) {
    config.headers = {
      id: userData.uid,
      token: userData.token,
    };
    if (method === 'GET') res = await Get(url, config);
    else if (method === 'POST') res = await Post(url, config);
    else if (method === 'PUT') res = await Put(url, config);
    else if (method === 'DELETE') res = await Delete(url, config);
    if (res.status === 200) return res;
  } else {
    return '유저정보가 없습니다.';
  }
};

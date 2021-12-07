import axios from './axiosBase';
import {
  getItem,
  setItem,
} from '../common/StorageUtils';
import { SERVER_URL, PROJECT_NAME } from './Constants';


async function InitRestList() {
  const api = getItem('RestAPI');
  if (api && api.accuse_count) {
    return true;
  }
  try {
    const API = {};
    // alert('InitRestList');
    const res = await axios.get(`${SERVER_URL}/${PROJECT_NAME}/restapi/api_list`).then(result => result.data.results);
    // alert(res);
    res.forEach((item) => {
      API[item.api_name] = {};
      API[item.api_name].url = SERVER_URL + item.api;
      API[item.api_name].method = item.method;
    });
    setItem('RestList', API);
    console.log('InitRestList');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// InitRestList();

export default InitRestList;

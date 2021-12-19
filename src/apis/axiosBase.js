import axios from 'axios';
import { SERVER_URL, PROJECT_NAME } from './Constants';

export const userCheck = () => {
  const userAuth = sessionStorage.getItem('userData')
    ? JSON.parse(sessionStorage.getItem('userData'))
    : false;
  const token = userAuth ? userAuth.token : 'NOT_HAVE_TOKEN';
  const id = userAuth ? userAuth.user_base.email : 'NOT_HAVE_ID';
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  };
  // 세션스토리지에 토큰이 있는 경우
  if (userAuth) {
    headers.token = token;
    headers.id = id;
  }
  return headers;
};

const Instance = axios.create({
  baseURL: `${SERVER_URL}/${PROJECT_NAME}/restapi/`,
});
export default Instance;

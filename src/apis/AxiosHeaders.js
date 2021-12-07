import {
  getItem,
} from '../common/StorageUtils';

const getAxiosConfig = () => {
  const userData = getItem('userData');
  const axiosConfig = {
    id: userData.user_base.email,
    token: userData.token,
    dv_uuid: 'lkjklasdlkjfklajsdf',
    dv_serial: '123124-123HKH-412kjk',
    'Content-Type': 'application/json',
  };
  return axiosConfig;
};
export default getAxiosConfig;

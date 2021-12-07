import {
  userCheck,
} from './axiosBase';

function ResponseData(res) {
  const {
    status,
    results,
  } = res.data;
  try {
    userCheck();
    console.log(res);
    if (status !== 200) {
      console.log('통신에러', res);
      const obj = {
        status,
        results,
      };
      return obj;
    }
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export default ResponseData;

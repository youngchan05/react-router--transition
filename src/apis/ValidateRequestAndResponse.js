export default async function ValidateRequestAndResponse(
  axiosConfig,
  restApi,
  responseException,
) {
  try {
    const res = await restApi(axiosConfig);
    const isException = res.status !== 200;
    if (isException) {
      console.log(res);
      console.log(axiosConfig);
      // TODO 리턴 값 null, undefined가 되지 않도록 처리
      return responseException(res.status);
    }
    const { results } = res;
    return results;
  } catch (error) {
    // TODO 리턴 값 null, undefined가 되지 않도록 처리
    return console.log('ValidateRequestAndReponse error', error);
  }
}

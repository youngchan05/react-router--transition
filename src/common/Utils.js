import * as request from '../apis/request';
export const returnComma = (num) => {
  const regexp = /\B(?=(\d{3})+(?!\d))/g;
  if (num === 0) return num;
  if (!num) return '';
  return num.toString().replace(regexp, ',');
};

export const CaclVw = (num) => {
  const vwNum = num / 3.75;
  return `${vwNum}vw`;
};

export const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

export const returnPrice = (price) => {
  const uc = parseInt(price / 10000);
  const ucStr = uc > 0 ? `${uc}억` : '';
  const manStr = `${parseInt(price % 10000)}만원`;
  return ucStr + manStr;
};

export const getCompletionDate = (date, month) => {
  const completionDateY = date.substr(0, 4);
  const completionDateD = date.substr(4, 2);
  // month 파라미터가 true 이면 월 출력
  return month === false ? `${completionDateY}년` : `${completionDateY}년 ${completionDateD}월`;
};

export const getExclusiveSpacePercent = (supply, exclusive) => {
  const percent = exclusive / supply * 100;
  const percentFixed = percent.toFixed();
  return `${percentFixed}%`;
};

export const formatDateYMDWithTime = (date) => {
  const newDate = new Date(date);

  const year = newDate.getFullYear();

  let month = newDate.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;

  let day = newDate.getDate();
  day = day < 10 ? `0${day}` : day;

  let hour = newDate.getHours();
  hour = hour < 10 ? `0${hour}` : hour;

  let minute = newDate.getMinutes();
  minute = minute < 10 ? `0${minute}` : minute;

  const formatDate = `${year}-${month}-${day} ${hour}:${minute}`;

  return formatDate;
};

export const getDataFormat = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();

  let month = newDate.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;

  let day = newDate.getDate();
  day = day < 10 ? `0${day}` : day;



  const formatDate = `${year}-${month}-${day}`;
  return formatDate;
};

export const prevMonth = (month)  => {

  let d = new Date();

  let monthOfYear = d.getMonth();

  d.setMonth(monthOfYear - month);

  return formatDateYMDWithTime(d);

}

export async function getData(api , config){
  const res = await request.getDataByApiName(api,config);
  return res;
}

export async function GetData(data ,apiName){
  const params = data;
  const config = {
    headers: {
      id:3,
      token:'dsadsadasdsadasd'
    },
    params,
  }
  const res = await request.getDataByApiName(apiName , config);
  if(res.status !== 200 ) return;
  return res;
}




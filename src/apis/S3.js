import uid from 'uid';
import AWS from 'aws-sdk';
import { getDataByUrl } from './request';
import {
  SERVER_URL,
  PROJECT_NAME,
  S3Bucket,
} from './Constants';

const callUpload = async () => {
  const config = {
    headers: {
      uid: 'wfw123120dsfwefew2313dfwefweo-homeq',
    },
  };
  const url = `${SERVER_URL}/${PROJECT_NAME}/restapi/get_param`;
  const awsConfig = await getDataByUrl(url, config);
  if (awsConfig.status === 200) AWS.config.update(awsConfig.results);
  return 'S3';
};

callUpload();

export const UploadImage = async (file, path = 'customize') => {
  const S3 = new AWS.S3();
  await callUpload();
  const buf = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const type = file.split(';')[0].split('/')[1];
  let imageExtension = file.split(';')[0].split('/');
  imageExtension = imageExtension[imageExtension.length - 1];

  console.log(S3Bucket);

  const fileName = `${uid()}.${imageExtension}`;
  const param = {
    Bucket: `${S3Bucket}/${path}`,
    Key: fileName,
    ACL: 'public-read',
    Body: buf,
    ContentType: `image/${type}`,
    ContentEncoding: 'base64',
  };
  console.log(param);

  return new Promise((resolve, reject) => {
    S3.upload(param, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const DeleteData = (key) => {
  const S3 = new AWS.S3();
  if (key) {
    const params = {
      Bucket: `${S3Bucket}`,
      Key: key,
    };
    return new Promise((resolve, reject) => {
      S3.deleteObject(params, (err, data) => {
        if (err) {
          console.error(err);
          resolve(err);
        } else {
          resolve(data.key);
        }
      });
    });
  }
  return false;
};

import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import BoundaryBtn from '../../../components/BoundaryBtn';
import HorizonMargin from '../../../components/HorizonMargin';

const TransferAndConfirmEmpty = ({ children }) => (
  <Wrapper>
    <div className="title">
    내 부동산 정보 알림을
      <br />
    실시간으로!
    </div>
    <HorizonMargin height={8} />
    <BoundaryBtn
      title="맞춤 추천 설정하기"
      btnWidth="201px"
    />

  </Wrapper>
);

const Wrapper = styled.div`
  width: 99px;
  height: 123px;
  object-fit: contain;
  border-radius: 12px;
  background-color: rgba(45, 45, 45, 0.5);

  .title {
    width: 90px;
    height: 30px;
    font-family: NanumSquareEB;
    font-size: 13px;
    line-height: 1.23;
    letter-spacing: -0.25px;
    text-align: center;
    color: #ffffff;
  }

  .text_date {
    width: 76px;
    height: 14px;
    font-family: NanumSquareB;
    font-size: 10px;
    line-height: 1.6;
    letter-spacing: -0.19px;
    text-align: center;
    color: #ffffff;
  }

  .text_date {
    width: 76px;
    height: 14px;
    font-family: NanumSquareB;
    font-size: 10px;
    line-height: 1.6;
    letter-spacing: -0.19px;
    text-align: center;
    color: #ffffff;
  }

  .main_img {

  }

  .tag_img {
  width: 54px;
  height: 26px;
  object-fit: contain;
  background-color: rgba(245, 73, 90, 0.8);
  }
  .empty_img {
    width: 150px;
    height: 96px;
    object-fit: contain;
  }
  .empty_desc {
    width: 100%;
    font-family: NanumSquareR;
    font-size: 15px;
    line-height: 1.47;
    letter-spacing: -0.25px;
    text-align: center;
    color: #606060;
  }
`;

TransferAndConfirmEmpty.propTypes = {
  children: PropTypes.node,
};

TransferAndConfirmEmpty.defaultProps = {
  children: React.createElement('div'),
};

export default TransferAndConfirmEmpty;

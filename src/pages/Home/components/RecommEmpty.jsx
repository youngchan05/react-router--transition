import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import styled from 'styled-components';
import BoundaryBtn from '../../../components/BoundaryBtn';
import HorizonMargin from '../../../components/HorizonMargin';

const RecommEmpty = ({ children, history }) => (
  <Wrapper>
    <HorizonMargin height={30} />
    <img
      className="empty_img"
      src="img/2796387.png"
      srcSet="img/2796387@2x.png 2x,
             img/2796387@3x.png 3x"
    />
    <HorizonMargin height={18} />
    <div className="empty_desc">
    설정하신 부동산 정보가 없어요 :(
      <br />
      <br />
    부동산 맞춤 추천을 설정하시면
      <br />
    내 조건에 딱 맞는 청약/매매/전,월세
      <br />
    매물 정보를 추천 받으실 수 있어요!
      <br />
    </div>
    <HorizonMargin height={16} />
    <BoundaryBtn
      title="맞춤 추천 설정하기"
      btnWidth="201px"
      onClick={() => history.push('./list-q-setting')}
    />

  </Wrapper>
);

const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;

  .title {
    width: 210px;
    height: 19px;
    text-align: left;
    font-family: NanumSquareB;
    font-size: 17px;
    letter-spacing: -0.28px;
    color: #1a1a1a;
  }
  .setter {

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

RecommEmpty.propTypes = {
  children: PropTypes.node,
};

RecommEmpty.defaultProps = {
  children: React.createElement('div'),
};

export default withRouter(RecommEmpty);

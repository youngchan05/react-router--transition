import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainEstateWrap = ({ children, userInfo }) => (
  <Wrapper>
    <div className="title">
      {`안녕하세요 ${userInfo.user_name}님`}
,
      {' '}
      <br />
부동산 맞춤 서비스 홈큐 입니다.
    </div>
    {children}
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  height: 538px;
  padding-top : 56px;
  padding-left : 20px;
  padding-right : 20px;
  box-shadow: 0 0 4px 0 rgba(193, 193, 193, 0.5);
  background-color: #e83942;
  .title{
    width: 100%;
    height: 54px;
    font-family: NanumSquareEB;
    font-size: 21px;
    line-height: 1.33;
    text-align : left;
    letter-spacing: -0.35px;
    color: #ffffff;
  }
`;


MainEstateWrap.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string,
    isSetRecomm: PropTypes.bool,
  }),
  children: PropTypes.node,
};

MainEstateWrap.defaultProps = {
  userInfo: {
    name: 'none',
    isSetRecomm: false,
  },
  children: React.createElement('div'),
};

export default MainEstateWrap;

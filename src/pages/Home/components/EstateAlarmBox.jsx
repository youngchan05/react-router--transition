import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const EstateAlarmBox = () => (
  <Wrapper>
    <p className="tit">
      내 부동산 정보 알림을
      <br />
      실시간으로!
    </p>
    <Link to="/estate/alarm">
      부동산 알림 바로가기 >
    </Link>
  </Wrapper>
);

const Wrapper = styled.div`
  width:100%;
  padding:13px 156px 16px 16px;
  border-radius: 16px;
  background:url(/img/bg_estateAlarm_link.png) no-repeat right 16px center #fff;
  .tit {
    font-family: NanumSquareB;
    font-size: 17px;
    font-style: normal;
    line-height: 1.18;
    color: #1a1a1a;
  }
  a {
    display:inline-block;
    margin-top:22px;
    font-family: NanumSquareB;
    font-size: 13px;
    line-height:14px;
    color: #265b9a;
  }
`;

export default EstateAlarmBox;
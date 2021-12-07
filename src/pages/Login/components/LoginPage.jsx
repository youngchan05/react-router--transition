import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components"
import Checkbox from '../../../components/Checkbox';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import WhiteBox from '../../../components/WhiteBox';

function LoginPage({onChangValue , userInfo , getUserData}){
  return (
    <Wrapper>
      <WhiteBox>
        <div className="inner">
          <h1 className="logo">
              <img src="./img/logo-2@2x.png" alt="Logo"/>
          </h1>
          <p className="desc">
            안녕하세요. 홈큐 어드민 페이지 입니다.<br/>
            사용을 원하시면 로그인을 해주세요.
          </p>
          <Input ph="아이디 입력" name='email' value={userInfo.email} onChange={onChangValue}/>
          <Input ph="비밀번호 입력" name='password' type='password' value={userInfo.password} onChange={onChangValue}/>
          <Checkbox text={'아이디 저장'} type={'checkbox'}/>
          <Button text={'로그인'} size={'full'} color={'#fff'} bgColor={'#dc2a33'} onClick={getUserData}/>
        </div>
      </WhiteBox>
    </Wrapper>
  )
}



const Wrapper = styled.div`
  position:fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  z-index:1200;
  display:flex;
  align-items:center;
  justify-content:center;
  min-height:100vh;
  background-color:#f6f6f6;
  .white-box {
    position:relative;
    width:586px;
    padding:0;
    .inner {
      position:relative;
      padding: 50px 154px;
      background-color:#fff;
      z-index:100;
    }
    &::after {
      position:absolute;
      left:-40px;
      bottom:-40px;
      width:calc(100% + 80px);
      height:262px;
      background-color:#e83942;
      content:"";
    }
  }
  .logo {
    margin-bottom:28px;
    text-align:center;
  }
  .desc {
    margin-bottom:28px;
    font-size: 16px;
    font-weight: 900;
    line-height:22px;
    text-align: center;
    color: #333333;
  }
  .input {
    margin-bottom:18px;
  }
  button {
    margin-top:26px;
  }
`
export default withRouter(LoginPage);

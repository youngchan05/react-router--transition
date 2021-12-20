import React, { useState } from 'react';
import * as request from '../../../apis/request';
import styled from "styled-components"
import Checkbox from '../../../components/Checkbox';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import WhiteBox from '../../../components/WhiteBox';
import { setItem } from '../../../common/StorageUtils';
import { useInput } from '../../../Hooks';
import {useNavigate} from 'react-router-dom'

const Login = ({history}) => {
  const initalState = {
    id:'',
    pw:'',
  }
  const {state, onChangeInput} = useInput(initalState);
  const navigate = useNavigate();
  const onClickLogin = async () => {
    // fifty-admin  shome123
    getApi();
  }
  const getApi = async() => {
    const config = {
      data:{...state}
    }
    const res = await request.getDataByApiName('adm_login_admin', config)
    loginValiDation(res);
  }
  const loginValiDation = (res) => {
    if(res.status === 1101 || res.status === 1503) return alert('아이디를 비밀번호를 입력해주세요.');
    if(res.status === 1144) return alert('아이디를 확인해주세요.');
    if(res.status === 1500) return alert('비밀번호를 확인해주세요.');
    if(res.status=== 200){
      setItem('admin', res.results);
      navigate('/board');
    }
  }
  return (
  <Wrapper>
    <WhiteBox>
      <div className="inner">
        <h1 className="logo">
            <img src="./img/img_story_white.png" alt="Logo"/>
        </h1>
        <p className="desc">
          안녕하세요. 
          <br/>스마트 하우스 어드민 페이지 입니다.<br/>
          사용을 원하시면 로그인을 해주세요.
        </p>
        <Input ph="아이디 입력" name='id' value={state.id || ''} onChange={onChangeInput}/>
        <Input ph="비밀번호 입력" name='pw' type='password' value={state.pw || ''} onChange={onChangeInput}/>
        <Checkbox text={'아이디 저장'} type={'checkbox'}/>
        <Button text={'로그인'} size={'full'} color={'#fff'} bgColor={'#499fb6'} onClick={()=>onClickLogin()} />
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
      background-color:#499fb6;
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
export default Login;

import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import * as request from '../../../apis/request';
import { setItem, getItem } from '../../../common/StorageUtils';
import LoginPage from '../components/LoginPage';

import styled from "styled-components"
import Checkbox from '../../../components/Checkbox';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import WhiteBox from '../../../components/WhiteBox';


function Login (){
  const [ user , SetUser] = useState({
    email:'',
    password:'',
  })
  const onChange = (e) =>{
    const {value , name} = e.target;
    SetUser({
      [name] : value
    })
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
          <Input ph="아이디 입력" name='email' value={user.email} onChange={onChange}/>
          <Input ph="비밀번호 입력" name='password' type='password' value={user.password} onChange={onChange}/>
          <Checkbox text={'아이디 저장'} type={'checkbox'}/>
          <Button text={'로그인'} size={'full'} color={'#fff'} bgColor={'#0060ff'} />
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
      background-color:#0060ff;
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


  
//     getUserData = async () => {
//       const {userInfo } = this.state;
//       const { history} = this.props;
//       const config= {
//         data: {
//           id:userInfo.email,
//           pw:userInfo.password,
//         }
//       }
//       const res = await request.getDataByApiName('adm_login_admin', config);
//       console.log(res);
//       if(res.status === 1101 || res.status === 1503) return alert('아이디를 비밀번호를 입력해주세요.');
//       if(res.status === 1144) return alert('아이디를 확인해주세요.');
//       if(res.status === 1500) return alert('비밀번호를 확인해주세요.');
//       if(res.status=== 200){
//         setItem('admin', res.results);
//         history.push('/user');
//       }
//     }

//   //input value check 
//   onChangValue = (e) => {
//     const { userInfo} = this.state;
//     const name = e.target.name;
//     userInfo[name] = e.target.value;
//     this.setState({
//       userInfo,
//     })
//   }

//   render() {
//     const { userInfo } = this.state;
//     return (
//       <>
//         <LoginPage userInfo={userInfo} onChangValue={this.onChangValue} getUserData={this.getUserData}/>
//       </>
//     );
//   }
// }




export default withRouter(Login);

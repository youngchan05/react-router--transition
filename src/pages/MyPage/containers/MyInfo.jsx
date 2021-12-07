import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as request from '../../../apis/request';
import { setItem, getItem } from '../../../common/StorageUtils';

//common component
import ContentBox from '../../../components/ContentBox';
import RowTable from '../../../components/RowTable';
import WhiteBox from '../../../components/WhiteBox';
import Input from '../../../components/Input';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button';
import Table from '../../../components/Table';
import Paging from '../../../components/Paging';
import ButtonGroup from '../../../components/ButtonGroup';
import Confirm from '../../../components/Confirm';
import Loding from '../../../components/Loding';





class MyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDepth : [4,1],
      userInfo:{},
      password:{
        pw:'',
        newPw:'',
        resultPw:'',
      },
      confirmDesc:'',
      isConfirm:false,
      isPassword:false,
      isLoad:false,
    };
  }
  componentDidMount(){
    this.getUserData();
  }

  //비밀번호 체크 
  getPassword = async () => {
    const { password ,userInfo}  = this.state;
    const config = {
      data: {
        uid:getItem('admin').uid,
        pw:password.pw,
      }
    }
    console.log(config)
    const res = await request.getDataByApiName('adm_updatepw_admin' ,config);
    console.log(res);
  }

  //어드민 마이 정보 가져오기
  getUserData = () => {
    console.log(getItem('admin') ,'uid')
    const userInfo = getItem('admin').adm;
    this.setState({
      isLoad:true,
      userInfo,
    })
  }

  //input onchange event
  onChangePasswrod = (e) => {
    const { password } = this.state; 
    const {name} = e.target;
    password[name] = e.target.value;
    this.setState({
      password,
    })
  }

  //비밀번호 밸리데이션 체크
  passwordCheck = () => {
    //bridge!!
    const { password }  = this.state;
    if(password.pw === ''|| password.newPw === '') {
      this.setState({
        confirmDesc:'비밀번호를 입력해주세요.',
        isConfirm:true,
      })
      return;
    } 
    if(password.newPw !== password.resultPw){
      this.setState({
        confirmDesc:'비밀번호를 확인해주세요.',
        isConfirm:true,
      })
      return;
    };
    this.getPassword();
  }

  //비밀번호창 토클 함수
  PasswordToggle = () => {
    console.log(1111);
    const { isPassword } = this.state;
    this.setState({
      isPassword:!isPassword,
    })
  }
  //confirm click Event
  onClickConfirm = () => {
    this.setState({
      isConfirm:false,
    })
  }
  render() {
    const {pageDepth ,isLoad , userInfo ,password ,isConfirm ,confirmDesc ,isPassword} = this.state;
    //마이 정보 컬럼 만들기
    const createColumns = () => {
      return [
        {
          title:'아이디',
          desc :<Input value={userInfo.id} disabled={true}/>
        },
                {
          title:'이름',
          desc :<Input value={userInfo.adm_name} disabled={true}/>
        },
                {
          title:'생년월일',
          desc :<Input value={userInfo.birth} disabled={true}/>
        },
                {
          title:'비밀번호',
          desc :<Input type={'password'} value={12344567} disabled={true}/>
        },
                {
          title:'부서',
          desc :<Input value={userInfo.part} disabled={true}/>
        },
                {
          title:'직책',
          desc :<Input value={'직책 데이터 없음'} disabled={true}/>
        },
                {
          title:'권한',
          width:'100%',
          desc :
          <ButtonGroup type={'check'}>
            <Checkbox text='관리자' name={'type1'}/>
            <Checkbox text="DB 입력" name={'type2'} />
            <Checkbox text="1:1문의 답변" name={'type3'} />
          </ButtonGroup>
        },
      ]
    }
    //비밀번호 컬럼 만들기
    const createPassword = () => {
      return [
        {
          title:'기존 비밀번호',
          desc :<Input type={'password'} name={'pw'} value={password.pw} onChange={this.onChangePasswrod}/>
        },
        {
          //빈공간 너비를 위한 빈 오브젝트
        },
        {
          title:'새 비밀번호',
          desc :<Input type={'password'} name={'newPw'} value={password.newPw} onChange={this.onChangePasswrod}/>
        },
        {
          title:'비밀번호 확인',
          desc :<Input type={'password'} name={'resultPw'} value={password.resultPw} onChange={this.onChangePasswrod}/>
        },
      ]
    }
    if(!isLoad){
      return <Loding/>
    }
    return (
      <>
        <WhiteBox>
          <div className="right-btn">
            <Button text={'비빌번호 변경'} size={'medium'} bgColor={'#2b72ae'} color={'#fff'} onClick={this.PasswordToggle} />
          </div>
          <RowTable columns={createColumns()} rowWidth={3}/>
        </WhiteBox>
        <WhiteBox isActive={isPassword}>
          <RowTable columns={createPassword()} rowWidth={3}/>
            <div className="right-btn">
              <Button text={'취소'} size={'small'} border={'#b9b9b9'} bgColor={'#fff'}  color={'#565353'} onClick={this.PasswordToggle}/>
              <Button text={'변경'} size={'small'} bgColor={'#2b72ae'} color={'#fff'} onClick={this.passwordCheck}/>
          </div>
        </WhiteBox>
        <Confirm isActive={isConfirm} onClick={this.onClickConfirm} desc={confirmDesc}/>
      </>
    );
  }
}




export default withRouter(MyInfo);

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as request from '../../../apis/request';
import {formatDateYMDWithTime} from '../../../common/Utils';

//common component
import Title from '../../../components/Title';
import ContentBox from '../../../components/ContentBox';
import Tab from '../../../components/Tab';
import RowTable from '../../../components/RowTable';
import WhiteBox from '../../../components/WhiteBox';
import Loding from '../../../components/Loding';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Table from '../../../components/Table';
import Checkbox from '../../../components/Checkbox';
import ButtonGroup from '../../../components/ButtonGroup';

import AdminColumns from '../components/AdminColumns'



class AdminAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDepth : [4,0,0],
      userInfo:{
        id:'',
        name:'',
        birth:'',
        password:'',
        part:'',
        superAdmin:false,
        dbEdit:false,
        inquireAsk:false,
      },
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
  }
  
  //input value check 
  onChangValue = (e) => {
    const { userInfo} = this.state;
    const name = e.target.name;
    userInfo[name] = e.target.value;
    this.setState({
      userInfo,
    })
  }
  onResultAdd = () => {
    
  }
  render() {
    const { pageDepth , userInfo} = this.state;
    const  { history} = this.props;
    const createColumns = () => {
      return [
        {
          title:'아이디',
          desc :<Input name={'id'} value={userInfo.id} ph="아이디 입력" onChange={this.onChangValue} />
        },
                {
          title:'이름',
          desc :<Input name={'name'} value={userInfo.name} ph="홍길동 입력" onChange={this.onChangValue} />
        },
        {
          title:'생년월일',
          desc :<Input name={'birth'} value={userInfo.birth} ph="생년월일 입력" onChange={this.onChangValue} />
        },
        {
          title:'비밀번호',
          desc :<div className='input-group'>
                  <Input type={'password'} name={'password'} value={userInfo.password} ph="비밀번호 입력" width={'50%'} onChange={this.onChangValue} />  
                  <Input type={'password'} name={'password'} value={userInfo.password} ph="비밀번호 확인" width={'calc(50% - 10px)'} onChange={this.onChangValue} /> 
                </div>,
        },
        {
          title:'부서',
          desc :<Input name={'id'} name={'part'} value={userInfo.part} ph="부서 입력" onChange={this.onChangValue} />
        },
                {
          title:'직책',
          desc :<Input name={'id'}  value={'직책 데이터 없음'} />
        },
                {
          title:'권한',
          width:'100%',
          desc :
          <ButtonGroup type={'check'}>
            <Checkbox text='관리자' name={'superAdmin'} />
            <Checkbox text="DB 입력" name={'dbEdit'} />
            <Checkbox text="1:1문의 답변" name={'inquireAsk'} />
          </ButtonGroup>
        },
      ]
    }
    // if(!isLoad){
    //   return <Loding/>
    // }
    return (
      <>
        <Title pageDepth={pageDepth} />
        <WhiteBox>
          <RowTable columns={createColumns()} rowWidth={3}/>
          <div className="right-btn">
              <Button text={'취소'} size={'small'} border={'#b9b9b9'} bgColor={'#fff'}  color={'#565353'} onClick={()=> history.goBack()}/>
              <Button text={'등록'} size={'small'} bgColor={'#2b72ae'} color={'#fff'} onClick={this.passwordCheck}/>
          </div>
        </WhiteBox>  
      </>
    );
  }
}




export default withRouter(AdminAdd);

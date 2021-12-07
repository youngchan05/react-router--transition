import React, { Component } from 'react';
import { withRouter ,Link } from 'react-router-dom';


import * as request from '../../../apis/request';

import {formatDateYMDWithTime} from '../../../common/Utils';

//common component
import ContentBox from '../../../components/ContentBox';
import RowTable from '../../../components/RowTable';
import WhiteBox from '../../../components/WhiteBox';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Table from '../../../components/Table';
import Paging from '../../../components/Paging';
import ButtonGroup from '../../../components/ButtonGroup';
import Title from '../../../components/Title';
import Loding from '../../../components/Loding';
import Textarea from '../../../components/Textarea';
import Confirm from '../../../components/Confirm/Confirm';



class AgreeService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDepth : [3,3,0],
      isLoad:false,
      isConfirm:false,
      confirmDesc:'',
      body :{
      }
    };
  }
  componentDidMount(){
    this.getNoticeList();
  }
  //user data 
  getNoticeList = async () => {
    const config ={
      params : {
        code:1000001,
      }
    }
    const res = await request.getDataByApiName('sys_code_get_by_code' ,config);
    if(res.status !== 200 ) return ;
    const resResult  = res.results[0];
    this.setState({
      isLoad:true,
      body:resResult,
    })
  }

  //input value check 
  onChangValue = (e) => {
    const { body} = this.state;
    const name = e.target.name;
    body[name] = e.target.value;
    this.setState({
      body,
    })
  }
  onResultEdit = async () => {
    const {body} = this.state;
    const config ={
      data : {
        sys_code:{
          ...body,
          value_text:body.value_text,
        }
      }
    }
    console.log(config ,'config')
    const res = await request.getDataByApiName('sys_code_update_admin' ,config);
    if(res.status !== 200) return ;
    this.setState({
      isConfirm:true,
      confirmDesc:'수정이 정상적으로 되었습니다.'
    })
  }
  //컨펌창 닫기
  onClickHideConfirm = () => {
    this.setState({
      isConfirm:false
    })
  }
  render() {
    const {pageDepth , isLoad ,body ,isConfirm ,confirmDesc} = this.state;
    const RowColumns = [
      {
        title:'제목',
        desc:<Input value={body.title}/>,
      },
      {
        title:'내용',
        desc:<Textarea name={'value_text'} value={body.value_text} onChange={this.onChangValue}/>
      },
    ]
    if(!isLoad){
      return <Loding/>
    }
    return (
      <>
        <Title pageDepth={pageDepth} />
        <WhiteBox>
        <RowTable columns={RowColumns} rowWidth={1}/>
        <ButtonGroup>
        <div className="right">
            <Button text={'수정'} size={'small'} bgColor={'#2b72ae'} color={'#fff'} onClick={this.onResultEdit}/>
          </div>
        </ButtonGroup>
        </WhiteBox>
        <Confirm  isActive={isConfirm} desc={confirmDesc} onClick={this.onClickHideConfirm} />
      </>
    );
  }
}




export default withRouter(AgreeService);

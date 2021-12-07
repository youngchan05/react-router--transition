import React, { Component } from 'react';
import { withRouter ,Link } from 'react-router-dom';


import * as request from '../../../apis/request';

import {formatDateYMDWithTime} from '../../../common/Utils';

//common component
import ContentBox from '../../../components/ContentBox';
import RowTable from '../../../components/RowTable';
import WhiteBox from '../../../components/WhiteBox';
import Title from '../../../components/Title';
import Loding from '../../../components/Loding';
import ConteactCont from '../../ContractCont/containers/ContractCont';



class ContractDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDepth : [1,0],
      isLoad:true,
      confirmDesc:'',
      userInfo:{},
      userBaseColumns:[],
      id : this.props.match.params.id,
    };
  }
  componentDidMount(){
    this.getDetailData();
  }

  //해당 유저 데이터 가져오기
  getDetailData = async () => {
    const { id } = this.state;
    console.log(id);
    const config = {
      params:{
        pid_user :id,
      }
    }
    const userRes = await request.getDataByApiName('user_base_get_one' , config);
    this.setState({
      userInfo:userRes.results[0],
      isLoad:true,
    }) 
  }
  render() {
    const { pageDepth ,isLoad ,userInfo} = this.state;
    const RowColumns = [
      {
        title:'회원번호',
        desc:userInfo.pid_user ? userInfo.pid_user : '',
      },
      {
        title:'이메일주소',
        desc:userInfo.email ? userInfo.email :'',
      },
      {
        title:'이름',
        desc:userInfo.user_name ? userInfo.user_name : '',
      },
      {
        title:'생년월일 / 성별',
        desc:`${userInfo.birth ? userInfo.birth :''} / ${userInfo.gender && userInfo.gender === 'M'?'남자' :'여자'}`
      },
    ]

    if(!isLoad){
      return <Loding/>
    }
    return (
      <>
        <Title pageDepth={pageDepth} />
        <WhiteBox>
          <RowTable columns={RowColumns} rowWidth={3}/>
        </WhiteBox>
        <ConteactCont/>
      </>
    );
  }
}




export default withRouter(ContractDetail);

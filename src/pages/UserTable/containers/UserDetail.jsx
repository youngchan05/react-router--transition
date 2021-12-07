import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as request from '../../../apis/request';
import {formatDateYMDWithTime} from '../../../common/Utils';

import MyEstate from '../../MyEstate/containers/MyEstate'
import ContractTable from '../../ContractTable/containers/ContractTable'
import UserInquire from './UserInquire';
import FuneralRites from './FuneralRites';
import UserCuration from './UserCuration';

//common component
import Title from '../../../components/Title';
import RowTable from '../../../components/RowTable';
import WhiteBox from '../../../components/WhiteBox';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Table from '../../../components/Table';
import Paging from '../../../components/Paging';
import ButtonGroup from '../../../components/ButtonGroup';
import Loding from '../../../components/Loding';
import Tab from '../../../components/Tab';


class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDepth : [0,1],
      user:{},
      userBaseColumns:[],
      TabActiveValue:1,
    };
    this.tabList = [
      {
        title:'장례',
      },
      {
        title:'유언',
      },
      {
        title:'소유물품 정리',
      },
      {
        title:'MY ENDING',
      },
      {
        title:'킵스플랜 즐기기',
      },
      {
        title:'1:1 문의',
      },
    ]
  }
  componentDidMount(){
  }

  //해당 유저 데이터 가져오기
  setTabPage = (idx) => {
    switch(idx){
      case 1 : return <FuneralRites/>;
      case 2 : return <UserCuration/>;
      case 3 : return <MyEstate/>;
      case 4 : return <ContractTable/>;
      case 5: return <UserInquire/>;
    }
  }
  onClickCurrentPage = (idx) => {
    this.setState({
      pageDepth:[0 ,idx],
      TabActiveValue:idx,
    })
  }
  render() {
    const { isLoad , pageDepth ,user , userBaseColumns ,TabActiveValue} = this.state;
    return (
      <>
        <Title pageDepth={pageDepth} />
        <Tab tabValue={TabActiveValue} tabList={this.tabList}  onClick={this.onClickCurrentPage}/>
        {
          this.setTabPage(TabActiveValue)
        }
      </>
    );
  }
}




export default withRouter(UserDetail);

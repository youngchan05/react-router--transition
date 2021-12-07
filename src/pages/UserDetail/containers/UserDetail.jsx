import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as request from '../../../apis/request';

//common component
import ContentBox from '../../../components/ContentBox';
import Tab from '../../../components/Tab';
import RowTable from '../../../components/RowTable';
import WhiteBox from '../../../components/WhiteBox';
import Loding from '../../../components/Loding';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Table from '../../../components/Table';
import Paging from '../../../components/Paging';
import ButtonGroup from '../../../components/ButtonGroup';



class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDepth : [0,0],
      userBase:{},
      userBaseColumns:[],
      isLoad:false,
    };
    this.TabActiveValue = 1,
    this.tabList = [
      {
        title:'회원상세',
        value:1,
      },
      {
        title:'큐레이션',
        value:2,
      },
      {
        title:'MY부동산',
        value:3,
      },
      {
        title:'계약서/전입신고/확정일자',
        value:4,
      },
      {
        title:'1:1문의',
        value:5,
      },
    ]
  }
  componentDidMount(){
    this.getDetailData();
  }

  //해당 유저 데이터 가져오기
  getDetailData = async () => {
    const id = this.props.match.params.id;
    const config = {
      params:{
        pid:id,
      }
    }
    const res = await request.getDataByApiName('user_base_get_detail' , config);
    const userBase = res.results.user_base;
    console.log(userBase ,'userBase')
    this.setState({
      userBase,
      isLoad:true,
    }) 
  }
  render() {
    const { isLoad , pageDepth ,userBase , userBaseColumns} = this.state;
    if(!isLoad){
      return <Loding/>
    }
    return (
      <ContentBox pageDepth={pageDepth} userName={userBase.user_name}>
        <Tab tabValue={this.TabActiveValue} tabList={this.tabList}  />
        <div className="box-group">
          <WhiteBox title="기본정보">
            <RowTable columns={userBaseColumns} />
          </WhiteBox>
          <WhiteBox title="공인인증서 관련 취득 정보">
            <RowTable columns={userBaseColumns} />
          </WhiteBox>
        </div>
      </ContentBox>
    );
  }
}




export default withRouter(UserDetail);

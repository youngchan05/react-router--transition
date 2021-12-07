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
import Paging from '../../../components/Paging';
import ButtonGroup from '../../../components/ButtonGroup';

import AdminColumns from '../components/AdminColumns'



class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userListData:{},
      pageDepth : [4,0],
      isLoad:false,
    };
  }
  componentDidMount(){
    this.getAdminData();
  }
  //해당 유저 데이터 가져오기
  getAdminData = async () => {
    const res = await request.getDataByApiName('adm_get_admin');
    if(res.status !== 200) return ;
    console.log(res);
    const userList = res.results.adm ;
    const dataList = [];
    userList.map(item => {
      dataList.push(
        [
          {
            title:item.id,
            align:'left'
          },
          {
            title:item.adm_name,
            align:'left'
          },
          {
            title:item.birth,
            align:'left'
          },
          {
            title:item.phone,
            align:'left'
          },
          {
            title:item.part,
            align:'left'
          },
          {
            title:formatDateYMDWithTime(item.created_at),
            align:'left'
          },
          {
            detail:item.pid_adm,
            align:'left'
          },
        ]
      )
    })
    this.setState({
      userListData:dataList,
      isLoad:true,
    })
    
  }
  render() {
    const { isLoad , pageDepth ,userListData} = this.state;
    const { history} = this.props;
    if(!isLoad){
      return <Loding/>
    }
    return (
      <>
        <Title pageDepth={pageDepth} />
        <WhiteBox>
        <ButtonGroup>
           <div className="left">
            <Button text={'구성원 추가'} size={'medium'} bgColor={'#2b72ae'} color={'#fff'} onClick={()=> history.push('/admin/add')}/>
          </div>
          </ButtonGroup>
          <Table columns={AdminColumns} rows={userListData}  />     
        </WhiteBox>  
      </>
    );
  }
}




export default withRouter(Admin);

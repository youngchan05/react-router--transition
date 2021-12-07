import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as request from '../../../apis/request';
import {formatDateYMDWithTime} from '../../../common/Utils';

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
import UserColumns from '../components/UserColumns'


class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDepth : [0,0],
      userListData:[],
      pageRange : [],
      pageMax :10,
      pageStart:1,
      searchData : {
        pid_user:'',
        user_name:'',
        email:'',
      },
      params: {
        seq: 0,
        interval: 10,
        col_order: 'user_pid',
        sort: 'ASC',
      },
      isLoad:false,
    };
  }
  componentDidMount(){
    this.getUserList();
    this.createPagination();
  }
  //클릭한 유저 상세 페이지로 이동
  getDetailPage = (pid) => {
    return `user/detail/${pid}`
  }
  //관리자 리스트 받아오기
  getUserList = async () => {
    const {searchData ,params } = this.state;
    const config = {
      params: {
        ...params,
        col_search1:'user_pid',
        str_search1:searchData.pid_user,
      },
    }
    const res = await request.getDataByApiName('CM_USER_get_seq_condition_range_by_order',config);
    const userList = res.results ;
    const dataList = [];
    
    userList.map(item => {
      dataList.push(
        [
          {
            checkbox:true,
            isActive:false,
          },
          {
            title:item.user_pid,
            align:'left'
          },
          {
            title:item.birth ? item.birth : '-',
            align:'left'
          },
          {
            title:item.user_name ? item.user_name : '-',
            align:'left'
          },
          {
            title:item.user_id ? item.user_id : '-',
            align:'left'
          },
          {
            title:formatDateYMDWithTime(item.created_at),
            align:'left'
          },
          {
            title:item.date_widrawal  ? item.date_widrawal : '-' ,
            align:'left'
          },
          {
            detail:item.user_pid,
            align:'left'
          },
          {
            title:'',
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

  //받아온 리스트 체크해서 페이징 만들어주기
  createPagination= async () => {
    const { params ,searchData} = this.state
    const config = {
      params: {
        ...params,
        col_search1:'user_pid',
        str_search1:searchData.pid_user,
        col1:'pid_user',
        con1:this.props.match.params.id,
      },
    }
    const rangeData = await request.getDataByApiName('CM_USER_count_condition_range' , config);
    const rang = Math.floor( rangeData.results[0]['COUNT(*)'] / params.interval)
    const rangLength = rangeData.results[0]['COUNT(*)'] / params.interval >  rang ? rang + 1: rang;
    const rangAry = [];
    for(let  i = 0; i < rangLength; i++){
      rangAry.push(
        {
          title:i + 1,
          seq : i,
          isActive:false,
        }
      )
    }
    if(rangeData.results[0]['COUNT(*)'] > 0) rangAry[0].isActive = true;
    this.setState({
      pageRange:rangAry,
    })
  }

  //pageination click event
  onClickPageination = (idx ,type) => {
    const {params ,pageRange ,pageMax ,pageStart} = this.state;
    pageRange.map(item => (
      item.seq === idx ? item.isActive = true : item.isActive = false
    ))
    if(type === 'next' && idx === pageMax) {
      this.setState({
        pageMax :pageMax + 10,
        pageStart:pageStart + 10,
      })
    } 
    if(type === 'prev' && idx < pageStart && pageStart >= 10) {
      console.log(pageMax , pageStart)
      this.setState({
        pageMax :pageMax - 10,
        pageStart:pageStart - 10,
      })
    } 
    params.seq = idx;
    this.setState({
     params,
     pageRange
    })
    this.getUserList();
  }

  //검색 조건 정렬
  onClickSort = (type ,oder) => {
    const {params} = this.state;
    params.col_order = oder;
    params.sort = type;
    this.setState({
     params,
    })
    this.getUserList();
  }

  //검색 인풋 초기화 
  onReset =  () => {
    this.setState({
      searchData : {
        pid_user:'',
        user_name:'',
        email:'',
      }
    })
  }

  //검색조건 검색시 데이터 재 정렬하고 검색
  onSearchUser = async () => {
    this.getUserList();
    this.createPagination();
  }

  //체크박스 이벤트 1106 임시
  onClickCheck = (e ,idx) => {
    const {userListData} = this.state;
    userListData[idx][0].isActive =  !userListData[idx][0].isActive;
    this.setState({
      userListData,
    })
  }
  //검색 창 벨류값 스에이트값에 적용
  onChangValue = (e) => {
    const { searchData} = this.state;
    const name = e.target.name;
    searchData[name] = e.target.value;
    this.setState({
      searchData,
    })
  }

  render() {
    const {pageDepth , userName ,searchData , userListData , pageRange ,isLoad ,params ,pageMax ,pageStart} = this.state;
    const RowColumns = [
      {
        title:'회원정보',
        desc:<Input ph="회원번호 입력" value={searchData.pid_user}name="pid_user" onChange={this.onChangValue}/>
      },
      {
        title:'이름',
        desc:<Input ph="회원이름 입력" value={searchData.user_name}name="user_name" onChange={this.onChangValue}/>
      },
      {
        title:'이메일',
        desc:<Input ph="이메일 입력" value={searchData.email}name="email" onChange={this.onChangValue}/>
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
          <div className="right-btn">
            <Button text={'검색'} size={'small'} bgColor={'#2b72ae'} color={'#fff'} ico={'search'} onClick={this.onSearchUser}/>
            <Button text={'조건 초기화'} size={'medium'} border={'#b9b9b9'} ico={'reset'} onClick={this.onReset}/>
          </div>
        </WhiteBox>
        <WhiteBox>
          <ButtonGroup>
            <div className="right">
              <Button text={'문자 보내기'} size={'medium'} color={'#fff'} bgColor={'#5c5c5c'}/>
              <Button text={'카카오톡 보내기'} size={'medium'} color={'#383838'} bgColor={'#ffe54f'}/>
            </div>
          </ButtonGroup>
          <Table columns={UserColumns} rows={userListData} params={params}onClickSort={this.onClickSort} getDetailPage={this.getDetailPage} onClickCheck={this.onClickCheck}/>     
          <Paging pageRange={pageRange} params={params} onClick={this.onClickPageination} pageMax={pageMax} pageStart={pageStart}/>     
        </WhiteBox>
      </>
    );
  }
}




export default withRouter(UserTable);

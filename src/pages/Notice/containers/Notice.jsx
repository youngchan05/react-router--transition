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

import NoticeColumns from '../components/NoticeColumns'


class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDepth : [3,0],
      userListData:[],
      pageRange : [],
      pageMax :10,
      pageStart:1,
      searchData : {
        title:'',
      },
      params: {
        seq: 0,
        interval: 10,
        col_order: 'pid_notice',
        sort: 'ASC',
      },
      isLoad:false,
    };
  }
  componentDidMount(){
    this.getNoticeList();
    this.createPagination();
  }
  getDetailPage = (pid) => {
    return `notice/detail/${pid}`
  }
  //user data 
  getNoticeList = async () => {
    const {searchData ,params } = this.state;
    const config = {
      params: {
        ...params,
        col_search1:'title',
        str_search1:searchData.title,
      },
    }
    const tableColumns = [
      {
        checkbox:true,
        selected:false,
      },
      {
        feild:'pid_notice',
        align:'left',
      },
      {
        type:'link',
        link:`notice/detail/${item.pid_notice}`,
        feild:'title',
      },
      {
        feild:'writer',
      }
    ]
    const res = await request.getDataByApiName('notice_get_seq_condition_range_by_order',config);
    console.log(res ,'res');
    const userList = res.results ;
    const dataList = [];
    userList.map(item => {
      console.log(item ,'item')
      dataList.push(
        [
          {
            checkbox:true,
            isActive:false,
            test : item,
          },
          {
            title:item.pid_notice,
            align:'left'
          },
          {
            title:<Link to={`notice/detail/${item.pid_notice}`}>{item.title}</Link>,
            align:'left'
          },
          {
            title:formatDateYMDWithTime(item.updated_at),
            align:'left'
          },
          {
            title:item.writer,
          },
        ]
      )
    })
    this.setState({
      userListData:dataList,
      isLoad:true,
    })
  }

  //create page
  createPagination= async () => {
    const { params ,searchData} = this.state
    const config = {
      params: {
        ...params,
        col_search1:'pid_notice',
        str_search1:searchData.title,
      },
    }
    const rangeData = await request.getDataByApiName('notice_count_condition_range' , config);
    console.log(rangeData ,'rangeData' )
    const rang = Math.floor( rangeData.results[0]['COUNT(*)'] / params.interval)
    const rangLength = rangeData.results[0]['COUNT(*)'] / params.interval >=  rang ? rang + 1: rang;
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
    if(rangeData.results[0]['COUNT(*)'] >= 0) rangAry[0].isActive = true;
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
    this.getNoticeList();
  }

  //검색 조건 정렬
  onClickSort = (type ,oder) => {
    const {params} = this.state;
    params.col_order = oder;
    params.sort = type;
    this.setState({
     params,
    })
    this.getNoticeList();
  }

  //inut reset
  onReset =  () => {
    this.setState({
      searchData : {
        title:'',
      }
    })
  }

  onChangeCheck = (e) => {
    
  }
  onSearchTable = async () => {
    this.getNoticeList();
    this.createPagination();
  }
  onClickCheck = (e ,idx) => {
    const {userListData} = this.state;
    userListData[idx][0].isActive =  !userListData[idx][0].isActive;
    this.setState({
      userListData,
    })
  }
  //input value check 
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
    const { history } = this.props;
    //rowTable static data 
    const RowColumns = [
      {
        title:'검색어',
        desc:<Input ph="검색어 입력" value={searchData.title}name="title" onChange={this.onChangValue}/>
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
            <Button text={'검색'} size={'small'} bgColor={'#2b72ae'} color={'#fff'} ico={'search'} onClick={this.onSearchTable}/>
            <Button text={'조건 초기화'} size={'medium'} border={'#b9b9b9'} ico={'reset'} onClick={this.onReset}/>
          </div>
        </WhiteBox>
        <WhiteBox>
          <ButtonGroup>
          <div className="left">
              <Button text={'선택 삭제'} size={'small'} color={'#fff'} bgColor={'#dc2a33'} />
              <Button text={'글쓰기'} size={'small'} bgColor={'#2b72ae'} color={'#fff'} onClick={()=> history.push('/notice/write')}/>
            </div>
            <div className="right">
              <Button text={'글고정 해제'} size={'medium'} border={'#b9b9b9'}/>
              <Button text={'글고정 지정'} size={'medium'} bgColor={'#2b72ae'} color={'#fff'} />
            </div>
          </ButtonGroup>
          <Table columns={NoticeColumns} rows={userListData} params={params}onClickSort={this.onClickSort} getDetailPage={this.getDetailPage} onClickCheck={this.onClickCheck}/>     
          <Paging pageRange={pageRange} params={params} onClick={this.onClickPageination} pageMax={pageMax} pageStart={pageStart}/>     
        </WhiteBox>
      </>
    );
  }
}




export default withRouter(Notice);

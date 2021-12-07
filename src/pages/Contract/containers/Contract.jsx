import React, { Component } from 'react';
import { withRouter ,Link } from 'react-router-dom';


import * as request from '../../../apis/request';

import {formatDateYMDWithTime , prevMonth , getDataFormat} from '../../../common/Utils';

//common component
import ContentBox from '../../../components/ContentBox';
import RowTable from '../../../components/RowTable';
import WhiteBox from '../../../components/WhiteBox';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Table from '../../../components/Table';
import Paging from '../../../components/Paging';
import ButtonGroup from '../../../components/ButtonGroup';
import SelectBox from '../../../components/SelectBox';
import {CalendarSet } from '../../../components/Calendar';
import Loding from '../../../components/Loding';
import Title from '../../../components/Title';
import ContractColumns from '../components/ContractColumns';


class Contract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDepth : [1,0],
      contractData:[],
      pageRange : [],
      pageMax :10,
      pageStart:1,
      searchData : {
        user_name:'',
        pid_user:'',
        email:'',
        begin:prevMonth(3),
        end:new Date(),
      },
      params: {
        seq: 0,
        interval: 10,
        col_order: 'pid_aplct_req',
        sort: 'ASC',
      },
      isLoad:true,
    };
  }
  componentDidMount(){
    this.getContractList();
    this.createPagination();
  }
  //클릭한 계약서 상세 페이지로 이동
  getDetailPage = (pid) => {
    return `contract/detail/${pid}`
  }
  ReqListSet = (req) => {
    console.log(req);
    if(req === 'fixed') return '확정일자';
    if(req === 'transfer') return '전입신고';
    if(req === 'transferfixed') return '전입신고/확정일자';
    if(req === 'fixedtransfer') return '전입신고/확정일자';

  }
  getContractList = async () => {
    const {searchData ,params } = this.state;
    const config = {
      params: {
        ...params,
        col_search1:'pid_user',
        str_search1:searchData.pid_user,
        col_search2:'user_name',
        str_search2:searchData.user_name,
        col_search3:'email',
        str_search3:searchData.email,
        begin:searchData.begin,
        end:searchData.end,
      },
    }
    console.log(config ,'config')
    const res = await request.getDataByApiName('aplct_req_list_get_seq_condition_range_by_order',config);
    console.log(res ,'res111');
    if(res.status !== 200) return;
    const contract = res.results ;
    const dataList = [];
    console.log(contract ,'contract')
    contract.map(item => {
      dataList.push(
        [
          {
            title:this.ReqListSet(item.req_list),
            align:'center'
          },
          {
            title:item.pid_aplct_req,
            align:'center'
          },
          {
            title:item.pid_user,
            align:'left'
          },
          {
            title:item.user_name,
            align:'left'
          },
          {
            title:item.email,
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
            title:item.stt_input === 'N' ? <span className="red-color ">미입력</span> : '입력',
            align:'center'
          },
          {
            title:item.stt_req === 'N' ? <span className="red-color ">대기중</span>  : '처리완료',
            align:'center'
          },
          {
            title:formatDateYMDWithTime(item.created_at),
            align:'left'
          },
          {
            detail:`${item.pid_user}/${item.pid_aplct_req}`,
            align:'left'
          },
        ]
      )
    })
    this.setState({
      contractData:dataList,
      isLoad:true,
    })
  }


  //create page
  createPagination= async () => {
    const { params ,searchData} = this.state
    const config = {
      params: {
        ...params,
      },
    }
    const rangeData = await request.getDataByApiName('aplct_req_list_count_condition_range' , config);
    const rang = Math.floor( rangeData.results[0]['COUNT(*)'] / params.interval)
    console.log(rangeData.results[0]['COUNT(*)'] / params.interval);
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
    this.getContractList();
  }
  //input value check 
  onChangValue = (e) => {
    const { searchData} = this.state;
    const name = e.target.name;
    searchData[name] = e.target.value;
    console.log(searchData)
    this.setState({
      searchData,
    })
  }

  onDateChange = (date ,type) => {
    const {searchData} = this.state;
    console.log(type)
    searchData[type] = getDataFormat(date);
    this.setState({
      searchData,
    })
  }
  //검색 조건 정렬
  onClickSort = (type ,oder) => {
    const {params} = this.state;
    params.col_order = oder;
    params.sort = type;
    this.setState({
      params,
    })
    this.getContractList();
  }
  //inut reset
  onReset =  () => {
    this.setState({
      searchData : {
        user_name:'',
        pid_user:'',
        email:'',
        begin:'',
        end:'',
      }
    })
  }

  onSearchTable = async () => {
    this.getContractList();
    this.createPagination();
  }
  onClickCheck = (e ,idx) => {
    const {userListData} = this.state;
    userListData[idx][0].isActive =  !userListData[idx][0].isActive;
    this.setState({
      userListData,
    })
  }
  render() {
    const {pageDepth , userName , pageRange ,isLoad ,params ,searchData ,contractData ,pageMax ,pageStart} = this.state;
    const SelectListDummy =[
      {
        title:'전체',
        value:1,
      },
      {
        title:'기간',
        value:2,
      },
      {
        title:'월별',
        value:3,
      },
    ]
    const RowColumns = [
      {
        title:'등록날짜',
        desc:<CalendarSet begin={'begin'} end={'end'} onDateChange={this.onDateChange} />
      },
      // {
      //   title:'진행상태',
      //   desc:<SelectBox list={SelectListDummy} />
      // },
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
            <Button text={'검색'} size={'small'} bgColor={'#2b72ae'} color={'#fff'} ico={'search'} onClick={this.onSearchTable}/>
            <Button text={'조건 초기화'} size={'medium'} border={'#b9b9b9'} ico={'reset'} onClick={this.onReset}/>
          </div>
        </WhiteBox>
        <WhiteBox>
          <Table  columns={ContractColumns} rows={contractData} params={params}onClickSort={this.onClickSort} getDetailPage={this.getDetailPage} onClickCheck={this.onClickCheck}/>     
          <Paging pageRange={pageRange} params={params} onClick={this.onClickPageination} pageMax={pageMax} pageStart={pageStart}/>     
        </WhiteBox>
      </>
    );
  }
}




export default withRouter(Contract);

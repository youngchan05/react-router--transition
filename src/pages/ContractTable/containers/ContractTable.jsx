import React, { Component } from 'react';
import { withRouter ,Link } from 'react-router-dom';


import * as request from '../../../apis/request';

import {formatDateYMDWithTime} from '../../../common/Utils';
import ContractColumns from '../components/ContractColumns';

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



class ContractTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contractData:[],
      pageRange : [],
      pageMax :10,
      pageStart:1,
      searchData : {
        req_list:'',
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
    return `/contract/detail/${pid}`
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
        col1:'pid_user',
        con1:this.props.match.params.id,
        col_search1:'req_list',
        str_search1:searchData.req_list,
      },
    }
    console.log(config ,'config')
    const res = await request.getDataByApiName('aplct_req_list_get_seq_condition_range_by_order',config);
    console.log(res ,'res');
    if(res.status !== 200) return;
    const contract = res.results ;
    const dataList = [];
    contract.map(item => {
      dataList.push(
        [
          {
            title:this.ReqListSet(item.req_list),
          },
          {
            title:item.pid_aplct_req,
          },
          {
            title:item.stt_req === 'N' ? '대기중' : '처리완료',
          },
          {
            title:formatDateYMDWithTime(item.created_at),
          },
          {
            detail:`${item.pid_user}/${item.pid_aplct_req}`,
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
        col1:'pid_user',
        con1:this.props.match.params.id,
        col_search1:'req_list',
        str_search1:searchData.req_list,
      },
    }
    const rangeData = await request.getDataByApiName('aplct_req_list_count_condition_range' , config);
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
    this.getContractList();
  }
  //input value check 
  onChangValue = (e) => {
    const { searchData} = this.state;
    const name = e.target.name;
    searchData[name] = e.target.value;
    console.log(searchData ,'searchData')
    this.setState({
      searchData,
    })
    this.getContractList();
    this.createPagination();
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

  onClickCheck = (e ,idx) => {
    const {userListData} = this.state;
    userListData[idx][0].isActive =  !userListData[idx][0].isActive;
    this.setState({
      userListData,
    })
  }
  render() {
    const { pageRange ,isLoad ,params ,contractData ,pageMax ,pageStart} = this.state;
    const selectItem = [
      {
        title:'전체',
        value:'전체',
      },
      {
        title:'전입신고',
        value:'전입신고',
      },
      {
        title:'확정일자',
        value:'확정일자',
      },
      {
        title:'계약서',
        value:'계약서',
      },
    ]
    const RowColumns =[
      {
        title:'항목선택',
        desc:<SelectBox name={'req_list'} list={selectItem} onChange={this.onChangValue}/>
      },
    ]
    if(!isLoad){
      return <Loding/>
    }
    return (
      <>
        <WhiteBox>
          <RowTable columns={RowColumns} rowWidth={3}/>
          <Table  columns={ContractColumns} rows={contractData} params={params}onClickSort={this.onClickSort} getDetailPage={this.getDetailPage} onClickCheck={this.onClickCheck}/>     
          <Paging pageRange={pageRange} params={params} onClick={this.onClickPageination} pageMax={pageMax} pageStart={pageStart}/>     
        </WhiteBox>
      </>
    );
  }
}




export default withRouter(ContractTable);

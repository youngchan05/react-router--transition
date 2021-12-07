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
import SelectBox from '../../../components/SelectBox';

import InquireColumns from '../components/InquireColumns'


class UserInquire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userListData:[],
      pageRange : [],
      pageMax :10,
      pageStart:1,
      searchData : {
        type_inquire:'',
      },
      params: {
        seq: 0,
        interval: 10,
        col_order: 'pid_inquire',
        sort: 'ASC',
      },
      inquireType: {},
      isLoad:false,
    };
  }
  componentDidMount(){
    this.getInquireList();
    this.createPagination();
    this.getAnwserType();
  }
  getDetailPage = (pid) => {
    return `/inquire/detail/${pid}/${this.props.match.params.id}`
  }
  //문의별 타입 체크 함수
  getAnwserType = async () => {
    const config = {
      params:{
        pid_user :this.props.match.params.id,
      }
    }
    const resAnswer = await request.getDataByApiName('etc_admin_get_inquire_status_by_user',config);
    const inquireType = resAnswer.results[0];
    this.setState({
      inquireType,
    })
    console.log(inquireType ,'inquireType');
  }
  //user data 
  getInquireList = async () => {
    const {searchData ,params } = this.state;
    const config = {
      params: {
        ...params,
        col1:'pid_user',
        con1:this.props.match.params.id,
        col_search1:'type_inquire',
        str_search1:searchData.type_inquire,
      },
    }
    const res = await request.getDataByApiName('inquire_get_seq_condition_range_by_order',config);
    
    const userList = res.results ;
    const dataList = [];
    userList.map(item => {
      dataList.push(
        [
          {
            checkbox:true,
            isActive:false,
            test : item,
          },
          {
            title:item.type_inquire,
            align:'left'
          },
          {
            title:item.pid_inquire,
            align:'left'
          },
          {
            title:item.pid_user,
            align:'left'
          },
          {
            title:'작성자 필요',
            align:'left'
          },
          {
            title:item.title,
            align:'left'
          },
          {
            title:item.answer ? '답변' : <span className="red-color">미답변</span>,
          },
          {
            title:formatDateYMDWithTime(item.updated_at),
          },
          {
            detail:item.pid_inquire,
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
        col1:'pid_user',
        con1:this.props.match.params.id,
        col_search1:'type_inquire',
        str_search1:searchData.type_inquire,
      },
    }
    const rangeData = await request.getDataByApiName('inquire_count_condition_range' , config);
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
    this.getInquireList();
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
    this.getInquireList();
    this.createPagination();
  }

  
  render() {
    const { userListData , pageRange ,isLoad ,params ,inquireType ,pageMax ,pageStart} = this.state;
    const { history } = this.props;
    const selectItem = [
      {
        title:'전체',
        value:'전체',
      },
      {
        title:'큐레이션 문의',
        value:'큐레이션 문의',
      },
      {
        title:'계약서 문의',
        value:'계약서 문의',
      },
      {
        title:'확정일자 문의',
        value:'확정일자 문의',
      },
    ]
    const RowColumns =[
      {
        title:'항목선택',
        desc:<SelectBox name={'type_inquire'} list={selectItem} onChange={this.onChangValue}/>
      },
    ]
    if(!isLoad){
      return <Loding/>
    }
    return (
      <>
        <WhiteBox>
          <div className="icon-answer">
            <div className="type1">
              <span>
                <img src="./img/icon_answer01.png" alt=""/>
              </span>
              <p>등록된 문의</p>
              <strong>
                {inquireType.cnt_answer + inquireType.cnt_regist}개
              </strong>
            </div>
            <div className="type2">
            <span>
                <img src="./img/icon_answer02.png" alt=""/>
              </span>
              <p>답변완료</p>
              <strong>{inquireType.cnt_answer}개</strong>
            </div>
            <div className="type3">
            <span>
                <img src="./img/icon_answer03.png" alt=""/>
              </span>
              <p>미답변</p>
              <strong>{inquireType.cnt_regist}개</strong>
            </div>
          </div>
        </WhiteBox>
        <WhiteBox>
          <RowTable columns={RowColumns} rowWidth={3}/>
          <Table columns={InquireColumns} rows={userListData} params={params}onClickSort={this.onClickSort} getDetailPage={this.getDetailPage} onClickCheck={this.onClickCheck}/>     
          <Paging pageRange={pageRange} params={params} onClick={this.onClickPageination} pageMax={pageMax} pageStart={pageStart}/>     
        </WhiteBox>
      </>
    );
  }
}




export default withRouter(UserInquire);

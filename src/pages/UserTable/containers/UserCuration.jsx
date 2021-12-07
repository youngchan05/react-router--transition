import React, { Component } from 'react';
import { withRouter ,Link } from 'react-router-dom';


import * as request from '../../../apis/request';

import {getDataFormat ,prevMonth} from '../../../common/Utils';

//common component
import ContentBox from '../../../components/ContentBox';
import RowTable from '../../../components/RowTable';
import WhiteBox from '../../../components/WhiteBox';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Table from '../../../components/Table';
import Paging from '../../../components/Paging';
import {CalendarSet } from '../../../components/Calendar';
import ButtonGroup from '../../../components/ButtonGroup';
import Title from '../../../components/Title';
import SelectBox from '../../../components/SelectBox';
import Loding from '../../../components/Loding';
import CurationColumns from '../components/CurationColumns';

class UserCuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListData:[],
      pageRange : [],
      qSetData:{},
      pageMax :10,
      pageStart:1,
      searchData : {
        estate_name:'',
        categoryValue:'',
        begin:prevMonth(3),
        end:new Date(),
      },
      params: {
        seq: 0,
        interval: 10,
        col_order: 'pid_q_recomm',
        sort: 'ASC',
      },
      curationCategory :[],
    };
  }
  componentDidMount(){
    this.getCurationQset();
  }

  //큐레이션 카테고리 가쟈오기
  getCurationQset  = async () => {
    const { params ,searchData} = this.state;
    const config = {
      params: {
        ...params,
        col_order: 'pid_qset',
        col_search1:'b_removed',
        str_search1:0,
        col1:'pid_user',
        con1:this.props.match.params.id,
      },
    }
    const res = await request.getDataByApiName('qset_get_seq_condition_range_by_order' , config);
    if(res.status !== 200) return;
    console.log(res ,'res')
    const resResult = res.results;
    const curationCategory = [];
    //카테고리 셀렉트 아이템 만들기
    if(res.results.length > 0) {
      resResult.map((item , idx) => {
        return (
            curationCategory.push({
              value:Number(item.pid_qset),
              title:item.q_name,
            })
          )
        })
      searchData.categoryValue = curationCategory[0].value;
    }
    this.setState({
      curationCategory:curationCategory,
      searchData,
    })
    this.getCurationData();
    this.createPagination();

  }
  gettest  = async () => {
    const {searchData ,params ,qSetData} = this.state;
    const config = {
      params: {
        seq: 0,
        ...params,
        interval: 20,
        col_order: 'pid_qset',
        col1:'pid_user',
        con1:this.props.match.params.id,
      },
    }
    const res = await request.getDataByApiName('qset_item_get_seq_condition_range_by_order' , config);
  }
  //해당 유저 데이터 가져오기
  getCurationData = async () => {
    const {searchData ,params } = this.state;
    const config = {
      params: {
        ...params,
        col1:'pid_user',
        con1:this.props.match.params.id,
        col2:'pid_qset',
        con2:searchData.categoryValue,
        col_search1:'estate_name',
        str_search1:searchData.estate_name,
        begin:searchData.begin,
        end:searchData.end,
      },
    }
    const res = await request.getDataByApiName('q_recomm_get_seq_condition_range_by_order' , config);
    const curationRes = res.results ;
    const dataList = [];
    curationRes.map(item => {
      dataList.push(
        [
          {
            checkbox:true,
            isActive:false,
            test : item,
          },
          {
            title:item.qset_name,
          },
          {
            title:item.article_key,
            align:'left'
          },
          {
            title:item.estate_name,
            align:'left'
          },
          {
            title:item.b_liked !== 0 ? '좋아요' : '-',
            align:'left'
          },
          {
            title:item.score,
            align:'left'
          },
          {
            title:item.b_removed !== 0 ? '삭제' : '-',
            align:'left'
          },
          {
            detail:item.article_key,
          },
        ]
      )
    })
    this.setState({
      ListData:dataList,
      isLoad:true,
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
    this.getCurationData();
  }
  //input value check 
  onChangValue = (e) => {
    const { searchData ,params} = this.state;
    const name = e.target.name;
    searchData[name] = e.target.value;
    if(name === 'categoryValue') {
      params.seq = 0;
      this.setState({
        searchData,
        params
      })
      this.createPagination();
      this.getCurationData();
      return 
    }
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
    this.getCurationData();
  }
  //inut reset
  onReset =  () => {
    this.setState({
      searchData : {
        estate_name:'',
        begin:'',
        end:'',
      }
    })
  }

  onSearchTable = async () => {
    this.getCurationData();
    this.createPagination();
  }
  //클릭이벤트
  onClickCheck = (e ,idx) => {
    const {userListData} = this.state;
    userListData[idx][0].isActive =  !userListData[idx][0].isActive;
    this.setState({
      userListData,
    })
  }

  //create page
  createPagination= async () => {
    const { params ,searchData } = this.state
    const config = {
      params: {
        ...params,
        col1:'pid_user',
        con1:this.props.match.params.id,
        col2:'pid_qset',
        con2:searchData.categoryValue,
        col_search1:'estate_name',
        str_search1:searchData.estate_name,
        begin:searchData.begin,
        end:searchData.end,
      },
    }
    const rangeData = await request.getDataByApiName('q_recomm_count_condition_range' , config);
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
  onDateChange = (date ,type) => {
    const {searchData} = this.state;
    console.log(type)
    searchData[type] = getDataFormat(date);
    this.setState({
      searchData,
    })
  }
  render() {
    const {searchData,isLoad ,ListData ,params,pageRange ,
      curationCategory ,pageMax ,pageStart
    } = this.state;

    const { history } = this.props;
    const RowColumns = [
      {
        title:'추천날짜',
        desc:<CalendarSet begin={'begin'} end={'end'} onDateChange={this.onDateChange} />
      },
      {
        title:'단지/매물',
        desc:<Input ph="회원번호 입력" value={searchData.estate_name}name="estate_name" onChange={this.onChangValue}/>
      },
    ]
    if(!isLoad){
      return <Loding/>
    }
    return (
      <>
      <WhiteBox>
          <div className="category-wrap">
            <strong>큐레이션 항목</strong>
            <SelectBox width={'150px'} onChange={this.onChangValue} name={'categoryValue'} list={curationCategory} />
          </div>
          <RowTable columns={RowColumns} rowWidth={3}/>
          <div className="right-btn">
            <Button text={'검색'} size={'small'} bgColor={'#2b72ae'} color={'#fff'} ico={'search'} onClick={this.onSearchTable}/>
            <Button text={'조건 초기화'} size={'medium'} border={'#b9b9b9'} ico={'reset'} onClick={this.onReset}/>
          </div>
        </WhiteBox>
        <WhiteBox>
          <Table columns={CurationColumns} rows={ListData} params={params}onClickSort={this.onClickSort} getDetailPage={this.getDetailPage} onClickCheck={this.onClickCheck}/>     
          <Paging pageRange={pageRange} params={params} onClick={this.onClickPageination} pageMax={pageMax} pageStart={pageStart}/>     
        </WhiteBox>
      </>
    );
  }
}




export default withRouter(UserCuration);

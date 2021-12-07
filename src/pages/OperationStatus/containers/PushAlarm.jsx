import React, { Component } from 'react';
import { withRouter ,Link } from 'react-router-dom';


import * as request from '../../../apis/request';

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

import {ColumnsTop } from '../components/PushAlarmColumns';
import {prevMonth ,getDataFormat} from '../../../common/Utils';




class PushAlarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDepth : [2,0,1],
      pageMax :10,
      pageStart:1,
      pushData :[],
      searchData : {
        estate_name:'',
        categoryValue:'',
        begin:prevMonth(3),
        end:new Date(),
      },
    };
  }
  componentDidMount(){
    this.getPush();
  }
  getPush  = async () => {
    const {searchData ,params } = this.state;
    const config = {
      params: {
        begin:searchData.begin,
        end:searchData.end,
      },
    }
    console.log(config ,'config');
    const res = await request.getDataByApiName('etc_admin_get_push_status_by_date',config);
    if(res.status !== 200) return ;
    const pushData = res.results;
    console.log(res)
    this.setState({
      pushData,
    })
    this.setPushData();
  }

  onDateChange = (date ,type) => {
    const {searchData} = this.state;
    console.log(type)
    searchData[type] = getDataFormat(date);
    this.setState({
      searchData,
    })
  }

  onSearchTable = async () => {
    this.getPush();
  }

  setPushData = () => {
    //날짜 별로 중복갑 제거
    const {pushData} = this.state;
    const pushDateAry = [];
    pushData.map(item => { 
      if(pushDateAry.indexOf(item.push_date) === -1) pushDateAry.push(item.push_date)
    }) 
    this.createPushAry(pushDateAry)
  }

  createPushAry = (setDate) => {
    //타이블 아이템별로 기본 객체 넣어줌
    const madeObj = [];
    setDate.map(item => {
      return (
        madeObj.push({
          title:item,
          array:[
            {
              type_alarm:601,
              cnt:'',
              total:'',
            },
            {
              type_alarm:602,
              cnt:'',
              total:'',
            },
            {
              type_alarm:603,
              cnt:'',
              total:'',
            },
            {
              type_alarm:604,
              cnt:'',
              total:'',
            },
            {
              type_alarm:605,
              cnt:'',
              total:'',
            }
          ]

        })
      )
    })
    console.log(madeObj ,'madeObj')
    this.compareData(madeObj)
  }

  
  compareData =  (obj) => {
    const {pushData} = this.state;
    const test = [];
    console.log(obj)
    pushData.map(item => {
      console.log(obj.title ,'title')
      if(item.push_date === obj.title ) {
        console.log(1111);
        item.type_alarm === obj.type_alarm ? console.log(1111) : console.log(22222);
      }
    })
  }

  render() {
    const {pageDepth , userName , pageRange ,isLoad ,params ,searchData ,contractData ,pageMax ,pageStart} = this.state;
    const RowColumns = [
      {
        title:'조회기간',
        desc:<CalendarSet begin={'begin'} end={'end'} onDateChange={this.onDateChange} />
      },
    ]
    return (
      <>
      <Title pageDepth={pageDepth}/>
      <WhiteBox>
          <RowTable columns={RowColumns} rowWidth={3}/>
          <div className="right-btn">
            <Button text={'검색'} size={'small'} bgColor={'#2b72ae'} color={'#fff'} ico={'search'} onClick={this.onSearchTable}/>
            <Button text={'조건 초기화'} size={'medium'} border={'#b9b9b9'} ico={'reset'} onClick={this.onReset}/>
          </div>
        </WhiteBox>
        <WhiteBox>
          <Table tableType={'type1'} columns={ColumnsTop} rows={contractData} params={params}onClickSort={this.onClickSort} getDetailPage={this.getDetailPage} onClickCheck={this.onClickCheck}/>     
          {/* <Paging pageRange={pageRange} params={params} onClick={this.onClickPageination} pageMax={pageMax} pageStart={pageStart}/>      */}
        </WhiteBox>
      </>
    );
  }
}




export default withRouter(PushAlarm);

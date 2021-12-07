import React, { Component } from 'react';
import { withRouter ,Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2'

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
import SelectBox from '../../../components/SelectBox';
import {CalendarSet } from '../../../components/Calendar';
import Loding from '../../../components/Loding';
import Title from '../../../components/Title';
import Graph from '../../../components/Graph';




class SubscriberStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDepth : [2,1,0],
      pageMax :10,
      pageStart:1,
    };
  }
  render() {
    const options = {
      legend: {
        display: false, // label 보이기 여부
      },
      scales: {
        yAxes: [{
          ticks: { 
            min: 0, // y축 스케일에 대한 최소값 설정
            max:250,
            stepSize: 50, // y축 그리드 한 칸당 수치
          }
        }]
      },
     
      // false : 사용자 정의 크기에 따라 그래프 크기가 결정됨.
      // true : 크기가 알아서 결정됨.
      maintainAspectRatio: false 
    }
    const data = {
      // 각 막대별 라벨
      labels: ['2015', '2016', '2017', '2018', '2019', '2020'],
      datasets: [
        {
          borderWidth: 1, // 테두리 두께
          data: [1,2,3 ,30 , 50 ,22], // 수치
          backgroundColor:['#0060ff','#dcdcdc','#dcdcdc'] // 각 막대 색
        }
      ]
    };
    const {pageDepth , userName , pageRange ,isLoad ,params ,searchData ,contractData,pageMax ,pageStart} = this.state;
    const RowColumns = [
      {
        title:'기간 지정',
        desc:<CalendarSet begin={'begin'} end={'end'}  />
      },
    ]
    return (
      <>
      <Title pageDepth={[2]}/>
      <WhiteBox>
          <RowTable columns={RowColumns} rowWidth={3}/>
          <div className="right-btn">
            <Button text={'검색'} size={'small'} bgColor={'#2b72ae'} color={'#fff'} ico={'search'} onClick={this.onSearchTable}/>
            <Button text={'조건 초기화'} size={'medium'} border={'#b9b9b9'} ico={'reset'} onClick={this.onReset}/>
          </div>
        </WhiteBox>
        <WhiteBox>
        <Graph
          height={'250px'}
          width={'500px'}
        />
        </WhiteBox>
      </>
    );
  }
}




export default withRouter(SubscriberStatus);

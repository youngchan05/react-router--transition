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
import SelectBox from '../../../components/SelectBox';
import {CalendarSet } from '../../../components/Calendar';
import Loding from '../../../components/Loding';
import Title from '../../../components/Title';

import {InformationCollectionColumns } from '../components/InformationCollectionColumns';




class InformationCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDepth : [2,0,0],
      pageMax :10,
      pageStart:1,
    };
  }
  render() {
    const {pageDepth , userName , pageRange ,isLoad ,params ,searchData ,contractData ,pageMax ,pageStart} = this.state;
    const RowColumns = [
      {
        title:'조회기간',
        desc:<CalendarSet begin={'begin'} end={'end'}  />
      },
    ]
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
          <Table tableType={'type1'} columns={InformationCollectionColumns} rows={contractData} params={params}onClickSort={this.onClickSort} getDetailPage={this.getDetailPage} onClickCheck={this.onClickCheck}/>     
          {/* <Paging pageRange={pageRange} params={params} onClick={this.onClickPageination} pageMax={pageMax} pageStart={pageStart}/>      */}
        </WhiteBox>
      </>
    );
  }
}




export default withRouter(InformationCollection);

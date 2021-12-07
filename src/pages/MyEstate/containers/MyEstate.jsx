import React, { Component } from 'react';
import { withRouter ,Link } from 'react-router-dom';


import * as request from '../../../apis/request';

import EstateWrapper from '../components/EstateWrapper';
import EstateItem from '../components/EstateItem';

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



class MyEstate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type_estate:1,
      estate_attention:[],
      estate_complex:[],
      estate_subscription:[],
      estate_alarm:[],
      params: {
        seq: 0,
        interval: 200,
        col_order: 'pid_my_estate',
        sort: 'ASC',
      },
      isLoad:false,
      isComplex:false,
      complexData:{},
    };
  }
  componentDidMount(){
    this.getEstateList();
    // this.createPagination();
  }
  getDetailPage = (pid) => {
    return `inquire/detail/${pid}`
  }
  //user data 
  getEstateList = async () => {
    const {estate_attention ,estate_complex ,estate_subscription ,params} = this.state;
    const config = {
      params: {
        ...params,
        col1:'pid_user',
        con1:this.props.match.params.id,
      },
    }
    console.log(config ,'config');
    const res = await request.getDataByApiName('my_estate_get_seq_condition_range_by_order',config);
    if(res.status !== 200) return ;
    const myEstateAry = res.results;
    console.log(res ,'res');
    this.createEstateAry(myEstateAry);
    this.setState({
      isLoad:true,
    })
  }

  //각각 타입마다 배열로 만들어주기
  createEstateAry = (estateData) => {
    const {estate_attention ,estate_complex ,estate_subscription ,estate_alarm} = this.state;
    estateData.map(item => {
      console.log(item ,'item')
      if(item.type_estate === 1) return estate_attention.push(item)
      if(item.type_estate === 3) return estate_complex.push(item)
      if(item.type_estate === 4) return estate_subscription.push(item)
      if(item.type_estate === 2 && item.b_tran_complete === 0 ) return estate_alarm.push(item) //단지 알림 설정이후 들어온 데이터
    })
    this.setState({
      estate_attention,
      estate_complex,
      estate_subscription,
    })
    this.complexCreate();
    
  }
  onClickTabEstate = (idx) => {
    const {type_estate} = this.state;
    this.setState({
      type_estate:idx,
    })
  }
  //단지 배열 만들기
  complexCreate = () => {
    const {estate_complex ,estate_alarm} = this.state;
    //단지 네임으로 묶기
    // item.pid_my_estate
    if(!estate_complex.length > 0) return;
    estate_complex.map(item => (
      item.qset = [],
      estate_alarm.map(estate => {
        return (
          item.pid_my_estate == estate.qset_name ? item.qset.push(estate) : null
        )
      })
    ))
    this.setState({
      estate_complex,
    })
  }
  //단지 리스트 만들기
  complexAlarmList = (item) => {
    const {complexData } = this.state;
    if(item.qset.length === 0) return ;
    complexData.title  = item.estate_name;
    complexData.array = [];
    item.qset.map(complexItem => (
      complexData.array.push(complexItem)
    ))
    this.setState({ 
      complexData,
      isComplex:true,
    })
    console.log(complexData ,'complexData')
    return <EstateItem item={complexData.array} />
  }
  onClickClose =() => {
    this.setState({ 
      isComplex:false,
    })
  }
  setEstatePage = (type) => {
    const {estate_attention ,estate_complex ,estate_subscription  } = this.state;
    switch(type){
      case 1 : return <EstateItem item={estate_attention} /> ;
      case 2 : return <EstateItem item={estate_complex} complexAlarmList={this.complexAlarmList} /> ;
      case 3 : return <EstateItem item={estate_subscription} />;
    }
  }
  render() {
    const { isLoad ,type_estate ,isComplex ,complexData} = this.state;
    const { history } = this.props;
    //rowTable static data 
    if(!isLoad){
      return <Loding/>
    }
    return (
      <>
        <EstateWrapper onClickTabEstate={this.onClickTabEstate} type_estate={type_estate}>
          {
            this.setEstatePage(type_estate)
          }
          <div className={isComplex ? 'estate_pop active' : 'estate_pop'}>
            <div className="nav">
              <button className="close" onClick={()=> this.onClickClose()}></button>
              <strong>{complexData.title}</strong>
            </div>
            <EstateItem item={complexData.array} />
          </div>
        </EstateWrapper>
      </>
    );
  }
}




export default withRouter(MyEstate);

import React, { Component } from 'react';
import { withRouter ,Link } from 'react-router-dom';
import * as request from '../../../apis/request';

import ContracWrapper from '../components/ContracWrapper';
import ContractRental from '../components/ContractRental';
import ContractSale from '../components/ContractSale';

import WhiteBox from '../../../components/WhiteBox';
import Confirm from '../../../components/Confirm/Confirm';
import ButtonGroup from '../../../components/ButtonGroup';
import Button from '../../../components/Button';
import SelectBox from '../../../components/SelectBox';
import Loding from '../../../components/Loding';


import {jsonDataStep01 ,jsonDataStep02 ,jsonDataStep03 ,jsonDataStep04} from '../components/ContractRentalData';
import {saleDataStep01 ,saleDataStep02 ,saleDataStep03 ,saleDataStep04} from '../components/ContractSaleData';

class ContractCont extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage:'rental',
      currentStep:1,
      apiName:'aplct_info_insert_admin',
      contractImg:'',
      id:this.props.match.params.user,
      isConfirm:false,
      confirmDesc:'',
      isLoad:false,

      //임대차 데이터
      rentalStepData01:jsonDataStep01,
      rentalStepData02:jsonDataStep02,
      rentalStepData03:jsonDataStep03,
      rentalStepData04:jsonDataStep04,
      //매매계약 데이터
      saleStepData01:saleDataStep01,
      saleStepData02:saleDataStep02,
      saleStepData03:saleDataStep03,
      saleStepData04:saleDataStep04,

    };
  }

  componentDidMount(){
    this.GetData();
    this.setTypeCheckData();
    this.getContract();
  }
  //해당 유저 데이터 가져오기
  getContract= async () => {
    const { id } = this.state;
    console.log(this.props.match.params.id,'11111')
    const config = {
      params:{
        seq: 0,
        interval: 10,
        col_order: 'pid_contract',
        sort: 'ASC',
        col1:'pid_user',
        con1:this.props.match.params.id,
      }
    }
    const contractRes = await request.getDataByApiName('contract_get_seq_condition_range_by_order' , config);
    if(!contractRes.status === 200) return;
    if(!contractRes.results.length > 0) return ;
    console.log(contractRes,'contractRes');
    const contractImg = contractRes.results[0].uri_contract ? contractRes.results[0].uri_contract : null;
    this.setState({
      contractImg,
    })
  }
    setDataUpdate = async () => {
    const { id } = this.state;
    const config  = {
      data : {
        aplct_req:{
          pid_aplct_req:id,
          stt_input:'Y',
        }
      }
    }
    console.log(config ,'config')
    const updateRes = await request.getDataByApiName('aplct_req_update_admin' , config);
    console.log(updateRes ,'1111')
  }
  //데이터 가져오기
  GetData = async () => { 
    const {id ,apiName} = this.state;
    const config = {
      params: {
        pid_aplct_info  :id
      }
    }
    console.log(config , 'config' );
    const res = await request.getDataByApiName('aplct_info_get_one',config);
    console.log(res ,'res')
    if(!res.results === 200) return ; //데이터 오류시 접근 제한처리
    if(!res.results.length > 0) return //저장된 값이 없을시 분기처리
    const resultData = res.results[0];
    //임시저장 처리 어떻게 할껀지 ...
    if(!resultData.json_info1 
      && !resultData.json_info2 
      && !resultData.json_info3 
      && !resultData.json_info4
    ) return ; // 저장된값이 4개있는지 확인
    console.log('저장된 데이터 4개있음');
    if(resultData.type_form === 'rental'){

      //저장된 데이터값 넣어주기
      
      const rentalStepData01 = resultData.json_info1 && JSON.parse(resultData.json_info1);
      const rentalStepData02 = resultData.json_info2 && JSON.parse(resultData.json_info2);
      const rentalStepData03 = resultData.json_info3 && JSON.parse(resultData.json_info3);
      const rentalStepData04 = resultData.json_info4 && JSON.parse(resultData.json_info4);
      this.setState({
        rentalStepData01,
        rentalStepData02,
        rentalStepData03,
        rentalStepData04,
        apiName:'aplct_info_update_admin',
      })
    }
    if(resultData.type_form === 'sale'){
      //저장된 데이터값 넣어주기
      const saleStepData01 = resultData.json_info1 && JSON.parse(resultData.json_info1);
      const saleStepData02 = resultData.json_info2 && JSON.parse(resultData.json_info2);
      const saleStepData03 = resultData.json_info3 && JSON.parse(resultData.json_info3);
      const saleStepData04 = resultData.json_info4 && JSON.parse(resultData.json_info4);
      this.setState({
        saleStepData01,
        saleStepData02,
        saleStepData03,
        saleStepData04,
        apiName:'aplct_info_update_admin',
      })
    }
  }

  //DB 입력폼 별 페이지 노출
  setCurrentPage = (current) => {
    const {rentalStepData01 ,rentalStepData02 ,rentalStepData03 ,rentalStepData04 ,saleStepData01,saleStepData02,saleStepData03,saleStepData04 ,currentStep } = this.state;
    switch(current){
      case 'rental' : return  <ContractRental
      rentalStepData01={rentalStepData01}
      rentalStepData02={rentalStepData02}
      rentalStepData03={rentalStepData03}
      rentalStepData04={rentalStepData04}
      currentStep={currentStep}
      onChangeData={this.onChangeData}
      onClickCheckBox={this.onClickCheckBox}
      onClickPostJson={this.onClickPostJson}
      onClickResult={this.onClickResult}
      onChangeNextStep={this.onChangeNextStep}
      onChangePrevStep={this.onChangePrevStep}
      onClickSetDataRental={this.onClickSetDataRental}
      />
      case 'sale' : return  <ContractSale
      saleStepData01={saleStepData01}
      saleStepData02={saleStepData02}
      saleStepData03={saleStepData03}
      saleStepData04={saleStepData04}
      currentStep={currentStep}
      onChangeData={this.onChangeData}
      onClickCheckBox={this.onClickCheckBox}
      onClickPostJson={this.onClickPostJson}
      onClickResult={this.onClickResult}
      onChangeNextStep={this.onChangeNextStep}
      onChangePrevStep={this.onChangePrevStep}
      onClickSetDataSale={this.onClickSetDataSale}
      />
    }
  }
  //체크박스 클릭 이벤트
  onClickCheckBox = (e) => {
    const { name } = e.target;
    this.setTypeCheckData()[name].value  = !this.setTypeCheckData()[name].value ;
    this.setState(
      this.setTypeCheckData()[name]
    )
  }

  //데이터값 스테이트에 적용
  onChangeData = (e) => {
    const { name ,value} = e.target;
    this.setTypeCheckData()[name].value  = value;
    this.setState(
      this.setTypeCheckData()[name],
    )
  }

  //각 스텝마다 데이터 벨리데이션 체크
  onClickResult = (validationData) => {
    for (const item of Object.values(validationData)) {
      //타입이 없을경우 벨리데이션 체크안함.
      // if(item.value === '' && item.type){
      //   this.setState({
      //     isConfirm:true,
      //     confirmDesc:`${item.name}을 입력해주세요`
      //   })
      //   return false;
      // }
      if(!this.checkDataType(item.type , item.value)){
        console.log('벨류값 오류');
      }
    }
    return true;
  }

  //벨리데이션 타입마다 체크 
  checkDataType = (type ,value) => {
    switch(type){
      case 'date' : return this.checkDate(value)
      default : return true
    }
  }
  //벨리데이션 체크 테스트 
  checkDate = (value) => {
    const test = value  === '111' ? true : false;
    return test;
  }

  //계약서 타입 선택
  onChagneConctractType = (e) => {
    const { value } = e.target;
    this.setState({
      currentPage : value
    })
  }

  //컨펌창 닫기
  onClickHideConfirm = () => {
    this.setState({
      isConfirm:false
    })
  }

  //다음 스텝으로 이동 
  onChangeNextStep = () => {
    const { currentStep } = this.state;
    if(!this.onClickResult(this.setTypeCheckData())) return ; // 현재 스텝에서 벨리데이션 체크 후 이동 
    window.scrollTo(0, 0)
    this.setState({
      currentStep:currentStep + 1,
    })
  }

  //이전 버튼 클릭시 다음 스텝 페이지 노출
  onChangePrevStep = () => {
    const { currentStep } = this.state;
    window.scrollTo(0, 0)
    this.setState({
      currentStep:currentStep - 1,
    })
  }
  //데이터 서버에 저장하기
  onClickSetDataRental= async () => {
    const {rentalStepData01 ,rentalStepData02 ,rentalStepData03 ,rentalStepData04 ,apiName ,id ,currentPage} = this.state;
    const { history } = this.props;
    const config = {
      data : {
        aplct_info :{
          type_form:currentPage,
          pid_aplct_info:id,
          json_info1: JSON.stringify(rentalStepData01),
          json_info2: JSON.stringify(rentalStepData02),
          json_info3: JSON.stringify(rentalStepData03),
          json_info4: JSON.stringify(rentalStepData04),
          json_info1_temp:null,
          json_info2_temp:null,
          json_info3_temp:null,
          json_info4_temp:null,
        }
      }
    }
    console.log(config , 'config' );
    const res = await request.getDataByApiName(apiName,config);
    console.log(res);
    if(res.status === 200) history.push('/contract');
  }
  onClickSetDataSale= async () => {
    const {saleStepData01 ,saleStepData02 ,saleStepData03 ,saleStepData04 ,apiName ,id ,currentPage} = this.state;
    const { history } = this.props;
    const config = {
      data : {
        aplct_info :{
          type_form:currentPage,
          pid_aplct_info:id,
          json_info1: JSON.stringify(saleStepData01),
          json_info2: JSON.stringify(saleStepData02),
          json_info3: JSON.stringify(saleStepData03),
          json_info4: JSON.stringify(saleStepData04),
          json_info1_temp:null,
          json_info2_temp:null,
          json_info3_temp:null,
          json_info4_temp:null,
        }
      }
    }
    console.log(config , 'config' );
    const res = await request.getDataByApiName(apiName,config);
    if(res.status === 200) {
      this.setDataUpdate();
      history.push('/contract');
    }
  }

  //타입별 및 데이터 스텝별 대표 스테이트값 주기 ( 리팩토링 필요함 )
  setTypeCheckData = () => {
    const  { currentPage , currentStep ,rentalStepData01 ,rentalStepData02 ,rentalStepData03 ,rentalStepData04 ,saleStepData01,saleStepData02,saleStepData03,saleStepData04} = this.state;
    if(currentPage === 'rental'){
        switch(currentStep){
          case 1  : return rentalStepData01;
          case 2  : return rentalStepData02;
          case 3  : return rentalStepData03;
          case 4  : return rentalStepData04;
        }
    }
    if(currentPage === 'sale'){
      switch(currentStep){
        case 1  : return saleStepData01;
        case 2  : return saleStepData02;
        case 3  : return saleStepData03;
        case 4  : return saleStepData04;
      }
    }
  }
  render() {
    const { currentPage ,isConfirm,confirmDesc ,contractImg } = this.state;
    const selectValue = [
      {
        title:'임대차 계약 DB 입력',
        value :'rental'
      },
      {
        title:'매매 계약 DB 입력',
        value:'sale',
      }
  
    ]
    return (
      <ContracWrapper>
        <div className="left-box">
            <ButtonGroup>
              <Button bgColor={'#565353'} size={'small'} color={'#fff'} text="계약서" />
              {/* <Button bgColor={'#565353'} size={'small'} color={'#fff'} text="전입신고"/>
              <Button bgColor={'#565353'} size={'small'} color={'#fff'} text="확정일자" /> */}
            </ButtonGroup>
          <WhiteBox>
            <strong className="inner-tit">상세 이미지</strong>
            <div className="img">
              {
                contractImg && <img src={contractImg} alt=""/>
              }
            </div>
          </WhiteBox>
        </div>  
        <div className="right-box">
         <ButtonGroup>
            <SelectBox list={selectValue} name={'currentPage'} onChange={this.onChagneConctractType} />
            <span className="desc">* DB 입력 폼을 선택해주세요.</span>
          </ButtonGroup>
          {
          this.setCurrentPage(currentPage)
          }

        </div>
        <Confirm  isActive={isConfirm} desc={confirmDesc} onClick={this.onClickHideConfirm} />
      </ContracWrapper>
    );
  }
}


export default withRouter(ContractCont);


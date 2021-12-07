import React  ,{useState} from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components"

import EstateStep01 from '../components/EstateStep01';
import EstateStep02 from '../components/EstateStep02';
import EstateStep03 from '../components/EstateStep03';
import EstateStep04 from '../components/EstateStep04';



function ContractSale({ 
  onChangeData ,
  onChangeNextStep,
  onChangePrevStep,
  onClickSetDataSale,
  onClickCheckBox,
  currentStep,
  saleStepData01,
  saleStepData02,
  saleStepData03,
  saleStepData04,

  
}){
  const setStepPage = (step) => {
    switch(step){
      case 1 : return <EstateStep01 detailStepData={saleStepData01} onClickSetDataSale={onClickSetDataSale}onChangePrevStep={onChangePrevStep} onChangeNextStep={onChangeNextStep} onChangeData={onChangeData} onClickCheckBox={onClickCheckBox}/>
      case 2 : return <EstateStep02 detailStepData={saleStepData02} onChangePrevStep={onChangePrevStep} onChangeNextStep={onChangeNextStep} onChangeData={onChangeData} onClickCheckBox={onClickCheckBox}/>
      case 3 : return <EstateStep03 detailStepData={saleStepData03} onChangePrevStep={onChangePrevStep} onChangeNextStep={onChangeNextStep} onChangeData={onChangeData} onClickCheckBox={onClickCheckBox}/>
      case 4 : return <EstateStep04 detailStepData={saleStepData04} onChangePrevStep={onChangePrevStep} onChangeNextStep={onChangeNextStep} onChangeData={onChangeData} onClickCheckBox={onClickCheckBox} onClickSetDataSale={onClickSetDataSale}/>
    }
  }
  return (
    <>
      {setStepPage(currentStep)}
    </>
  )
}


export default withRouter(ContractSale);

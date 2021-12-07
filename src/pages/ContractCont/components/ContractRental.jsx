import React  ,{useState} from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components"

import ContractStep01 from '../components/ContractStep01';
import ContractStep02 from '../components/ContractStep02';
import ContractStep03 from '../components/ContractStep03';
import ContractStep04 from '../components/ContractStep04';



function ContractRental({ 
  onChangeData ,
  onChangeNextStep,
  onChangePrevStep,
  onClickSetDataRental,
  onClickCheckBox,
  currentStep,
  rentalStepData01,
  rentalStepData02,
  rentalStepData03,
  rentalStepData04,
  
}){
  const setStepPage = (step) => {
    switch(step){
      case 1 : return <ContractStep01 detailStepData={rentalStepData01} onChangePrevStep={onChangePrevStep} onChangeNextStep={onChangeNextStep} onChangeData={onChangeData} onClickCheckBox={onClickCheckBox}/>
      case 2 : return <ContractStep02 detailStepData={rentalStepData02} onChangePrevStep={onChangePrevStep} onChangeNextStep={onChangeNextStep} onChangeData={onChangeData} onClickCheckBox={onClickCheckBox}/>
      case 3 : return <ContractStep03 detailStepData={rentalStepData03} onChangePrevStep={onChangePrevStep} onChangeNextStep={onChangeNextStep} onChangeData={onChangeData} onClickCheckBox={onClickCheckBox}/>
      case 4 : return <ContractStep04 detailStepData={rentalStepData04} onChangePrevStep={onChangePrevStep} onChangeNextStep={onChangeNextStep} onChangeData={onChangeData} onClickCheckBox={onClickCheckBox} onClickSetDataRental={onClickSetDataRental}/>
    }
  }
  return (
    <>
      {setStepPage(currentStep)}
    </>
  )
}


export default withRouter(ContractRental);

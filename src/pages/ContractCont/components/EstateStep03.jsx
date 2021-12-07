import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components"

//common component
import WhiteBox from '../../../components/WhiteBox';
import RowTable from '../../../components/RowTable';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import Button from '../../../components/Button';
import ButtonGroup from '../../../components/ButtonGroup';
import SelectBox from '../../../components/SelectBox';
import Checkbox from '../../../components/Checkbox';
import { includingUtilityBills ,paperworkBusinessEntity} from './ContractSelectData';

function EstateStep03({ history ,onChangeData ,detailStepData , onChangeNextStep ,onChangePrevStep ,onClickCheckBox}){
  return (
    <WhiteBox>
      <strong className="inner-tit">3. 계약 및 특약사항</strong>
      <ul className="row-table">
        <li>
          <strong className="row-tit">소유권 이전일</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'ownership'} value={detailStepData.ownership.value} onChange={onChangeData} ph="산정방식 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">관리비</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'administrationCost'} value={detailStepData.administrationCost.value} onChange={onChangeData} ph="금액 입력" />
            <div>
              <Checkbox name={'managementFeeTax'} checked={detailStepData.managementFeeTax.value} onChange={onClickCheckBox} text={'부가세 포함'} />
              <Checkbox name={'includingUtilityBill'} checked={detailStepData.includingUtilityBill.value} onChange={onClickCheckBox} text={'공과금 포함'} />
            </div>
          </div>
          <div className="row-wrap">
            <SelectBox selected={detailStepData.includingUtilityBills.value} list={includingUtilityBills} name={'includingUtilityBills'} onChange={onChangeData} />
          </div>
          <div className="row-wrap">
            <Input name={'septicTankAmount'} value={detailStepData.septicTankAmount.value} onChange={onChangeData} ph="정화조비용" leftIco={'₩'} width={'calc(50% - 10px)'} type='number' />
          </div>
          <div className="row-wrap">
            <Checkbox name={'longTermRepairAllowance'} checked={detailStepData.longTermRepairAllowance.value} onChange={onClickCheckBox} text={'장기수선충담금 부담 있음'} />
          </div>
        </li>
        <li>
          <strong className="row-tit">전기요금</strong>
          <div className="row-wrap">
            <Input name={'electricityChargeCalculation'} value={detailStepData.electricityChargeCalculation.value} onChange={onChangeData} ph="산정방식 입력" />
            <Input name={'electricityBillPayment'} value={detailStepData.electricityBillPayment.value} onChange={onChangeData} ph="납입방식 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">주차장 사용</strong>
          <div className="row-wrap">
            <Input name={'freeParkingLot'} value={detailStepData.freeParkingLot.value} onChange={onChangeData} ph="무상 주차대수 입력" rightIco={'대'} type='number' />
            <Input name={'paidParking'} value={detailStepData.paidParking.value} onChange={onChangeData} ph="유상 주차대수 입력" rightIco={'대'} type='number' />
          </div>
          <div className="row-wrap">
            <Input name={'paidParkingFee'} value={detailStepData.paidParkingFee.value} onChange={onChangeData} ph="유료주차비용 입력" width={'calc(50% - 10px)'} leftIco={'₩'} type='number' />
          </div>
        </li>
        {/* <li>
          <strong className="row-tit">등기 전세권 설정</strong>
          <div className="row-wrap">
            <Input name={'administrationCost'} value={detailStepData.administrationCost.value} onChange={onChangeData} ph="등기 전세권 설정 여부 선택" width={'calc(50% - 10px)'} />
          </div>
        </li> */}
        <li>
          <strong className="row-tit">전세권</strong>
          <div className="row-wrap">
            <div>
              <Checkbox name={'charterRight'} checked={detailStepData.charterRight.value} onChange={onClickCheckBox} text={'전세권 설정여부'} />
            </div>
          </div>
        </li>
        <li>
          <strong className="row-tit">시설 파손 시</strong>
          <div className="row-wrap">
            <Checkbox name={'facilityFailure'} checked={detailStepData.facilityFailure.value} onChange={onClickCheckBox} text={'시설 파손시(임대기간 종료시) 원상복구 의무 여부'} />
          </div>
        </li>
        <li>
          <strong className="row-tit">용도 외 사용</strong>
          <div className="row-wrap">
            <Checkbox name={'useOtherThanUse'} checked={detailStepData.useOtherThanUse.value} onChange={onClickCheckBox} text={'용도외 사용 여부'} />
          </div>
        </li>
        <li>
          <strong className="row-tit">양도 및 전대가능</strong>
          <div className="row-wrap">
            <Checkbox name={'transferSubmission'} checked={detailStepData.transferSubmission.value} onChange={onClickCheckBox} text={'양도 및 전대가능 여부'} />
          </div>
        </li>
        <li>
          <strong className="row-tit">권리금</strong>
          <div className="row-wrap">
            <Checkbox name={'recognitionRights'} checked={detailStepData.recognitionRights.value} onChange={onClickCheckBox} text={'권리금 인정 여부'} />
          </div>
        </li>
        <li>
          <strong className="row-tit">만기전 퇴실</strong>
          <div className="row-wrap">
            <Checkbox name={'checkBeforeExpiration'} checked={detailStepData.checkBeforeExpiration.value} onChange={onClickCheckBox} text={'만기전 퇴실시 중개수수료 부담 주체 '} />
          </div>
        </li>
        <li>
          <strong className="row-tit">중도해약 조건</strong>
          <div className="row-wrap">
            <Textarea height="110px" name={'midtermCancellationConditions'} value={detailStepData.midtermCancellationConditions.value} onChange={onChangeData} ph="내용입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">중도해약통보시기</strong>
          <div className="row-wrap">
            <Input name={'midtermCancellationNotice'} value={detailStepData.midtermCancellationNotice.value} onChange={onChangeData} ph="기간 입력" width={'calc(50% - 10px)'} />
          </div>
        </li>
        <li>
          <strong className="row-tit">기타 중요사항</strong>
          <div className="row-wrap">
            <Textarea height="110px" name={'specificDetails'} value={detailStepData.specificDetails.value} onChange={onChangeData} ph="내용입력" />
          </div>
        </li>
      </ul>
      <ButtonGroup>
          <div className="left-btn">
            <Button text={'취소'} size={'small'} border={'#b9b9b9'} onClick={()=> history.goBack()}/>
            {/* <Button text={'임시저장'} size={'small'} color={'#fff'}  bgColor={'#dc2a33'} /> */}
          </div>
          <div className="right-btn">
            <Button text={'이전'} size={'small'} border={'#b9b9b9'} onClick={onChangePrevStep} />
            <Button text={'다음'} onClick={onChangeNextStep} size={'small'} bgColor={'#2b72ae'} color={'#fff'} />
          </div>
        </ButtonGroup>
    </WhiteBox>
  )
}


export default withRouter(EstateStep03);

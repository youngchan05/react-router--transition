import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components"
import * as request from '../../../apis/request';

//common component
import WhiteBox from '../../../components/WhiteBox';
import RowTable from '../../../components/RowTable';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import Button from '../../../components/Button';
import ButtonGroup from '../../../components/ButtonGroup';
import SelectBox from '../../../components/SelectBox';
import Checkbox from '../../../components/Checkbox';
import { paymentCycle , repairCompletionTime , repairNotRepaired ,AutoExtension} from './ContractSelectData';

function ContractStep02({ history ,onChangeData ,detailStepData ,onChangeNextStep ,onChangePrevStep ,onClickCheckBox}){
  return (
    <WhiteBox>
      <strong className="inner-tit">2.계약내용</strong>
      <ul className="row-table">
        <li>
          <strong className="row-tit">보증금(전세금)</strong>
          <div className="row-wrap">
            <Input name={'deposit'} value={detailStepData.deposit.value} onChange={onChangeData} ph="금액 입력" type={'number'} leftIco={'₩'} />
          </div>
        </li>
        <li>
          <strong className="row-tit">계약금</strong>
          <div className="row-wrap">
            <Input name={'payment'} value={detailStepData.payment.value} onChange={onChangeData} width={'calc(50% - 10px)'} ph="금액 입력" type={'number'} leftIco={'₩'} />
            <div>
              <Checkbox name={'receiptConfirmation'} checked={detailStepData.receiptConfirmation.value} onChange={onClickCheckBox} text={'영수자 확인'} />
            </div>
          </div>
        </li>
        <li>
          <strong className="row-tit">중도금</strong>
          <div className="row-wrap">
            <Input name={'moderateSum'} value={detailStepData.moderateSum.value} onChange={onChangeData} ph="금액 입력" type={'number'} leftIco={'₩'} />
            <Input name={'midTermPaymentDate'} value={detailStepData.midTermPaymentDate.value} onChange={onChangeData} ph="지불일 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">잔금</strong>
          <div className="row-wrap">
            <Input name={'balance'} value={detailStepData.balance.value} onChange={onChangeData} ph="금액 입력" type={'number'} leftIco={'₩'} />
            <Input name={'balancePayment'} value={detailStepData.balancePayment.value} onChange={onChangeData} ph="지불일 입력" type={'number'} />
          </div>
        </li>
        <li>
          <strong className="row-tit">월세</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'monthlyRent'} value={detailStepData.monthlyRent.value} onChange={onChangeData} ph="금액 입력" type={'number'} leftIco={'₩'} />
            <div>
              <Checkbox name={'surtax'} checked={detailStepData.surtax.value} onChange={onClickCheckBox} text={'부가세 포함'} />
            </div>
          </div>
          {/* <div className="row-wrap">
            <SelectBox list={LandSelect} width={'calc(50% - 10px)'} name={detailStepData.paymentMethod.value} onChange={onChangeData} />
          </div> */}
          <div className="row-wrap">
            <SelectBox selected={detailStepData.paymentCycle.value} list={paymentCycle} name={'paymentCycle'} onChange={onChangeData} />
            <Input name={'payday'} value={detailStepData.payday.value} onChange={onChangeData} ph="지불일 입력" type={'number'} />
          </div>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'overdueInterest'} value={detailStepData.overdueInterest.value} onChange={onChangeData} ph="연체시 이자금액 입력" type={'number'} leftIco={'₩'} />
            <div>
              <Checkbox name={'overdueInterestPay'} checked={detailStepData.overdueInterestPay.value} onChange={onClickCheckBox} text={'연체시 이자 없음'} />
            </div>
          </div>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'delinquentInterestRate'} value={detailStepData.delinquentInterestRate.value} onChange={onChangeData} ph="연체이자비율 입력" type={'number'} rightIco={'%'} />
          </div>
        </li>
        <li>
          <strong className="row-tit">임대기간</strong>
          <div className="row-wrap">
            <Input name={'leaseStartPeriod'} value={detailStepData.leaseStartPeriod.value} onChange={onChangeData} ph="시작일 입력" type={'number'} />
            <Input name={'leaseEndPeriod'} value={detailStepData.leaseEndPeriod.value} onChange={onChangeData} ph="종료일 입력" type={'number'} />
          </div>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'rentPeriod'} value={detailStepData.rentPeriod.value} onChange={onChangeData} ph="임대기간 입력(개월)" rightIco={'개월'} type={'number'} />
          </div>
        </li>
        <li>
          <strong className="row-tit">입주전 수리</strong>
          <div className="row-wrap">
            <Checkbox name={'needRepair'} checked={detailStepData.needRepair.value} onChange={onClickCheckBox} text={'수리 필요'} />
          </div>
          <div className="row-wrap">
            <Input name={'repairDetail'} disabled={!detailStepData.needRepair.value} value={detailStepData.repairDetail.value} onChange={onChangeData} ph="수리내용 입력" />
          </div>
          <div className="row-wrap">
            <SelectBox selected={detailStepData.repairCompletionTime.value}  disabled={!detailStepData.needRepair.value} list={repairCompletionTime} name={'repairCompletionTime'} onChange={onChangeData} />
            <Input name={'repairOtherDate'} disabled={!detailStepData.needRepair.value} value={detailStepData.repairOtherDate.value} onChange={onChangeData} ph="기타 일자 입력" type={'number'} />
          </div>
          <div className="row-wrap">
            <SelectBox selected={detailStepData.repairNotRepaired.value} disabled={!detailStepData.needRepair.value} list={repairNotRepaired} name={'repairNotRepaired'} onChange={onChangeData} />
          </div>
          <div className="row-wrap">
            <Input name={'repairCaseDetails'} disabled={!detailStepData.needRepair.value} value={detailStepData.repairCaseDetails.value} onChange={onChangeData} ph="기타 내용" />
          </div>
        </li>
        <li>
          <strong className="row-tit">중개보수료</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'brokerageFeeRatio'} value={detailStepData.brokerageFeeRatio.value} onChange={onChangeData} ph="거래가액 비율 입력" type={'number'} leftIco={'₩'} />
            <div>
              <Checkbox name={'brokerageFeeTax'} checked={detailStepData.brokerageFeeTax.value} onChange={onClickCheckBox} text={'부가세 포함'} />
            </div>
          </div>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'brokerageFee'} value={detailStepData.brokerageFee.value} onChange={onChangeData} ph="중개보수 금액 입력" type={'number'} leftIco={'₩'} />
          </div>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'actualCostBrokerageRepair'} value={detailStepData.actualCostBrokerageRepair.value} onChange={onChangeData} ph="실비 금액 입력" type={'number'} leftIco={'₩'} />
          </div>
        </li>
        <li>
          <strong className="row-tit">계약기간 연장</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'cntrcNtfct'} value={detailStepData.cntrcNtfct.value} onChange={onChangeData} ph="통보기간 입력" type={'number'} />
          </div>
          <div className="row-wrap">
            <SelectBox selected={detailStepData.AutoExtension.value}  list={AutoExtension} name={'AutoExtension'} width={'calc(50% - 10px)'} onChange={onChangeData} />
            <div>
              <Checkbox name={'automaticExtension'} checked={detailStepData.automaticExtension.value} onChange={onClickCheckBox} text={'자동연장 없음'} />
            </div>
          </div>
        </li>
        <li>
          <strong className="row-tit">중개대상물확인/설명서 교부일</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'confirmationRelayTarget'} value={detailStepData.confirmationRelayTarget.value} onChange={onChangeData} ph="일자 입력" type={'number'} />
          </div>
        </li>
        <li>
          <strong className="row-tit">기타 중요사항</strong>
          <div className="row-wrap">
            <Textarea height="110px" name={'contractDetail'} value={detailStepData.contractDetail.value} onChange={onChangeData} ph="내용입력" />
          </div>
        </li>
      </ul>
      <ButtonGroup>
          <div className="left-btn">
            <Button text={'취소'} size={'small'} border={'#b9b9b9'} onClick={()=> history.goBack()}/>
            {/* <Button text={'임시저장'} size={'small'} color={'#fff'} bgColor={'#dc2a33'} /> */}
          </div>
          <div className="right-btn">
            <Button text={'이전'} size={'small'} border={'#b9b9b9'} onClick={onChangePrevStep} />
            <Button text={'다음'} onClick={onChangeNextStep} size={'small'} bgColor={'#2b72ae'} color={'#fff'} />
          </div>
        </ButtonGroup>
    </WhiteBox>
  )
}


export default withRouter(ContractStep02);

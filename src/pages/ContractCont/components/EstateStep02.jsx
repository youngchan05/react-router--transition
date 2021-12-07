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
import { paymentCycle , repairCompletionTime , repairNotRepaired ,AutoExtension} from './ContractSelectData';

function EstateStep02({ history ,onChangeData ,detailStepData ,onChangeNextStep ,onChangePrevStep ,onClickCheckBox}){
  console.log(detailStepData ,'detailStepData')
  return (
    <WhiteBox>
      <strong className="inner-tit">2.계약내용</strong>
      <ul className="row-table">
        <li>
          <strong className="row-tit">매매대금</strong>
          <div className="row-wrap">
            <Input name={'tradingPrice'} value={detailStepData.tradingPrice.value} onChange={onChangeData} ph="금액 입력" leftIco={'₩'} />
            <Input name={'amountLandSold'} value={detailStepData.amountLandSold.value} onChange={onChangeData} ph="토지분금액 입력" leftIco={'₩'} />
          </div>
          <div className="row-wrap">
            <Input name={'amountBuildingsSold'} value={detailStepData.amountBuildingsSold.value} onChange={onChangeData} ph="건물분금액 입력" width={'calc(50% - 10px)'} leftIco={'₩'} />
          </div>
          <div className="row-wrap">
            <div>
              <Checkbox name={'salesSalesTax'} checked={detailStepData.salesSalesTax.value} onChange={onClickCheckBox} text={'부가세 포함'} />
            </div>
            <Input name={'buildingVat'} value={detailStepData.buildingVat.value} onChange={onChangeData} ph="건물분 부가세 입력" width={'calc(50% - 10px)'} leftIco={'₩'} />
          </div>
        </li>
        <li>
          <strong className="row-tit">계약금</strong>
          <div className="row-wrap">
            <Input name={'payment'} value={detailStepData.payment.value} onChange={onChangeData} width={'calc(50% - 10px)'} ph="금액 입력" leftIco={'₩'} />
          </div>
          <div className="row-wrap">
            <div>
              <Checkbox name={'receiptConfirmation'} checked={detailStepData.receiptConfirmation.value} onChange={onClickCheckBox} text={'영수자 확인'} />
            </div>
            <Input name={'recipient'} value={detailStepData.recipient.value} onChange={onChangeData} width={'calc(50% - 10px)'} ph="영수자 입력" leftIco={'₩'} />
          </div>
        </li>
        <li>
          <strong className="row-tit">중도금</strong>
          <div className="row-wrap">
            <Input name={'moderateSum'} value={detailStepData.moderateSum.value} onChange={onChangeData} ph="금액 입력" leftIco={'₩'} />
            <Input name={'midTermPaymentDate'} value={detailStepData.midTermPaymentDate.value} onChange={onChangeData} ph="지불일 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">잔금</strong>
          <div className="row-wrap">
            <Input name={'balance'} value={detailStepData.balance.value} onChange={onChangeData} ph="금액 입력" leftIco={'₩'} />
            <Input name={'balancePayment'} value={detailStepData.balancePayment.value} onChange={onChangeData} ph="지불일 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">융자금</strong>
          <div className="row-wrap">
            <div>
              <Checkbox name={'loanSuccession'} checked={detailStepData.loanSuccession.value} onChange={onClickCheckBox} text={'융자금 승계여부'} />
            </div>
            <Input width={'calc(50% - 10px)'} name={'loanAmount'} value={detailStepData.loanAmount.value} onChange={onChangeData} ph="융자금액 입력" leftIco={'₩'} />
          </div>
          <div className="row-wrap">
            <Input name={'financialInstitution'} value={detailStepData.financialInstitution.value} onChange={onChangeData} ph="금융기관 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">임대보증금(전세금)</strong>
          <div className="row-wrap">
            <div>
              <Checkbox name={'successionRentalDeposit'} checked={detailStepData.successionRentalDeposit.value} onChange={onClickCheckBox} text={'임대보증금 승계여부'} />
            </div>
          </div>
          <div className="row-wrap">
            <Input name={'leaseAmount'} value={detailStepData.leaseAmount.value} onChange={onChangeData} ph="전세금액 입력" />
            <Input name={'charterExpirationDate'} value={detailStepData.charterExpirationDate.value} onChange={onChangeData} ph="전세만료일 입력" />
          </div>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'lent'} value={detailStepData.lent.value} onChange={onChangeData} ph="임차인" />
          </div>
        </li>
        <li>
          <strong className="row-tit">중개보수료</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'brokerageFeeRatio'} value={detailStepData.brokerageFeeRatio.value} onChange={onChangeData} ph="거래가액 비율 입력" leftIco={'₩'} />
            <div>
              <Checkbox name={'brokerageFeeTax'} checked={detailStepData.brokerageFeeTax.value} onChange={onClickCheckBox} text={'부가세 포함'} />
            </div>
          </div>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'brokerageFee'} value={detailStepData.brokerageFee.value} onChange={onChangeData} ph="중개보수 금액 입력" leftIco={'₩'} />
          </div>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'actualCostBrokerageRepair'} value={detailStepData.actualCostBrokerageRepair.value} onChange={onChangeData} ph="실비 금액 입력" leftIco={'₩'} />
          </div>
        </li>
        <li>
          <strong className="row-tit">중개대상물확인/설명서 교부일</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'confirmationRelayTarget'} value={detailStepData.confirmationRelayTarget.value} onChange={onChangeData} ph="일자 입력" />
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


export default withRouter(EstateStep02);

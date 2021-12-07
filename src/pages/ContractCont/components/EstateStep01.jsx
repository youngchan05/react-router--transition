import React  ,{useState} from 'react';
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
import * as request from '../../../apis/request';
import { Sample  ,landCategory ,UnpaidTax ,PrrtyDtdt} from './ContractSelectData';

function EstateStep01({ history ,onChangeData ,detailStepData ,onChangeNextStep }){
  return (
    <WhiteBox>
      <strong className="inner-tit">1.부동산의 표시</strong>
      <ul className="row-table">
        <li>
          <strong className="row-tit">소재지</strong>
          <div className="row-wrap">
            <Input name='location' value={detailStepData.location.value} onChange={onChangeData} ph="도로명 주소 입력" dollar />
          </div>
          <div className="row-wrap">
            <Input name='locationDetail' value={detailStepData.locationDetail.value} onChange={onChangeData} ph="법정동 주소 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">토지</strong>
          <div className="row-wrap">
            <SelectBox selected={detailStepData.landCategory.value} list={landCategory} name={'landCategory'} onChange={onChangeData} />
            <Input name='landArea' value={detailStepData.landArea.value} onChange={onChangeData} ph="면적 입력" rightIco={'㎡'} />
          </div>
          <div className="row-wrap">
            <Input name="alternativeType" value={detailStepData.alternativeType.value} onChange={onChangeData} ph="대지권 종류 입력" />
            <Input name="sbsttRatio" value={detailStepData.sbsttRatio.value} onChange={onChangeData} ph="대지권비율 입력" />
          </div>
          <div className="row-wrap">
            <Input name="landTextarea" value={detailStepData.landTextarea.value} onChange={onChangeData} ph="내용 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">건물</strong>
          <div className="row-wrap">
            <Input name="buildingStructure" value={detailStepData.buildingStructure.value} onChange={onChangeData} ph="구조 입력" />
            <Input name="buildingUse" value={detailStepData.buildingUse.value} onChange={onChangeData} ph="용도 입력" />
          </div>
          <div className="row-wrap">
            <Input name="buildingArea" value={detailStepData.buildingArea.value} onChange={onChangeData} ph="전용면적 입력" rightIco={'㎡'} />
            <Input name="sharedArea" value={detailStepData.sharedArea.value} onChange={onChangeData} ph="공유면적 입력" rightIco={'㎡'} />
          </div>
          <div className="row-wrap">
            <Input name="preSaleArea" value={detailStepData.preSaleArea.value} onChange={onChangeData} ph="분양면적 입력" rightIco={'㎡'} />
            <Input name="largeArea" value={detailStepData.largeArea.value} onChange={onChangeData} ph="대지면저 입력" rightIco={'㎡'} />
          </div>
          <div className="row-wrap">
            <Input name="buildingTextarea" value={detailStepData.buildingTextarea.value} onChange={onChangeData} ph="내용 입력"  rightIco={'㎡'} />
          </div>
        </li>
        <li>
          <strong className="row-tit">기타 중요사항</strong>
          <div className="row-wrap">
            <Textarea name="estateOtherMatters" value={detailStepData.estateOtherMatters.value} onChange={onChangeData} height="110px" ph="내용입력" />
          </div>
        </li>
      </ul>
      <ButtonGroup>
          <div className="left-btn">
            <Button text={'취소'} size={'small'} border={'#b9b9b9'} onClick={()=> history.goBack()}/>
            {/* <Button text={'임시저장'} size={'small'} color={'#fff'} bgColor={'#dc2a33'} /> */}
          </div>
          <div className="right-btn">
              <Button text={'다음'} onClick={onChangeNextStep} size={'small'} bgColor={'#2b72ae'} color={'#fff'} />
          </div>
        </ButtonGroup>
    </WhiteBox>
  )
}


export default withRouter(EstateStep01);

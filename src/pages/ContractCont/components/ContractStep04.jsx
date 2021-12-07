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
import { typeLessorAccount , lessorBank} from './ContractSelectData';
function ContractStep04({ history ,onChangeData ,detailStepData ,onClickSetDataRental ,onChangePrevStep}){
  return (
    <WhiteBox>
      <strong className="inner-tit">4. 임대인 정보</strong>
      <ul className="row-table">
        <li>
          <strong className="row-tit">주소</strong>
          <div className="row-wrap">
            <Input name={'landlordAddress'} value={detailStepData.landlordAddress.value} onChange={onChangeData} ph="주소 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">사업자번호</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'landlordBusinessNumber'} value={detailStepData.landlordBusinessNumber.value} onChange={onChangeData} ph="사업자번호 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">법인(주민)등록번호</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'landlordCorporationNumber'} value={detailStepData.landlordCorporationNumber.value} onChange={onChangeData} ph="법인(주민)등록번호 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">전화번호</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'landlordPhoneNumber'} value={detailStepData.landlordPhoneNumber.value} onChange={onChangeData} ph="전화번호 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">휴대전화번호</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'landlordMobilePhoneNumber'} value={detailStepData.landlordMobilePhoneNumber.value} onChange={onChangeData} ph="휴대전화번호 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">팩스</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'landlordFaxNumber'} value={detailStepData.landlordFaxNumber.value} onChange={onChangeData} ph="팩스 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">상호</strong>
          <div className="row-wrap">
            <Input name={'landlordName'} value={detailStepData.landlordName.value} onChange={onChangeData} ph="상호 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">대표자명</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'landlordSRepresentativeName'} value={detailStepData.landlordSRepresentativeName.value} onChange={onChangeData} ph="대표자명 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">계좌정보</strong>
          <div className="row-wrap">
            <SelectBox selected={detailStepData.typeLessorAccount.value} list={typeLessorAccount} name={'typeLessorAccount'} onChange={onChangeData} />
            <SelectBox selected={detailStepData.lessorBank.value} list={lessorBank} name={'lessorBank'} onChange={onChangeData} />
          </div>
        </li>
        <li>
          <strong className="row-tit">대리인정보</strong>
          <div className="row-wrap">
            <Input name={'rentalAgentAddress'} value={detailStepData.rentalAgentAddress.value} onChange={onChangeData} ph="대리인 주소" />
            <Input name={'rentalAgentResidenceNumber'} value={detailStepData.rentalAgentResidenceNumber.value} onChange={onChangeData} ph="대리인 주민등록번호 주소" />
          </div>
          <div className="row-wrap">
            <Input name={'rentalAgentResidenceName'} value={detailStepData.rentalAgentResidenceName.value} onChange={onChangeData} ph="대리인 성명" width={'calc(50% - 10px)'}  />
          </div>
        </li>
      </ul>
      <strong className="inner-tit">5. 임차인 정보</strong>
      <ul className="row-table">
        <li>
          <strong className="row-tit">주소</strong>
          <div className="row-wrap">
            <Input name={'tenantAddress'} value={detailStepData.tenantAddress.value} onChange={onChangeData} ph="주소 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">사업자번호</strong>
          <div className="row-wrap">
            <Input name={'tenantBusinessNumber'} value={detailStepData.tenantBusinessNumber.value} onChange={onChangeData} ph="주소 입력" width={'calc(50% - 10px)'} />
          </div>
        </li>
        <li>
          <strong className="row-tit">법인(주민)등록번호</strong>
          <div className="row-wrap">
            <Input name={'tenantCorporationNumber'} value={detailStepData.tenantCorporationNumber.value} onChange={onChangeData} ph="법인(주민)등록번호 입력" width={'calc(50% - 10px)'} />
          </div>
        </li>
        <li>
          <strong className="row-tit">전화번호</strong>
          <div className="row-wrap">
            <Input name={'tenantPhoneNumber'} value={detailStepData.tenantPhoneNumber.value} onChange={onChangeData} ph="전화번호 입력" width={'calc(50% - 10px)'} />
          </div>
        </li>
        <li>
          <strong className="row-tit">휴대전화번호</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'tenantMobilePhoneNumber'} value={detailStepData.tenantMobilePhoneNumber.value} onChange={onChangeData} ph="휴대전화번호 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">상호</strong>
          <div className="row-wrap">
            <Input name={'tenantName'} value={detailStepData.tenantName.value} onChange={onChangeData} ph="상호 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">대표자명</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'tenantSRepresentativeName'} value={detailStepData.tenantSRepresentativeName.value} onChange={onChangeData} ph="대표자명 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">대리인정보</strong>
          <div className="row-wrap">
            <Input name={'renterSAddress'} value={detailStepData.renterSAddress.value} onChange={onChangeData} ph="대리인 주소" />
            <Input name={'renterSRepresentativeResidentNumber'} value={detailStepData.renterSRepresentativeResidentNumber.value} onChange={onChangeData} ph="대리인 주민등록번호" />
          </div>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'renterSRepresentativeResidentName'} value={detailStepData.renterSRepresentativeResidentName.value} onChange={onChangeData} ph="대리인 성명" />
          </div>
        </li>
      </ul>
      <strong className="inner-tit">6. 공인중개사 정보</strong>
      <ul className="row-table">
        <li>
          <strong className="row-tit">상호</strong>
          <div className="row-wrap">
            <Input name={'certifiedBrokerName'} value={detailStepData.certifiedBrokerName.value} onChange={onChangeData} ph="상호 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">소재지</strong>
          <div className="row-wrap">
            <Input name={'locationRealEstateAgent'} value={detailStepData.locationRealEstateAgent.value} onChange={onChangeData} ph=" 도로명 주소 입력" />
          </div>
          <div className="row-wrap">
            <Input name={'legalAddressRealtor'} value={detailStepData.legalAddressRealtor.value} onChange={onChangeData} ph="법정동 주소 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">등록번호</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'certifiedBrokerRegistrationNumber'} value={detailStepData.certifiedBrokerRegistrationNumber.value} onChange={onChangeData} ph="등록번호 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">대표자명</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'representativeNameRealEstateAgent'} value={detailStepData.representativeNameRealEstateAgent.value} onChange={onChangeData} ph="대표자명 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">전화번호</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'phoneNumberRealtor'} value={detailStepData.phoneNumberRealtor.value} onChange={onChangeData} ph="전화번호 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">소속공인중개사</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'publicAgent'} value={detailStepData.publicAgent.value} onChange={onChangeData} ph="소속공인중개사 입력" />
          </div>
        </li>
      </ul>
      <strong className="inner-tit">7. 계약일</strong>
      <ul className="row-table">
      <li>
          <strong className="row-tit">계약일자</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'contractDate'} value={detailStepData.contractDate.value} onChange={onChangeData} ph="일자 입력" />
          </div>
        </li>
      </ul>
      <strong className="inner-tit">8. 입력자 정보</strong>
      <ul className="row-table">
        <li>
          <strong className="row-tit">입력자명</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'inputPersonName'} value={detailStepData.inputPersonName.value} onChange={onChangeData} ph="입력자명 입력" />
          </div>
        </li>
        <li>
          <strong className="row-tit">입력자 직번</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'inputPersonSJobNumber'} value={detailStepData.inputPersonSJobNumber.value} onChange={onChangeData} ph="입력자 직번" />
          </div>
        </li>
        <li>
          <strong className="row-tit">입력일시</strong>
          <div className="row-wrap">
            <Input width={'calc(50% - 10px)'} name={'inputDate'} value={detailStepData.inputDate.value} onChange={onChangeData} ph="입력일시 입력" />
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
              <Button text={'DB입력'} size={'small'} onClick={onClickSetDataRental} bgColor={'#2b72ae'} color={'#fff'} />
          </div>
        </ButtonGroup>
    </WhiteBox>
  )
}


export default withRouter(ContractStep04);

import React , {useState}from 'react';

import styled from "styled-components" // 임시

//common Component
import Input from '../../components/Input';
import WhiteBox from '../../components/WhiteBox';
import Tab from '../../components/Tab';
import Button from '../../components/Button';
import Table from '../../components/Table';
import RowTable from '../../components/RowTable';
import Checkbox from '../../components/Checkbox';
import Paging from '../../components/Paging';
import SelectBox from '../../components/SelectBox';
import {Calendar ,CalendarSet } from '../../components/Calendar';
import SortButton from '../../components/SortButton';


//tab static data 
const TabDummy = [
  {
    title:'탭 타이틀',
    value:1,
  },
  {
    title:'탭 타이틀',
    value:2,
  },
  {
    title:'탭 타이틀',
    value:3,
  },
  {
    title:'탭 타이틀',
    value:4,
  },
  {
    title:'탭 타이틀',
    value:5,
  },
]


//select static data 
const SelectListDummy =[
  {
    title:'disabled',
  },
  {
    title:'전체',
    value:1,
  },
  {
    title:'기간',
    value:2,
  },
  {
    title:'월별',
    value:3,
  },
]
//table static data 
const columnsHeader = [
  {
    checkbox:true,
    title:'',
    width:'10%',
  },
  {
    sort:'회원번호',
    width:'10%',
    align:'left',
    name:'pid_user',
  },
  {
    sort:'이름',
    width:'10%',
    align:'left',
    name:'user_name'
  },
  {
    sort:'생년월일',
    width:'10%',
    align:'left',
    name:'birth',
  },
  {
    sort:'이메일 주소',
    width:'auto',
    align:'left',
    name:'email',
  },
  {
    sort:'가입날짜',
    width:'10%',
    align:'left',
    name:'date_register'
  },
  {
    sort:'탈퇴날짜',
    width:'10%',
    align:'left',
    name:'date_widrawal',
  },
  {
    title:'보기',
    width:'10%',
    align:'left'
  },
]
const tabelRow =[
  {
    checkbox:true,
    isActive:false,
  },
  {
    title:11,
    align:'left'
  },
  {
    title:22,
    align:'left'
  },
  {
    title:33,
    align:'left'
  },
  {
    title:44,
    align:'left'
  },
  {
    title:555,
    align:'left'
  },
  {
    title:666 ,
    align:'left'
  },
  {
    detail:777,
    align:'left'
  },
]

const rows = [
  { id: 1, array:[<Checkbox type="checkbox" single/>,'left','right','center']},
  { id: 2, array:[<Checkbox type="checkbox" single/>,'left','right','center']},
  { id: 3, array:['1','2','3','4']},
]

//rowTable static data 
const RowColumns = [
  {
    title:'회원정보',
    desc:<Input ph="회원번호 입력" name="userNumber"/>
  },
  {
    title:'이름',
    desc:<Input ph="회원이름 입력" name="userName"/>
  },
  {
    title:'이메일',
    desc:<Input ph="이메일 입력" name="userEmail"/>
  },
  {
    title:'전화번호',
    desc:<Input ph="전화번호 입력" name="userPhone"/>
  }
]

function StyleGuide () {
  const [ tab , setTab] = useState(1); //tab State Value
  const onClickTab = (e) => {
    setTab(e.target.value)
    console.log(tab);
  }
  return (
    <Wrapper>
      <p>INPUT</p>
      <Input/>
      <p>SELECTBOX</p>
      <SelectBox list={SelectListDummy}/>
      <p>CALENDAR</p>
      <Calendar/>
      <CalendarSet/>
      <p>CHECKBOX</p>
      <Checkbox type="checkbox" single />
      <Checkbox type="checkbox" text={'checkbox'}/>
      <p>WHITEBOX</p>
      <WhiteBox>
        <Input 
          ph='placeHolder'
        />
      </WhiteBox>
      <p>TAB</p>
      <Tab tabValue={tab} tabList={TabDummy} onClick={onClickTab} />
      <p>BUTTON</p>
      <div>
        <div><Button text={'Base'} /></div>
        <div><Button text={'Border'} border={'#b9b9b9'} /></div>
        <div><Button text={'Medium'} size={'medium'} bgColor={'#ffe54f'} /></div>
        <div><Button text={'Small'} size={'small'} bgColor={'#2b72ae'} color={'#fff'} /></div>
        <div><Button text={'Search'} size={'small'} bgColor={'#2b72ae'} color={'#fff'} ico={'search'}/></div>
        <div><Button text={'Reset'} size={'small'} border={'#b9b9b9'} ico={'reset'}/></div>
      </div>
      <p>TABLE</p>
      <WhiteBox>
        <Table columns={columnsHeader} rows={[tabelRow]}/>
      </WhiteBox>
      <p>ROW TABLE</p>
      <WhiteBox>
        <RowTable columns={RowColumns} rowWidth={3}/>
      </WhiteBox>
      <p>ROW GROUP2</p>
      <div className="box-group row-2">
        <WhiteBox title="기본정보">
          <RowTable columns={RowColumns}/>
        </WhiteBox>
        <WhiteBox title="기본정보">
          <RowTable columns={RowColumns}/>
        </WhiteBox>
      </div>
      <p>ROW GROUP3</p>
      <div className="box-group row-3">
        <WhiteBox title="기본정보">
          <RowTable columns={RowColumns}/>
        </WhiteBox>
        <WhiteBox title="기본정보">
          <RowTable columns={RowColumns}/>
        </WhiteBox>
        <WhiteBox title="기본정보">
          <RowTable columns={RowColumns}/>
        </WhiteBox>
      </div>
    </Wrapper>
  )
};

//임시 스타일
const Wrapper = styled.div` 
  width:100%;
  min-height:100vh;
  padding:30px;
  background-color: #f6f6f6;
  >p {
    margin:30px 0 10px 0;
  }
`
Wrapper.defaultProps = {
  columns: [],
  rows:[],
  params:{},
};

export default StyleGuide;



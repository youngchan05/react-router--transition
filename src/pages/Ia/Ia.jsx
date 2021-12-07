import React , {useState}from 'react';
import { Link } from 'react-router-dom';

import styled from "styled-components"
import Table from '../../components/Table';

//common Component
//table static data 
const columns = [
  { headerName: '페이지명', width: '10%' },
  { headerName: '2 DEPTH', width: '10%'},
  { headerName: '3 DEPTH', width: '10%' },
  { headerName: '디자인명', width: '10%' },
  { headerName: '페이지정의', width: '20%' },
  { headerName: '세부사항', width: 'auto' },
  { headerName: '페이지 링크', width: '15%' },
]

const rows = [
  { id: 1, array:['Login','-','-','00_로그인','관리자 로그인페이지','',<Link to="/login">/login</Link>]},
  { id: 2, array:['Member','-','-','01_회원관리_검색','회원관리 및 검색 페이지','',<Link to="/member">/Member</Link>]},
]

function Ia () {
  return (
    <Wrppaer>
      <strong className="title">
        홈큐 관리자 IA
      </strong>
      <Table columns={columns} rows={rows}/>
   </Wrppaer>
  )
};

const Wrppaer = styled.div`
  width:1200px;
  margin:60px auto 20px auto;
  .title {
    display:inline-block;
    margin-bottom:20px;
    font-size:20px;
    
  }
`

export default Ia;



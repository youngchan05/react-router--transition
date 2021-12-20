import React ,{useState} from 'react';
import styled from "styled-components"
import { setItem, getItem } from '../../common/StorageUtils';

import Menu from './Menu';


function Header() {
  const [ myMenu , setMymenu] = useState(false);
  const menuToggle= () => {
    setMymenu(!myMenu)
  }
  const logOut = () => {
    sessionStorage.removeItem('admin');
  }

  return (
    <HeaderWrapper>
      <LogUtil type="button" onClick={()=>logOut()}>
        로그아웃
      </LogUtil>
      <MyPage type="button" onClick={()=> menuToggle()}>
        마이페이지
        <Menu isActive={myMenu} menuToggle={menuToggle}/>
      </MyPage>
    </HeaderWrapper>
  )
};

const HeaderWrapper = styled.div`
  display:flex;
  position:fixed;
  right:0;
  top:0;
  width:calc(100% - 280px);
  height: 60px;
  padding-right:30px;
  align-items:center;
  box-shadow: 0 0 5px 4px rgba(221, 221, 221, 0.35);
  background-color: #ffffff;
  z-index:10;
`
const LogUtil = styled.button`
  margin-left:auto;
  font-size: 14px;
  line-height: 26px;
  font-weight:600;
  text-align: center;
  color: #383838;
`
const MyPage = styled.button`
  position:relative;
  margin-left:36px;
  padding-left:32px;
  font-size: 14px;
  line-height: 26px;
  font-weight:600;
  text-align: center;
  color: #383838;
  background:url(./img/img-profile.png) no-repeat left center /26px auto;
`
export default Header;

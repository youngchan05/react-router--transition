import React from 'react';
import styled from "styled-components"

//common contents
import Lnb from '../Lnb/Lnb';
import Header from '../Header/Header';



const ContentBox = ({ children}) =>  {
  return (
    <Wrapper>
      <Header/>
      <Lnb/>
      {
        children
      }
    </Wrapper>
  )
};
const Wrapper = styled.div`
  position:relative;
  width:100%;
  min-height:100vh;
  padding:90px 30px 30px 310px;
  background-color: #f6f6f6;
  .lnb {
    position:fixed;
    left:0;
    top:0;
    width:280px;
    height:100%;
    background-color: #383838;
  }
`
// props의 초깃값을 정의합니다.
ContentBox.defaultProps = {
  pageDepth: [],
  userName:false,
};

export default ContentBox;

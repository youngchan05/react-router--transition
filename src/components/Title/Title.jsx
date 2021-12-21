import React from 'react';
import styled from "styled-components"

//lnbMenuList

const Title = ({text}) =>  {
  return (
    <PageTitle>
      {
        text
      }
    </PageTitle>
  )
};
const PageTitle = styled.div`
  display:flex;
  margin-bottom:20px;
  span {
    color:#e83942;
    font-size: 18px;
    font-weight: 700;
    line-height: 20px;
  }
  div {
    font-size: 18px;
    font-weight: 700;
    line-height: 20px;
    color: #383838;
    &:nth-last-of-type(1){
      color:#0060ff;
    }
    + div {
      position:relative;
      padding-left:24px;
      &::after {
        position:absolute;
        left:0;
        top:-1px;
        display:block;
        content:">";
        font-size: 18px;
        font-weight: 700;
        line-height: 20px;
        color: #383838;
        transform: translateX(50%);
      }
    }
  }
`
// props의 초깃값을 정의합니다.
export default Title;

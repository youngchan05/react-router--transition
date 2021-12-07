import React from 'react';
import styled from "styled-components"

//lnbMenuList
import { LnbMenu } from '../Lnb/LnbMenu';

const Title = ({pageDepth , userName}) =>  {
  const setPageTitle = () => {
    const titleList = [];
    pageDepth.map((item ,idx) => (
      idx === 0 && titleList.push(<div key={idx}>{LnbMenu[pageDepth[0]].title}</div>),
      idx === 1 && titleList.push(<div key={idx}>{LnbMenu[pageDepth[0]].depth[pageDepth[1]].title}</div>),
      idx === 2 && titleList.push(<div key={idx}>{LnbMenu[pageDepth[0]].depth[pageDepth[1]].depth[pageDepth[2]].title}</div>)
    ))
    return titleList;
  }
  return (
    <PageTitle>
      {
        setPageTitle()
      }
      {userName ? <span>({userName})</span> : ''}
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

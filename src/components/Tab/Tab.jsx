import React from 'react';
import styled from "styled-components"
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Tab = ({tabList ,tabValue ,onClick}) =>  {
  return (
    <Wrapper>
      {
        tabList.map((item , idx) => {
          return <button type="button" className={tabValue == idx + 1 ? 'active' : ''} value={item.value} onClick={(e)=>onClick(idx + 1)}>{item.title}</button>
        })
      }
    </Wrapper>
  )
};
const Wrapper = styled.div`
  display:flex;
  button {
    position:relative;
    width:150px;
    height:41px;
    font-family: NanumSquareR;
    text-align: center;
    color: #1c1c1c;
    font-size:14px;
    letter-spacing: -0.27px;
    text-align: center;
    color: #383838;
    transition:all .2s;
    border-radius: 4px;
    box-shadow: -1px 0 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #dcdcdc;
    &.active {
      font-family: NotoSansCJKkr;
      font-size: 14px;
      font-weight: 500;
      color: #0060ff;
      box-shadow: -1px 0 6px 0 rgba(0, 0, 0, 0.16);
      background-color: #ffffff;
      &::after {
        display:block;
        position:absolute;
        left:0;
        bottom:-5px;
        width:99%;
        height:10px;
        background-color:#fff;
        content:"";
        z-index:10;
      }
    }
    &:not(.active):hover {
        color:#0060ff;
        background-color: rgba(255,255,255, .8);
        box-shadow: 0 0 4px 4px rgba(221, 221, 221, 0.5);
    }
    + button {
    }
  }
`

Tab.defaultProps = {
  onClick : () => {},
  TabList: [],
  tabValue: 1,
};

export default Tab;

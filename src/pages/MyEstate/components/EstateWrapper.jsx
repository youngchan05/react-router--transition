import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components"


//common component
import WhiteBox from '../../../components/WhiteBox';

function EstateWrapper({type_estate ,onClickTabEstate ,children }){
  const  estateTab = [
    {
      title:'관심매물',
    },
    {
      title:'단지알림',
    },
    {
      title:'분양알림',
    }
  ]
  return (
    <Wrapper>
      <WhiteBox>
        <strong className="tit">MY 부동산</strong>
        <div className="tab-group">
          {
            estateTab.map((item , idx) => {
              return (
                <button key={idx + 1} onClick={()=> onClickTabEstate(idx + 1)} className={type_estate === idx + 1 ? 'active' :''}>{item.title}</button>
              )
            })
          }
        </div>
        {children}
      </WhiteBox>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display:flex;
  width:100%;
  .white-box {
    width:405px;
    height:calc(100vh - 218px);
    .tit {
      display:inline-block;
      margin-bottom:16px;
      font-family: NanumSquareEB;
      font-size: 21px;
      letter-spacing: -0.35px;
      color: #1a1a1a;
    }
    .tab-group {
      display:flex;
      justify-content: space-around;
      border-bottom:1px solid #e8e8e8;
      button {
        padding:0 10px;
        font-family: NanumSquareR;
        font-size: 15px;
        text-align: center;
        color: #606060;
        padding-bottom:13px;
        &.active {
          position:relative;
          font-family: NanumSquareB;
          font-size: 15px;
          color: #1a1a1a;
          &::after {
            display:blck;
            position:absolute;
            left:0;
            bottom:0;
            width:100%;
            height:2px;
            content:"";
            background-color:#e83942;
          }
        }
      }
    }
  }
  .estate_pop {
    display:none;
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background-color:#fff;
    overflow:auto;
    &.active {
      display:block;
    }
    > div {
      height:auto;
      padding:0 30px;
    }
    .nav {
      position:relative;
      padding:20px 0;
      text-align:center;
      .close {
        position:absolute;
        left:30px;
        top:50%;
        transform:translateY(-50%);
        width:30px;
        height:30px;
        background:url(./img/btn-close.png) no-repeat center;
      }
      strong {
        font-family: NanumSquareB;
        font-size: 17px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.76;
        letter-spacing: -0.28px;
        text-align: center;
        color: #1a1a1a;
      }
    }
    .pic {
      border-radius:8px;
    }
  }
`
export default withRouter(EstateWrapper);

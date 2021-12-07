import React from 'react';
import styled from "styled-components"


const WhiteBox = ({children ,title ,isActive}) =>  {
  return (
    <Wrapper text={title} isActive={isActive} className="white-box">
      <p className={'title'}>{title}</p>
      {children}
    </Wrapper>
  )
};
const Wrapper = styled.div`
  display:${props => props.isActive ? 'block' :'none'};
  position:relative;
  width:100%;
  height:auto;
  padding:${props => props.text ? '20px 30px 26px 30px;' : '26px 30px;'}
  border-radius: 4px;
  box-shadow: 0 0 5px 4px rgba(221, 221, 221, 0.35);
  border: solid 1px #ececec;
  background-color: #ffffff;
  .right-btn {
    position:absolute;
    right:30px;
    bottom:26px;
    button {
      + button {
        margin-left:12px;
      }
    }
  }
  .inner-tit {
    display:inline-block;
    margin-bottom:20px;
    font-family: NanumSquareB;
    font-size: 16px;
    font-weight: normal;
    color: #383838;
  }
  .title{
    display:${props => props.text ? 'block' :'none'};
    position:relative;
    margin-bottom:26px;
    padding-bottom:20px;
    &::after {
      display:block;
      position:absolute;
      left:-30px;
      bottom:0;
      width:calc(100% + 60px);
      height:1px;
      content:"";
      background-color:#ececec;

      
    }
  }
  + .white-box {
    margin-top:24px;
  }
  .icon-answer {
    display:flex;
    >div {
      position:relative;
      padding-left:64px;
      span {
        position:absolute;
        left:0;
        top:50%;
        transform:translateY(-50%);
      }
      p {
        margin-bottom:10px;
        font-family: NanumSquareB;
        font-size: 14px;
        letter-spacing: -0.23px;
        color: #383838;
      }
      strong {
        font-family: NanumSquareB;
        font-size: 24px;
        letter-spacing: -0.4px;
        color: #383838;
      }
      + div {
        margin-left:60px;
      }
      &.type2 {
        strong {
          color:#2b72ae;
        }
      }
      &.type3 {
        strong {
          color:#dc2a33;
        }
      }
    }
  }
  .category-wrap {
    position:relative;
    display:flex;
    padding-bottom:20px;
    margin-bottom:25px;
    &::after {
      display:block;
      position:absolute;
      left:-26px;
      bottom:0;
      width:calc(100% + 52px);
      height:1px;
      content:"";
      background-color:#ececec;
    }
    strong {
      margin-right:32px;
      flex:0 0 auto;
      font-family: NanumSquareB;
      font-size: 14px;
      line-height:32px;
      letter-spacing: -0.23px;
      color: #383838;
    }
  }
`
WhiteBox.defaultProps = {
  isActive:true,
}

export default WhiteBox;

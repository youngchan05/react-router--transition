import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components"

//common component


function ContracWrapper({ children}){
  return (
      <Wrapper>
      {children}
      </Wrapper>
  )
}
const Wrapper = styled.div`
  position:relative;
  margin-top:24px;
  padding-left:464px;
  .left-box {
    position:absolute;
    left:0;
    top:0;
    width:440px;
    .img {
      background-color:#ddd;
      height:500px;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .btn-group {
    margin-bottom:20px;
    .right-btn {
      right:0;
      bottom:0;
    }
    button {
      + button {
        margin-left:10px;
      }
    }
    .select-box {
      width:178px;
      select {
        background-color:#565353;
        border-radius: 4px;
        color:#fff;
        text-align-last:center;
      }
      &::after {
        background-image:url(./img/triangle-copy-3.png)
      }
    }
  }
  .right-box {
    .btn-group{
      position:relative;
      display:flex;
      align-items:flex-end;
    }
    .desc {
      margin-bottom:4px;
      margin-left:12px;
      font-family: NanumSquareR;
      font-size: 12px;
      color: #dc2a33;
    }
  }
  .row-table{
    display:flex;
    margin:-20px 0 0 -20px;
    flex-wrap: wrap;
    li {
      display:flex;
      position:relative;
      padding-left:120px;
      width:100%;
      flex-wrap:wrap;
      margin:20px 0 0 20px;
      .row-tit{
        display:flex;
        align-items:center;
        position:absolute;
        left:0;
        top:0;
        width:120px;
        height:32px;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: -0.23px;
        color: #383838;
      }
      .row-wrap {
        display:flex;
        width:100%;
        line-height:32px;
        font-size: 13px;
        font-weight: normal;
        letter-spacing: -0.22px;
        color: #383838;
        >div {
          + div {
            margin-left:20px;
          }
        }
        + .row-wrap {
          margin-top:26px;
        }
      }
    }
    + .btn-group {
      margin-top:20px;
    }
    + .inner-tit{
      margin-top:20px;
    }
  }
`


export default withRouter(ContracWrapper);

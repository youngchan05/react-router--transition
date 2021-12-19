import React from 'react';
import styled from "styled-components"
import Input from '../Input';


const Confirm = ({ isActive, desc , onClick}) =>  {
  return (
    <ConfirmWrppaer isActive={isActive}>
      <div className="inner-box">
        <p>{desc}</p>
        <button type="button" onClick={()=> onClick()}>확인</button>
      </div>
    </ConfirmWrppaer>
  )
};
const ConfirmWrppaer = styled.div`
  display:${props => props.isActive ? 'flex' : 'none'};
  align-items:center;
  justify-content:center;
  position: fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index:10;
  .inner-box {
    width:250px;
    background-color:#fff;
    border-radius:10px;
    p {
      padding:28px 0;
      font-size:15px;
      line-height:22px;
      text-align:center;
      color:#1c1c1c;
      white-space: pre-line;
    }
    button {
      width:100%;
      text-align:center;
      padding:14px 0;
      border-top:1px solid #dddddd;
      font-size:15px;
      line-height:22px;
      color:#0060ff;
    }
  }
`



// props의 초깃값을 정의합니다.
Confirm.defaultProps = {
  desc:'',
  onClick: () => {},
};
export default Confirm;

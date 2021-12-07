import React from 'react';
import styled from "styled-components"


const ButtonGroup = ({children ,type}) =>  {
  return (
      <Wrppaer className={type ? `btn-group ${type}` : "btn-group"}>
      {children}
    </Wrppaer>
  )
};
const Wrppaer = styled.div`
  display:flex;
  > div {
    button {
      + button {
        margin-left:12px;
      }
    }
  }
  .left {
    margin-right:auto;
  }
  .right {
    margin-left:auto;
  }
  + table {
    margin-top:20px;
  }
  &.check {
    align-items:center;
    height:100%;
    margin-left:-20px;
    > span {
      margin-left:20px;
    }
  }
`
ButtonGroup.defaultProps = {
  type:'',
}
// props의 초깃값을 정의합니다.
export default ButtonGroup;

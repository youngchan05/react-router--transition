import React from 'react';
import styled from "styled-components"


const SortButton = ({text , onClickSort, name ,isActive}) =>  {
  return (
    <SortItem isActive={isActive}>
      <span>
        <button type="button" className="up" onClick={()=> onClickSort('ASC',name)}></button>
        <button type="button" className="down" onClick={()=> onClickSort('DESC',name)}></button>
      </span>
      {text}
    </SortItem>
  )
};
const SortItem = styled.div`
  position:relative;
  padding-right:16px;
  font-size: 14px;
  letter-spacing: -0.23px;
  color:${props => props.isActive ? '#000' : '#383838'};
  font-family: ${props => props.isActive ? 'NanumSquareEB' : 'NanumSquareB'};
  span {
    display:flex;
    flex-direction: column;
    position:absolute;
    right:0;
    top:50%;
    transform:translateY(-50%);
    button {
      width:6px;
      height:4px;
      &.up {
        background:url(./img/triangle-copy-2.png) no-repeat center;
        margin-bottom:4px;
      }
      &.down {
        background:url(./img/triangle-copy-2.png) no-repeat center;
        transform:rotate(-180deg);
      }
    }
  }

`
SortButton.defaultProps = {
  onClickSort: () => {},
  isActive:false,
};

export default SortButton;

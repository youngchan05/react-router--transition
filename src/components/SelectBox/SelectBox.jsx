import React from 'react';
import styled from "styled-components"

const SelectBox = ({list,width ,height ,onChange ,name ,selected ,disabled}) =>  {
  return (
    <SelectItem width={width} className="select-box">
      <select required name={name} id="" disabled={disabled} onChange={onChange}>
        {
          list.map((item , idx) => (
            item.value ? <option key={idx} selected={item.value === selected ? true : false} value={item.value}>{item.title}</option> : <option key={idx} value="" selected={selected === '' ? true: false} disabled >{item.title}</option>
          ))
        }
      </select>
    </SelectItem>
  )
};
// props의 초깃값을 정의합니다.
SelectBox.defaultProps = {
  onChange: () => {},
  selected:0,
  disabled:false,
};
const SelectItem = styled.div`
  position:relative;
  width:${props => props.width ? props.width : '100%'};
  height:${props => props.height ? props.height : '32px'};
  &::after {
    display: block;
    position: absolute;
    right: 10px;
    top: 50%;
    width: 6px;
    height: 4px;
    background:url(./img/triangle.png) no-repeat center;
    transform: translateY(-50%);
    content: "";
  }
  select {
    width:100%;
    height:100%;
    padding-left:12px;
    border-radius: 2px;
    border:1px solid #dddddd;
    font-size: 13px;
    letter-spacing: -0.22px;
    color: #383838;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    &.disabled {
      border:1px solid #dddddd;
    }
    &:required:invalid {
      color: #b9b9b9;
      background-color: transparent;
    }
  }
`

export default SelectBox;

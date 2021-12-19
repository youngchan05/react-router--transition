import React from 'react';
import styled from "styled-components"
import PropTypes from 'prop-types';


const Input = ({width , height ,type ,ph , name ,onChange ,value , disabled , rightIco , leftIco}) =>  {
  return (
    <Wrapper width={width} height={height} className={'input'} rightIco={rightIco} leftIco={leftIco} >
      <input type={type} value={value} placeholder={ph} disabled={disabled} name={name}onChange={(e)=> onChange(e)} />
    </Wrapper>
  )
};
const Wrapper = styled.div`
  width:${props => props.width ? props.width : '100%'};
  height:${props => props.height ? props.height : '32px'};
  ${props => props.rightIco && 
    ` 
    position:relative;
      &::after {
      display:block;
      position:absolute;
      right:12px;
      top:50%;
      transform:translateY(-50%);
      content:"${props.rightIco}"
    }`
  }
  ${props => props.leftIco && 
    ` 
    position:relative;
      &::before {
      display:block;
      position:absolute;
      left:12px;
      top:50%;
      transform:translateY(-50%);
      content:"${props.leftIco}"
    }`
  }
  input {
    width:100%;
    height:100%;
    padding:12px 9px;
    padding-right:${props => props.rightIco ? '30px' : '9px'};
    padding-left:${props => props.leftIco ? '30px' : '9px'};
    border-radius: 2px;
    border: solid 1px #dddddd;
    font-weight:500;
    font-size: 13px;
    color: #383838;
    background-color:#fff;
    -webkit-box-shadow: 0 0 0 1000px white inset;
    &::placeholder {
      color: #b9b9b9;
    }
    &:disabled {
      color:#ddd;
    }
  }
`
Input.defaultProps = {
  width: '100%',
  height: '32px',
  type:'text',
  ph:'',
  disabled:false,
  onChange: () => {},
};


// props의 초깃값을 정의합니다.
export default Input;

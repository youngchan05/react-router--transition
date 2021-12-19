import React from 'react';
import styled from "styled-components"


const Button = ({size , height ,text ,color,bgColor ,border,ico,onClick}) =>  {
  return (
    <ButtonItem className={size ? `${size}` : ''} height={height} color={color} ico={ico} bgColor={bgColor} border={border} onClick={()=> onClick()}>
      <span className={ico ? `ico` : ''} >{text}</span>
    </ButtonItem>
  )
};
const ButtonItem = styled.button`
  width:190px;
  height:32px;
  color:#383838;
  background-color:${props => props.bgColor ? props.bgColor : '#fff'};
  font-family: NanumSquareB;
  font-size: 13px;
  line-height:32px;
  letter-spacing: -0.22px;
  text-align: center;
  color:${props => props.color ? props.color : '#383838'};
  border-radius: 4px;
  border:1px solid ${props => props.border ? props.border : 'transparent'};
  .ico {
    display:inline-block;
    padding-left:${props => props.ico ? '20px' : '0'};
    background:url(./img/ic-${props => props.ico ? props.ico : ''}.png) no-repeat left center;
    
  }
  &:hover {
    opacity:0.6;
  }
  &.medium {
    width:120px;
  }
  &.small {
    width:92px;
  }
  &.full {
    width:100%;
  }
`
const Icon = styled.span`
  display:${props => props.isActive ? 'flex' : 'none'};
`
Button.defaultProps = {
  onClick: () => {},
};

// props의 초깃값을 정의합니다.
export default Button;

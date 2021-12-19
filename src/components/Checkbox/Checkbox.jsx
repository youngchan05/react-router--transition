import React from 'react';
import styled from "styled-components"


const Checkbox = ({type ,text,onChange ,single , name ,checked}) =>  {
  return (
    <Wrapper isSingle={single} className="checkbox">
      <input type={type} name={name} checked={checked} onChange={onChange}/>
      <span className={type}>{text ? text : 'check'}</span>
    </Wrapper>
  )
};
const Wrapper = styled.span`
  position:relative;
  display:inline-block;
  height:${props => props.isSingle ? '20px' : 'auto'};
  width:${props => props.isSingle ? '20px' : 'auto'};
  input {
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    opacity:0;
    &:checked + .checkbox {
      background:url(./img/btn-check-active.png) no-repeat left center;
    }
  }
  span {
    display:inline-block;
    width:${props => props.isSingle ? '20px' : 'auto'};
    height:${props => props.isSingle ? '20px' : 'auto'};
    padding-left:${props => props.isSingle ? '0' : '30px'};
    line-height: 20px;
    font-size:${props => props.isSingle ? '0' : '14px'};
    letter-spacing: -0.23px;
    color: #383838;
    &.checkbox {
      background:url(./img/btn-check-normal.png) no-repeat left center;
    }
  }
  & + .checkbox {
    margin-left:22px;
  }
`
Checkbox.defaultProps = {
  type:'checkbox',
  text:'checkbox',
  name:'',
  single:false,
  onChange : () => {
  },
};

// props의 초깃값을 정의합니다.
export default Checkbox;

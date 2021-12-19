import React from 'react';
import styled from "styled-components"
import PropTypes from 'prop-types';


const Textarea = ({width , height ,type ,ph , name ,onChange ,value , disabled}) =>  {
  return (
    <Wrapper width={width} height={height} className="input">
      <textarea value={value} placeholder={ph} disabled={disabled} name={name} onChange={(e)=> onChange(e)} />
    </Wrapper>
  )
};
const Wrapper = styled.div`
  width:${props => props.width ? props.width : '100%'};
  height:${props => props.height ? props.height : '524px'};
  textarea {
    width:100%;
    height:100%;
    padding:12px 9px;
    border-radius: 2px;
    border: solid 1px #dddddd;
    font-weight:500;
    font-size: 13px;
    color: #383838;
    background-color:#fff;
    resize:none;
    outline:none;
    &:placeholder {
      color: #b9b9b9;
    }
    &:disabled {
      color:#ddd;
    }
  }
  + .btn-group {
    margin-top:20px;
  }
`
Textarea.defaultProps = {
  width: '100%',
  height: '524px',
  ph:'',
  value:'',
  disabled:false,
  onChange: () => {},
};


// props의 초깃값을 정의합니다.
export default Textarea;

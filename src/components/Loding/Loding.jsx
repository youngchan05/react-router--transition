import React  from 'react';
import styled from "styled-components"

const Loding = () => (
  <Wrapper>
    <div className="spinner">
      <div className="rect1" />
      <div className="rect2" />
      <div className="rect3" />
      <div className="rect4" />
      <div className="rect5" />
    </div>
  </Wrapper>
);

const Wrapper = styled.div`
  position:relative;
  background-color:#fff;
  .spinner {
    position:fixed;
    left:50%;
    top:50%;
    margin-top:-25px;
    margin-left:-20px;
    width: 50px;
    height: 40px;
    text-align: center;
    font-size: 10px;
  }

  .spinner > div {
    /* background-color: #ff5a00; */
    background-color: #0060ff;
    height: 100%;
    width: 6px;
    opacity:.8;
    display: inline-block;
    margin:0 1px;
    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
  }

  .spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  .spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  @-webkit-keyframes sk-stretchdelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
    20% { -webkit-transform: scaleY(1.0) }
  }

  @keyframes sk-stretchdelay {
    0%, 40%, 100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }  20% {
      transform: scaleY(1.0);
      -webkit-transform: scaleY(1.0);
    }
  }
`;

export default Loding;

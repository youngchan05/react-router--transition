import React  from 'react';
import styled from "styled-components"

const Spinner = () => (
  <Wrapper>
    <span className="cssload-loader"><span className="cssload-loader-inner"></span></span>
  </Wrapper>
);

const Wrapper = styled.div`
  position:fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background-color: rgba(0,0,0,.8);
  .cssload-loader {
    margin:0 auto;
    width: 29px;
    height: 29px;
    position: relative;
    border: 4px solid #499fb6;
    animation: cssload-loader 3.5s infinite ease;
      -o-animation: cssload-loader 3.5s infinite ease;
      -ms-animation: cssload-loader 3.5s infinite ease;
      -webkit-animation: cssload-loader 3.5s infinite ease;
      -moz-animation: cssload-loader 3.5s infinite ease;
  }
  .cssload-loader-inner {
    vertical-align: top;
    display: inline-block;
    width: 100%;
    background-color: #499fb6;
    animation: cssload-loader-inner 3.5s infinite ease-in;
      -o-animation: cssload-loader-inner 3.5s infinite ease-in;
      -ms-animation: cssload-loader-inner 3.5s infinite ease-in;
      -webkit-animation: cssload-loader-inner 3.5s infinite ease-in;
      -moz-animation: cssload-loader-inner 3.5s infinite ease-in;
  }


  @keyframes cssload-loader {
    0% {
      transform: rotate(0deg);
    }
    
    25% {
      transform: rotate(180deg);
    }
    
    50% {
      transform: rotate(180deg);
    }
    
    75% {
      transform: rotate(360deg);
    }
    
    100% {
      transform: rotate(360deg);
    }
  }

  @-o-keyframes cssload-loader {
    0% {
      transform: rotate(0deg);
    }
    
    25% {
      transform: rotate(180deg);
    }
    
    50% {
      transform: rotate(180deg);
    }
    
    75% {
      transform: rotate(360deg);
    }
    
    100% {
      transform: rotate(360deg);
    }
  }

  @-ms-keyframes cssload-loader {
    0% {
      transform: rotate(0deg);
    }
    
    25% {
      transform: rotate(180deg);
    }
    
    50% {
      transform: rotate(180deg);
    }
    
    75% {
      transform: rotate(360deg);
    }
    
    100% {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes cssload-loader {
    0% {
      transform: rotate(0deg);
    }
    
    25% {
      transform: rotate(180deg);
    }
    
    50% {
      transform: rotate(180deg);
    }
    
    75% {
      transform: rotate(360deg);
    }
    
    100% {
      transform: rotate(360deg);
    }
  }

  @-moz-keyframes cssload-loader {
    0% {
      transform: rotate(0deg);
    }
    
    25% {
      transform: rotate(180deg);
    }
    
    50% {
      transform: rotate(180deg);
    }
    
    75% {
      transform: rotate(360deg);
    }
    
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes cssload-loader-inner {
    0% {
      height: 0%;
    }
    
    25% {
      height: 0%;
    }
    
    50% {
      height: 100%;
    }
    
    75% {
      height: 100%;
    }
    
    100% {
      height: 0%;
    }
  }

  @-o-keyframes cssload-loader-inner {
    0% {
      height: 0%;
    }
    
    25% {
      height: 0%;
    }
    
    50% {
      height: 100%;
    }
    
    75% {
      height: 100%;
    }
    
    100% {
      height: 0%;
    }
  }

  @-ms-keyframes cssload-loader-inner {
    0% {
      height: 0%;
    }
    
    25% {
      height: 0%;
    }
    
    50% {
      height: 100%;
    }
    
    75% {
      height: 100%;
    }
    
    100% {
      height: 0%;
    }
  }

  @-webkit-keyframes cssload-loader-inner {
    0% {
      height: 0%;
    }
    
    25% {
      height: 0%;
    }
    
    50% {
      height: 100%;
    }
    
    75% {
      height: 100%;
    }
    
    100% {
      height: 0%;
    }
  }

  @-moz-keyframes cssload-loader-inner {
    0% {
      height: 0%;
    }
    
    25% {
      height: 0%;
    }
    
    50% {
      height: 100%;
    }
    
    75% {
      height: 100%;
    }
    
    100% {
      height: 0%;
    }
  }
`;

export default Spinner;

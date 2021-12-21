import React ,{useState , useEffect} from 'react';
import styled from "styled-components"
import { Link, useNavigate } from 'react-router-dom';

//lnb menuList
import { LnbMenu } from './LnbMenu';
 const Lnb = ({id}) => {
  const [ depth , setDepth ] = useState(LnbMenu);
  const navigate = useNavigate();
  return (
    <LnbWrapper className="lnb">
      <h1 className="logo">
        <img src="./img/img-logo-1.png" alt="logo" />
      </h1>
      <LnbItem>
        {
          depth.map((item , idx)=> {
            //dpeth base create
            return (
              <LnbDepth key={idx + 1} className={item.id === id ? 'active depth' : 'depth'}>
                  <span onClick={() => navigate(item.link)} >{item.title}</span>
              </LnbDepth>
            )
          })
        }
      </LnbItem>
    </LnbWrapper>
  )
};

const LnbDepth = styled.li`
  display:${props => props.hide ? 'none':'block'};
   > span {
    display:inline-block;
    width:100%;
    padding:24px 17px;
    font-family: NanumSquareB;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.23px;
    color: #ffffff;
  }
  ul {
    overflow: hidden;
    max-height:0;
    transition: all 0.5s ease-in-out;
    li {
      a {
        display:block;
        padding:17px 24px;
        background-color:#252525;
        > span {
          display:inlnie-block;
          padding-left:24px;
        }
      }
    }
  }
  &.active {
    > ul {
      max-height:500px;
    }
    a {
      &::after {
        transform:rotate(180deg);
      }
    }
  }
  &.depth {
    >a {
      position:relative;
      &::after {
        display:block;
        position:absolute;
        content:"";
        width:8px;
        height:6px;
        top:50%;
        right: 16px;
        background:url(./img/triangle-copy.png) no-repeat center;
        transition: all 0.2s ease;
      }
    }
    &.active {
      background-color:#252525;
    }
    > ul {
      > li {
        > a {
          > span {
            background:url(./img/ic-next.png) no-repeat left center;
          }
        }
      }
    }
  }
`
const LnbWrapper = styled.div`
  padding-top:60px;
  position:fixed;
  left:0;
  top:0;
  width:280px;
  height:100%;
  background-color: #383838;
  .logo {
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:60px;
    background-color:#fff;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      line-height:60px;
    }
  }
`
const LnbItem = styled.ul`
  height:100%;
  overflow:auto;
`
const LogoWrap = styled.div`
  display:flex;
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:60px;
  align-items:center;
  justify-content: center;
  background-color: #0060ff;
`

// props의 초깃값을 정의합니다.
export default Lnb;

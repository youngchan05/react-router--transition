import React from 'react';
import styled from "styled-components"
import { Link } from 'react-router-dom';


const Menu = ({menuToggle,isActive}) =>  {
  return (
    <Wrapper isActive={isActive}>
      <ul>
        <li>
          <Link to="/mypage/myinfo">내정보</Link>
        </li>
        <li>
          <Link to="/admin">구성원 관리</Link>
        </li>
      </ul>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display:${props => props.isActive ? 'block' : 'none'};
  position:relative;
  &::after {
    display:block;
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    content:"";
  }
  ul{
    position:absolute;
    top:10px;
    left:-30%;
    transform: translateX(-50%);
    width:174px;
    padding:26px 24px;
    border-radius: 4px;
    box-shadow: 0 0 4px 2px rgba(150, 150, 150, 0.5);
    background-color: #ffffff;
    z-index:10;
    li {
      width:100%;
      text-align:left;
      a {
          font-family: NanumSquareR;
          font-size: 14px;
          letter-spacing: -0.23px;
          color: #383838;
          &:hover {
            font-family: NanumSquareB;
            color: #383838;
            text-decoration:underline;
        }
      }
      + li {
        margin-top:26px;
      }
    }
  }

`
export default Menu

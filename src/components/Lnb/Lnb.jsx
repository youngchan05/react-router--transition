import React ,{useState , useEffect} from 'react';
import styled from "styled-components"
import { Link } from 'react-router-dom';

//lnb menuList
import { LnbMenu } from './LnbMenu';
 function Lnb({pageDepth}){
   useEffect(() => {
    // setDepth(
    //   depth.map((item ,idx) =>(
    //     idx == pageDepth[0] ? { ...item, isActive: !item.isActive } : item
    //   ))
    // );
  },[]);
   const [ depth , setDepth ] = useState(LnbMenu);
   const onClickDepth = (id , hasDepth) => {
     if(hasDepth){
       //2dpeth click EVENT
        setDepth(
          depth.map(item =>(
            item.depth.map(selector => (
              selector.id == id ? selector.isActive = !selector.isActive  : selector
            ))
          ))
        );
     }
      setDepth(
        //dpeth click EVENT
        depth.map(item =>(
          item.id == id ? { ...item, isActive: !item.isActive } : item
        ))
      );
   }
   const createDepth = (item) =>{
     //dpeth create function
    if(!item.depth) return;
    return (
      <ul>
        {
          item.depth.map((item , idx) => {
            return (
              <LnbDepth key={idx + 1} hide={item.hide} className={item.isActive ? 'active' : ''}>
                <Link to={item.link} onClick={() => onClickDepth(item.id , item)} ><span>{item.title}</span></Link>
                {createDepth(item)}
              </LnbDepth>
            )
          })
        }
      </ul>
    )
  }
  return (
    <LnbWrapper className="lnb">
      <LogoWrap>
        <img src="./img/img_story_white.png" alt="LOGO"/>
      </LogoWrap>
      <LnbItem>
        {
          depth.map((item , idx)=> {
            //dpeth base create
            return (
              <LnbDepth key={idx + 1} hide={item.hide}  className={item.isActive ? 'active depth' : 'depth'}>
                <Link to={item.link} onClick={() => onClickDepth(item.id)}>{item.title}</Link>
                {createDepth(item)}
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
  a {
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

import React from 'react';
import styled from "styled-components"


const Paging = ({pageRange , onClick ,params , pageMax , pageStart}) =>  {
  return (
    <PagingItem>
      {
        pageRange.length > 0 && 
          <div className="inner">
            <button type="button" className="prev" disabled={params.seq === 0} onClick={()=>onClick(params.seq - 1 ,'prev')}></button>
            <div className="numbers">
              {
                console.log(pageRange ,'pageRange'),
                pageRange.map((item ,idx) => {
                  console.log(pageStart, item.seq)
                  if(pageMax > idx && item.seq + 1 >= pageStart){
                    return (
                      <button key={idx + 1} className={item.isActive ? 'active' : ''} type="button" onClick={()=>onClick(item.seq)}>{item.title}</button>
                    )
                  }
                })
              }
            </div>
            <button type="button" className="next" disabled={params.seq === pageRange.length - 1} onClick={()=>onClick(params.seq + 1 ,'next')}></button>
          </div>
        } 
    </PagingItem>
  )
};
const PagingItem = styled.div`
  display:flex;
  margin-top:30px;
  justify-content:center;
  .inner {
    display:flex;
    button {
      width:32px;
      height:32px;
      border:1px solid #ececec;
      border-left:none;
      font-size: 14px;
      letter-spacing: -0.23px;
      text-align: center;
      color: #383838;
      &.active {
        background-color:#2b72ae;
        color:#fff;
      }
      &.prev {
        border:1px solid #ececec;
        border-radius:4px 0 0 4px;
        background:url(./img/btn-left-normal.png) no-repeat center;
        &:disabled {
          background:url(./img/btn-left-disable.png) no-repeat center;
        }
      }
      &.next {
        border-radius:0 4px 4px 0;
        background:url(./img/btn-right-normal.png) no-repeat center;
        &:disabled {
          transform:retate(-180deg);
          background:url(./img/btn-right-disable.png) no-repeat center;
        }
      }
    }
  }
  
`
Paging.defaultProps = {
  pageMax:10,
  pageStart:1,
}
// props의 초깃값을 정의합니다.
export default Paging;

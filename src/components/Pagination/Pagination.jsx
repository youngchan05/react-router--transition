import React ,{useState ,useEffect} from 'react';

import * as request from '../../apis/request';
import styled from "styled-components"


const Pagination = ({params , apiName ,outPut , pageStart ,pageMax}) =>  {
  const [ pageNumer , setPageNumber] = useState([]);
  const [ pageLength ,setPageLength] = useState([pageStart ,pageMax])
  useEffect(() => {
    getPagination();
  }, [])

  const getPagination = async() => {
    const data = await request.getDataByApiName(apiName , params);
    createPagination(data.results[0]['COUNT(*)']);
  }
  
  const createPagination = (pageCount) => {
    const rang = Math.floor( pageCount / params.interval)
    const rangLength = pageCount / params.interval >  rang ? rang + 1: rang;
    const rangAry = [];
    for(let  i = 0; i < rangLength; i++){
      rangAry.push(
        {
          title:i + 1,
          seq : i,
          isActive:i === 0 ? true : false,
        }
      )
    }
    setPageNumber([...rangAry])
  }

  const onClickPageination = (idx ,type) => {
    outPut(idx)
    setPageNumber(
      pageNumer.map(item => (
        item.seq === idx ? {...item ,isActive:true} : {...item ,isActive:false} 
      ))
    )
    const remainder = idx % pageMax ;
    if(idx === 0 ) return ;
    if(idx > pageLength[1] && type === 'next'){
      setPageLength([
        pageLength[0] + pageMax  + 1,
        pageLength[1] + pageMax ,
      ])
    }
    if( type === 'prev' && remainder === 0){
      setPageLength([
        pageLength[0] - pageMax - 1,
        pageLength[1] - pageMax,
      ])
    }
  }
  return (
    <PagingItem>
      {
        pageNumer.length > 0 && 
          <div className="inner">
            <button type="button" className="prev" disabled={params.seq === 0} onClick={()=>onClickPageination(params.seq - 1 ,'prev')}></button>
            <div className="numbers">
              {
                pageNumer.map((item ,idx) => {
                  if(idx > pageLength[1] || idx < pageLength[0]) return
                  return (
                    <button key={idx + 1} className={item.isActive ? 'active' : ''} type="button" onClick={()=>onClickPageination(item.seq)}>{item.title}</button>
                 )
                })
              }
            </div>
            <button type="button" className="next" disabled={params.seq === pageNumer.length - 1} onClick={()=>onClickPageination(params.seq + 1 ,'next')}></button>
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
Pagination.defaultProps = {
  pageStart:0,
  pageMax:4,
}
// props의 초깃값을 정의합니다.
export default Pagination;

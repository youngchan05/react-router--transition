import React from 'react';
import styled from "styled-components"
import SortButton from '../SortButton';
import Checkbox from '../Checkbox';
import { Link } from 'react-router-dom';


const Table = ({columns , rows ,onClickSort ,getDetailPage,onClickCheck ,params ,tableType }) =>  {
  return (
   <TableWrapper className={tableType ? tableType : ''} >
     <colgroup>
      {
        columns.map( (item,idx) => (<col key={idx + 1} style={{'width':item.width}}/>))
      }
     </colgroup>
     <thead>
       {
        columns.map((item , idx) => {
          return (
            <tr key={idx + 1}>
              {
                item.map((thItem ,index) => {
                  return (
                    <th align={thItem.align ?  thItem.align  :'center'} key={index+ 1} style={{'width':thItem.width}}>
                    {
                      thItem.checkbox && <Checkbox single type="checkbox" onChange={(e)=>onClickCheck(e ,thItem.test)}/>
                    }
                    {
                      thItem.sort && <SortButton isActive={params.col_order == thItem.name ? thItem.name : ''} onClickSort={onClickSort} text={thItem.sort} name={thItem.name}></SortButton>
                    }
                    {
                      thItem.title
                    }
                  </th>
                  )
                })
              }
            </tr>
          )
        }) 
       }
     </thead>
     <tbody>
       {
         rows.length > 0 ?
            rows.map((item , idx) =>{
              return (
                <tr key={idx + 1}>
                {
                  item.map((row ,idxRow) => (
                    <td align={row.align ?  row.align  :'center'} key={idxRow + 1}>
                    {
                      row.checkbox && <Checkbox single type="checkbox" checked={row.isActive} onChange={(e)=>onClickCheck(e , idx)}/>
                    }
                    {
                      row.detail && <Link to={getDetailPage(row.detail)} className="detail-link" type="Link">상세보기</Link>
                    }
                    {
                      row.title
                    }
                  </td>
                  ))
                }
              </tr>
              )
            }) 
          :
          <tr className="none-data">
            <td colSpan={columns[0].length}>등록된 정보가 없습니다.</td>
          </tr>
       }
     </tbody>
   </TableWrapper>
  )
};

const TableWrapper = styled.table`
  width:100%;
  border: solid 1px #ececec;
  &.type1 {
    thead {
      tr {
        th {
          height:auto;
          padding:14px 10px 10px 10px;
        }
        + tr {
          th {
            font-family: NanumSquareR;
            padding:0 10px 14px 10px;
          }
        }
      }
    }
  }
  thead {
    tr {
      th {
        padding:0 10px;
        height:48px;
        font-family: NanumSquareB;
        font-size: 14px;
        line-height:16px;
        color: #383838;
        background-color: #f6f6f6;
        vertical-align:middle;
      }
    }
  }
  tbody{
    tr {
      &.none-data {
        td {
          height:500px;
          text-align:center;
          color:#7a7a7a;
        }
      }
      td {
        padding:0 10px;
        height:48px;
        vertical-align:middle;
        font-family: NanumSquareR;
        font-size: 14px;
        letter-spacing: -0.23px;
        color: #383838;
        background-color:#fff;
        .red-color {
          color:#dc2a33;
        }
      }
      + tr {
        td {
          border-top:1px solid #ececec;
        }
      }
    }
  }
  .detail-link {
    font-family: NanumSquareR;
    font-size: 14px;
    letter-spacing: -0.23px;
    color: #2b72ae;
    text-decoration:underline;
  }
  + .btn-group {
    margin-top:20px;
  }
`


// props의 초깃값을 정의합니다.
Table.defaultProps = {
  columns: [],
  rows:[[]],
  getDetailPage: () => {},
  params:{
    col_order: 'pid_user',
  }
};

export default Table;

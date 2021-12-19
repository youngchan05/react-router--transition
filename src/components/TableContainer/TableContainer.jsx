import React from 'react';
import styled from "styled-components"
import SortButton from '../SortButton';
import Checkbox from '../Checkbox';
import { Link } from 'react-router-dom';

import {testColumns} from '../TableColumns';
const TableContainer = ({ columns }) =>  {
  const columnsType = (item) => {
    switch(item.type){
      case 'checkbox' : return (
        <Checkbox single type="checkbox" />
      )
      case 'sort' : return (
        <SortButton text={item.title}></SortButton>
      )
      default : return <span>{item.title}</span>
    }
  }
  const getBodyColumn = () =>{
    const test = columns.map((item ,idxTr) => {
      return (
        <tr key={idxTr + 1}>
          {
            testColumns[0].map((data ,idx) => {
              console.log(data ,'data')
              return <td key={idx + 1}>{item[data.field]}</td>
            })
          }
        </tr>
      )
    })
    return test;
  }
  const tableHeader = () => {
    return (
      <thead>
        {
          testColumns.map((itemTr ,idxTr ) => {
            return (
              <tr key={idxTr + 1} >
                {
                  itemTr.map((item ,idx) => {
                    return (
                      <th key={idx + 1} align={item.align ?  item.align  :'center'} colSpan={item.colspan} rowSpan={item.rowspan}>
                        {
                          columnsType(item)
                        }
                      </th>
                    )
                  }
                )}
              </tr>
            )
          })
        }
      </thead>
    )
  }
  return (
   <TableWrapper>
    {
      tableHeader()
    }
    <tbody>
      {
        getBodyColumn()
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
TableContainer.defaultProps = {
  columns: [],
  rows:[[]],
  getDetailPage: () => {},
  params:{
    col_order: 'pid_user',
  }
};

export default TableContainer;

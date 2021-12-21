import React ,{useState, useEffect}from 'react';
import styled from "styled-components"
import SortButton from '../SortButton';
import Checkbox from '../Checkbox';
import {formatDateYMDWithTime}  from '../../common/Utils'
import { useNavigate } from 'react-router';

const Table = (Columns,fetchHendler,config) =>  {
  const [ column, setColumn] = useState(Columns);
  const [ params, setParams] = useState(config)
  const [skip, setSkip] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(skip) return;
    fetchHendler(params)
  }, [params])
  const onClickSort = (type,name) => {
    setSkip(false);
    setParams({
      params:{
        ...params.params,
        col_order:name,
        sort:type
      }
    });
  }
  const tableTh = (item) => {
    if(item.checkbox) return <Checkbox single type="checkbox" />
    if(item.sort) return <SortButton onClick={onClickSort} text={item.title} name={item.name}/>
    return item.title 
  }
  const tableTd = (item) => {
    const td = column.map((cItem, idx) =>{
      return <td align={cItem.align ?  cItem.align  :'center'} key={idx +1}>{tdType(item,cItem)}</td>
    })
    return td;
  }
  const tdType = (item, cItem) => {
    switch(cItem.type){
      case 'date' : return formatDateYMDWithTime(item[cItem.name]);
      case 'checkbox' : return <Checkbox single type="checkbox" />;
      case 'detail' : return  <span className="detail-link" onClick={ ()=>navigate(`detail/${item.cmplx_pid}`) }>상세보기</span>
      default : return item[cItem.name]
    }
  }
  const createTable = (bodyData) => {
    return(
      <TableWrapper>
        <colgroup>
          {
            column.map( (item,idx) => (<col key={idx + 1} style={{'width':item.width}}/>))
          }
        </colgroup>
        <thead>
          <tr>
              {
                column.map((item, idx) => {
                  return <th align={item.align ?  item.align  :'center'} key={idx+ 1} >
                    {tableTh(item)}
                  </th>
                })
              }
          </tr>
        </thead>
        <tbody>
          {
            bodyData.length === 0 ?
            <tr>
              <td style={{height:'500px'}} align='center' colSpan={column.length}>
                검색결과가 없습니다. <br/><br/>검색조건을 변경하여 재검색해주세요.
              </td>
            </tr>
            :
              bodyData.map((item, idx) => {
                return <tr key={+idx}>{tableTd(item)}</tr>
              })
          }
        </tbody>
      </TableWrapper>
    )
  }
  return {createTable}
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
  column: [],
  rows:[[]],
  getDetailPage: () => {},
  params:{
    col_order: 'pid_user',
  }
};

export default Table;

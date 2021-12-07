import React from 'react';
import styled from "styled-components"


const RowTable = ({columns , rowWidth ,textType}) =>  {
  return (
   <RowTableWrapper rowWidth={rowWidth}>
     {
       columns.map((item , idx) => (
         <li key={idx + 1} style={{'width': item.width}}>
           <RowTitle widths={item.titleWidth}  className="row-tit">{item.title}</RowTitle>
           <div>
             {item.desc}
           </div>
         </li>
       ))
     }
   </RowTableWrapper>
  )
};

const RowTableWrapper = styled.ul`
  display:flex;
  margin:-24px 0 0 -30px;
  flex-wrap: wrap;
  + table {
    margin-top:20px;
  }
  li {
    display:flex;
    width:${props => props.rowWidth ? `calc(100% / ${props.rowWidth })` : '100%'};
    margin:24px 0 0 30px;
    div {
      flex:1 1 auto;
    }
    .row-tit{
      font-size: 14px;
      font-weight: 700;
      line-height:${props => props.textType ? '16px' : '32px'};
      letter-spacing: -0.23px;
      color: #383838;
    }
    >div {
      font-size: 13px;
      line-height:${props => props.textType ? '16px' : '32px'};
      font-weight: normal;
      letter-spacing: -0.22px;
      color: #383838;
    }
  }
  + .btn-group {
    margin-top:20px;
  }
  .color_red {
    color:#dc2a33;
  }
  .color_blue {
    color:#2b72ae;
  }
  .input-group {
    display:flex;
    div + div {
      margin-left:10px;
    }
  }
`
const RowTitle = styled.label`
  flex: 0 0 ${props => props.widths ? props.widths  : '102px'};
`
// props의 초깃값을 정의합니다.
RowTable.defaultProps = {
  rowWidth:1,
  columns:[],
  titleWidth:'102ox',
};
export default RowTable;

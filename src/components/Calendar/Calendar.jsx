import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components"
import {prevMonth} from '../../common/Utils';



function Calendar ({onDateChange ,CalendarType})  {
  const Month = prevMonth(3);
  const [startDate, setStartDate] = useState(new Date(Month));
  const [endDate, setEndDate] = useState(new Date());
  return (
    <CalendarItem>
      {
        CalendarType === 'begin' ?
        <DatePicker
        selected={startDate}
        onChange={date => {
          setStartDate(date)
          onDateChange(date ,CalendarType)
        }}
        disabledKeyboardNavigation
        placeholderText="날짜를 선택해주세요."
        dateFormat="yyyy-MM-dd"
        startDate={startDate}
        endDate={endDate}
      />
      :
      <DatePicker
        selected={endDate}
        onChange={date => {
          setEndDate(date)
          onDateChange(date ,CalendarType)
        }}
        disabledKeyboardNavigation
        placeholderText="날짜를 선택해주세요."
        dateFormat="yyyy-MM-dd"
        startDate={startDate}
        endDate={endDate}
      />
      }
    </CalendarItem>
  )
};
const CalendarItem = styled.div`
  position:relative;
  padding-right:30px;
  .react-datepicker-wrapper {
    width:100%;
  }
  input {
    width:100%;
    height:32px;
    padding:0 9px;
    padding-right:${props => props.rightIco ? '30px' : '9px'};
    padding-left:${props => props.leftIco ? '30px' : '9px'};
    border: solid 1px #dddddd;
    border-right:none;
    font-weight:500;
    font-size: 13px;
    color: #383838;
    background-color:#fff;
    -webkit-box-shadow: 0 0 0 1000px white inset;
    &::placeholder {
      color: #b9b9b9;
    }
    &:disabled {
      color:#ddd;
    }
  }
  &::after {
    display:block;
    position:absolute;
    right:0;
    top:0;
    width:30px;
    height:100%;
    border:1px solid #ddd;
    border-radius:0 2px 2px 0;
    background:url(./img/calendar-1.png) no-repeat center #fff;
    content:"";
    box-sizing: border-box;
  }

`



// props의 초깃값을 정의합니다.
export default Calendar;

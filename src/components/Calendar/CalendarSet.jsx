import React from 'react';
import styled from "styled-components"

import { Calendar } from '../Calendar';


const CalendarSet = ({onDateChange , begin ,end}) =>  {
  return (
    <CalendarWrapper>
      <Calendar onDateChange={onDateChange} CalendarType={begin} />
      <span>-</span>
      <Calendar onDateChange={onDateChange} CalendarType={end} />
    </CalendarWrapper>
  )
};
const CalendarWrapper = styled.div`
  display:flex;
  line-height:1;
  span {
    display:inline-block;
    width:30px;
    line-height:32px;
    font-family: NanumSquareB;
    font-size: 14px;
    letter-spacing: -0.23px;
    text-align: center;
    color: #383838;
  }
`



// props의 초깃값을 정의합니다.
export default CalendarSet;

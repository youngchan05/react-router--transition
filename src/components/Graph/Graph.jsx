import React from 'react';
import styled from "styled-components"
import { Bar } from 'react-chartjs-2'
//lnbMenuList
import { LnbMenu } from '../Lnb/LnbMenu';

const Graph = ({width,height}) =>  {
  const options = {
    legend: {
      display: false, // label 보이기 여부
    },
    scales: {
      yAxes: [{
        ticks: { 
          min: 0, // y축 스케일에 대한 최소값 설정
          max:250,
          stepSize: 50, // y축 그리드 한 칸당 수치
        }
      }]
    },
   
    // false : 사용자 정의 크기에 따라 그래프 크기가 결정됨.
    // true : 크기가 알아서 결정됨.
    maintainAspectRatio: false 
  }
  const data = {
    // 각 막대별 라벨
    labels: ['2015', '2016', '2017', '2018', '2019', '2020'],
    datasets: [
      {
        borderWidth: 1, // 테두리 두께
        data: [1,2,3 ,30 , 50 ,22], // 수치
        backgroundColor:['#0060ff','#dcdcdc','#dcdcdc'] // 각 막대 색
      }
    ]
  };
  return (
    <Wrapper width={width}  height={height}>
      <Bar
          data={data}
          options={options}
        />
    </Wrapper>
  )
};
const Wrapper = styled.div`
  width:${props => props.width ? props.width : 'auto'};
  height:${props => props.height ? props.height : 'auto'};
`
// props의 초깃값을 정의합니다.
export default Graph;

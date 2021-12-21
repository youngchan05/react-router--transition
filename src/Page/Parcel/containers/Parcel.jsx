import React, { useState, useEffect} from 'react';
import styled from "styled-components"
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import WhiteBox from '../../../components/WhiteBox';
import { useAxios, useInput } from '../../../Hooks';
import Header from '../../../components/Header'
import Lnb from '../../../components/Lnb'
import Title from '../../../components/Title/Title'
import Spinner from '../../../components/Spinner'
import RowTable from '../../../components/RowTable'
import Table from '../../../components/Table/Table';
import Columns from '../components/Columns';
const Parcel = () => {
  const [ config, setConfig] = useState({
    params: {
      seq: 0,
      interval: 10,
      col_order: 'cmplx_pid',
      sort: 'ASC',
    },
  })
  const fetchHendler = (params) =>{
    setConfig({...params})
  }
  const { loding, error, data, fetchTrigger} = useAxios('SH_CMPLX_get_seq_condition_range_by_order', config);
  const { createTable } = Table(Columns, fetchHendler,config)

  useEffect(() => {
    fetchTrigger()
  }, [config])
  const RowColumns = [
    {
      title:'단지명',
      desc:<Input ph="단지명 입력" value={''}name="title" />
    },
  ]
  return (
  <Wrapper>
    {
      loding && <Spinner/>
    }
    <Header/>
    <Lnb id={3}/>
    <Title text={'분양 매물'}/><WhiteBox>
      <RowTable columns={RowColumns} rowWidth={3}/>
      <div className="right-btn">
        <Button text={'검색'} size={'small'} bgColor={'#499fb6'} color={'#fff'} ico={'search'} />
        <Button text={'조건 초기화'} size={'medium'} border={'#b9b9b9'} ico={'reset'} />
      </div>
    </WhiteBox>
    <WhiteBox>
      {
        data && createTable(data.results)
      }
    </WhiteBox>
  </Wrapper>
    )
}

const Wrapper = styled.div`

`
export default Parcel;

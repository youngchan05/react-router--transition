import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as request from '../../../apis/request';

import {formatDateYMDWithTime} from '../../../common/Utils';

//common component
import ContentBox from '../../../components/ContentBox';
import RowTable from '../../../components/RowTable';
import WhiteBox from '../../../components/WhiteBox';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Textarea from '../../../components/Textarea';
import ButtonGroup from '../../../components/ButtonGroup';
import Confirm from '../../../components/Confirm';
import Title from '../../../components/Title';
import SelectBox from '../../../components/SelectBox';
import Loding from '../../../components/Loding';



class FaqWrite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDepth : [3,0,1],
      faqData:{
        body:'',
        title:'',
      },
      isLoad:true,
      isConfirm:false,
    };
  }
  componentDidMount(){

  }

  //공지사항 추가 
  getFaqInsert= async () => {
    const  { faqData} = this.state;
    const config = {
      data: {
        faq: {
          ...faqData,
        }
      }
    }
    const res = await request.getDataByApiName('faq_insert_admin',config);
    if(res.status === 200) {
      this.setState({
        isConfirm:true,
      })
    }
  }

  //input value check 
  onChangValue = (e) => {
    const { faqData} = this.state;
    const name = e.target.name;
    faqData[name] = e.target.value;
    this.setState({
      faqData,
    })
  }

  onClickConfirm = () => {
    const { history } = this.props;
    this.setState({
      isConfirm:false,
    })
    history.push('/faq')
  }
  render() {
    const {pageDepth , userName ,isLoad ,faqData , isConfirm} = this.state;
    const  { history } = this.props
    //rowTable static data 
    const RowColumns = [
      {
        title:'제목',
        desc:<Input ph="제목 입력" name='title' value={faqData.title} onChange={this.onChangValue} />
      },
      {
        title:'내용',
        desc:<Textarea ph="내용 입력" name='body' value={faqData.body} onChange={this.onChangValue} />
      },
    ]
    if(!isLoad){
      return <Loding/>
    }
    return (
      <>
        <Title pageDepth={pageDepth} />
        <WhiteBox>
          <RowTable columns={RowColumns}/>
          <ButtonGroup>
            <div className="right">
              <Button text={'취소'} size={'small'} border={'#b9b9b9'} onClick={()=> history.push('/notice')}/>
              <Button text={'공지등록'} size={'small'} bgColor={'#2b72ae'} color={'#fff'} onClick={this.getFaqInsert} />
            </div>
          </ButtonGroup>
        </WhiteBox>
        <Confirm isActive={isConfirm} desc={'faq가 등록되었습니다.'} onClick={this.onClickConfirm} />
      </>
    );
  }
}




export default withRouter(FaqWrite);

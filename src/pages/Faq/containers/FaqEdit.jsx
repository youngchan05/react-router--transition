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
import Loding from '../../../components/Loding';



class FaqEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDepth : [3,0,1],
      detailData:{
      },
      isLoad:true,
      isConfirm:false,
    };
  }
  componentDidMount(){
    this.getFaqDetail();
  }

  //공지사항 상세 데이터 
  getFaqDetail = async () => {
    const config = {
      params: {
        pid_faq :this.props.match.params.id,
      },
    }
    const res = await request.getDataByApiName('faq_get_one',config);
    const detailData = res.results[0];
    console.log(res ,'res');
    this.setState({
      detailData,
      isLoad:true,
    })
  }

  //공지사항 수정
  getFaqInsert= async () => {
    const  { detailData} = this.state;
    const config = {
      data: {
        faq: {
          ...detailData,
        }
      }
    }
    const res = await request.getDataByApiName('faq_update_admin',config);
    if(res.status === 200) {
      this.setState({
        isConfirm:true,
      })
    }
  }

  //input value check 
  onChangValue = (e) => {
    const { detailData} = this.state;
    const name = e.target.name;
    detailData[name] = e.target.value;
    this.setState({
      detailData,
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
    const {pageDepth , userName ,isLoad ,detailData , isConfirm} = this.state;
    const  { history } = this.props
    //rowTable static data 
    const RowColumns = [
      {
        title:'제목',
        desc:<Input ph="제목 입력" name='title' value={detailData.title} onChange={this.onChangValue} />
      },
      {
        title:'내용',
        desc:<Textarea ph="내용 입력" name='body' value={detailData.body} onChange={this.onChangValue} />
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
              <Button text={'취소'} size={'small'} border={'#b9b9b9'} onClick={()=> history.push('/faq')}/>
              <Button text={'수정'} size={'small'} bgColor={'#2b72ae'} color={'#fff'} onClick={this.getFaqInsert} />
            </div>
          </ButtonGroup>
        </WhiteBox>
        <Confirm isActive={isConfirm} desc={'수정이 완료되었습니다.'} onClick={this.onClickConfirm} />
      </>
    );
  }
}




export default withRouter(FaqEdit);

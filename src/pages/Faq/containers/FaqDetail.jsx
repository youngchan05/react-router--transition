import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as request from '../../../apis/request';

import {formatDateYMDWithTime} from '../../../common/Utils';

//common component
import ContentBox from '../../../components/ContentBox';
import RowTable from '../../../components/RowTable';
import WhiteBox from '../../../components/WhiteBox';
import Button from '../../../components/Button';
import Confirm from '../../../components/Confirm';
import ButtonGroup from '../../../components/ButtonGroup';
import Title from '../../../components/Title';
import Loding from '../../../components/Loding';



class FaqDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDepth : [3,0,0],
      detailData:[],
      isLoad:false,
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
      console.log(res ,'res');
    const detailData = res.results[0];
    console.log(res ,'res');
    this.setState({
      detailData,
      isLoad:true,
    })
  }

  //공지사항 삭제
  onClickDelete = async () => {
    const {detailData} = this.state;
    const config = {
      data : {
        faq: {
          ...detailData,
        },
      },
    }
    const res = await request.getDataByApiName('faq_delete_admin',config);
    console.log(res);
    if(res.status === 200) {
      this.setState({
        isConfirm:true,
      })
    }
  }

  //컨펌창 클릭 
  onClickConfirm = () => {
    const { history ,match} = this.props;
    this.setState({
      isConfirm:false,
    })
    history.push('/faq')
  }
  render() {
    const {pageDepth  ,isLoad ,detailData , isConfirm} = this.state;
    const  { history ,match } = this.props;
    const RowColumns = [
      {
        title:'제목',
        desc:detailData.title,
      },
      {
        title:'내용',
        desc:detailData.body,
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
              <Button text={'삭제'} size={'small'} border={'#b9b9b9'} onClick={this.onClickDelete}/>
              <Button text={'수정'} size={'small'} bgColor={'#2b72ae'} color={'#fff'} onClick={()=> history.push(`/faq/edit/${match.params.id}`)} />
            </div>
          </ButtonGroup>
        </WhiteBox>
        <Confirm isActive={isConfirm} desc={'삭제가 정상적으로 되었습니다.'} onClick={this.onClickConfirm} />
      </>
    );
  }
}




export default withRouter(FaqDetail);

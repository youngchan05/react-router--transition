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
import Loding from '../../../components/Loding';
import Title from '../../../components/Title';



class NoticeDetail extends Component {
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
    this.getNoticeDetail();
  }

  //공지사항 상세 데이터 
  getNoticeDetail = async () => {
    const config = {
      params: {
        pid_notice :this.props.match.params.id,
      },
    }
    const res = await request.getDataByApiName('notice_get_one',config);
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
        notice: {
          ...detailData,
        },
      },
    }
    const res = await request.getDataByApiName('notice_delete_admin',config);
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
    history.push('/notice')
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
            <div className="left">
              <Button text={'목록으로'} size={'small'} border={'#b9b9b9'} onClick={()=> history.push('/notice')}/>
            </div>
            <div className="right">
              <Button text={'삭제'} size={'small'} border={'#b9b9b9'} onClick={this.onClickDelete}/>
              <Button text={'수정'} size={'small'} bgColor={'#2b72ae'} color={'#fff'} onClick={()=> history.push(`/notice/edit/${match.params.id}`)} />
            </div>
          </ButtonGroup>
        </WhiteBox>
        <Confirm isActive={isConfirm} desc={'삭제가 정상적으로 되었습니다.'} onClick={this.onClickConfirm} />
      </>
    );
  }
}




export default withRouter(NoticeDetail);

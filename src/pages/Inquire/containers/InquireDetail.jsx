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
import Textarea from '../../../components/Textarea';



class InquireDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDepth : [3,2,0],
      detailData:[],
      userInfo:{
        user_name:'',
        user_email:'',
      },
      answer:'',
      desc:'',
      isLoad:false,
      isConfirm:false,
      isAnswer:false,
      id:this.props.match.params.user,
    };
  }
  componentDidMount(){
    this.getInquireDetail();
    this.getDetailData();
  }

  //1:1 문의 상세 데이터 
  getInquireDetail = async () => {
    const {answer} = this.state;
    const config = {
      params: {
        pid_inquire :this.props.match.params.id,
      },
    }
    const res = await request.getDataByApiName('inquire_get_one',config);
    if(res.status !== 200) return ;
    const detailData = res.results[0];
    const isAnswer =  detailData.answer === null ? false : true ;
    console.log(res ,'res');
    this.setState({
      detailData,
      answer:detailData.answer,
      isAnswer,
      isLoad:true,
    })
    console.log(isAnswer);
  }

   //해당 유저 데이터 가져오기
   getDetailData = async () => {
    const { id } = this.state;
    console.log(id);
    const config = {
      params:{
        pid_user :id,
      }
    }
    console.log(config ,'config')
    const userRes = await request.getDataByApiName('user_base_get_one' , config);
    console.log(userRes ,'userRes')
    this.setState({
      userInfo:{
        ...userRes.results[0]
      },
      isLoad:true,
    }) 
  }
  onClickAddAnswer = async () => {
    const { answer} = this.state;
    const {history} = this.props;
    if(answer === null) return this.setState({ isConfirm:true ,desc:'답변 내용을 입력해주세요.'})
    const config = {
      data : {
        inquire:{
          pid_inquire:this.props.match.params.id,
          answer:answer,
          }
        }
    }
    console.log(config ,'config')
    const res = await request.getDataByApiName('inquire_update_admin' , config);
    if(res.status !== 200) return 
    history.push('/inquire')
  }

  //수정창 닫기 열기
  onClickEdit = () => {
    const {isAnswer} = this.state;
    this.setState({
      isAnswer:!isAnswer,
    })
  }

  //답변 삭제
  onClickAnswerDelete = async () => {
    const { answer} = this.state;
    const {history} = this.props;
    const config = {
      data : {
        inquire:{
          pid_inquire:this.props.match.params.id,
          answer:null
          }
        }
    }
    console.log(config ,'config')
    const res = await request.getDataByApiName('inquire_update_admin' , config);
    if(res.status !== 200) return 
    history.push('/inquire')
  }
  //컨펌창 클릭 
  onClickConfirm = () => {
    const { history ,match} = this.props;
    this.setState({
      isConfirm:false,
    })
  }
  //input value check 
  onChangValue = (e) => {
    const answer = e.target.value;
    this.setState({
      answer
    })
  }
  render() {
    const {pageDepth  ,isLoad ,detailData , isConfirm ,userInfo ,isAnswer ,answer ,desc} = this.state;
    const  { history ,match } = this.props;
    const RowColumns = [
      {
        title:'답변상태',
        desc:detailData.answer === null ?  <span className="color_red">미답변</span> : <span className="color_blue">답변완료</span>
      },
      {
        title:'내용',
        desc:detailData.title,
      },
      {
        title:'항목',
        desc:detailData.type_inquire,
      },
      {
        title:'회원이름',
        desc:userInfo.user_name ? userInfo.user_name : '-',
      },
      {
        title:'이메일',
        desc:userInfo.email ? userInfo.email : '-',
      },
      {
        title:'내용',
        desc:detailData.body,
      },
    ]

    const RowColumns2 = [
      {
        title:'답변내용',
        desc:answer,
      },
    ]

    const RowColumns3 = [
      {
        title:'답변내용',
        desc: <Textarea ph={'답변내용 입력'} name={'answer'} onChange={this.onChangValue} value={answer} />,
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
        </WhiteBox>
        <WhiteBox>
          {
            isAnswer ? 
            <>
              <RowTable columns={RowColumns2}/>
                <ButtonGroup>
                <div className="left">
                  <Button text={'목록으로'} size={'small'} border={'#b9b9b9'} onClick={()=> history.push(`/inquire`)} />
                </div>
                <div className="right">
                  <Button text={'답변 삭제'} size={'small'} bgColor={'#dc2a33'} color={'#fff'} onClick={()=> this.onClickAnswerDelete()} />
                  <Button text={'답변 수정'} size={'small'} bgColor={'#2b72ae'} color={'#fff'} onClick={()=> this.onClickEdit()} />
                </div>
              </ButtonGroup>
          </>
          :
          <>
            <RowTable columns={RowColumns3}/>
            <ButtonGroup>
              <div className="right">
                <Button text={'취소'} size={'small'} border={'#b9b9b9'} onClick={()=>  history.push(`/inquire`)} />
                <Button text={'등록'} size={'small'} bgColor={'#2b72ae'} color={'#fff'} onClick={()=> this.onClickAddAnswer()} />
              </div>
            </ButtonGroup>
          </>
          }
         </WhiteBox>
        <Confirm isActive={isConfirm} desc={desc} onClick={this.onClickConfirm} />
      </>
    );
  }
}




export default withRouter(InquireDetail);

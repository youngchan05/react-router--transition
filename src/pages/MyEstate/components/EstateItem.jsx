import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import styled from "styled-components"



function EstateItem({item ,complexAlarmList}){
  console.log(item)
  if(item.length === 0){
    return (
      <Wrapper>
        <p className={'none-txt'}>
          내역이 존재 하지 않습니다.
        </p>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <ul>
        {
          item.map(estate => {
            return (
              <li>
                <div className="pic">
                  <img src= {estate.uri_thumb ? estate.uri_thumb : './img/14-fd-69-b-600060-fb-029881-efbc-22-e-0-e-1-a-copy.png'}alt=""/>
                </div>
                {
                  estate.type_estate === 3
                  ?
                  //단지 알림인경우
                  <div className="estate-info" onClick={()=>complexAlarmList(estate)}>
                    <p className="total">매물 총 {estate.qset.length}개</p>
                    <span className="price">{estate.estate_name}</span>
                    <p className="address">{estate.addr}</p>
                    <span className="desc text-hidden">{estate.trade_list}{estate.size_list}{estate.dong_list}</span>
                  </div>
                  :
                  //단지알림이 아닌 일반 매물인 경우
                  <div className="estate-info">
                    <span className="name">{estate.estate_name}</span>
                    <strong className="price">{estate.price}</strong>
                    <p className="address">{estate.addr}</p>
                    <span className="desc text-hidden">{estate.red_desc}</span>
                  </div>
                }
              </li>
            )
          })
        }
      </ul>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  margin-top:20px;
  height:calc(100% - 100px);
  overflow:auto;
  .text-hidden {
    text-overflow:ellipsis;
    white-space:nowrap;
    word-wrap:normal;
    width:100%;
    overflow:hidden;
  }
  .none-txt {
    margin-top:200px;
    padding-top: 110px;
    font-family: NanumSquareR;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #606060;
    background: url(./img/img-main-illust-3@2x.png) no-repeat center top /160px auto;
  }
  ul {
    li {
      display:flex;
      position:relative;
      padding-left:94px;
      min-height:82px;
      align-items:center;
      .pic {
        position:absolute;
        left:0;
        top:50%;
        transform:translateY(-50%);
        width:82px;
        height:82px;
        border-radius:100px;
        overflow: hidden;
        img {
          object-fit: cover;
            width: 100%;
            height: 100%;
        }
      }
      .estate-info {
        width:100%;
        .name {
          display:inline-block;
          font-family: NanumSquareR;
          font-size: 15px;
          line-height:20px;
          letter-spacing: -0.25px;
          color: #1a1a1a;
        }
        .total {
          margin-bottom:3px;
          font-family: NanumSquareR;
          font-size: 15px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: -0.25px;
          color: #1a1a1a;
        }
        .price {
          display:inline-block;
          width:100%;
          margin-top:3px;
          font-family: NanumSquareB;
          font-size: 17px;
          line-height: 19px;
          letter-spacing: -0.28px;
          color: #1a1a1a;
        }
        .address {
          margin-top:6px;
          margin-bottom:4px;
          font-family: NanumSquareR;
          font-size: 13px;
          line-height: 15px;
          letter-spacing: -0.25px;
          color: #646464;
        }
        .desc {
          display:inline-block;
          font-family: NanumSquareR;
          font-size: 13px;
          line-height: 15px;
          letter-spacing: -0.25px;
          color: #e83942;
        }
      }
      + li {
        margin-top:24px;
      }
    }
  }

`
EstateItem.defaultProps = {
  item:[],
  complexAlarmList :()=> {},
}
export default withRouter(EstateItem);

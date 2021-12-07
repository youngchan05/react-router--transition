import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import HorizonMargin from '../../../components/HorizonMargin';
import ItemTag from '../../../elements/ItemTag';

import { returnPrice } from '../../../common/Utils';

const RecommItem = ({ item, onClick, getCureentPage }) => {
  // 청약인 경우만 변경
  if (item.type_estate == 2) {
    const periodArr = item.red_desc.split(' ~ ');
    item.red_desc = `~${periodArr[1]}까지`;
    console.log(periodArr);
  }

  return (
    getCureentPage = (type) => {
      switch (type) {
        case '1': return '매매'; break;
        case '2': return '청약'; break;
        case '3': return '전월세'; break;
      }
    },
      <ItemWrapper
        onClick={() => onClick(1)}
        imgUrl={item.uri_thumb}
        className={item.uri_thumb === '' ? 'active' : ''}
      >
        <div className="opacity-wrap">
          <div className="tag">
            <ItemTag
              color={item.tagColor}
              type_estate={item.type_estate}
            />
            <div className="text">
              {getCureentPage(item.type_estate)}
            </div>
          </div>
          <HorizonMargin height={14} />
          <div className="title">
            {item.addr}
          </div>
          <div className={item.type_estate === '2' ? 'tag-mid active' : 'tag-mid'}>
            청약기간
          </div>
          <HorizonMargin height={2} />
          <div className={item.type_estate === '2' ? 'period-text active' : 'period-text'}>
            {item.red_desc}
          </div>
          <div className={item.type_estate === '2' ? 'price active' : 'price'}>
            {`${returnPrice(item.price)}`}
          </div>
        </div>
      </ItemWrapper>
  );
};

RecommItem.propTypes = {
  item: PropTypes.shape({
    tagName: PropTypes.string,
    tagColor: PropTypes.string,
    title: PropTypes.string,
    period: PropTypes.string,
    imgUrl: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

RecommItem.defaultProps = {
  item: {
    tagName: '청약',
    tagColor: 'red',
    title: '청담 삼성 3차\n 아파트',
    period: '20.04.06-04.18',
    imgUrl: 'img/14-fd-69-b-600060-fb-029881-efbc-22-e-0-e-1-a-copy.png',
  },
  onClick: () => alert('click'),
};

const ItemWrapper = styled.div`

    width: 99px;
    height: 123px;
    object-fit: contain;
    border-radius: 12px;
    background-image: ${props => `url('${props.imgUrl}')`};
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    background-size:auto 100%;
    &.active {
      background-image:url(/img/14-fd-69-b-600060-fb-029881-efbc-22-e-0-e-1-a-copy.png)
    }
    .opacity-wrap {
      position: absolute;
      width: 99px;
      height: 123px;
      border-radius: 12px;
      background-color: #2d2d2d;
      background-color: rgba( 45, 45, 45, 0.5 );
    }
    .tag {
      display: fixed;
      left : 0px;
      width: 54px;
      height: 26px;
    }
    .tag > .text {
      /* position: absolute; */
      display: fixed;
      width: 54px;
      height: 26px;
      margin-left: -54px;
      font-family: NanumSquareB;
      font-size: 11px;
      color: #ffffff;
      text-align: center;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
    }
    .title {
      /* border: solid 1px #ffffff; */
      display:inline-block;
      width: 100%;
      padding:0 4px;
      font-family: NanumSquareEB;
      font-size: 13px;
      text-align: center;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
       line-height: 15px;
       height:30px;
       white-space: normal;

    }
    .price {
      font-family: NanumSquareB;
      font-size: 10px;
      line-height: 1.33;
      text-align: center;
      color: #ffffff;
      &.active {
        display:none;
      }
    }
    .tag-mid {
      width: 42px;
      height: 13px;
      margin: 8px auto 0 auto;
      padding: auto;
      border-radius: 4px;
      background-color: #dcd5d6;
      display:none;
      &.active {
        display:block;
      }
      /* text */
      text-align: center;
      font-family: NanumSquareB;
      font-size: 8px;
      color: #1a1a1a;
    }

    .period-text {
      display:none;
      font-family: NanumSquareB;
      font-size: 10px;
      line-height: 1.6;
      text-align: center;
      color: #ffffff;
      &.active {
        display:block;
      }
    }
`;

export default RecommItem;

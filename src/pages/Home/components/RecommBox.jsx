/*
  MainEstateCont > RecommBox
  하얀색 박스 안
*/
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import styled from 'styled-components';


import HorizonMargin from '../../../components/HorizonMargin';
import ItemTag from '../../../elements/ItemTag';
import SettingIcon from '../../../elements/SettingIcon';

import RecommEmpty from './RecommEmpty';
import RecommItem from './RecommItem';

const RecommBox = ({
  children, recommList, userInfo, onSettingClick, onFooterClick, onLinkClick, getCurrentText,
}) => {
  console.log(userInfo);
  const emptyComp = <RecommEmpty />;
  const ItemListRender = recommList.map((recomItem, idx) => (
    <RecommItem
      onClick={() => onLinkClick(recomItem.type_estate, recomItem.article_key)}
      key={`recomm-item-${idx + 1}`}
      item={recomItem}
      getCurrentText={getCurrentText}
    />
  ));
  const emptyLength = 6 - ItemListRender.length;
  const EmptyListRender = [];
  for (let i = 0; i < emptyLength; i += 1) {
    EmptyListRender.push(<EmptyItemWrapper />);
  }

  const renderRecommComp = () => (
    <>
      <div className="list-box">
        {ItemListRender}
        {EmptyListRender}
        {emptyLength > 2
          ? (
            <div className="empty-text">
              더 많은 추천을 원하시나요?
              <br />
              맞춤 추천 설정 범위를 넓히시면
              <br />
              더 다양한 매물을 추천받으실 수 있어요!
            </div>
          )
          : null
        }
      </div>
      <FooterBtn onClick={onFooterClick}>
        추천 부동산 모두보기 >
      </FooterBtn>
    </>
  );

  return (
    <Wrapper>
      <div className="title">
        <div className="title-text">
          나에게 딱 맞는 추천 부동산!
        </div>
        {/* <IconBtn onClick={onSettingClick}>
          <SettingIcon width={20} height={20} />
        </IconBtn> */}
      </div>
      {userInfo.b_setq ? renderRecommComp(onSettingClick) : emptyComp}

    </Wrapper>
  );
};

RecommBox.propTypes = {
  recommList: PropTypes.arrayOf(
    PropTypes.shape({
      tagName: PropTypes.string,
      tagColor: PropTypes.string,
      title: PropTypes.string,
      period: PropTypes.string,
      imgUrl: PropTypes.string,
    }),
  ),
  userInfo: PropTypes.shape({
    name: PropTypes.string,
    isSetRecomm: PropTypes.bool,
  }),
  onSettingClick: PropTypes.func,
  onFooterClick: PropTypes.func,
  children: PropTypes.node,
};

RecommBox.defaultProps = {
  recommList: [],
  userInfo: {
    name: 'none',
    isSetRecomm: false,
  },
  onSettingClick: () => alert('click1'),
  onFooterClick: () => alert('click2'),
  children: React.createElement('div'),
};

const IconBtn = styled.button`
  margin-right: 0px;
  height: 20px;
  width: 20px;
  outline: none;
  background: none;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 384px;
  border-radius: 12px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;

  & > .title {
    /* border: solid 1px #333333; */
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top : 20px;
    padding-left : 16px;
    padding-right : 16px;
  }
  & > .title > .title-text {
    /* border: solid 1px #333333; */
    height: 20px;
    text-align: left;
    font-family: NanumSquareB;
    font-size: 17px;
    color: #1a1a1a;
  }
  & > .title > .icon {
    /* border: solid 1px #333333; */
    height: 20px;
    width: 20px;
  }

  .list-box {
    width: 100%;
    height: 284px;
    padding-top : 2px;
    padding-left : 12px;
    padding-right : 12px;
    padding-bottom : 4px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }

  .list-box > .empty-text {
    width: 247px;
    height: 79px;
    margin: auto;
    margin-top: -88px;
    font-family: NanumSquareR;
    font-size: 15px;
    line-height: 1.47;
    text-align: center;
    color: #606060;
  }


`;

const FooterBtn = styled.button`

  width: 100%;
  height: 46px;
  border:none;
  border-top: solid 1px #e8e8e8;
  background: none;

  /* font */
  font-family: NanumSquareB;
  font-size: 15px;
  text-align: center;
  color: #265b9a;
`;

const EmptyItemWrapper = styled.div`
  width: 99px;
  height: 123px;
`;

export default RecommBox;

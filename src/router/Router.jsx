import React, { Fragment, Suspense } from 'react';

import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
// common components

// with Router
import * as Routes from './Routes';
import CustomRoute from './CustomRoute';
import { RoutePath } from './RoutePath';
import ContentBox from '../components/ContentBox';

const Router = () => (
  <Fragment>
    <ContentBox>
      <Switch>
        <CustomRoute exact path={RoutePath.Home} component={Routes.Home} />
        <Route exact path={RoutePath.StyleGuide} component={Routes.StyleGuide} />
        <Route exact path={RoutePath.Ia} component={Routes.Ia} />

        {/*로그인*/ }
        <Route exact path={RoutePath.Login} component={Routes.Login} />
        {/*로그인 end*/ }

        {/*회원관리*/ }
        <Route exact path={RoutePath.UserTable} component={Routes.UserTable} />
        {/*회원관리 end */ }

        {/*나의정보*/ }
        <Route exact path={RoutePath.MyInfo} component={Routes.MyInfo} />
        {/*나의정보 end*/ }

        {/*구성원 관리*/ }
        <Route exact path={RoutePath.Admin} component={Routes.Admin} />
        <Route exact path={RoutePath.AdminAdd} component={Routes.AdminAdd} />
        {/*구성원 관리 end*/ }

        {/*전입신고*/ }
        <Route exact path={RoutePath.Contract} component={Routes.Contract} />
        <Route exact path={RoutePath.ContractCont} component={Routes.ContractCont} />                    
        <Route exact path={RoutePath.ContractTable} component={Routes.ContractTable} />
        <Route exact path={RoutePath.ContractDetail} component={Routes.ContractDetail} />
        {/* 전입신고 end*/ }

        {/*게시판*/ }
        <Route exact path={RoutePath.Notice} component={Routes.Notice} />
        <Route exact path={RoutePath.NoticeDetail} component={Routes.NoticeDetail} />
        <Route exact path={RoutePath.NoticeWrite} component={Routes.NoticeWrite} />
        <Route exact path={RoutePath.NoticeEdit} component={Routes.NoticeEdit} />
        {/* 게시판 end*/ }

        {/*1:1 문의하기*/ }
        <Route exact path={RoutePath.Inquire} component={Routes.Inquire} />
        <Route exact path={RoutePath.InquireDetail} component={Routes.InquireDetail} />
        {/* 1:1 문의하기 end*/ }

        {/*Faq*/ }
        <Route exact path={RoutePath.Faq} component={Routes.Faq} />
        <Route exact path={RoutePath.FaqDetail} component={Routes.FaqDetail} />
        <Route exact path={RoutePath.FaqWrite} component={Routes.FaqWrite} />
        <Route exact path={RoutePath.FaqEdit} component={Routes.FaqEdit} />
        {/* Faq end*/ }

        {/*나의부동산*/ }
        <Route exact path={RoutePath.MyEstate} component={Routes.MyEstate} />
        {/* 나의부동산 end*/ }

        {/*정보수집 현황*/ }
        <Route exact path={RoutePath.InformationCollection} component={Routes.InformationCollection} /> 
        {/*푸시알림*/ }
        <Route exact path={RoutePath.PushAlarm} component={Routes.PushAlarm} />
        {/*계약서/전입신고/확정일자 현황*/ }
        <Route exact path={RoutePath.ContractStatus} component={Routes.ContractStatus} />
        {/*관심단지 현황*/ }
        <Route exact path={RoutePath.EstateStatus} component={Routes.EstateStatus} />
        {/*이용자 현황*/ }
        <Route exact path={RoutePath.SubscriberStatus} component={Routes.SubscriberStatus} />
        {/*큐레이션 현황*/ }
        <Route exact path={RoutePath.CurationStatus} component={Routes.CurationStatus} />
        {/*이용자 현황*/ }
        <Route exact path={RoutePath.UserStatus} component={Routes.UserStatus} />
        {/*이용약관*/ }
        <Route exact path={RoutePath.AgreeService} component={Routes.AgreeService} />
        <Route exact path={RoutePath.AgreeInformation} component={Routes.AgreeInformation} />
        <Route exact path={RoutePath.AgreeCertificate} component={Routes.AgreeCertificate} />

        
        <Route exact path={RoutePath.Admin} component={Routes.Admin} />
        <Route exact path={RoutePath.UserDetail} component={Routes.UserDetail} />     
      <Switch>
        {/* <CustomRoute exact path={RoutePath.Login} component={Routes.Login} />                    
        <CustomRoute exact path={RoutePath.Member} component={Routes.Member} />      */}
      </Switch>
    </Switch>
    </ContentBox>
  </Fragment>
);


export default Router;

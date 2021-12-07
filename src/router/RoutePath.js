export const RoutePath = {
  Home: '/',                                        //홈
  Login: '/login',                                  //로그인
  UserTable: '/user',                               //회원관리
  UserDetail: '/user/detail/:id',                   //회원 상세보기
  MyInfo: '/mypage/myinfo',                         //내정보관리

  Admin: '/admin',                                  //구성원 리스트
  AdminAdd: '/admin/add',                           //구성원 추가

  Contract: '/contract',                            //계약서/전입신고/확정일자 
  ContractDetail: '/contract/detail/:id/:user',     //계약서/전입신고/확정일자  상세보기
  ContractTable: '/contract/table',                 //계약서/전입신고/확정일자  테이블
  ContractCont : '/contract/cont',                  //계약서/전입신고/확정일자 폼

  Notice: '/notice',                                //게시판 리스트
  NoticeDetail: '/notice/detail/:id',               //게사판 상세보기
  NoticeWrite: '/notice/write',                     //게사판 글작성
  NoticeEdit: '/notice/edit/:id',                   //게사판 수정


  Faq: '/faq',                                      //Faq 리스트
  FaqDetail: '/faq/detail/:id',                     //Faq 상세보기
  FaqWrite: '/faq/write',                           //Faq 글작성
  FaqEdit: '/faq/edit/:id',                         //Faq 수정

  Inquire: '/inquire',                              //1:1 문의하기
  InquireDetail: '/inquire/detail/:id/:user',       //1:1 상세보기

  MyEstate: '/estate',                              //나의 부동산

  InformationCollection:'/information/collection', //정보수집 현황
  PushAlarm:'/push/alarm',                         //푸시알림
  ContractStatus:'/contract/status',               //계약서/전입신고/확정일자 현황
  EstateStatus:'/estate/status',                   //관심단지 현황
  SubscriberStatus:'/subscriber/status',           //가입자 현황
  CurationStatus:'/curation/status',               //큐레이션 현황
  UserStatus:'/user/status',                       //이용자 구성 현황

  AgreeService:'/agree/service',                    //이용약관
  AgreeInformation:'/agree/infomation',             //개인정보 수집
  AgreeCertificate:'/agree/certificate',            //공인인증서 활용

  StyleGuide : '/guide',                            //스타일가이드
  Ia : '/ia' ,                                      //사이트맵


};

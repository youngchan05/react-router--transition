export const LnbMenu = [
    {
      title:'회원관리',
      id:1,
      isActive:true,
      link:'/user',
      depth:[
        {
          title:'회원 검색',
          hide:true,
        },
        {
          title:'회원 상세보기',
          hide:true,
        },
      ]
    },
    {
      title:'신청관리',
      id:2,
      isActive:false,
      depth:[
        {
          title:'장례신청',
          link:'',
        },
        {
          title:'유언 신청',
          link:'',
        },
        {
          title:'소유물품 신청',
          link:'',
        }
      ]
    },
    {
      title:'가입자현황',
      id:3,
      isActive:false,
    },
    {
      title:'사용량 현황',
      id:4,
      isActive:false,
    },
    {
      title:'통계',
      id:5,
      isActive:false,
    },
    {
      title:'더보기 관리',
      id:6,
      isActive:false,
      depth:[
        {
          title:'1:1 문의',
          link:'',
        },
        {
          title:'FAQ',
          link:'',
        },
        {
          title:'공지사항',
          link:'',
        }
      ]
    },
    {
      title:'마이페이지',
      isActive:false,
      hide:true,
      depth:[
        {
          title:'구성원 관리',
          link:'/amdin',
          depth:[
            {
              title:'구성원 추가',
            },
          ]
        },
        {
          title:'내 정보'
        }
      ]
    }
  ]
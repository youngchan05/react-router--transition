 const CurationColumns = [
  [
    {
      checkbox:true,
      title:'',
      width:'6%',
    },
    {
      title:'구분',
      width:'6%',
      name:'qset_name',
    },
    {
      sort:'고유번호',
      width:'10%',
      align:'left',
      name:'article_key'
    },
    {
      title:'매매/단지 이름',
      width:'auto',
      align:'left',
      name:'estate_name',
    },
    {
      title:'좋아요 여부',
      width:'10%',
      align:'left',
      name:'b_liked',
    },
    {
      sort:'추천점수',
      width:'10%',
      align:'left',
      name:'score'
    },
    {
      title:'삭제여부',
      width:'10%',
      align:'left',
      name:'b_removed',
    },
    {
      title:'보기',
      width:'10%',
      align:'left'
    },
  ]
]

export default CurationColumns
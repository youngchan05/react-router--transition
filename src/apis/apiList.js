export const apiList = [
  //유저 정보 가져오기 
  {
    table: 'admin',
    method: 'GET',
    api_name:'CM_USER_count_condition_range',
    api: '/keepers/restapi/CM_USER-admin/count_condition_range/',
  },
    //유저 정보 가져오기 
  {
    table: 'admin',
    method: 'GET',
    api_name:'CM_USER_get_seq_condition_range_by_order',
    api: '/keepers/restapi/CM_USER-admin/get_seq_condition_range_by_order/',
  },
  {
    table: 'admin',
    method: 'GET',
    api_name:'CM_USER_get_one',
    api: '/keepers/restapi/CM_USER-admin/get_one/',
  },
  //장례
  {
    table: 'admin',
    method: 'GET',
    api_name:'KP_IF_APLCT_count_condition_range',
    api: '/keepers/restapi/KP_IF_APLCT-admin/count_condition_range/',
  },
  {
    table: 'admin',
    method: 'GET',
    api_name:'KP_IF_APLCT_get_seq_condition_range_by_order',
    api: '/keepers/restapi/KP_IF_APLCT-admin/get_seq_condition_range_by_order/',
  },
  
  

];


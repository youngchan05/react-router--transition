import {
  createAction,
} from 'redux-actions';

const GET_CENTER = 'price/GET_CENTER';
const CHANGE_INPUT = 'price/CHANGE_INPUT';
const INITIALIZE = 'price/INITIALIZE';
const GET_FILE_DATA = 'price/GET_FILE_DATA';
const UPDATE_SELECTED_DATA = 'price/UPDATE_SELECTED_DATA';
const IS_UPLOADED = 'price/IS_UPLOADED';
const POST_CENTER = 'price/POST_CENTER';
const GET_TODAY = 'price/GET_TODAY';
const GET_EMPTY = 'price/GET_EMPTY';
const GET_RULE_EMPTY = 'price/GET_RULE_EMPTY';
const ADD_RULE_CT = 'price/ADD_RULE_CT';
const GET_CENTER_EX = 'price/GET_CENTER_EX';
const POST_RULE = 'price/POST_RULE';
const UPDATE_RULE = 'price/UPDATE_RULE';

export const getCenter = createAction(GET_CENTER);
export const changeInput = createAction(CHANGE_INPUT);
export const initialize = createAction(INITIALIZE);
export const getFileData = createAction(GET_FILE_DATA);
export const updateSelectedData = createAction(UPDATE_SELECTED_DATA);
export const updateIsUploaded = createAction(IS_UPLOADED);
export const postCenter = createAction(POST_CENTER);
export const getToday = createAction(GET_TODAY);
export const getEmpty = createAction(GET_EMPTY);
export const getRuleEmpty = createAction(GET_RULE_EMPTY);
export const addRuleCt = createAction(ADD_RULE_CT);
export const getCenterEx = createAction(GET_CENTER_EX);
export const postRule = createAction(POST_RULE);
export const updateRule = createAction(UPDATE_RULE);
const initialState = {
  center: {
    pid_center: 0,
    ct_code: '',
    tel: '',
    fax: '',
    owner_name: '',
    no_biz: '',
    open_json: {
      body: '',
      uri_body: '',
      created_at: '',
    },
    price_json: {
      body: '',
      uri_body: '',
      created_at: '',
    },
    waycom_json: {
      body: '',
      uri_body: '',
      created_at: '',
    },
    grp_instr: null,
    grp_rule: [{
      id: 0,
      seq: 1,
      title: '전체',
      body: '',
      uri_body: '',
      created_at: '',
      selected: true,
    }],
  },
  ruleArr: [{
    seq: 1,
    title: '전체',
    body: '',
    uri: '',
    created_at: '',
    selected: true,
  }],
  today: '',
  fileData: '',
  isUploaded: false,
};
const priceReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_RULE: {
      const {
        name,
        value,
        id,
      } = action.payload;
      return {
        ...state,
        ruleArr: state.ruleArr.map((rule, idx) => (idx === id ? {
          ...rule,
          [name]: value,
        } : rule)),
      };
    }
    case GET_CENTER_EX: {
      const {
        res,
        data,
      } = action.payload;
      const sorted = data.sort((a, b) => {
        if (a.seq < b.seq) {
          return -1;
        }
        if (a.seq > b.seq) {
          return 1;
        }
        return 0;
      });
      console.log(sorted);
      return {
        ...state,
        center: res[0],
        ruleArr: sorted,
      };
    }
    case ADD_RULE_CT: {
      return {
        ...state,
        ruleArr: state.ruleArr.concat(action.payload),
      };
    }
    case GET_RULE_EMPTY: {
      return {
        ...state,
        grp_rule: [{
          seq: 1,
          title: '전체',
          body: '',
          uri_body: '',
          created_at: '',
          selected: true,
        }],
      };
    }
    case GET_EMPTY: {
      const {
        name,
      } = action.payload;
      return {
        ...state,
        center: {
          ...state.center,
          [name]: {
            body: '',
            uri_body: '',
            created_at: '',
          },
        },
      };
    }
    case GET_TODAY: {
      return {
        today: action.payload,
      };
    }
    case POST_CENTER: {
      const {
        name,
        value,
        target,
      } = action.payload;
      return {
        ...state,
        center: {
          ...state.center,
          [target]: {
            ...state.center[target],
            [name]: value,
          },
        },
      };
    }
    case IS_UPLOADED: {
      return {
        ...state,
        isUploaded: true,
      };
    }
    case UPDATE_SELECTED_DATA: {
      return {
        ...state,
        center: {
          ...state.center,
          uri_body: action.payload,
        },
      };
    }
    case GET_FILE_DATA: {
      return {
        ...state,
        fileData: action.payload,
      };
    }
    case INITIALIZE: {
      return initialState;
    }
    case GET_CENTER: {
      return {
        ...state,
        center: action.payload[0],
      };
    }
    case CHANGE_INPUT: {
      const {
        name,
        value,
      } = action.payload;
      return {
        ...state,
        center: {
          ...state.center,
          [name]: value,
        },
      };
    }
    default:
      return state;
  }
};
export default priceReducer;

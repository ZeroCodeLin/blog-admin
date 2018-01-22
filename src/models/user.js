import { query as queryUsers, queryCurrent,queryInfo, update } from '../services/user';
import { message } from 'antd';

export default {
  namespace: 'user',

  state: {
    list: [],
    userData:{},
    loading: false,
    currentUser: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      yield call(update, payload);
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      message.success('提交成功');
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchUserInfo(_,{call, put}){
      const response = yield call(queryInfo);
      yield put({
        type:'getUserInfo',
        payload:response,
      })
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload.data,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    getUserInfo(state,action){
      
      return{
        ...state,
        userData:action.payload.data,
      }
    },
    saveCurrentUser(state, action) {
  
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};

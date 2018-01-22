import { getBlogList } from '../services/blog';
import { message } from 'antd';

export default {
  namespace: 'blog',

  state: {
    blogList: [],
    loading: false,
    pagination: {
        pageSize:1,
        page:1,
    },
  },

  effects: {
    *fetchList({payload},{ call, put}){
        yield put({
            type: 'changeLoading',
            payload: true,
          });
        const response = yield call(getBlogList,payload);
        yield put({
          type: 'getList',
          payload: {...response,pagination:payload},
        });
        yield put({
            type: 'changeLoading',
            payload: false,
        });
    }
  },

  reducers: {
    getList(state,action){
      
      return{
        ...state,
        blogList:action.payload.data,
        pagination:{...action.payload.pagination,total:action.payload.totalPage}
      }
    },
    changeLoading(state, action) {
        return {
          ...state,
          loading: action.payload,
        };
    },
  },
};

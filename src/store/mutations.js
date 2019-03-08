import * as types from './types';

export default {
  //  获取tabbar状态
  [types.TABS](state,info){
    state.tabs = info
  }
}

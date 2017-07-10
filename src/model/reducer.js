"use strict";

import { combineReducers } from "redux";

let reducers = {};

/**
 * 将reducersMap与缓存中的reducers复合为一
 * @param  {object} reducersMap 待替换或添加的{name:reducer}
 * @return {function}           redux初始化加载reducer，或store.replaceReducer替换的reducer
 */
export function injectReducer(reducersMap){
  reducers = {
  	...reducers,
  	...reducersMap
  };
  let reducer = combineReducers(reducers);

  return reducer;
};

/**
 * 将标识符为name的reducer从reducers中移除
 * @param  {string}    name     标识符
 * @return {function}           redux初始化加载reducer，或store.replaceReducer替换的reducer
 */
export function removeReducer(name){
  delete reducers[name];
  let reducer = combineReducers(reducers);

  return reducer;
};

"use strict";

import { getModel } from "./models";
import { injectReducer } from "./reducer";
import { setInternalMethods } from "./internalMethods";

/**
 * 获取model相关的reducer
 * @param  {string} name  标识符
 * @param  {object} model 数据模型
 * @return {function}     reducer
 */
function createModelReducer(name,model){
  let initialState = {};

  for ( let prop in model ){
  	if ( !model.hasOwnProperty(prop) || typeof model[prop] === "function" ) continue;
    initialState[prop] = model[prop];
  };

  let reducers = {
	[`${name}/setState`]: (state,action) => {
      let {payload} = action;

      return {
        ...state,
        ...payload
      };
    }
  };

  let reducer = ( state = initialState, action ) => {
    const handler = reducers[action.type];
    return handler ? handler(state,action) : state;
  };

  return reducer;
};

/**
 * 替换redux中挂载的reducers
 * @param  {string} name  标识符
 * @param  {object} model 数据模型
 * @param  {object} store redux-store
 * @return
 */
function replaceReducer(name,model,store){
  let modelReducer = createModelReducer(name,model);
  let reducer = injectReducer({[name]: modelReducer});

  store.replaceReducer(reducer);
};

/**
 * 将model相关的state数据导入model的实例属性
 * @param  {string} name  标识符
 * @param  {object} model 数据模型
 * @param  {object} store redux-store
 * @return
 */
function mapStateToModel(name,model,store){
  store.subscribe(() => {
  	let state = store.getState();
  	let modelState = state[name];

  	for (let prop in model){
	  if ( !model.hasOwnProperty(prop) ) continue;
	  model[prop] = modelState[prop];
	};
  });
};

/**
 * 发布model，为数据模型注入setState等方法；替换redux挂载的reducer；将相关state数据存入model实例属性
 * @param  {string} name  标识符
 * @param  {object} store redux-store
 * @return
 */
function publishModel(name,store){
  let model = getModel(name);

  replaceReducer(name,model,store);

  setInternalMethods(name,model,store);

  //mapStateToModel(name,model,store);
};

export default publishModel;

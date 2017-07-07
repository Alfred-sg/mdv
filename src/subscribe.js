"use strict";

import {combineReducers} from "redux";
import {connect} from "react-redux";

import ModelResigter from "./ModelResigter";

function getInitialState(model){
  let initialState = {};

  for ( let prop in model ){
  	if ( !model.hasOwnProperty(prop) ) continue;
    initialState[prop] = model[prop];
  };

  return initialState;
};

function createReducer(name){
  let model = getModel(name);
  let initialState = getInitialState(model);

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

function mapStateToModel(models,state){
  for (let prop in model){
    if ( !model.hasOwnProperty(prop) ) continue;
    model[prop] = modelState[prop];
  };
};

let reducers = {};

function replaceReducer(name,store){
  let modelReducer = createReducer(name);
  reducers[name] = modelReducer;
  let reducer = combineReducers(reducers);

  store.replaceReducer(reducer);
}

function subscribe(name,store){
  let model = ModelResigter[name];

  model.getState = store.getState;// 获取全局state

  model.setState = (payload)=>{
    store.dispatch({
  	  type: `${name}/setState`,
      payload
    });
  };

  model.__proto__.emit = (event,data) => {
    store.dispatch({
  	  type: "emit",
  	  event,
      data
    });
  };

  model.__proto__.on = (event,callback) => {
  	store.dispatch({
  	  type: "on",
      event,
      callback
    });
  };

  model.__proto__.off = (event,callback) => {
    store.dispatch({
  	  type: "off",
  	  event,
      callback
    });
  };

  replaceReducer(name,store);

  store.subscribe(() => {
  	let state = store.getState();
  	let modelState = state[name];
  	mapStateToModel(model,modelState);
  });
};

export default subscribe;

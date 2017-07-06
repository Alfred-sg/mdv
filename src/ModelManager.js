"use strict";

import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import ModelResigter from "./ModelResigter";

function getModel(name){
  let model = ModelResigter.models[name];

  if ( !model ){
  	throw new Error("model isn't registered.")
  };

  return model;
};

function getInitialState(model){
  let initialState = {};

  for ( let prop in model ){
  	if ( !model.hasOwnProperty(prop) ) continue;
    initialState[prop] = model[prop];
  };

  return initialState;
};

function createReducers(name){
  let model = getModel(name);
  let initialState = getInitialState(model);

  let reducers = {
	[`${name}/setState`]: (state=initialState,action) => {
      let {payload} = action;

      return {
        ...state,
        ...payload
      };
    }
  };
  
  return reducers;
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

  return {
    [name]: reducer
  };
};

function isConnectdStore(name){
  let model = getModel(name);
  return !!model.setState;
}

function connectModelToStore(name,combineReducersFlag){
  let model = getModel(name);
  let actions = {
  	[`${name}/setState`]: (payload) => {
      return {
      	type: `${name}/setState`,
      	payload
      };
    },
  };

  function mapStateToProps(state){
  	let modelState = combineReducersFlag ? state[name] : state;
  	Object.keys(modelState).map(key=>{
  	  model[key] = modelState[key];
    });

	return {
	  state: modelState
	};
  };

  function mapDispatchToProps(dispatch){
	actions = bindActionCreators(actions,dispatch);

	let setState = (state) => {
  	  let actions = this._actions;
      actions[`${name}/setState`](state);
    };

    model.__proto__.setState = setState;
	  
    return { model };
  };

  return connect(mapStateToProps,mapDispatchToProps);
};

const ModelManager = {
  createReducers: createReducers,
  createReducer: createReducer,
  isConnectdStore: isConnectdStore,
  connectModelToStore: connectModelToStore
};

export default ModelManager

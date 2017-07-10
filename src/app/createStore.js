"use strict";

import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware, routerReducer } from "react-router-redux";

import eventReducer from "../model/reducers/eventReducer";
import { injectReducer } from "../model/reducer";

/**
 * 创建redux-store
 * @param  {object}   opts   配置项，{extraReducers,history,extraMiddlewares,extraEnhancers,
 *                           		initialState}
 * @return {object}          redux-store
 */
export default function createMdvStore(opts){

  let initReducer = injectReducer({
  	...eventReducer, 
  	routing:routerReducer, 
  	...opts.extraReducers
  });

  let middlewares = [ ...opts.extraMiddlewares, routerMiddleware(opts.history) ];
  let middleware = applyMiddleware(...middlewares);
  let enhancers = [ middleware,...opts.extraEnhancers ];
  let enhancer = compose(...enhancers);

  let store = createStore(initReducer, opts.initialState, enhancer);
  
  return store;
};
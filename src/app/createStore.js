"use strict";

import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware, routerReducer } from "react-router-redux";

import eventReducer from "../model/reducers/eventReducer";
import { injectReducer } from "../model/reducer";

export default function createMdvStore(opts = {}){

  let middlewares = [ ...opts.extraMiddlewares || [], routerMiddleware(opts.history) ];
  let initReducer = injectReducer({...eventReducer,routing:routerReducer});
  let middleware = applyMiddleware(...middlewares);
  let enhancers = [ middleware,...opts.extraEnhancers || [] ];
  let enhancer = compose(...enhancers);

  console.log(enhancers)

  let store = createStore(initReducer, opts.initialState || {}, enhancer);
  
  return store;
};
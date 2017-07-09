"use strict";

import React, { isValidElement } from "react";
import { render } from "react-dom";
import * as Redux from "redux";
import { Provider } from "react-redux";
import { routerMiddleware } from "react-router-redux";
import invariant from 'invariant';

import { querySelector, isHTMLElement } from "./utils";
import eventReducer from "./model/reducers/eventReducer";
import { injectReducer } from "./model/reducer";
import { registerModel, publishModel, getModelsName } from "./model";

export default function createApp(){

  let app = {
  	_router: null,
  	model,
  	router,
  	start
  };

  function createStore(){
    let initReducer = injectReducer(eventReducer);
    let store = Redux.createStore(initReducer,{});
    return store;
  };

  let store = createStore();

  /**
   * 注册数据模型，并将其与stroe绑定
   * @param  {function|Class|array|string|object|null} mod 导入已注册的数据模型或未注册的数据模型
   * @return {object}                                  app
   */
  function model(mod){
    let fnResult;
    if ( typeof mod === "function" ){
      try {
        fnResult = mod();
      } catch(e) {
        registerModel(mod.name,mod);
        publishModel(mod.name,store);
      }finally{
        if ( fnResult ) model(fnResult);
      };
      return app;
    } else if ( Array.isArray(mod) ){
      mod.map(m => {
        model(m);
      });
      return app;
    } else if ( typeof mod === "string" ){
      publishModel(mod,store);
      return app;
    } else if ( typeof mod === "object" ){
      let isModelClass = !Object.keys(mod).some(name => typeof mod[name] !== "function" );
      if ( isModelClass ){
        registerModel(mod.name,mod);
        publishModel(mod.name,store);
        return app;
      }else{
        Object.keys(mod).map(name=>{
          registerModel(name,mod[name]);
          publishModel(name,store);
        });
        return app;
      };
    } else if ( !mod ){
      model(getModelsName());
      return app;
    };
  };

  function router(Router){
  	if ( isValidElement(Router) ){
  	  this._router = () => Router;
  	} else {
  	  this._router = Router;
  	};
    return app;
  };

  function getProvider(router) {
    return (
      <Provider store={store}>
        { router() }
      </Provider>
    );
  };

  function start(container){
    // support selector
    if (typeof container === 'string') {
      container = querySelector(container);
      invariant(container, `app.start: could not query selector: ${container}`);
    }

    invariant(!container || isHTMLElement(container), 'app.start: container should be HTMLElement');
    invariant(this._router, 'app.start: router should be defined');

    render(getProvider(this._router),container);
  };

  return app;
};

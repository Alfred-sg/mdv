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
import { model } from "./app"

export default function createApp(){


  function createStore(){
    let initReducer = injectReducer(eventReducer);
    let store = Redux.createStore(initReducer,{});
    return store;
  };

  let store = createStore();

  let app = {
    _router: null,
    model: model(app,store),
    router,
    start
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

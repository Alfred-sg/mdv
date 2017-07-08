"use strict";

import React, { isValidElement } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import invariant from 'invariant';

import { querySelector, isHTMLElement } from "./utils";
import createStore from "./createStore";
import subscribe from "./subscribe";

export default function createApp(){

  let app = {
  	_router: null,
  	model,
  	router,
  	start
  };

  let store = createStore();

  /**
   * 数据模型model订阅stroe
   * @param  {[type]} names [description]
   * @return {[type]}       [description]
   */
  function subscribeStore(names){
	if ( Array.isArray(names) ){
	  names.map(name => {
  	    subscribe(name,store);
      });
    } else if ( typeof names === "string" ){
	  subscribe(names,store);
    };
  };

  /**
   * 数据模型model订阅stroe
   * @param  {[type]} names [description]
   * @return {[type]}       [description]
   */
  function model(names){
    if ( typeof names === "function" ){
	  names = names();
    };

    subscribeStore(names);
  };

  function router(Router){
  	if ( isValidElement(Router) ){
  	  this._router = () => Router;
  	} else {
  	  this._router = Router;
  	}
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

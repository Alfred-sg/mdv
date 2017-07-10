"use strict";

import createHashHistory from 'history/createHashHistory';

import { querySelector, isHTMLElement } from "./utils";
import { createStore, model, unModel, router, start } from "./app";

export default function createApp(opts = {
  history: createHashHistory(),
  initialState: {},
  extraMiddlewares: [],
  extraEnhancers: [],
  extraReducers: {}
}){
  opts.history = opts.history || createHashHistory();
  opts.initialState = opts.initialState || {};
  opts.extraMiddlewares = opts.extraMiddlewares || [];
  opts.extraEnhancers = opts.extraEnhancers || [];
  opts.extraReducers = opts.extraReducers || {};

  const store = createStore(opts);

  let app = {
    _store: createStore(opts),
    _router: null,
    model: model(store),
    unModel: unModel(store),
    router: router(opts.history),
    start: start(store,opts.history)
  };

  if ( opts.onStateChange ){
    store.subscribe(()=>{
      let state = store.getState();
      opts.onStateChange(state);
    });
  };

  return app;
};

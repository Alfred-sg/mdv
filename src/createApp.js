"use strict";

import createHashHistory from 'history/createHashHistory';

import { querySelector, isHTMLElement } from "./utils";
import { createStore, model, unModel, router, start } from "./app";

export default function createApp(opts = {
  history: createHashHistory()
}){

  const store = createStore(opts);

  let app = {
    _router: null,
    model: model(store),
    unModel: unModel(store),
    router: router(opts.history),
    start: start(store,opts.history)
  };

  return app;
};

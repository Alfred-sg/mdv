"use strict";

import React, { isValidElement } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import invariant from 'invariant';

import { querySelector, isHTMLElement } from "../utils";

function renderProvider(router,store,history) {
  return (
    <Provider store={store}>
      { router(history) }
    </Provider>
  );
};

export default function(store,history){
  return function start(container){
    // support selector
    if (typeof container === 'string') {
      container = querySelector(container);
      invariant(container, `app.start: could not query selector: ${container}`);
    };

    invariant(!container || isHTMLElement(container), 'app.start: container should be HTMLElement');
    invariant(this._router, 'app.start: router should be defined');

    const router = this._router;
    const provider = renderProvider(router,store,history);

    render(provider,container);
  };
};

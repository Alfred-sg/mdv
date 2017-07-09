"use strict";

import { combineReducers } from "redux";

let reducers = {};

export function injectReducer(reducersMap){
  reducers = {
  	...reducers,
  	...reducersMap
  };
  let reducer = combineReducers(reducers);

  return reducer;
};

"use strict";

import Redux from "redux";

import eventReducer from "./eventReducer";

function createStore(){
  let store = Redux.createStore(eventReducer,{});
  return store;
};

export default createStore
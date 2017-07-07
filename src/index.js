"use strict";

import createStore from "./createStore";
import createModelDecorator from "./createModelDecorator";
import connectComponent from "./connectComponent";

let store = createStore();
let ModelDecorator = createModelDecorator(store);

export default {
  store,
  ModelDecorator,
  connect: connectComponent
}
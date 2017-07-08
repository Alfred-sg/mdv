"use strict";

export createApp from "./createApp";
import createStore from "./createStore";
import createModelDecorator from "./createModelDecorator";
import connectComponent from "./connectComponent";

export const store = createStore();
export const ModelDecorator = createModelDecorator(store);
export const connect = connectComponent
"use strict";

import warning from 'warning';

export function validateInternalMethods(model){
  [ "setState", "getGlobalState", "emit", "on", "off" ].map(method => {
  	warning(!model[method], `${method} will be overrided by mdv when model has connected with store.`);
  	model.__proto__[method] = ()=>{
  	  warning(true, "model ${model.toString()} hasn't connected with store.");
    };
  });
};

export function setInternalMethods(name,model,store){
  model.__proto__.getGlobalState = store.getGlobalState;// 获取全局state

  model.__proto__.setState = (payload)=>{
    store.dispatch({
  	  type: `${name}/setState`,
      payload
    });
  };

  model.__proto__.emit = (event,data) => {
    store.dispatch({
  	  type: "emit",
  	  event,
      data
    });
  };

  model.__proto__.on = (event,callback) => {
  	store.dispatch({
  	  type: "on",
      event,
      callback
    });
  };

  model.__proto__.off = (event,callback) => {
    store.dispatch({
  	  type: "off",
  	  event,
      callback
    });
  };
};

"use strict";

import Event from "./Event";

let models = {};

function instantiateModel(ModelClass){
  let model = new ModelClass();

  if ( model.setState ){
  	throw new Error("setState will be overrided by redux-model when store is connected.");
  };
  
  return model;
};

function registerModel(name,ModelClass){
  if ( typeof name !== "string" ){
  	throw new TypeError("model should be a string.");
  };

  if ( typeof ModelClass !== "function" ){
  	throw new TypeError("model should be a function.");
  };

  if ( models[name] ){
  	throw new Error("name is registerd.");
  };

  let model = instantiateModel(ModelClass);

  models[name] = model;

  model.__proto__.setState = ()=>{
  	throw new Error("model hasn't connected with store.");
  };

  if ( model.subscribe ){
  	let events = model.subscribe();

  	Object.keys(events).map(eventName => {
  	  Event.on(eventName,events[eventName]);
  	});

  	Object.defineProperty(model,"subscribe",{
	  enumerable: false,
	  configurable: false,
	  writable: false,
	  value: "redux-model intetnal use"
  	});
  };

  model.__proto__.on = Event.on;
  model.__proto__.off = Event.off;
  model.__proto__.send = (eventName) => {
  	let state = {};

  	for ( let prop in model ){
  	  if ( !model.hasOwnProperty(prop) ) continue;
      state[prop] = model[prop];
    };

  	let message = {
  	  name,
  	  state
  	};
  	
  	Event.emit(eventName,message);
  };

  Object.defineProperty(model.__proto__,"on",{
    writable: false
  });
  Object.defineProperty(model.__proto__,"off",{
    writable: false
  });
  Object.defineProperty(model.__proto__,"send",{
    writable: false
  });

  return model;
};

const ModelRegister = {
  registerModel: registerModel,
  models: models
};

export default ModelRegister

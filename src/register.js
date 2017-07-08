"use strict";

export let models = {};

function instantiate(ModelClass){
  let model = new ModelClass();

  if ( model.setState ){
  	throw new Error("setState will be overrided by redux-model when store is connected.");
  };
  
  return model;
};

export function register(name,ModelClass){
  if ( typeof name !== "string" ){
  	throw new TypeError("model should be a string.");
  };

  if ( typeof ModelClass !== "function" ){
  	throw new TypeError("model should be a function.");
  };

  if ( models[name] ){
  	throw new Error("name is registerd.");
  };

  let model = instantiate(ModelClass);

  models[name] = model;

  model.__proto__.setState = ()=>{
  	throw new Error("model hasn't connected with store.");
  };

  return model;
};

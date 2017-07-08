"use strict";

import createStore from "./createStore";
import subscribe from "./createStore"

function createApp(){
  let store = createStore();
  
  function model(name){
  	subscribe(name,store);
  };

  return {
  	model
  };

};
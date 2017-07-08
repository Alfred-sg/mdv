"use strict";

import createStore from "./createStore";
import subscribe from "./createStore"

function createApp(){
  let store = createStore();


  /**
   * 数据模型model订阅stroe
   * @param  {[type]} names [description]
   * @return {[type]}       [description]
   */
  function subscribeStore(names){
	if ( Array.isArray(names) ){
	  names.map(name => {
  	    subscribe(name,store);
      });
    } else if ( typeof names === "string" ){
	  subscribe(names,store);
    };
  };

  /**
   * 数据模型model订阅stroe
   * @param  {[type]} names [description]
   * @return {[type]}       [description]
   */
  function model(names){
    if ( typeof names === "function" ){
	  names = names();
    };

    subscribeStore(names);
  };

  return {
  	model: 
  };
};
"use strict";

import invariant from "invariant"; 

export default function ListStateModelDecorator(ModelClass){
  invariant(typeof ModelClass === "function", "list should be a array.");

  return (list) => {
  	invariant(Array.isArray(list), "list should be a array.");

  	list = list.map(item=>{
  	  if ( item.constructor === ModelClass ) return;

  	  let model = new ModelClass();

	  for ( let prop in item ){
	  	if ( !item.hasOwnProperty(prop) ) return;

  	  	let setter = model[prop] ? model[prop].setter : ()=>{};

	  	Object.defineProperty(model,prop,{
	  	  get: function(){
	  	  	return item[prop];
	  	  },
	  	  set: function(value){
	        item[prop] = value;
	  	  	setter();
	  	  }
	  	});
	  };

	  return model;

  	});

  	return list;
  };

};

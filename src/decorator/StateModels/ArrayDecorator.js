"use strict";

import invariant from "invariant"; 

export default function ArrayDecorator(ModelClass){
  invariant(typeof ModelClass === "function", "ModelClass should be a class.");

  return (list,hostModel) => {
  	invariant(Array.isArray(list), "list should be a array.");

  	list._hostModel = hostModel;

  	let model = new ModelClass();
  	let modelProto = Object.getPrototypeOf(model);

  	if ( !(list instanceof ModelClass) ){
  	  let originProto = list.__proto__;
  	  modelProto.__proto__ = originProto;
  	  list.__proto__ = modelProto;
  	};

  	let ItemModel = ModelClass.ItemModel;

    if ( ItemModel ){
      list.map((item,idx)=>{
        list[idx] = ItemModel(item,hostModel);
      });
    };

  	return list;
  };

};

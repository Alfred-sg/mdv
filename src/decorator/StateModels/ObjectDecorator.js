"use strict";

import invariant from "invariant"; 
import { isPlainObject } from "../../utils"

export default function ObjectDecorator(ModelClass){
  invariant(typeof ModelClass === "function", "list should be a array.");

  return (obj,hostModel) => {
  	invariant(isPlainObject(obj), "obj should be a object.");

    obj._hostModel = hostModel;

    let model = new ModelClass();
    let modelProto = Object.getPrototypeOf(model);

    if ( !(obj instanceof ModelClass) ){
      let originProto = obj.__proto__;
      modelProto.__proto__ = originProto;
      obj.__proto__ = modelProto;
    };

    let propsModel = ModelClass.propsModel;

    if ( propsModel ){
      for ( let prop in obj ){
        if ( !obj.hasOwnProperty(prop) || prop === "_hostModel" ) continue;
        let propModel = propsModel && propsModel[prop];
        obj[prop] = propModel(obj[prop]);
      };
    };

  	return obj;
  };

};

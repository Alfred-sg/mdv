"use strict";

import {register} from "./register";
import subscribe from "./subscribe";

const createModelDecorator = (store) => {
  return (name) => {
  	console.log(name)
    return (ModelClass) => {
    	console.log(ModelClass)
      let model = register(name,ModelClass);
      subscribe(name,store);
      return name;
    };

  };
};

export default createModelDecorator

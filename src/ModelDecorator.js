"use strict";

import ModelManager from "./ModelManager";

let models = {};

const ModelDecorator = (name) => {
  return (ModelClass) => {
  	let model = ModelManager.registerModel(name,ModelClass);

    return model;
  };

};

export default ModelDecorator

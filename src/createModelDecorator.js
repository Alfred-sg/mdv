"use strict";

import ModelResigter from "./ModelResigter";
import subscribe from "./subscribe";

const createModelDecorator = (store) => {
  return (name) => {
    return (ModelClass) => {
      let model = ModelManager.registerModel(name,ModelClass);
      subscribe(name,store);

      return;
    };

  };
};

export default createModelDecorator

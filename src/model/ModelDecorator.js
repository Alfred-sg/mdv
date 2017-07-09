"use strict";

import { registerModel } from "./registerModel";

const ModelDecorator = (name) => {
  return (ModelClass) => {
    registerModel(name,ModelClass);
    return name;
  };
};

export default ModelDecorator
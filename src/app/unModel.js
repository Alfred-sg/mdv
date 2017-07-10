"use strict";

import { removeModel } from "../model";
import { removeReducer } from "../model/reducer";

export default function (store){
  function unModel(modelName){
    removeModel(modelName);
    let newReducer = removeReducer(modelName);
    store.replaceReducer(newReducer);
    return this;
  };

};

"use strict";

import { removeModel } from "../model";
import { removeReducer } from "../model/reducer";

export default function (store){

  
  /**
   * 移除model
   * @param  {string}   modelName   model的标识符
   * @return {object}               app
   */
  function unModel(modelName){
    removeModel(modelName);
    let newReducer = removeReducer(modelName);
    store.replaceReducer(newReducer);
    return this;
  };

  return unModel;

};

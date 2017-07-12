"use strict";

import { addModel } from './models';
import { validateInternalMethods } from './internalMethods';

import invariant from 'invariant';
import warning from 'warning';

/**
 * 实例化model
 * @param  {Class}   ModelClass   model构造函数
 * @return {object}               model实例
 */
function instantiateModelClass(ModelClass){
  let model = new ModelClass();
  
  return model;
};

/**
 * 将model以标识符name存入models缓存中
 * @param  {string}   name         标识符
 * @param  {Class}    ModelClass   model构造函数
 * @return {string}   name
 */
function registerModel(name,ModelClass){
  if ( arguments.length === 1 ){
  	ModelClass = name;
  	name = undefined;
  };

  name = name || ModelClass.name;
  invariant(typeof name === "string", "name should be a string.");
  invariant(typeof ModelClass === "function", "ModelClass should be a Class.");

  let model = instantiateModelClass(ModelClass);

  validateInternalMethods(model);

  addModel(name,model);

  return name;
};

export default registerModel;

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
 * @param  {Class}    ModelClass   model构造函数或普通对象
 * @return
 */
export function registerModel(name,ModelClass){
  invariant(typeof name === "string", "name should be a string.");
  invariant(typeof ModelClass === "function" , //|| typeof ModelClass === "object"
  	"ModelClass should be a Class.");

  let model = instantiateModelClass(ModelClass); //typeof ModelClass === "function" ? instantiateModelClass(ModelClass) : ModelClass;

  validateInternalMethods(model);

  addModel(name,model);

  return;
};

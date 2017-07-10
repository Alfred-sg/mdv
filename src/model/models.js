"use strict";

import invariant from 'invariant';
import warning from 'warning';

let models = {};

/**
 * 获取已存入models缓存中的model
 * @param  {string}   name        标识符
 * @return {object}               model实例
 */
export function getModel(name){
  let model = models[name];
  warning(model, "name isn't registerd.")
  return model;
};

/**
 * 获取已存入models缓存中的model
 * @return {object}               model实例
 */
export function getModels(){
  return models;
};

/**
 * 获取已存入models缓存中的model.name
 * @return {array}               model.name
 */
export function getModelsName(){
  return Object.keys(models);
};

/**
 * 将model存入models缓存中
 * @param  {string}   name        标识符
 * @param  {object}               model实例
 * @return
 */
export function addModel(name,model){
  warning(!models[name], "name is registerd.")
  models[name] = model;
};

/**
 * 将model从models缓存中移除
 * @param  {string}   name        标识符
 * @return
 */
export function removeModel(name,model){
  warning(!models[name], "name is registerd.")
  delete models[name];
};

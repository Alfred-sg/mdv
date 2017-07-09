"use strict";

/**
 * 获取已存入models缓存中的model.name
 * @return {array}               model.name
 */
export { getModelsName } from "./models";

/**
 * 将model以标识符name存入models缓存中
 * @param  {string}   name         标识符
 * @param  {Class}    ModelClass   model构造函数或普通对象
 * @return
 */
export registerModel from "./registerModel";

/**
 * 发布model，为数据模型注入setState等方法；替换redux挂载的reducer；将相关state数据存入model实例属性
 * @param  {string} name  标识符
 * @param  {object} store redux-store
 * @return
 */
export publishModel from "./publishModel";

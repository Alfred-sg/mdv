"use strict";

import { registerModel } from "../model/index";

/**
 * 装饰器，注册model；model的构造函数所在文件须被调用，方促成注册成功
 * @param  {string} name model的标识符，不传默认取构造函数的name属性
 * @return {string}   name
 */
const ModelDecorator = (name) => {
  return (ModelClass) => {
    name = registerModel(name,ModelClass);
    return name;
  };
};

export default ModelDecorator;

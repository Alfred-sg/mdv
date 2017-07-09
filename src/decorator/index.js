"use strict";

/**
 * 装饰器，注册model；model的构造函数所在文件须被调用，方促成注册成功
 * @param  {string} name model的标识符，不传默认取构造函数的name属性
 * @return {string}   name
 */
export ModelDecorator from "./ModelDecorator";

/**
 * 连通装饰器，将state和model注入组件
 * @param  {string} name model的标识符
 * @return {decorator}   由react-redux/connect创建的装饰函数
 */
export ModelComponent from "./ModelComponent";

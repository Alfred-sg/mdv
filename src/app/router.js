"use strict";

import { isValidElement } from "react";

export default function(history){

  /**
   * 配置路由
   * @param  {function|ReactElement} RouterElement 路由react元素获取函数，或元素
   * @return {object}                              app
   */
  function router(RouterElement){
    if ( isValidElement(RouterElement) ){
	  this._router = () => RouterElement;
    } else {
	  this._router = RouterElement(history);
    };
    return this;
  };

  return router;

};
